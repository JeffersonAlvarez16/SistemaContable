import React, { Component } from 'react';
import Layout from '../../containers/Layout';
import Grid from '@material-ui/core/Grid';
import SectionFactura from '../SectionFactura';
import SectionContentFactura from '../SectionContentFactura';
import MenuHerramientas from '../menus/MenuHerramientas';
import Search from '../Search';
import TablaNormal from '../tables/TableNormal';
import Divider from '@material-ui/core/Divider';
import ItemMenuHerramienta from '../menus/ItemMenuHerramienta';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import MonetizationOn from '@material-ui/icons/MonetizationOn';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import InputIcon from '@material-ui/icons/Input';
import FileCopy from '@material-ui/icons/FileCopy';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import CloseIcon from '@material-ui/icons/Close';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PaymentIcon from '@material-ui/icons/Payment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneIcon from '@material-ui/icons/Done';

import TextField from '@material-ui/core/TextField';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import ReturnTextTable from '../tables/ReturnTextTable';
import FullScreenDialog from '../FullScreenDialog';
import NuevaVenta from '../../plugins/nueva_venta';
import funtions from '../../../utils/funtions';
import ModalCompraProductos from '../../modals_container/ModalCompraProductos';
import setSnackBars from '../../plugins/setSnackBars';
import ModalContainerNormal from '../../modals_container/ModalContainerNormal';
import EmitirFacturaModal from '../../plugins/EmitirFacturaModal';
import ModalCancelarVenta from '../../modals_container/ventas/ModalCancelarVenta';
import ModalEditarVenta from '../../modals_container/ventas/ModalEditarVenta';
import { CircularProgress, Chip, Avatar } from '@material-ui/core';

import ReactToPrint from "react-to-print";
import ResivoVenta from '../../plugins/plantillas/resivo_venta';
import ContainerPlantillas from '../../plugins/plantillas/container_plantillas';
import ModalNewVenta from '../../plugins/ModalNewVenta';
import colors from '../../../utils/colors';
import ErrorEstado from '../../plugins/plugins/ErrorEstado';

import ViewPDF from '../../plugins/plugins/ViewPDF'


class Ventas_01 extends Component {

    state = {

        itemsSeleccionados: [],
        listaVentas: [],
        estadoTabla: 'cargando',
        listaVentasTemporal: [],

        rowslistaVentas: [
            { id: 'accions', numeric: false, disablePadding: true, label: '' },
            { id: 'factura_emitida', numeric: false, disablePadding: true, label: 'Estado' },
            { id: 'cliente', numeric: true, disablePadding: false, label: 'Cliente' },
            { id: 'productos', numeric: true, disablePadding: false, label: 'Productos' },
            { id: 'tipo_pago', numeric: true, disablePadding: false, label: 'Tipo de pago' },
            { id: 'subtotal', numeric: true, disablePadding: false, label: 'SubTotal' },
            { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Precio Iva' },
            { id: 'descuento', numeric: true, disablePadding: false, label: 'Descuento' },
            { id: 'dinero_resibido', numeric: true, disablePadding: false, label: 'Dinero recibido' },
            { id: 'cambio', numeric: true, disablePadding: false, label: 'Cambio/Vuelto' },
            { id: 'acreditado', numeric: true, disablePadding: false, label: 'Dinero acreditado' },
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'observacion', numeric: true, disablePadding: false, label: 'Observación' },
            { id: 'empleado', numeric: true, disablePadding: false, label: 'Empleado' },
            { id: 'fecha_venta', numeric: true, disablePadding: false, label: 'Fecha de venta' },
            { id: 'hora_venta', numeric: true, disablePadding: false, label: 'Hora de venta' },
        ],
        //usuario
        usuario: null,
        // modals
        openModalNewVenta: false,
        estadoModalSimpleCompraProductos: false,
        estadoModalEmitirFactura: false,
        estadoModalCancelarVenta: false,
        estadoModalEditarVenta: false,
        openModalNewVentaFinal: false,

        //item para editar
        itemEditar: null,
        //fecha actual

        //permisosUsuarios

        estadoPermisos: null,
        estadoacciones: '',
        permisoUsuario: null,
        fechaActual: '',
        //estado decaja,
        estadoCaja: false,
    }


