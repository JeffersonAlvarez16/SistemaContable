import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MonetizationOn from '@material-ui/icons/MonetizationOn';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PaymentIcon from '@material-ui/icons/Payment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import funtions from '../utils/funtions';
import ReturnTextTable from '../components/components/tables/ReturnTextTable';
import ModalCompraProductos from '../components/modals_container/ModalCompraProductos';
import Search from '../components/components/Search';
import FullScreenDialog from '../components/components/FullScreenDialog';
import MenuHerramientas from '../components/components/menus/MenuHerramientas';
import TablaNormal from '../components/components/tables/TableNormal';
import ItemMenuHerramienta from '../components/components/menus/ItemMenuHerramienta';
import Layout from '../components/containers/Layout';
import { TextField, IconButton, Tooltip, CircularProgress, Chip, Avatar } from '@material-ui/core';
import setSnackBars from '../components/plugins/setSnackBars';
import colors from '../utils/colors';

class Stock extends Component {

    state = {
        listaStock: [],
        listaStockTemporal: [],
        rowslistaStock: [
            { id: 'cliente_proveedor', numeric: true, disablePadding: false, label: 'Cliente/Proveedor' },
            { id: 'tipo_operacion', numeric: true, disablePadding: false, label: 'Tipo de operación' },
            { id: 'productos', numeric: true, disablePadding: false, label: 'Productos' },
            { id: 'subtotal', numeric: true, disablePadding: false, label: 'Sub Total' },
            { id: 'total_final', numeric: true, disablePadding: false, label: 'Total final' },
            { id: 'hora', numeric: true, disablePadding: false, label: 'Hora' },
            { id: 'medio_pago', numeric: true, disablePadding: false, label: 'Medio pago' },
            { id: 'fecha', numeric: true, disablePadding: false, label: 'Fecha' },
            { id: 'descuento', numeric: true, disablePadding: false, label: 'Descuento' },
            { id: 'valor_pagado', numeric: true, disablePadding: false, label: 'Valor Pagado' },
            { id: 'vuelto', numeric: true, disablePadding: false, label: 'Vuelto' },
            { id: 'empleado', numeric: true, disablePadding: false, label: 'Empleado' },
            { id: 'observacion', numeric: true, disablePadding: false, label: 'Observación' },
            { id: 'otros_gastos', numeric: true, disablePadding: false, label: 'Otros Gastos' },
            { id: 'flete', numeric: true, disablePadding: false, label: 'Flete' },
            { id: 'saldo_favor', numeric: true, disablePadding: false, label: 'Saldo a favor' },
            { id: 'en_deuda', numeric: true, disablePadding: false, label: 'En deuda' },
            { id: 'acreditado', numeric: true, disablePadding: false, label: 'Acreditado' },
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
        ],
        estadoTabla: 'llena',
        //items selecionados tabla
        itemsSeleccionados: [],
        //referencias menus 
        referenciaMenuEntrada: null,
        referenciaMenuSalida: null,
        //estados modals
        estadoModalSimpleCompraProductos: false,
        //tipo de ajuste para productos
        tipoAjuste: '',
        //fecha actual del sistem

        //permisosUsuarios
        title: '',
        titlep: '',
        estadoPermisoDevolucionCliente: null,
        estadoPermisoDevolucionProveedor: null,
        estadoPermisoCompraProductos: null,
        estadoPermisoAjusteStock: null,
        fechaActual: '',
        //usuario
        usuario: null,
        cajaSeleccionada: null
    }



    componentDidMount() {
        this.cargarData()
        this.setState({
            fechaActual: funtions.obtenerFechaActual()
        })

    }

