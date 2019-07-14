import React, { Component } from 'react';
import ItemMenuHerramienta from '../menus/ItemMenuHerramienta'
import TablaNormal from '../tables/TableNormal'
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import InputIcon from '@material-ui/icons/Input';
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

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import funtions from '../../../utils/funtions';

//dialogs
import setSnackBars from '../../plugins/setSnackBars';
import ReturnTextTable from '../tables/ReturnTextTable';
import Search from '../Search';

import { CircularProgress, Chip, Avatar } from '@material-ui/core';

import ReactToPrint from "react-to-print";
import colors from '../../../utils/colors';
import ErrorEstado from '../../plugins/plugins/ErrorEstado';
import ToolbarContainer from '../../pages-content/components/tollbars/ToolbarContainer';

class VentasDevueltas_01 extends Component {

    state = {
        listaVentas: [],
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
        estadoTabla: 'llena',

        //modals
        openModalFullScreen: false,
        estadoModalSimple: false,
        estadoModalDeleteActivarDesactivar: 'eliminar',
        //item Selecionado
        itemsSeleccionados: [],
        //uid de usuario
        usuarioUID: ''
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
                var productosRef = db.ref('users/' + user.uid + '/lista_ventas/ventas_devueltas').orderByChild('caja').equalTo(this.state.cajaSeleccionada.codigo)
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

    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }

        if (item.id === 'accions') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                        <div style={{ color: '#42A5F5', display: 'flex', alignItems: 'center' }}>Pdf</div>
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
                        n.factura_emitida === 'devuelta' &&
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ color: colors.getColorPrymaryRed300(), display: 'flex', alignItems: 'center' }}>cancelada</div>
                        </div>
                    }
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


    getColorActivadoDesactivado = (estado, texto) =>
        estado === false ?
            <div style={{ color: 'rgba(0,0,0,0.5)' }}>
                {texto}
            </div>
            : texto


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


    render() {
        return (
            <div>
                 <ToolbarContainer title={'Ventas Devueltas'} open={this.props.open}>
                     
                 </ToolbarContainer>
                <TablaNormal
                    textoTitleP="Ventas Canceladas"
                    textoTitleS="Venta"
                    selectedItems={true}
                    toolbar={false}
                    notTab={true}
                    data={this.state.listaVentas}
                    rows={this.state.rowslistaVentas}
                    handleGetData={this.handleGetData}
                    estadoTabla={this.state.estadoTabla}
                    itemsSeleccionados={items => this.setState({ itemsSeleccionados: items })}
                />

            </div>
        );
    }
}

export default VentasDevueltas_01;