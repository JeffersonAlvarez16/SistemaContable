import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import setSnackBars from '../plugins/setSnackBars';
import CircularProgress from '@material-ui/core/CircularProgress';


//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import AutoCompleteSelectedProducto from '../plugins/AutoCompleteSelectedProducto';
import TablaNormal from '../components/tables/TableNormal';
import funtions from '../../utils/funtions';
import AutoCompleteProveedor from '../plugins/AutoCompleteProveedores';
import AutoCompleteClientes from '../plugins/AutoCompleteClientes';
import AutoCompleteCliente from '../plugins/AutoCompleteClientes-New';
import AutoCompleteProveedores from '../plugins/AutoCompleteRetenciones';
import ModalPreguntarCaja from './compra_productos/ModalPreguntarCaja';
import ModalContainerNormal from './ModalContainerNormal';
import { Chip, Avatar } from '@material-ui/core';
import colors from '../../utils/colors';
import ModalPreguntarCajaSalida from './compra_productos/ModalPreguntarCajaSalida';


class ModalCompraProductos extends Component {

    state = {
        listaSeleccionados: [],
        listaSeleccionadosValoresEditados: [],
        rowslistaProductos: [
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'descripcion_producto', numeric: true, disablePadding: false, label: 'Descripción' },
            { id: 'precio_costo', numeric: true, disablePadding: false, label: 'Precio costo' },
            { id: 'stock_actual', numeric: true, disablePadding: false, label: 'Cantidad' },
            { id: 'accions', numeric: true, disablePadding: false, label: 'Acciones' },
        ],
        //proveedor compra general
        proveedorCompra: '',
        //cliente devolucion
        clienteDevolucion: '',
        //total final de compra
        total_final: 0,
        observacionCompra: '',
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
        this.dineroEnCaja()
    }

    dineroEnCaja = () => {
        var db = firebase.database();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var operacionVentaRefCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_abiertas_usuario')
                operacionVentaRefCaja.on('value', (snap) => {
                    if (snap.val()) {
                        var caja = funtions.snapshotToArray(snap).filter(it => it.usuario === this.props.usuario.code)[0]
                        var cajaRefValorActual = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo)
                        cajaRefValorActual.once('value', (snap2) => {
                            if (snap2.val()) {
                                this.setState({
                                    dinero_en_caja: Number(snap2.val().valor_caja)
                                })
                            }
                        })
                    }
                })

            }
        })
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.props.handleClose()
        }
    }

    getNumeroStockActual = (item) => {
        var sumaStock = Number(this.state.listaSeleccionadosValoresEditados.filter(item2 => item2.codigo === item.codigo)[0].stock_nuevo) + Number(item.stock_actual)
        var restaStock = Number(item.stock_actual) - Number(this.state.listaSeleccionadosValoresEditados.filter(item2 => item2.codigo === item.codigo)[0].stock_nuevo)

        if (this.props.tipoAjuste === 'compra_producto') {
            return sumaStock
        }

        if (this.props.tipoAjuste === 'devolucion_cliente') {
            return sumaStock
        }

        if (this.props.tipoAjuste === 'ajuste_stock_entrada') {
            return sumaStock
        }

        if (this.props.tipoAjuste === 'ajuste_stock_salida') {
            return restaStock
        }

        if (this.props.tipoAjuste === 'devolucion_proveedor') {
            return restaStock
        }
    }

    updateDataProductos = () => {
        this.state.listaSeleccionados.forEach(item => {
            var db = firebase.database();
            var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/productos/' + item.codigo);
            productosRef.update({
                stock_actual: this.getNumeroStockActual(item),
                precio_costo: Number(this.state.listaSeleccionadosValoresEditados.filter(item2 => item2.codigo === item.codigo)[0].precio_costo_nuevo)
            });
        })
        this.setOperacionStock(this.state.listaSeleccionadosValoresEditados)
        setSnackBars.openSnack('info', 'rootSnackBar', 'Compra relizada con éxito', 2000)
        this.props.handleClose()
    }
    //recuperar referencias
    obtenerReferenciaTipo = () => {
        if (this.props.tipoAjuste === 'compra_producto') {
            return 'compras_productos'
        }

        if (this.props.tipoAjuste === 'devolucion_cliente') {
            return 'devoluciones_clientes'
        }

        if (this.props.tipoAjuste === 'ajuste_stock_entrada') {
            return 'ajustes_stock_entradas'
        }

        if (this.props.tipoAjuste === 'ajuste_stock_salida') {
            return 'ajustes_stock_salidas'
        }

        if (this.props.tipoAjuste === 'devolucion_proveedor') {
            return 'devoluciones_proveedores'
        }
    }
    // guardar venta caja
    setOperacionCaja(itemVenta) {
        var db = firebase.database();
        var codigoVentaCaja = funtions.guidGenerator()
        var operacionVentaRefCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_abiertas_usuario')
        operacionVentaRefCaja.once('value', (snap) => {
            if (snap.val()) {
                var caja = funtions.snapshotToArray(snap).filter(it => it.usuario === this.props.usuario.code)[0]
                if (Boolean(caja.estado)) {
                    var operacionVentaCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo + '/' + this.obtenerReferenciaTipo() + '/' + codigoVentaCaja)
                    operacionVentaCaja.set(itemVenta)

                    var cajaRefValorActual = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo)
                    cajaRefValorActual.once('value', (snap2) => {
                        if (snap2.val()) {
                            var resta = Number(Number(snap2.val().valor_caja) - Number(itemVenta.total_final)).toFixed(2)
                            var suma = Number(Number(itemVenta.total_final) + Number(snap2.val().valor_caja)).toFixed(2)

                            if (this.props.tipoAjuste === 'compra_producto') {
                                cajaRefValorActual.update({
                                    valor_caja: `${resta}`
                                })
                            }
                            if (this.props.tipoAjuste === 'devolucion_cliente') {
                                cajaRefValorActual.update({
                                    valor_caja: `${resta}`
                                })
                            }
                            if (this.props.tipoAjuste === 'ajuste_stock_entrada') {
                                cajaRefValorActual.update({
                                    valor_caja: `${resta}`
                                })
                            }
                            if (this.props.tipoAjuste === 'ajuste_stock_salida') {
                                cajaRefValorActual.update({
                                    valor_caja: `${suma}`
                                })
                            }
                            if (this.props.tipoAjuste === 'devolucion_proveedor') {
                                cajaRefValorActual.update({
                                    valor_caja: `${suma}`
                                })
                            }

                        }
                    })
                }
            }
        })
    }

    finalizarCompra = () => {
        if (this.comprovarFinalizarCompraYDevolucionProveedor()) {
            this.setState({
                estadoModalEnviarCajaEntrada: true
            })
            //this.updateDataProductos()
        }
    }

    finalizarDevolucionCliente = () => {
        if (this.comprovarDevolucionCliente()) {
            this.setState({
                estadoModalEnviarCajaEntrada: true
            })
            //this.updateDataProductos()
        }
    }

    finalizarDevolucionProveedor = () => {
        if (this.comprovarFinalizarCompraYDevolucionProveedor()) {
            this.setState({
                estadoModalEnviarCajaSalida: true
            })
            //this.updateDataProductos()
        }
    }

    finalizarAjusteEntrada = () => {
        if (this.comprovarAjusteEntradaSalida()) {
            this.setState({
                estadoModalEnviarCajaEntrada: true
            })
            //this.updateDataProductos()
        }
    }

    finalizarAjusteSalida = () => {
        if (this.comprovarAjusteEntradaSalida()) {
            this.setState({
                estadoModalEnviarCajaSalida: true
            })
            //this.updateDataProductos()
        }
    }

    comprovarAjusteEntradaSalida = () => {
        if (
            this.state.observacionCompra.length > 0 &&
            this.state.listaSeleccionados.length > 0
        ) {
            return true
        } else {
            setSnackBars.openSnack('error', 'rootSnackBar', 'Complete todos los campos', 2000)
            return false
        }
    }

    comprovarFinalizarCompraYDevolucionProveedor = () => {
        if (
            this.state.proveedorCompra.length > 0 &&
            this.state.listaSeleccionados.length > 0
        ) {
            return true
        } else {
            setSnackBars.openSnack('error', 'rootSnackBar', 'Complete todos los campos', 2000)
            return false
        }
    }

    comprovarDevolucionCliente = () => {
        if (
            this.state.clienteDevolucion.length > 0 &&
            this.state.listaSeleccionados.length > 0
        ) {
            return true
        } else {
            setSnackBars.openSnack('error', 'rootSnackBar', 'Complete todos los campos', 2000)
            return false
        }
    }

    setOperacionStock = (listaProductos) => {
        var codigoStock = funtions.guidGenerator()
        var arrayProductos = []
        listaProductos.forEach(item => {
            arrayProductos.push({
                codigo: item.codigo,
                cantidad: item.stock_nuevo,
                precio_costo: item.precio_costo_nuevo
            })
        })
        var order = new Date()
        var db = firebase.database();
        var operacionStockRef = db.ref('users/' + firebase.auth().currentUser.uid + '/operaciones_stock/' + codigoStock);

        var itemOperacion = {
            codigo: codigoStock,
            tipo_operacion: this.props.tipoAjuste,
            fecha: funtions.obtenerFechaActual(),
            hora: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            cliente_proveedor: this.state.proveedorCompra.length > 0 ? this.state.proveedorCompra : this.state.clienteDevolucion,
            productos: arrayProductos,
            total_final: `${Number(this.state.total_final).toFixed(2)}`,
            empleado: this.props.usuario.code,
            observacion: this.state.observacionCompra,
            subtotal: '0.00',
            descuento: '0.00',
            otros_gastos: '0.00',
            flete: '0.00',
            valor_pagado: '0.00',
            medio_pago: '',
            saldo_favor: '0.00',
            en_deuda: '0.00',
            vuelto: '0.00',
            acreditado: '0.00',
            order: order + ""
        }

        operacionStockRef.set(itemOperacion)

        if (this.props.tipoAjuste === 'compra_producto') {
            if (Boolean(this.state.operarEnCaja)) {
                this.setOperacionCaja(itemOperacion)
            }
        }
        if (this.props.tipoAjuste === 'devolucion_cliente') {

        }
        if (this.props.tipoAjuste === 'ajuste_stock_entrada') {
            if (Boolean(this.state.operarEnCaja)) {
                this.setOperacionCaja(itemOperacion)
            }
        }
        if (this.props.tipoAjuste === 'ajuste_stock_salida') {
            if (Boolean(this.state.operarEnCaja)) {
                this.setOperacionCaja(itemOperacion)
            }
        }
        if (this.props.tipoAjuste === 'devolucion_proveedor') {
            if (Boolean(this.state.operarEnCaja)) {
                this.setOperacionCaja(itemOperacion)
            }
        }

    }

    onChangue = item => {
        var array = this.state.listaSeleccionados
        var arrayValoresSelecionados = this.state.listaSeleccionadosValoresEditados
        var array2 = array.filter(item2 => item2.codigo === item.codigo)
        if (array2.length === 0) {
            array.push(item)
            arrayValoresSelecionados.push({
                codigo: item.codigo,
                stock_nuevo: '1',
                precio_costo_nuevo: item.precio_costo
            })

            this.setState({
                listaSeleccionados: array,
                listaSeleccionadosValoresEditados: arrayValoresSelecionados,
            })

            this.calcularValorTotal()
        }
    }

    calcularValorTotal = () => {
        var sumatotal = 0
        this.state.listaSeleccionadosValoresEditados.forEach(item => {
            var stock = this.state.listaSeleccionadosValoresEditados.filter(it => it.codigo === item.codigo)[0].stock_nuevo
            var precio = this.state.listaSeleccionadosValoresEditados.filter(it => it.codigo === item.codigo)[0].precio_costo_nuevo
            sumatotal = sumatotal + (Number(stock) * Number(precio))
        })
        this.setState({
            total_final: sumatotal.toFixed(2)
        })
    }

    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }

        if (item.id === 'descripcion_producto') {
            return <div style={{ width: 'max-content' }}>{n.descripcion_producto}</div>
        }

        if (item.id === 'precio_costo') {
            if (this.props.tipoAjuste === 'compra_producto') {
                return <div style={{ width: 'max-content', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: 20 }}>
                        {`${Number(n.precio_costo).toFixed(2)}`}
                    </div>
                    <TextField
                        id="handle-precio-edit"
                        margin="dense"
                        type="number"
                        value={Number(this.state.listaSeleccionadosValoresEditados.filter(item => n.codigo === item.codigo)[0].precio_costo_nuevo).toFixed(2)}
                        onChange={event => {
                            var array = this.state.listaSeleccionadosValoresEditados
                            array.filter(item => n.codigo === item.codigo)[0].precio_costo_nuevo = event.target.value
                            this.setState({
                                listaSeleccionadosValoresEditados: array
                            })
                            this.calcularValorTotal()
                        }}
                        placeholder='00.00'
                        style={{ width: 80 }}
                    />
                    <div style={{ width: 150, display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: 20 }}>
                        {`Nuevo precio costo ${Number(this.state.listaSeleccionadosValoresEditados.filter(item => n.codigo === item.codigo)[0].precio_costo_nuevo).toFixed(2)}`}
                    </div>
                </div >
            } else {
                return n.precio_costo
            }

        }

        if (item.id === 'stock_actual') {
            var sumaRetorno = <div style={{ width: 'max-content', display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {`${n.stock_actual} +`}
                </div>
                <TextField
                    id="handle-precio-edit-cantidad"
                    margin="dense"
                    type="number"
                    value={this.state.listaSeleccionadosValoresEditados.filter(item => n.codigo === item.codigo)[0].stock_nuevo}
                    onChange={event => {
                        var array = this.state.listaSeleccionadosValoresEditados
                        array.filter(item => n.codigo === item.codigo)[0].stock_nuevo = event.target.value
                        this.setState({
                            listaSeleccionadosValoresEditados: array
                        })
                        this.calcularValorTotal()
                    }}
                    placeholder='00'
                    style={{ width: 50 }}
                />
                <div style={{ width: 150, display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: 20 }}>
                    {`Nuevo Stock ${Number(this.state.listaSeleccionadosValoresEditados.filter(item => n.codigo === item.codigo)[0].stock_nuevo) + Number(n.stock_actual)}`}
                </div>
            </div>

            var restaRetorno = <div style={{ width: 'max-content', display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {`${n.stock_actual} -`}
                </div>
                <TextField
                    id="handle-precio-edit-cantidad"
                    margin="dense"
                    type="number"
                    value={this.state.listaSeleccionadosValoresEditados.filter(item => n.codigo === item.codigo)[0].stock_nuevo}
                    onChange={event => {
                        var array = this.state.listaSeleccionadosValoresEditados
                        array.filter(item => n.codigo === item.codigo)[0].stock_nuevo = event.target.value
                        this.setState({
                            listaSeleccionadosValoresEditados: array
                        })
                        this.calcularValorTotal()
                    }}
                    placeholder='00'
                    style={{ width: 50 }}
                />
                <div style={{ width: 150, display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: 20 }}>
                    {`Nuevo Stock ${Number(n.stock_actual) - Number(this.state.listaSeleccionadosValoresEditados.filter(item => n.codigo === item.codigo)[0].stock_nuevo)}`}
                </div>
            </div>

            if (this.props.tipoAjuste === 'compra_producto') {
                return sumaRetorno
            }

            if (this.props.tipoAjuste === 'devolucion_cliente') {
                return sumaRetorno
            }

            if (this.props.tipoAjuste === 'ajuste_stock_entrada') {
                return sumaRetorno
            }

            if (this.props.tipoAjuste === 'ajuste_stock_salida') {
                return restaRetorno
            }

            if (this.props.tipoAjuste === 'devolucion_proveedor') {
                return restaRetorno
            }
        }

        if (item.id === 'accions') {
            return <Button variant="fab" mini color="secondary" aria-label="quit" onClick={() => {
                const arraySeleccionados = this.state.listaSeleccionados
                const arraySeleccionadosEditados = this.state.listaSeleccionadosValoresEditados
                var contador1 = 0
                var contador2 = 0
                arraySeleccionados.forEach(item => {
                    if (item.codigo === n.codigo) {
                        arraySeleccionados.splice(contador1, 1);
                        this.setState({ listaSeleccionados: arraySeleccionados })
                    }
                    contador1++
                })
                arraySeleccionadosEditados.forEach(item => {
                    if (item.codigo === n.codigo) {
                        arraySeleccionadosEditados.splice(contador2, 1);
                        this.setState({ listaSeleccionadosValoresEditados: arraySeleccionadosEditados })
                    }
                    contador2++
                })
                this.calcularValorTotal()
            }}>
                <CloseIcon />
            </Button>
        }
    }

    handleDescontarCaja = () => {
        var db = firebase.database();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var operacionVentaRefCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_abiertas_usuario')
                operacionVentaRefCaja.once('value', (snap) => {
                    if (snap.val()) {
                        var caja = funtions.snapshotToArray(snap).filter(it => it.usuario === this.props.usuario.code)[0]
                        var cajaRefValorActual = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo)
                        cajaRefValorActual.once('value', (snap2) => {
                            if (snap2.val()) {
                                cajaRefValorActual.update({
                                    valor_caja: Number(Number(snap2.val().valor_caja) - Number(this.state.total_final)).toFixed(2)
                                })
                            }
                        })
                    }
                })

            }
        })
    }

    handleEvitarCaja = () => {
        this.updateDataProductos()
    }

    render() {

        const styles = {
            styleSearch: {
                width: '100%'
            }
        }

        const { tipoAjuste } = this.props

        const observacionSinError = <TextField
            id="outlined-simple-start-observacion"
            variant="outlined"
            label="Observación"
            value={this.state.observacionCompra}
            onChange={event => this.setState({ observacionCompra: event.target.value })}
            style={{ marginBottom: 8, marginTop: 16, width: '100%' }}
        />

        const observacionConError = <TextField
            id="outlined-simple-start-observacion"
            variant="outlined"
            error={this.state.observacionCompra.length > 0 ? false : true}
            label="Observación"
            value={this.state.observacionCompra}
            onChange={event => this.setState({ observacionCompra: event.target.value })}
            style={{ marginBottom: 8, marginTop: 16, width: '100%' }}
        />

        return (
            <div>
                <div id='rootSnackBarERROR'></div>
                <AppBar style={{
                    position: 'relative',
                }}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" style={{ flex: 1, marginLeft: 30 }}>
                            {
                                tipoAjuste === 'compra_producto' &&
                                <div>Compra de Productos</div>
                            }
                            {
                                tipoAjuste === 'devolucion_cliente' &&
                                <div>Devolución del cliente</div>
                            }
                            {
                                tipoAjuste === 'ajuste_stock_entrada' &&
                                <div>Ajuste de stock - Entrada</div>
                            }
                            {
                                tipoAjuste === 'ajuste_stock_salida' &&
                                <div>Ajuste de stock - Salida</div>
                            }
                            {
                                tipoAjuste === 'devolucion_proveedor' &&
                                <div>Devolución al proveedor</div>
                            }
                        </Typography>
                        <div>
                            <Chip
                                avatar={
                                    <Avatar style={{ width: 'max-content', paddingLeft: 16, paddingRight: 16, paddingTop: 5, paddingBottom: 5, background: colors.getColorWhite() }}>
                                        {
                                            this.state.dinero_en_caja != null &&
                                            <>
                                                {
                                                    Number(this.state.dinero_en_caja).toFixed(2)
                                                }
                                            </>
                                        }
                                    </Avatar>
                                }
                                style={{
                                    background: colors.getColorWhite()
                                }}
                                label="Dinero en caja"
                            />
                        </div>
                        {
                            tipoAjuste === 'compra_producto' &&
                            <Button color="inherit" onClick={() => this.finalizarCompra()} >
                                Finalizar Compra
                            </Button>
                        }
                        {
                            tipoAjuste === 'devolucion_cliente' &&
                            <Button color="inherit" onClick={() => this.finalizarDevolucionCliente()} >
                                Finalizar Devolución
                            </Button>
                        }
                        {
                            tipoAjuste === 'ajuste_stock_entrada' &&
                            <Button color="inherit" onClick={() => this.finalizarAjusteEntrada()} >
                                Finalizar Ajuste
                            </Button>
                        }
                        {
                            tipoAjuste === 'ajuste_stock_salida' &&
                            <Button color="inherit" onClick={() => this.finalizarAjusteSalida()} >
                                Finalizar Ajuste
                            </Button>
                        }
                        {
                            tipoAjuste === 'devolucion_proveedor' &&
                            <Button color="inherit" onClick={() => this.finalizarDevolucionProveedor()} >
                                Finalizar Devolución
                            </Button>
                        }
                    </Toolbar>
                </AppBar>


                <Grid container spacing={24} style={{ paddingLeft: 24, paddingRight: 24, width: '100vw' }}>
                    <Grid item xs={3}>
                        <AutoCompleteSelectedProducto
                            styleText={styles.styleSearch}
                            onChangue={this.onChangue}
                        >
                        </AutoCompleteSelectedProducto>
                    </Grid>
                    <Grid item xs={3}>
                        {
                            tipoAjuste === 'compra_producto' &&
                            <AutoCompleteProveedores
                                styleText={styles.styleSearch}
                                dataRef="proveedores"
                                dataRefObject="proveedor"
                                error={this.state.proveedorCompra.length > 0 ? false : true}
                                onChangue={(item) => this.setState({ proveedorCompra: item.codigo })}
                                usuario={this.props.usuario}
                                codigoProveedor=''
                            />
                        }
                        {
                            tipoAjuste === 'devolucion_cliente' &&
                            <AutoCompleteCliente
                                styleText={styles.styleSearch}
                                dataRef="clientes"
                                dataRefObject="cliente"
                                error={this.state.clienteDevolucion.length > 0 ? false : true}
                                onChangue={(item) => this.setState({ clienteDevolucion: item.codigo })}
                                usuario={this.props.usuario}
                            />
                        }
                        {
                            tipoAjuste === 'devolucion_proveedor' &&
                            <AutoCompleteProveedores
                                styleText={styles.styleSearch}
                                dataRef="proveedores"
                                dataRefObject="proveedor"
                                error={this.state.proveedorCompra.length > 0 ? false : true}
                                onChangue={(item) => this.setState({ proveedorCompra: item.codigo })}
                                usuario={this.props.usuario}
                                codigoProveedor=''
                            />
                        }
                    </Grid>
                    <Grid item xs={3}>
                        {
                            tipoAjuste === 'compra_producto' &&
                            <div>{observacionSinError}</div>
                        }
                        {
                            tipoAjuste === 'devolucion_cliente' &&
                            <div>{observacionSinError}</div>
                        }
                        {
                            tipoAjuste === 'ajuste_stock_entrada' &&
                            <div>{observacionConError}</div>
                        }
                        {
                            tipoAjuste === 'ajuste_stock_salida' &&
                            <div>{observacionConError}</div>
                        }
                        {
                            tipoAjuste === 'devolucion_proveedor' &&
                            <div>{observacionSinError}</div>
                        }

                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="outlined-simple-start-adornment"
                            variant="filled"
                            label="Total"
                            value={this.state.total_final}
                            style={{ marginBottom: 8, marginTop: 16, width: '100%' }}
                        />
                    </Grid>
                </Grid>
                <Divider />

                {
                    this.state.listaSeleccionados &&
                    <TablaNormal
                        textoTitleP="Productos"
                        textoTitleS="Producto"
                        selectedItems={true}
                        toolbar={false}
                        data={this.state.listaSeleccionados}
                        rows={this.state.rowslistaProductos}
                        handleGetData={this.handleGetData}
                        estadoTabla={this.state.listaSeleccionados.length > 0 ? 'llena' : 'vacio'}
                        itemsSeleccionados={items => this.setState({ itemsSeleccionados: items })}
                    />
                }

                <ModalContainerNormal
                    open={this.state.estadoModalEnviarCajaEntrada}
                    handleClose={() => this.setState({ estadoModalEnviarCajaEntrada: false })}
                >
                    <ModalPreguntarCaja
                        handleClose={() => this.setState({ estadoModalEnviarCajaEntrada: false })}
                        handleDescontarCaja={() => {
                            if (this.state.total_final <= this.state.dinero_en_caja) {
                                this.setState({ operarEnCaja: true })
                                setTimeout(() => {
                                    this.updateDataProductos()
                                    this.handleDescontarCaja()
                                }, 100)
                            } else {
                                setSnackBars.openSnack('error', 'rootSnackBar', 'Dinero insuficiente en caja', 2000)
                            }
                        }}
                        handleEvitarCaja={() => {
                                this.setState({ operarEnCaja: false })
                                setTimeout(() => {
                                    this.handleEvitarCaja()
                                }, 100)
                        }}

                    />
                </ModalContainerNormal>

                <ModalContainerNormal
                    open={this.state.estadoModalEnviarCajaSalida}
                    handleClose={() => this.setState({ estadoModalEnviarCajaSalida: false })}
                >
                    <ModalPreguntarCajaSalida
                        handleClose={() => this.setState({ estadoModalEnviarCajaSalida: false })}
                        handleDescontarCaja={() => {
                            this.setState({ operarEnCaja: true })
                            setTimeout(() => {
                                this.updateDataProductos()
                                this.handleDescontarCaja()
                            }, 100)
                        }}
                        handleEvitarCaja={() => {
                            this.setState({ operarEnCaja: false })
                            setTimeout(() => {
                                this.handleEvitarCaja()
                            }, 100)
                        }}

                    />
                </ModalContainerNormal>
            </div >
        );
    }
}

export default ModalCompraProductos;