    cargarCaja = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var operacionVentaRefCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_abiertas_usuario')
                operacionVentaRefCaja.once('value', (snap) => {
                    if (snap.val()) {
                        var caja = funtions.snapshotToArray(snap).filter(it => it.usuario === this.state.usuario.code)[0]
                        if (caja != null) {
                            this.setState({
                                cajaSeleccionada: caja
                            })
                        } else {
                            this.setState({
                                cajaSeleccionada: null
                            })
                        }
                    } else {
                        this.setState({
                            cajaSeleccionada: null
                        })
                    }
                })
            }
        })

    }

    obtenerPermisosUsuarios = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var usuariosRef = db.ref(`users/${user.uid}/usuarios/${this.state.usuario.code}`)
                usuariosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        if (snapshot.val().privilegios.stock.devolucion_cliente === true) {
                            this.setState({
                                estadoPermisoDevolucionCliente: false,
                                title: ''
                            })
                        } else {
                            this.setState({
                                estadoPermisoDevolucionCliente: true,
                                title: ''
                            })
                        }
                        if (snapshot.val().privilegios.stock.devolucion_proveedor === true) {
                            this.setState({
                                estadoPermisoDevolucionProveedor: false,
                                title: ''
                            })
                        } else {

                            this.setState({
                                estadoPermisoDevolucionProveedor: true,

                            })
                        }
                        if (snapshot.val().privilegios.stock.compra_productos === true) {
                            this.setState({
                                estadoPermisoCompraProductos: false,

                            })
                        } else {

                            this.setState({
                                estadoPermisoCompraProductos: true,
                                titlep: 'No tiene Permiso para algunas acciones'
                            })
                        }
                        if (snapshot.val().privilegios.stock.ajuste_stock === true) {
                            this.setState({
                                estadoPermisoAjusteStock: false,
                                title: ''

                            })
                        } else {
                            this.setState({
                                estadoPermisoAjusteStock: true,


                            })
                        }

                    }
                });
            }
        });
    }

    cargarData = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/operaciones_stock').orderByChild('fecha').equalTo(funtions.obtenerFechaActual())
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaStock: [],
                            listaStockTemporal: [],
                            estadoTabla: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        var filterList = lista.sort((a, b) => {
                            a = new Date(a.order);
                            b = new Date(b.order);
                            return a > b ? -1 : a < b ? 1 : 0;
                        })
                        this.setState({
                            listaStock: filterList,
                            listaStockTemporal: filterList,
                            estadoTabla: 'llena'
                        })
                    } else {
                        this.setState({
                            listaStock: [],
                            listaStockTemporal: [],
                            estadoTabla: 'vacio'
                        })
                    }
                });
            }
        })
    }

    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }

        if (item.id === 'tipo_operacion') {
            return <div>
                {
                    n.tipo_operacion === 'venta-producto' &&
                    <Chip
                        avatar={
                            <Avatar style={{
                                padding: 1,
                                background: colors.getColorPrymaryDarkGreen300()
                            }}>
                                <ArrowUpwardIcon style={{ fontSize: 20, color: colors.getColorWhite() }} />
                            </Avatar>
                        }
                        label={'Venta de productos'}
                        clickable
                        style={{ background: colors.getColorPrymaryGrey200() }}
                    />
                }
                {
                    n.tipo_operacion === 'compra_producto' &&
                    <Chip
                        avatar={
                            <Avatar style={{
                                padding: 1,
                                background: colors.getColorPrymaryDarkGrey500()
                            }}>
                                <ArrowDownwardIcon style={{ fontSize: 20, color: colors.getColorWhite() }} />
                            </Avatar>
                        }
                        label={'Compra de productos'}
                        clickable
                        style={{ background: colors.getColorPrymaryGrey200() }}
                    />
                }
                {
                    n.tipo_operacion === 'devolucion_cliente' &&
                    <Chip
                        avatar={
                            <Avatar style={{
                                padding: 1,
                                background: colors.getColorPrymaryDarkRed300()
                            }}>
                                <ArrowDownwardIcon style={{ fontSize: 20, color: colors.getColorWhite() }} />
                            </Avatar>
                        }
                        label={'Devolucion del cliente'}
                        clickable
                        style={{ background: colors.getColorPrymaryGrey200() }}
                    />
                }
                {
                    n.tipo_operacion === 'ajuste_stock_entrada' &&
                    <Chip
                        avatar={
                            <Avatar style={{
                                padding: 1,
                                background: colors.getColorPrymaryDarkAmber300()
                            }}>
                                <ArrowDownwardIcon style={{ fontSize: 20, color: colors.getColorWhite() }} />
                            </Avatar>
                        }
                        label={'Ajuste de stock - Entrada'}
                        clickable
                        style={{ background: colors.getColorPrymaryGrey200() }}
                    />
                }
                {
                    n.tipo_operacion === 'devolucion_proveedor' &&
                    <Chip
                        avatar={
                            <Avatar style={{
                                padding: 1,
                                background: colors.getColorPrymaryDarkDeepPurple300()
                            }}>
                                <ArrowUpwardIcon style={{ fontSize: 20, color: colors.getColorWhite() }} />
                            </Avatar>
                        }
                        label={'Devolución al proveedor'}
                        clickable
                        style={{ background: colors.getColorPrymaryGrey200() }}
                    />
                }
                {
                    n.tipo_operacion === 'ajuste_stock_salida' &&
                    <Chip
                        avatar={
                            <Avatar style={{
                                padding: 1,
                                background: colors.getColorPrymaryDarkLime300()
                            }}>
                                <ArrowUpwardIcon style={{ fontSize: 20, color: colors.getColorWhite() }} />
                            </Avatar>
                        }
                        label={'Ajuste de stock - Salida'}
                        clickable
                        style={{ background: colors.getColorPrymaryGrey200() }}
                    />
                }
            </div>
        }

        if (item.id === 'fecha') {
            return <div style={{ width: 'max-content' }}>{n.fecha}</div>
        }

        if (item.id === 'hora') {
            return n.hora
        }

        if (item.id === 'cliente_proveedor') {
            return n.cliente_proveedor === 'Consumidor Final' ? n.cliente_proveedor : <>
                <ReturnTextTable
                    referencia="proveedores"
                    codigo={n.cliente_proveedor.codigo}
                    datoTraido="nombre"
                    estado={true}
                />
                <ReturnTextTable
                    referencia="proveedores"
                    codigo={n.cliente_proveedor}
                    datoTraido="nombre"
                    estado={true}
                />
                <ReturnTextTable
                    referencia="clientes"
                    codigo={n.cliente_proveedor.codigo}
                    datoTraido="nombre"
                    estado={true}
                />
            </>
        }

        if (item.id === 'productos') {
            return n.productos.map(item => {
                return <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Chip
                        avatar={
                            <Avatar style={{
                                width: 'max-content',
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 0,
                                paddingBottom: 0,
                                height: 25
                            }}>
                                {item.cantidad}
                            </Avatar>
                        }
                        label={
                            <ReturnTextTable
                                referencia="productos"
                                codigo={item.codigo}
                                datoTraido="descripcion_producto"
                                estado={true}
                            />
                        }
                        clickable
                        style={{ margin: 1, height: 25, background: colors.getColorPrymaryGrey200() }}
                    />
                </div>

            })

        }

        if (item.id === 'total_final') {
            return <Chip
                label={<div style={{ color: colors.getColorWhite() }}>{n.total_final}</div>}
                clickable
                style={{ background: colors.getColorPrymary() }}
            />
        }

        if (item.id === 'empleado') {
            return <ReturnTextTable
                referencia="usuarios"
                codigo={n.empleado}
                datoTraido="nombre"
                estado={true}
            />
        }

        if (item.id === 'vendedor') {
            return n.vendedor
        }

        if (item.id === 'observacion') {
            return n.observacion
        }

        if (item.id === 'subtotal') {
            return <Chip
                label={<div>{n.subtotal}</div>}
                clickable
                style={{ background: colors.getColorPrymaryGrey200() }}
            />
        }

        if (item.id === 'descuento') {
            return n.descuento
        }

        if (item.id === 'otros_gastos') {
            return n.otros_gastos
        }

        if (item.id === 'flete') {
            return n.flete
        }

        if (item.id === 'valor_pagado') {
            return n.valor_pagado
        }

        if (item.id === 'medio_pago') {
            return <div style={{ width: 'max-content' }}>
                {
                    n.medio_pago === 'cheque' &&
                    <Chip
                        avatar={
                            <Avatar style={{
                                padding: 1,
                                background: colors.getColorPrymaryDarkRed300()
                            }}>
                                <SubtitlesIcon style={{ fontSize: 20, color: colors.getColorWhite() }} />
                            </Avatar>
                        }
                        label={'Con cheque'}
                        clickable
                        style={{ background: colors.getColorPrymaryGrey200() }}
                    />
                }
                {
                    n.medio_pago === 'transferencia' &&
                    <Chip
                        avatar={
                            <Avatar style={{
                                padding: 1,
                                background: colors.getColorPrymaryDarkDeepPurple300()
                            }}>
                                <SwapHorizIcon style={{ fontSize: 20, color: colors.getColorWhite() }} />
                            </Avatar>
                        }
                        label={'Por transferencia bancaria'}
                        clickable
                        style={{ background: colors.getColorPrymaryGrey200() }}
                    />
                }
                {
                    n.medio_pago === 'efectivo' &&
                    <Chip
                        avatar={
                            <Avatar style={{
                                padding: 1,
                                background: colors.getColorPrymaryDark()
                            }}>
                                <AttachMoneyIcon style={{ fontSize: 20, color: colors.getColorWhite() }} />
                            </Avatar>
                        }
                        label={'En efectivo'}
                        clickable
                        style={{ background: colors.getColorPrymaryGrey200() }}
                    />
                }
                {
                    n.medio_pago === 'credito' &&
                    <Chip
                        avatar={
                            <Avatar style={{
                                padding: 1,
                                background: colors.getColorPrymaryDarkAmber300()
                            }}>
                                <LocalAtmIcon style={{ fontSize: 20, color: colors.getColorWhite() }} />
                            </Avatar>
                        }
                        label={'A crédito'}
                        clickable
                        style={{ background: colors.getColorPrymaryGrey200() }}
                    />
                }
                {
                    n.medio_pago === 'tarjeta-credito' &&
                    <Chip
                        avatar={
                            <Avatar style={{
                                padding: 1,
                                background: colors.getColorPrymaryDarkGreen300()
                            }}>
                                <CreditCardIcon style={{ fontSize: 20, color: colors.getColorWhite() }} />
                            </Avatar>
                        }
                        label={'Con tarjeta de crédito'}
                        clickable
                        style={{ background: colors.getColorPrymaryGrey200() }}
                    />
                }
                {
                    n.medio_pago === 'tarjeta-debito' &&
                    <Chip
                        avatar={
                            <Avatar style={{
                                padding: 1,
                                background: colors.getColorPrymaryDarkBlue300()
                            }}>
                                <PaymentIcon style={{ fontSize: 20, color: colors.getColorWhite() }} />
                            </Avatar>
                        }
                        label={'Con tarjeta de débito'}
                        clickable
                        style={{ background: colors.getColorPrymaryGrey200() }}
                    />
                }
            </div>
        }

        if (item.id === 'saldo_favor') {
            return n.saldo_favor
        }

        if (item.id === 'en_deuda') {
            return n.en_deuda
        }

        if (item.id === 'vuelto') {
            return n.vuelto
        }

        if (item.id === 'acreditado') {
            return n.acreditado
        }
    }

    handleSearch = (codigo) => {
        this.setState({ listaStock: [], estadoTabla: 'cargando' })
        funtions.setTime(300, () => {
            let array = funtions.filterObjectsCodigo(this.state.listaStockTemporal, codigo)
            if (array.length > 0) {
                this.setState({ estadoTabla: 'llena' })
            } else {
                this.setState({ estadoTabla: 'sin_resultados' })
            }
            this.setState({
                listaStock: array
            })

        })
    }

    cambiarListaPorFecha = fecha => {
        this.setState({ fechaActual: fecha })
        setTimeout(() => { this.cargarData() }, 100)
    }

    render() {
        console.log(this.state.cajaSeleccionada)
        const { titlep, estadoPermisoDevolucionCliente, estadoPermisoDevolucionProveedor, estadoPermisoAjusteStock, estadoPermisoCompraProductos, title } = this.state
        return (
            <Layout title="Stock" onChangueUserState={usuario => {
                this.setState({ usuario: usuario })
                setTimeout(() => {
                    this.obtenerPermisosUsuarios()
                    this.cargarCaja()
                }, 100)
            }}>
                <MenuHerramientas>
                    {
                        this.state.cajaSeleccionada != null && Boolean(this.state.cajaSeleccionada.estado) === true &&
                        <>
                            <Tooltip title="Estado de caja">
                                <IconButton >
                                    <MonetizationOn style={{ color: '#00c853' }} />
                                </IconButton>
                            </Tooltip>
                        </>
                    }
                    {
                        this.state.cajaSeleccionada === null &&
                        <>
                            <Tooltip title="Estado de caja">
                                <IconButton >
                                    <MonetizationOn style={{ color: '#EF5350' }} />
                                </IconButton>
                            </Tooltip>
                        </>
                    }

                    <ItemMenuHerramienta
                        titleButton="Entrada"
                        color="primary"
                        visible={true}
                        onClick={event => this.setState({ referenciaMenuEntrada: event.currentTarget })}
                    >
                        <ArrowDownwardIcon />
                    </ItemMenuHerramienta>
                    <Menu
                        id="simple-menu-entrada"
                        anchorEl={this.state.referenciaMenuEntrada}
                        open={Boolean(this.state.referenciaMenuEntrada)}
                        onClose={() => this.setState({ referenciaMenuEntrada: null })}
                    >
                        <MenuItem
                            disabled={estadoPermisoDevolucionCliente}
                            onClick={() => {
                                if (this.state.cajaSeleccionada != null) {
                                    this.setState({
                                        tipoAjuste: 'devolucion_cliente',
                                        estadoModalSimpleCompraProductos: true
                                    })
                                } else {
                                    setSnackBars.openSnack('error', 'rootSnackBar', 'Abrir Caja', 1000)
                                }
                            }}>
                            Devolución del cliente
                        </MenuItem>
                        <MenuItem
                            disabled={estadoPermisoCompraProductos}
                            onClick={() => {
                                if (this.state.cajaSeleccionada != null) {
                                    this.setState({
                                        tipoAjuste: 'compra_producto',
                                        estadoModalSimpleCompraProductos: true
                                    })
                                } else {
                                    setSnackBars.openSnack('error', 'rootSnackBar', 'Abrir Caja', 1000)
                                }

                            }}>
                            Compra de productos
                        </MenuItem>
                        <MenuItem
                            disabled={estadoPermisoAjusteStock}
                            onClick={() => {
                                if (this.state.cajaSeleccionada != null) {
                                    this.setState({
                                        tipoAjuste: 'ajuste_stock_entrada',
                                        estadoModalSimpleCompraProductos: true
                                    })
                                } else {
                                    setSnackBars.openSnack('error', 'rootSnackBar', 'Abrir Caja', 1000)
                                }

                            }}>
                            Ajuste de Stock
                        </MenuItem>

                    </Menu>

                    <ItemMenuHerramienta
                        titleButton="Salida"
                        color="primary"
                        visible={true}
                        onClick={event => this.setState({ referenciaMenuSalida: event.currentTarget })}
                    >
                        <ArrowUpwardIcon />
                    </ItemMenuHerramienta>

                    <Menu
                        id="simple-menu-salida"
                        anchorEl={this.state.referenciaMenuSalida}
                        open={Boolean(this.state.referenciaMenuSalida)}
                        onClose={() => this.setState({ referenciaMenuSalida: null })}
                    >
                        <MenuItem
                            disabled={estadoPermisoDevolucionProveedor}
                            onClick={() => {
                                if (this.state.cajaSeleccionada != null) {
                                    this.setState({
                                        tipoAjuste: 'devolucion_proveedor',
                                        estadoModalSimpleCompraProductos: true
                                    })
                                } else {
                                    setSnackBars.openSnack('error', 'rootSnackBar', 'Abrir Caja', 1000)
                                }

                            }}>
                            Devolución al proveedor
                        </MenuItem>
                        <MenuItem
                            disabled={estadoPermisoAjusteStock}
                            onClick={() => {
                                if (this.state.cajaSeleccionada != null) {
                                    this.setState({
                                        tipoAjuste: 'ajuste_stock_salida',
                                        estadoModalSimpleCompraProductos: true
                                    })
                                } else {
                                    setSnackBars.openSnack('error', 'rootSnackBar', 'Abrir Caja', 1000)
                                }

                            }}>
                            Ajuste de Stock
                        </MenuItem>

                    </Menu>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            id="datetime-local"
                            type="date"
                            defaultValue={this.state.fechaActual}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => this.cambiarListaPorFecha(e.target.value)}
                        />
                    </div>
                    <div style={{ flex: 0.93 }}></div>

                    <Search
                        id='buscar-producto'
                        textoSearch="Buscar..."
                        textoTooltip="Buscar producto"
                        handleSearch={this.handleSearch}
                    />
                </MenuHerramientas>

                <Divider />

                <TablaNormal
                    textoTitleP="Stocks"
                    textoTitleS="Stock"
                    selectedItems={true}
                    toolbar={false}
                    notTab={true}
                    data={this.state.listaStock}
                    rows={this.state.rowslistaStock}
                    handleGetData={this.handleGetData}
                    estadoTabla={this.state.estadoTabla}
                    itemsSeleccionados={items => this.setState({ itemsSeleccionados: items })}
                />

                <FullScreenDialog openModal={this.state.estadoModalSimpleCompraProductos}>
                    <ModalCompraProductos
                        handleClose={() => this.setState({
                            estadoModalSimpleCompraProductos: false,
                            referenciaMenuSalida: null,
                            referenciaMenuEntrada: null
                        })}
                        usuario={this.state.usuario}
                        tipoAjuste={this.state.tipoAjuste}
                    />
                </FullScreenDialog>
            </Layout>
        );
    }
}

export default Stock;