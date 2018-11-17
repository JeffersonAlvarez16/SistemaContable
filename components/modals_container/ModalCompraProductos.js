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

import setSnackBars from '../plugins/setSnackBars';


//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import AutoCompleteSelectedProducto from '../plugins/AutoCompleteSelectedProducto';
import TablaNormal from '../components/tables/TableNormal';
import funtions from '../../utils/funtions';
import AutoCompleteProveedor from '../plugins/AutoCompleteProveedores';
import AutoCompleteClientes from '../plugins/AutoCompleteClientes';


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

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);   
    }

    escFunction=(event)=> {
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
            return restaStock
        }

        if (this.props.tipoAjuste === 'ajuste-stock-entrada') {
            return sumaStock
        }

        if (this.props.tipoAjuste === 'ajuste-stock-salida') {
            return restaStock
        }

        if (this.props.tipoAjuste === 'devolucion-proveedor') {
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

    finalizarCompra = () => {
        if (this.comprovarFinalizarCompraYDevolucionProveedor()) {
            this.updateDataProductos()
        }
    }

    finalizarDevolucionCliente = () => {
        if (this.comprovarDevolucionCliente()) {
            this.updateDataProductos()
        }
    }

    finalizarDevolucionProveedor = () => {
        if (this.comprovarFinalizarCompraYDevolucionProveedor()) {
            this.updateDataProductos()
        }
    }

    finalizarAjusteEntrada = () => {
        if (this.comprovarAjusteEntradaSalida()) {
            this.updateDataProductos()
        }
    }

    finalizarAjusteSalida = () => {
        if (this.comprovarAjusteEntradaSalida()) {
            this.updateDataProductos()
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
        operacionStockRef.set({
            codigo: codigoStock,
            tipo_operacion: this.props.tipoAjuste,
            fecha: `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
            hora: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            cliente_proveedor: this.state.proveedorCompra.length > 0 ? this.state.proveedorCompra : this.state.clienteDevolucion,
            productos: arrayProductos,
            total_final: this.state.total_final,
            empleado: this.props.usuario.code,
            observacion: this.state.observacionCompra,
            subtotal: '',
            descuento: '',
            otros_gastos: '',
            flete: '',
            valor_pagado: '',
            medio_pago: '',
            saldo_favor: '',
            en_deuda: '',
            vuelto: '',
            acreditado: '',
            order: order + ""
        });
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
                        {`${n.precio_costo}`}
                    </div>
                    <TextField
                        id="handle-precio-edit"
                        margin="dense"
                        type="number"
                        value={this.state.listaSeleccionadosValoresEditados.filter(item => n.codigo === item.codigo)[0].precio_costo_nuevo}
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
                        {`Nuevo precio costo ${Number(this.state.listaSeleccionadosValoresEditados.filter(item => n.codigo === item.codigo)[0].precio_costo_nuevo)}`}
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
                return restaRetorno
            }

            if (this.props.tipoAjuste === 'ajuste-stock-entrada') {
                return sumaRetorno
            }

            if (this.props.tipoAjuste === 'ajuste-stock-salida') {
                return restaRetorno
            }

            if (this.props.tipoAjuste === 'devolucion-proveedor') {
                return restaRetorno
            }
        }

        if (item.id === 'accions') {
            return <Button variant="fab" mini color="secondary" aria-label="quit" onClick={() => {
                const arraySeleccionados = this.state.listaSeleccionados
                const arraySeleccionadosEditados = this.state.listaSeleccionadosValoresEditados
                var contador1=0
                var contador2=0
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
                                tipoAjuste === 'ajuste-stock-entrada' &&
                                <div>Ajuste de stock - Entrada</div>
                            }
                            {
                                tipoAjuste === 'ajuste-stock-salida' &&
                                <div>Ajuste de stock - Salida</div>
                            }
                            {
                                tipoAjuste === 'devolucion-proveedor' &&
                                <div>Devolución al proveedor</div>
                            }
                        </Typography>
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
                            tipoAjuste === 'ajuste-stock-entrada' &&
                            <Button color="inherit" onClick={() => this.finalizarAjusteEntrada()} >
                                Finalizar Ajuste
                            </Button>
                        }
                        {
                            tipoAjuste === 'ajuste-stock-salida' &&
                            <Button color="inherit" onClick={() => this.finalizarAjusteSalida()} >
                                Finalizar Ajuste
                            </Button>
                        }
                        {
                            tipoAjuste === 'devolucion-proveedor' &&
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
                            <AutoCompleteProveedor
                                id="standard-proveedores-select"
                                styleText={styles.styleSearch}
                                nameTextFiel="Proveedor"
                                dataRef="proveedores"
                                dataRefObject="proveedor"
                                itemCategoria={this.state.proveedorCompra}
                                changueText={itemCode => this.setState({ proveedorCompra: itemCode })}
                                textItemVacio='Proveedores vacios'
                                usuario={this.props.usuario}
                            >
                            </AutoCompleteProveedor>
                        }
                        {
                            tipoAjuste === 'devolucion_cliente' &&
                            <AutoCompleteClientes
                                id="standard-clientes-select"
                                styleText={styles.styleSearch}
                                nameTextFiel="Cliente"
                                dataRef="clientes"
                                dataRefObject="cliente"
                                itemCategoria={this.state.clienteDevolucion}
                                changueText={itemCode => this.setState({ clienteDevolucion: itemCode })}
                                textItemVacio='Clientes vacios'
                                usuario={this.props.usuario}
                            />
                        }
                        {
                            tipoAjuste === 'devolucion-proveedor' &&
                            <AutoCompleteProveedor
                                id="standard-proveedores-select"
                                styleText={styles.styleSearch}
                                nameTextFiel="Proveedor"
                                dataRef="proveedores"
                                dataRefObject="proveedor"
                                itemCategoria={this.state.proveedorCompra}
                                changueText={itemCode => this.setState({ proveedorCompra: itemCode })}
                                textItemVacio='Proveedores vacios'
                                usuario={this.props.usuario}
                            >
                            </AutoCompleteProveedor>
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
                            tipoAjuste === 'ajuste-stock-entrada' &&
                            <div>{observacionConError}</div>
                        }
                        {
                            tipoAjuste === 'ajuste-stock-salida' &&
                            <div>{observacionConError}</div>
                        }
                        {
                            tipoAjuste === 'devolucion-proveedor' &&
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
            </div >
        );
    }
}

export default ModalCompraProductos;