    componentDidMount() {
        this.setState({
            fechaActual: funtions.obtenerFechaActual()
        })
        //setTimeout(() => { this.obtenerDataBaseDatos() }, 100)
        this.obteberCajaSeleccionada()
        this.obtenerPermisosusuarios()
        this.comprobarUsuario()

    }

    obtenerDataBaseDatos = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/ventas').orderByChild('caja').equalTo(this.state.cajaSeleccionada.codigo)
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaVentas: [],
                            listaVentasTemporal: [],
                            estadoTabla: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        var filterList = lista.sort((a, b) => {
                            a = new Date(a.order);
                            b = new Date(b.order);
                            return a > b ? -1 : a < b ? 1 : 0;
                        })
                        this.setState({
                            listaVentas: filterList,
                            listaVentasTemporal: filterList,
                            estadoTabla: 'llena'
                        })
                    } else {
                        this.setState({
                            listaVentas: [],
                            listaVentasTemporal: [],
                            estadoTabla: 'vacio'
                        })
                    }
                });
            }
        });
    }

    obteberCajaSeleccionada = () => {
        var db = firebase.database();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var operacionVentaRefCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_abiertas_usuario')
                operacionVentaRefCaja.on('value', (snap) => {
                    if (snap.val()) {
                        var caja = funtions.snapshotToArray(snap).filter(it => it.usuario === this.props.usuario.code)[0]
                        if (caja != null) {
                            this.setState({
                                cajaSeleccionada: caja,
                                estadoCaja: caja.estado,
                            })
                            this.obtenerDataBaseDatos()
                        } else {
                            this.setState({
                                cajaSeleccionada: null,
                                estadoCaja: false,
                                estadoTabla: 'vacio'
                            })
                        }
                    } else {
                        this.setState({
                            cajaSeleccionada: null,
                            estadoCaja: false,
                            estadoTabla: 'vacio'
                        })
                    }
                })
            }
        })
    }

    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }

        if (item.id === 'accions') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                <ReactToPrint
                    ref={el => (this.refEventoImprimir = el)}
                    trigger={() => <></>}
                    content={() => this.refImprimirResivo}
                />
                <Tooltip title="Imprimir resivo">
                    <IconButton onClick={() => {
                        this.enviarToPlantillaData(n)
                    }}
                    >
                        <LocalPrintshopIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                {
                    n.urlpdf != 'genererando' &&
                    <Tooltip title="Descargar pdf">
                        <IconButton onClick={() => {
                            window.open(
                                n.urlpdf,
                                '_blank'
                            );
                        }}
                        >
                            <PictureAsPdfIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                }
                {
                    n.urlpdf === 'genererando' &&
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <IconButton disabled>
                            <CircularProgress size={20} thickness={5} style={{ color: colors.getColorPrymaryBlue300() }} />
                        </IconButton>
                        <div style={{ color: '#42A5F5', display: 'flex', alignItems: 'center' }}>Pdf...</div>
                    </div>
                }
            </div>
        }

        if (item.id === 'cliente') {
            return n.cliente === 'Consumidor Final' ? n.cliente : <>
                <ReturnTextTable
                    referencia="clientes"
                    codigo={n.cliente.codigo}
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
                        color="inherit"
                        style={{ margin: 1, height: 25, background: colors.getColorPrymaryGrey200() }}
                    />
                </div>
            })
        }

        if (item.id === 'subtotal') {
            return <div style={{ width: 'max-content' }}>{n.subtotal}</div>
        }

        if (item.id === 'tipo_pago') {
            return <div style={{ width: 'max-content' }}>
                {
                    n.tipo_pago === 'cheque' &&
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
                    n.tipo_pago === 'transferencia' &&
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
                    n.tipo_pago === 'efectivo' &&
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
                    n.tipo_pago === 'credito' &&
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
                    n.tipo_pago === 'tarjeta-credito' &&
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
                    n.tipo_pago === 'tarjeta-debito' &&
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

        if (item.id === 'factura_emitida') {
            return n.cliente === 'Consumidor Final' ?
                <div style={{ display: 'flex', flexDirection: 'row', width: 'max-content' }}>
                    <Tooltip title="Devolver Venta">
                        <IconButton
                            onClick={() => {
                                this.setState({
                                    estadoacciones: 'devolver_venta'
                                })
                                setTimeout(() => {
                                    this.comprobarUsuario(n)
                                }, 100)
                            }}>
                            <CloseIcon style={{ color: '#EF5350' }} fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <IconButton disabled>
                        <DoneIcon />
                    </IconButton>
                    <div style={{ display: 'flex', alignItems: 'center' }}>Consumidor Final</div>
                </div>
                :
                <div style={{ width: 'max-content', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {
                        n.factura_emitida === 'emitida' &&
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <IconButton disabled>
                                <DoneAllIcon style={{ color: '#00c853' }} fontSize="small" />
                            </IconButton>
                            <div style={{ color: '#00c853', display: 'flex', alignItems: 'center' }}>Emitida</div>
                        </div>
                    }
                    {
                        n.factura_emitida === 'no_emitida' &&
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Tooltip title="Devolver Venta">
                                <IconButton onClick={() => {
                                    this.setState({
                                        estadoacciones: 'devolver_venta'
                                    })
                                    setTimeout(() => {
                                        this.comprobarUsuario(n)
                                    }, 100)
                                }}>
                                    <CloseIcon style={{ color: '#EF5350' }} fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Emitir Factura">
                                <IconButton onClick={() => {
                                    this.setState({
                                        estadoacciones: 'emitir_factura'
                                    })
                                    setTimeout(() => {
                                        this.comprobarUsuario(n)
                                    }, 100)
                                    /*  this.setState({
                                         codigoEmitirFactura: n.codigo,
                                         estadoModalEmitirFactura: true,
                                     }) */
                                }}>
                                    <InputIcon color='primary' fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    }
                    {
                        n.factura_emitida === 'reenviar' &&
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Tooltip title="Emitir Factura">
                                <IconButton onClick={() => {
                                    this.setState({
                                        estadoacciones: 'emitir_factura'
                                    })
                                    setTimeout(() => {
                                        this.comprobarUsuario(n)
                                    }, 100)
                                }}>
                                    <InputIcon color='primary' fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    }
                    {
                        n.factura_emitida === 'pendiente' &&
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <IconButton disabled>
                                <CircularProgress size={20} thickness={5} style={{ color: '#42A5F5' }} />
                            </IconButton>
                            <div style={{ color: '#42A5F5', display: 'flex', alignItems: 'center' }}>Emitiendo...</div>
                        </div>
                    }
                    {
                        n.factura_emitida === 'error' &&
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <IconButton disabled>
                                <CloseIcon style={{ color: 'red' }} fontSize="small" />
                            </IconButton>
                            <div style={{ color: 'red', display: 'flex', alignItems: 'center' }}>Error de emisión</div>
                        </div>
                    }
                    <ErrorEstado>{n.error_factura_emitida}</ErrorEstado>
                </div >
        }

        if (item.id === 'total') {
            return <div style={{ width: 'max-content' }}>
                <Chip
                    label={<div style={{ color: colors.getColorWhite() }}>{n.total}</div>}
                    clickable
                    style={{ background: colors.getColorPrymary() }}
                />
            </div>
        }

        if (item.id === 'iva') {
            return <div style={{ width: 'max-content' }}>{n.iva}</div>
        }

        if (item.id === 'observacion') {
            return <div style={{ width: 'max-content' }}>{n.observacion}</div>
        }

        if (item.id === 'dinero_resibido') {
            return <div style={{ width: 'max-content' }}>{n.dinero_resibido}</div>
        }

        if (item.id === 'cambio') {
            return <div style={{ width: 'max-content' }}>{n.cambio}</div>
        }

        if (item.id === 'acreditado') {
            return <div style={{ width: 'max-content' }}>{n.valor_acreditado}</div>
        }

        if (item.id === 'fecha_venta') {
            return <div style={{ width: 'max-content' }}>{n.fecha_venta}</div>
        }

        if (item.id === 'hora_venta') {
            return <div style={{ width: 'max-content' }}>{n.hora_venta}</div>
        }

        if (item.id === 'descuento') {
            return <div style={{ width: 'max-content' }}>{n.descuento}</div>
        }

        if (item.id === 'empleado') {
            return <ReturnTextTable
                referencia="usuarios"
                codigo={n.empleado}
                datoTraido="nombre"
                estado={true}
            />
        }

    }

    recuperarJsonFactura = codigo => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/facturas_ventas/' + codigo);
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.postSet(user.uid, snapshot.val(), codigo)
                        var venteRef = db.ref('users/' + user.uid + '/ventas/' + codigo);
                        venteRef.update({
                            factura_emitida: 'pendiente'
                        })
                        //setSnackBars.openSnack('success', 'rootSnackBar', 'Factura emitida con exito', 2000)
                    }
                })
            }
        })
    }

    postSet = async (uidUser, jsonData, codigo) => {
        const rawResponse = await fetch('https://stormy-bayou-19844.herokuapp.com/generarfactura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'id': uidUser,
                'codigo': codigo,
            },
            body: JSON.stringify(jsonData)
        })

        /* const content = await rawResponse.json();
        console.log(content) */
    }

    // actualizar el stock de los productos
    updateDataProductos = codigoVenta => {
        var db = firebase.database();
        var ventaRef = db.ref('users/' + firebase.auth().currentUser.uid + '/ventas/' + codigoVenta);
        var operacionVentaRefCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_abiertas_usuario')

        ventaRef.on('value', (snapshot) => {
            if (snapshot.val()) {

                operacionVentaRefCaja.once('value', (snap) => {
                    if (snap.val()) {
                        var caja = funtions.snapshotToArray(snap).filter(it => it.usuario === this.props.usuario.code)[0]

                        var cajaRefValorActual = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo)

                        cajaRefValorActual.once('value', (snap) => {
                            if (snap.val()) {
                                if (Number(snap.val().valor_caja) < Number(snapshot.val().total)) {
                                    setSnackBars.openSnack('error', 'rootSnackBar', 'Dinero insuficiente en caja', 2000)
                                } else {
                                    snapshot.val().productos.forEach(element => {
                                        var productoRef = db.ref('users/' + firebase.auth().currentUser.uid + '/productos/' + element.codigo)
                                        productoRef.once('value', (snapshot) => {
                                            if (snapshot.val()) {
                                                productoRef.update({
                                                    stock_actual: Number(snapshot.val().stock_actual) + Number(element.cantidad)
                                                })
                                            }
                                        })
                                    })
                                    this.setOperacionStock(
                                        snapshot.val().productos,
                                        snapshot.val().cliente,
                                        snapshot.val().dinero_resibido,
                                        snapshot.val().total,
                                        snapshot.val().subtotal,
                                        snapshot.val().descuento,
                                        snapshot.val().cambio,
                                        snapshot.val().tipo_pago,
                                    )
                                    this.setVentaDevuelta(snapshot.val(), snapshot.val().tipo_pago)
                                    this.setVentaCaja(snapshot.val(), snapshot.val().tipo_pago)
                                    setTimeout(() => { this.deleteVenta(snapshot.val().codigo) }, 300)
                                }
                            }
                        })
                    }
                })
            }
        })
    }

    // venta caja devolver
    setVentaCaja(itemVenta, tipo_pago) {
        var db = firebase.database();
        var codigoVentaCaja = funtions.guidGenerator()
        var operacionVentaRefCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_abiertas_usuario')
        operacionVentaRefCaja.once('value', (snap) => {
            if (snap.val()) {
                var caja = funtions.snapshotToArray(snap).filter(it => it.usuario === this.props.usuario.code)[0]
                if (Boolean(caja.estado)) {
                    var operacionVentaCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo + '/ventas_devueltas/' + itemVenta.codigo)
                    var operacionVentaCajaEliminar = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo + '/ventas/' + itemVenta.codigo)
                    operacionVentaCajaEliminar.remove()

                    var cajaRefValorAcreditado = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo + '/lista_dinero_acreditado_venta_credito/' + itemVenta.codigo)
                    cajaRefValorAcreditado.remove()

                    operacionVentaCaja.set(itemVenta)
                    var cajaRefValorActual = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo)

                    cajaRefValorActual.once('value', (snap2) => {
                        if (snap2.val()) {
                            cajaRefValorActual.update({
                                valor_caja: Number(Number(snap2.val().valor_caja) - Number(itemVenta.total)).toFixed(2)
                            })

                        }
                    })
                }
            }
        })
    }
    // venta ventas devueltas
    setVentaDevuelta(itemVenta, tipo_pago) {
        var db = firebase.database();
        var codigoVentaCaja = funtions.guidGenerator()
        var operacionVentaRefCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_abiertas_usuario')
        operacionVentaRefCaja.once('value', (snap) => {
            if (snap.val()) {
                var caja = funtions.snapshotToArray(snap).filter(it => it.usuario === this.props.usuario.code)[0]
                if (Boolean(caja.estado)) {
                    var operacionVentaDevuelta = db.ref('users/' + firebase.auth().currentUser.uid + '/lista_ventas/ventas_devueltas/' + itemVenta.codigo)
                    itemVenta.caja = caja.codigo
                    itemVenta.factura_emitida = 'devuelta'
                    operacionVentaDevuelta.set(itemVenta)
                }
            }
        })
    }


    //opercacion stock
    setOperacionStock = (listaProductos, cliente, dinero_resibido, total, subtotal, descuento, cambio, tipo_pago) => {
        var codigoStock = funtions.guidGenerator()
        var arrayProductos = []
        listaProductos.forEach(item => {
            arrayProductos.push({
                codigo: item.codigo,
                cantidad: item.cantidad,
                precio_venta_a: item.precio_venta_a
            })
        })
        var order = new Date()
        var db = firebase.database();
        var operacionStockRef = db.ref('users/' + firebase.auth().currentUser.uid + '/operaciones_stock/' + codigoStock);
        operacionStockRef.set({
            codigo: codigoStock,
            tipo_operacion: 'devolucion_cliente',
            fecha: funtions.obtenerFechaActual(),
            hora: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            cliente_proveedor: cliente,
            productos: arrayProductos,
            total_final: `${Number(total).toFixed(2)}`,
            empleado: this.props.usuario.code,
            observacion: '',
            subtotal: `${Number(subtotal).toFixed(2)}`,
            descuento: `${Number(descuento).toFixed(2)}`,
            otros_gastos: '0.00',
            flete: '0.00',
            valor_pagado: dinero_resibido,
            medio_pago: tipo_pago,
            saldo_favor: '0.00',
            en_deuda: '0.00',
            vuelto: cambio,
            acreditado: '0.00',
            order: order + ""
        });
    }

    deleteVenta = codigo => {
        var db = firebase.database();
        var ventRef = db.ref('users/' + firebase.auth().currentUser.uid + '/ventas/' + codigo);
        var ventRef = db.ref('users/' + firebase.auth().currentUser.uid + '/ventas/' + codigo);
        ventRef.remove()
        setSnackBars.openSnack('success', 'rootSnackBar', 'Venta eliminada con exito', 2000)
    }

    enviarToPlantillaData = item => {
        const itemFormat = {
            numero_venta: item.codigo,
            tipo_venta: item.tipo_venta,
            productos: item.productos,
            subtotal: item.subtotal,
            iva: item.iva,
            total: item.total,
            descuento: item.descuento,
            fecha_venta: item.fecha_venta,
            hora_venta: item.hora_venta,
            tipo_pago: item.tipo_pago,
            valor_acreditado: item.valor_acreditado,
            fecha_a_pagar: item.fecha_a_pagar,
            numero_tarjeta: item.numero_tarjeta,
            nombre_banco: item.nombre_banco,
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                if (item.tipo_venta === 'factura') {
                    var clienteRef = db.ref('users/' + user.uid + '/clientes/' + item.cliente.codigo);
                    var empresaRef = db.ref('auth_admins/' + user.uid + "/nombre_comercial")
                    clienteRef.once('value', (snapshot) => {
                        if (snapshot.val()) {
                            itemFormat.nombreCliente = snapshot.val().nombre
                            itemFormat.emailCliente = snapshot.val().email
                            itemFormat.identificacionCliente = snapshot.val().numero_identificacion
                            itemFormat.direccionCliente = snapshot.val().direccion

                            empresaRef.once('value', (snap) => {
                                if (snap.val()) {
                                    itemFormat.nombreEmpresa = snap.val()
                                    this.setState({
                                        itemFormateadoImprimir: itemFormat
                                    })
                                    this.refEventoImprimir.handlePrint()
                                }
                            })
                        }
                    })
                } else {
                    var empresaRef = db.ref('auth_admins/' + user.uid + "/nombre_comercial")
                    empresaRef.once('value', (snap) => {
                        if (snap.val()) {
                            itemFormat.nombreEmpresa = snap.val()
                            this.setState({
                                itemFormateadoImprimir: itemFormat
                            })
                            this.refEventoImprimir.handlePrint()
                        }
                    })
                }
            }
        })

    }

    handleSearch = (codigo) => {
        this.setState({ listaVentas: [], estadoTabla: 'cargando' })
        funtions.setTime(300, () => {
            let array = funtions.filterObjectsCodigo(this.state.listaVentasTemporal, codigo)
            if (array.length > 0) {
                this.setState({ estadoTabla: 'llena' })
            } else {
                this.setState({ estadoTabla: 'sin_resultados' })
            }
            this.setState({
                listaVentas: array
            })

        })
    }

    obtenerPermisosusuarios = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var usuariosRef = db.ref(`users/${user.uid}/usuarios/${this.props.usuario.code}`)
                usuariosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        if (snapshot.val().privilegios.ventas === true) {
                            this.setState({
                                estadoPermisos: true
                            })
                        } else {
                            this.setState({
                                estadoPermisos: false
                            })
                        }
                    }
                });
            }
        });
    }

    comprobarUsuario = (item) => {
        if (this.props.usuario.tipo_usuario === 'administrador') {
            if (this.state.estadoacciones === 'devolver_venta') {
                this.setState({
                    codigoEmitirFactura: item.codigo,
                    estadoModalCancelarVenta: true,
                })
            } else if (this.state.estadoacciones === 'emitir_factura') {
                this.setState({
                    codigoEmitirFactura: item.codigo,
                    estadoModalEmitirFactura: true,
                })
            } else {
                this.setState({ itemSeleccionado: item })
                this.setState({ openModalNewCliente: true })
            }
        } else {
            if (this.state.estadoacciones === 'devolver_venta') {
                if (item.empleado === this.props.usuario.code) {
                    this.setState({
                        codigoEmitirFactura: item.codigo,
                        estadoModalCancelarVenta: true,
                    })
                } else {
                    setSnackBars.openSnack('warning', 'rootSnackBar', `Usted ${this.props.usuario.nombre} no registro esta Venta`, 2000)
                }
            } else if (this.state.estadoacciones === 'emitir_factura') {
                if (item.empleado === this.props.usuario.code) {
                    this.setState({
                        codigoEmitirFactura: item.codigo,
                        estadoModalEmitirFactura: true,
                    })
                } else {
                    setSnackBars.openSnack('warning', 'rootSnackBar', `Usted ${this.props.usuario.nombre} no registro esta Venta`, 2000)
                }
            }
        }
    }

    render() {
        return (
            <div >
                {/*  <ViewPDF
            /> */}
                {
                    this.state.estadoPermisos &&
                    <div>
                        <MenuHerramientas>
                            {
                                Boolean(this.state.estadoCaja) === true ?

                                    <>
                                        <Tooltip title="Estado de caja">
                                            <IconButton >
                                                <MonetizationOn style={{ color: '#00c853' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                    :
                                    <>
                                        <Tooltip title="Estado de caja">
                                            <IconButton >
                                                <MonetizationOn style={{ color: '#EF5350' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                            }

                            <ItemMenuHerramienta
                                titleButton="Nueva Venta"
                                color="primary"
                                visible={true}
                                onClick={() => {
                                    if (this.state.estadoCaja) {
                                        this.setState({ itemEditar: null })
                                        this.setState({ openModalNewVentaFinal: true })
                                    } else {
                                        setSnackBars.openSnack('error', 'rootSnackBar', 'Abrir caja!', 2000)
                                    }
                                }}
                            >
                                <AddIcon />
                            </ItemMenuHerramienta>

                            <div style={{ flex: 0.95 }}></div>

                            <Search
                                id='buscar-cliente-clientes'
                                textoSearch="Buscar..."
                                textoTooltip="Buscar venta"
                                handleSearch={this.handleSearch}
                            />
                        </MenuHerramientas>

                        <Divider />

                        <TablaNormal
                            textoTitleP="Ventas"
                            textoTitleS="Venta"
                            selectedItems={true}
                            toolbar={false}
                            notTab={false}
                            data={this.state.listaVentas}
                            rows={this.state.rowslistaVentas}
                            handleGetData={this.handleGetData}
                            estadoTabla={this.state.estadoTabla}
                            itemsSeleccionados={items => {
                                this.setState({ itemsSeleccionados: items })
                            }}
                        />

                        <FullScreenDialog openModal={this.state.openModalNewVentaFinal}>
                            <ModalNewVenta
                                usuario={this.props.usuario}
                                handleClose={() => this.setState({ openModalNewVentaFinal: false })}
                                item={this.state.itemEditar}
                                cajaSeleccionada={this.state.cajaSeleccionada}
                            >
                            </ModalNewVenta>
                        </FullScreenDialog>

                        <FullScreenDialog openModal={this.state.estadoModalSimpleCompraProductos}>
                            <ModalCompraProductos
                                handleClose={() => this.setState({
                                    estadoModalSimpleCompraProductos: false,
                                })}
                                usuario={this.props.usuario}
                                tipoAjuste='devolucion_cliente'
                            />
                        </FullScreenDialog>

                        <ModalContainerNormal
                            open={this.state.estadoModalEmitirFactura}
                            handleClose={() => this.setState({ estadoModalEmitirFactura: false })}
                        >
                            <EmitirFacturaModal
                                handleClose={() => this.setState({ estadoModalEmitirFactura: false })}
                                handleEmitir={() => {
                                    this.recuperarJsonFactura(this.state.codigoEmitirFactura)
                                    this.setState({ estadoModalEmitirFactura: false })
                                }}
                            />
                        </ModalContainerNormal>

                        <ModalContainerNormal
                            open={this.state.estadoModalCancelarVenta}
                            handleClose={() => this.setState({ estadoModalCancelarVenta: false })}
                        >
                            <ModalCancelarVenta
                                handleClose={() => this.setState({ estadoModalCancelarVenta: false })}
                                handleCancelarVenta={() => {
                                    // this.recuperarJsonFactura(this.state.codigoEmitirFactura)
                                    this.updateDataProductos(this.state.codigoEmitirFactura)
                                    this.setState({ estadoModalCancelarVenta: false })
                                }}
                            />
                        </ModalContainerNormal>

                        <ModalContainerNormal
                            open={this.state.estadoModalEditarVenta}
                            handleClose={() => this.setState({ estadoModalEditarVenta: false })}
                        >
                            <ModalEditarVenta
                                handleClose={() => this.setState({ estadoModalEditarVenta: false })}
                                handleEditarVenta={() => {
                                    // this.recuperarJsonFactura(this.state.codigoEmitirFactura)
                                    this.setState({ openModalNewVenta: true })
                                    this.setState({ estadoModalEditarVenta: false })
                                }}
                            />
                        </ModalContainerNormal>

                        <ContainerPlantillas>
                            <ResivoVenta
                                item={this.state.itemFormateadoImprimir}
                                ref={el => (this.refImprimirResivo = el)}
                            />
                        </ContainerPlantillas>

                    </div>
                }
                {
                    this.state.estadoPermisos === false &&
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '80vh' }}>
                        <h3><strong>Usted no tiene permisos para <br />
                            esta seccion comuniquese con el administrador</strong></h3>
                    </div>
                }
                {
                    this.state.estadoPermisos === null &&
                    <CircularProgress />
                }

            </div>
        );
    }
}

export default Ventas_01