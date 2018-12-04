import React, { Component } from 'react';
import Layout from '../components/containers/Layout';
import MenuHerramientas from '../components/components/menus/MenuHerramientas';
import ItemMenuHerramienta from '../components/components/menus/ItemMenuHerramienta';
import Search from '../components/components/Search';
import Divider from '@material-ui/core/Divider';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import Tooltip from '@material-ui/core/Tooltip';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import TablaNormal from '../components/components/tables/TableNormal';
import ModalContainerNormal from '../components/modals_container/ModalContainerNormal';
import AbrirCaja from '../components/modals_container/caja/AbrirCaja';
import CerrarCaja from '../components/modals_container/caja/CerrarCaja';
import funtions from '../utils/funtions';
import { IconButton } from '@material-ui/core';
import ReturnTextTable from '../components/components/tables/ReturnTextTable';
import AgregarDineroCaja from '../components/modals_container/caja/AgregarDineroCaja';
import RetirarDineroCaja from '../components/modals_container/caja/RetirarDineroCaja';
import colors from '../utils/colors';
import ChipTabla from '../components/modals_container/caja/ChipTabla';
import VerTotales from '../components/modals_container/caja/VerTotales';

class Caja extends Component {

    state = {

        listaVentasCaja: [],
        estadoTabla: 'cargando',
        listaVentasCajaTemporal: [],
        rowsVentasCaja: [
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'estado', numeric: true, disablePadding: false, label: 'Estado' },
            { id: 'saldo_inicial', numeric: true, disablePadding: false, label: 'Saldo inicial' },
            { id: 'valor_caja', numeric: true, disablePadding: false, label: 'Valor actual de caja' },
            { id: 'saldo_final', numeric: true, disablePadding: false, label: 'Saldo final' },
            { id: 'operaciones', numeric: true, disablePadding: false, label: 'Ventas' },
            { id: 'dinero_ingresado', numeric: true, disablePadding: false, label: 'Dinero ingresado' },
            { id: 'dinero_retirado', numeric: true, disablePadding: false, label: 'Dinero retirado' },
            { id: 'ventas_devueltas', numeric: true, disablePadding: false, label: 'Ventas devueltas' },
            { id: 'compras_productos', numeric: true, disablePadding: false, label: 'Compra de productos' },
            { id: 'fecha_abrir', numeric: true, disablePadding: false, label: 'Caja abierta - Fecha' },
            { id: 'fecha_cerrar', numeric: true, disablePadding: false, label: 'Caja cerrada - Fecha' },
            { id: 'hora_abrir', numeric: true, disablePadding: false, label: 'Caja iniciada - Hora' },
            { id: 'hora_cerrrar', numeric: true, disablePadding: false, label: 'Caja cerrada - Hora' },
            { id: 'observacion', numeric: true, disablePadding: false, label: 'Observación' },
            { id: 'usuario', numeric: true, disablePadding: false, label: 'Usuario' },
        ],
        itemsSeleccionados: [],
        //usuario
        usuario: '',
        //modals
        openModalAbrirCaja: false,
        openModalCerrarCaja: false,
        //estado caja
        estadoCaja: null,
        cajaSeleccionada: null,
        //modals
        openModalDineroCajaRetirar: false,
        openModalDineroCajaAgregar: false,
        //sumaTotalVentas array
        sumaTotalVentas: [],
        estadoPermisos: null
    }

    componentDidMount() {

    }

    getCajasBaseDeDatos = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var cajaVentasRef = db.ref('users/' + user.uid + '/caja/cajas_normales').orderByChild('usuario').equalTo(this.state.usuario.code)
                cajaVentasRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaVentasCaja: [],
                            listaVentasCajaTemporal: [],
                            estadoTabla: 'cargando',
                            sumaTotalVentas: [],
                            sumaTotalDineroIngresado: [],
                            sumaTotalDineroRetirado: [],
                            sumaTotalVentasDevueltas: [],
                            sumaTotalComprasProductos: [],
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        var filterList = lista.sort((a, b) => {
                            a = new Date(a.order);
                            b = new Date(b.order);
                            return a > b ? -1 : a < b ? 1 : 0;
                        })
                        filterList.forEach(item => {
                            this.sumaVentas(item.ventas, item.codigo)
                            this.sumaDineroIngresado(item.ingreso_dinero, item.codigo)
                            this.sumaDineroRetirado(item.retiro_dinero, item.codigo)
                            this.sumaVentasDevueltas(item.ventas_devueltas, item.codigo)
                            this.sumaComprasProductos(item.compras_productos, item.codigo)
                        })

                        this.setState({
                            listaVentasCaja: filterList,
                            listaVentasCajaTemporal: filterList,
                            estadoTabla: 'llena'
                        })
                        setTimeout(() => { this.obtenerEstadoCaja() }, 200)
                    } else {
                        this.setState({
                            listaVentasCaja: [],
                            listaVentasCajaTemporal: [],
                            estadoTabla: 'vacio',
                            estadoCaja: false
                        })
                    }
                });
            }
        });
    }

    obtenerEstadoCaja = () => {
        const { listaVentasCaja } = this.state
        var item = listaVentasCaja[0]
        if (item === null) {
            this.setState({
                estadoCaja: false,
                cajaSeleccionada: false
            })
        } else {
            if (Boolean(item.estado)) {
                this.setState({
                    estadoCaja: Boolean(item.estado),
                    cajaSeleccionada: item
                })
            } else {
                this.setState({
                    estadoCaja: Boolean(item.estado),
                    cajaSeleccionada: item
                })
            }
        }
    }


    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }
        if (item.id === 'estado') {
            return n.estado ?
                <Chip
                    label={<div style={{ color: colors.getColorWhite() }}>Abierto</div>}
                    clickable
                    style={{
                        background: colors.getColorPrymaryLightCajaActivada()
                    }}

                />
                :
                <div >Cerrada</div>
        }

        if (item.id === 'saldo_inicial') {
            return <Chip
                label={Number(n.saldo_inicial).toFixed(2)}
                clickable
                color="inherit"

            />
        }
        if (item.id === 'saldo_final') {
            return <Chip
                label={Number(n.saldo_final).toFixed(2)}
                clickable
                color="inherit"
            />
        }
        if (item.id === 'fecha_abrir') {
            return <div style={{ width: 'max-content' }}>{n.fecha_abrir}</div>
        }
        if (item.id === 'fecha_cerrar') {
            return <div style={{ width: 'max-content' }}>{n.fecha_cerrar}</div>
        }
        if (item.id === 'hora_abrir') {
            return n.hora_abrir
        }
        if (item.id === 'hora_cerrrar') {
            return n.hora_cerrrar
        }
        if (item.id === 'operaciones') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                {n.ventas != null ?
                    <div>
                        {
                            Boolean(n.estado) ?
                                <ChipTabla
                                    codigo={n.codigo}
                                    cantidad={Object.values(n.ventas).length}
                                    total={this.state.sumaTotalVentas.filter(item => item.codigo === n.codigo)[0].sumaEfectivo}
                                    label={'Ventas'}
                                    background={colors.getColorPrymaryLightCajaActivada()}
                                    backgroundDark={colors.getColorPrymaryDarkCajaActivada()}
                                />
                                :
                                <ChipTabla
                                    codigo={n.codigo}
                                    cantidad={Object.values(n.ventas).length}
                                    total={this.state.sumaTotalVentas.filter(item => item.codigo === n.codigo)[0].sumaEfectivo}
                                    label={'Dinero ingresado'}
                                    background={colors.getColorPrymary()}
                                    backgroundDark={colors.getColorPrymaryDark()}
                                />
                        }
                    </div>
                    :
                    <div>
                        <Chip
                            avatar={<Avatar style={{ width: 'max-content', paddingLeft: 15, paddingRight: 15, paddingTop: 3, paddingBottom: 3 }}>
                                0
                        </Avatar>}
                            label="Ventas"
                            clickable
                            color="inherit"
                            deleteIcon={<AttachMoneyIcon />}
                        />

                    </div>
                }
            </div>
        }
        if (item.id === 'dinero_ingresado') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                {n.ingreso_dinero != null ?
                    <div>
                        {
                            Boolean(n.estado) ?
                                <ChipTabla
                                    codigo={n.codigo}
                                    cantidad={Object.values(n.ingreso_dinero).length}
                                    total={this.state.sumaTotalDineroIngresado.filter(item => item.codigo === n.codigo)[0].suma}
                                    label={'Dinero ingresado'}
                                    background={colors.getColorPrymaryLightCajaActivada()}
                                    backgroundDark={colors.getColorPrymaryDarkCajaActivada()}
                                />
                                :
                                <ChipTabla
                                    codigo={n.codigo}
                                    cantidad={Object.values(n.ingreso_dinero).length}
                                    total={this.state.sumaTotalDineroIngresado.filter(item => item.codigo === n.codigo)[0].suma}
                                    label={'Dinero ingresado'}
                                    background={colors.getColorPrymary()}
                                    backgroundDark={colors.getColorPrymaryDark()}
                                />
                        }


                    </div>
                    :
                    <div>
                        <Chip
                            avatar={<Avatar style={{ width: 'max-content', paddingLeft: 15, paddingRight: 15, paddingTop: 3, paddingBottom: 3 }}>
                                0
                            </Avatar>}
                            label="Dinero ingresado"
                            clickable
                            color="inherit"
                            deleteIcon={<AttachMoneyIcon />}
                        />

                    </div>
                }
            </div>
        }
        if (item.id === 'dinero_retirado') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                {n.retiro_dinero != null ?
                    <div>
                        {
                            Boolean(n.estado) ?
                                <ChipTabla
                                    codigo={n.codigo}
                                    cantidad={Object.values(n.retiro_dinero).length}
                                    total={this.state.sumaTotalDineroRetirado.filter(item => item.codigo === n.codigo)[0].suma}
                                    label={'Dinero retirado'}
                                    background={colors.getColorPrymaryLightCajaActivada()}
                                    backgroundDark={colors.getColorPrymaryDarkCajaActivada()}
                                />
                                :
                                <ChipTabla
                                    codigo={n.codigo}
                                    cantidad={Object.values(n.retiro_dinero).length}
                                    total={this.state.sumaTotalDineroRetirado.filter(item => item.codigo === n.codigo)[0].suma}
                                    label={'Dinero retirado'}
                                    background={colors.getColorPrymary()}
                                    backgroundDark={colors.getColorPrymaryDark()}
                                />

                        }

                    </div>
                    :
                    <div>
                        <Chip
                            avatar={<Avatar style={{ width: 'max-content', paddingLeft: 15, paddingRight: 15, paddingTop: 3, paddingBottom: 3 }}>
                                0
                        </Avatar>}
                            label="Dinero retirado"
                            clickable
                            color="inherit"
                            deleteIcon={<AttachMoneyIcon />}
                        />

                    </div>
                }
            </div>
        }
        if (item.id === 'ventas_devueltas') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                {n.ventas_devueltas != null ?
                    <div>
                        {
                            Boolean(n.estado) ?
                                <ChipTabla
                                    codigo={n.codigo}
                                    cantidad={Object.values(n.ventas_devueltas).length}
                                    total={this.state.sumaTotalVentasDevueltas.filter(item => item.codigo === n.codigo)[0].sumaTotal}
                                    label={'Ventas devueltas'}
                                    background={colors.getColorPrymaryLightCajaActivada()}
                                    backgroundDark={colors.getColorPrymaryDarkCajaActivada()}
                                />
                                :
                                <ChipTabla
                                    codigo={n.codigo}
                                    cantidad={Object.values(n.ventas_devueltas).length}
                                    total={this.state.sumaTotalVentasDevueltas.filter(item => item.codigo === n.codigo)[0].sumaTotal}
                                    label={'Ventas devueltas'}
                                    background={colors.getColorPrymary()}
                                    backgroundDark={colors.getColorPrymaryDark()}
                                />

                        }

                    </div>
                    :
                    <div>
                        <Chip
                            avatar={<Avatar style={{ width: 'max-content', paddingLeft: 15, paddingRight: 15, paddingTop: 3, paddingBottom: 3 }}>
                                0
                        </Avatar>}
                            label="Ventas devueltas"
                            clickable
                            color="inherit"
                            deleteIcon={<AttachMoneyIcon />}
                        />

                    </div>
                }
            </div>
        }
        if (item.id === 'compras_productos') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                {n.compras_productos != null ?
                    <div>
                        {
                            Boolean(n.estado) ?
                                <ChipTabla
                                    codigo={n.codigo}
                                    cantidad={Object.values(n.compras_productos).length}
                                    total={this.state.sumaTotalComprasProductos.filter(item => item.codigo === n.codigo)[0].suma}
                                    label={'Compra de productos'}
                                    background={colors.getColorPrymaryLightCajaActivada()}
                                    backgroundDark={colors.getColorPrymaryDarkCajaActivada()}
                                />
                                :
                                <ChipTabla
                                    codigo={n.codigo}
                                    cantidad={Object.values(n.compras_productos).length}
                                    total={this.state.sumaTotalComprasProductos.filter(item => item.codigo === n.codigo)[0].suma}
                                    label={'Compra de productos'}
                                    background={colors.getColorPrymary()}
                                    backgroundDark={colors.getColorPrymaryDark()}
                                />

                        }

                    </div>
                    :
                    <div>
                        <Chip
                            avatar={<Avatar style={{ width: 'max-content', paddingLeft: 15, paddingRight: 15, paddingTop: 3, paddingBottom: 3 }}>
                                0
                        </Avatar>}
                            label="Compra de productos"
                            clickable
                            color="inherit"
                            deleteIcon={<AttachMoneyIcon />}
                        />

                    </div>
                }
            </div>
        }
        if (item.id === 'valor_caja') {
            return Boolean(n.estado) ?
                <Chip
                    label={<div style={{
                        color: colors.getColorWhite()
                    }}>{Number(n.valor_caja).toFixed(2)}</div>}
                    clickable
                    style={{
                        background: colors.getColorPrymaryLightCajaActivada()
                    }}
                />
                :
                <Chip
                    label={Number(n.valor_caja).toFixed(2)}
                    clickable
                    color='primary'
                />
        }
        if (item.id === 'observacion') {
            return n.observacion
        }
        if (item.id === 'usuario') {
            return <ReturnTextTable
                referencia="usuarios"
                codigo={n.usuario}
                datoTraido="nombre"
                estado={true}
            />
        }

    }

    sumaVentas = (ventas, codigo) => {
        var sumaEfectivo = 0
        var sumaCredito = 0
        var sumaTarjetaCredito = 0
        var sumaTarjetaBebito = 0
        var sumaCheque = 0
        var newArray = this.state.sumaTotalVentas
        if (ventas != null) {
            var array = Object.values(ventas)
            array.forEach(element => {
                if (element.tipo_pago === 'efectivo') {
                    sumaEfectivo = Number(element.total) + Number(sumaEfectivo)
                }
                if (element.tipo_pago === 'credito') {
                    sumaCredito = Number(element.total) + Number(sumaCredito)
                }
                if (element.tipo_pago === 'tarjeta-credito') {
                    sumaTarjetaCredito = Number(element.total) + Number(sumaTarjetaCredito)
                }
                if (element.tipo_pago === 'tarjeta-debito') {
                    sumaTarjetaBebito = Number(element.total) + Number(sumaTarjetaCredito)
                }
                if (element.tipo_pago === 'cheque') {
                    sumaCheque = Number(element.total) + Number(sumaTarjetaCredito)
                }
            });
            newArray.push({
                sumaEfectivo: Number(sumaEfectivo).toFixed(2),
                sumaCredito: Number(sumaCredito).toFixed(2),
                sumaTarjetaCredito: Number(sumaTarjetaCredito).toFixed(2),
                sumaTarjetaBebito: Number(sumaTarjetaBebito).toFixed(2),
                sumaCheque: Number(sumaCheque).toFixed(2),
                codigo,
            })
            this.setState({
                sumaTotalVentas: newArray
            })
        }
    }
    sumaVentasDevueltas = (ventas, codigo) => {
        var sumaEfectivo = 0
        var sumaCredito = 0
        var sumaTarjetaCredito = 0
        var sumaTarjetaBebito = 0
        var sumaCheque = 0
        var newArray = this.state.sumaTotalVentasDevueltas
        if (ventas != null) {
            var array = Object.values(ventas)
            array.forEach(element => {
                if (element.tipo_pago === 'efectivo') {
                    sumaEfectivo = Number(element.total) + Number(sumaEfectivo)
                }
                if (element.tipo_pago === 'credito') {
                    sumaCredito = Number(element.total) + Number(sumaCredito)
                }
                if (element.tipo_pago === 'tarjeta-credito') {
                    sumaTarjetaCredito = Number(element.total) + Number(sumaTarjetaCredito)
                }
                if (element.tipo_pago === 'tarjeta-debito') {
                    sumaTarjetaBebito = Number(element.total) + Number(sumaTarjetaCredito)
                }
                if (element.tipo_pago === 'cheque') {
                    sumaCheque = Number(element.total) + Number(sumaTarjetaCredito)
                }
            });
            newArray.push({
                sumaEfectivo: Number(sumaEfectivo).toFixed(2),
                sumaCredito: Number(sumaCredito).toFixed(2),
                sumaTarjetaCredito: Number(sumaTarjetaCredito).toFixed(2),
                sumaTarjetaBebito: Number(sumaTarjetaBebito).toFixed(2),
                sumaCheque: Number(sumaCheque).toFixed(2),
                sumaTotal: (sumaEfectivo + sumaCredito + sumaTarjetaBebito + sumaTarjetaCredito + sumaCheque).toFixed(2),
                codigo,
            })
            this.setState({
                sumaTotalVentasDevueltas: newArray
            })
        }
    }
    sumaDineroIngresado = (ingreso_dinero, codigo) => {
        var suma = 0
        var newArray = this.state.sumaTotalDineroIngresado
        if (ingreso_dinero != null) {
            var array = Object.values(ingreso_dinero)
            array.forEach(element => {
                suma = Number(Number(element.valor) + Number(suma)).toFixed(2)
            });
            newArray.push({
                suma,
                codigo
            })
            this.setState({
                sumaTotalDineroIngresado: newArray
            })
        }
    }
    sumaDineroRetirado = (dinero_retirado, codigo) => {
        var suma = 0
        var newArray = this.state.sumaTotalDineroRetirado
        if (dinero_retirado != null) {
            var array = Object.values(dinero_retirado)
            array.forEach(element => {
                suma = Number(Number(element.valor) + Number(suma)).toFixed(2)
            });
            newArray.push({
                suma,
                codigo
            })
            this.setState({
                sumaTotalDineroRetirado: newArray
            })
        }
    }
    sumaComprasProductos = (compras_productos, codigo) => {
        var suma = 0
        var newArray = this.state.sumaTotalComprasProductos
        if (compras_productos != null) {
            var array = Object.values(compras_productos)
            array.forEach(element => {
                suma = Number(Number(element.total_final) + Number(suma)).toFixed(2)
            });
            newArray.push({
                suma,
                codigo
            })
            this.setState({
                sumaTotalComprasProductos: newArray
            })
        }
    }
    obtenerSumaTotalCajaAbierta = () => {
        var item = null
        if (this.state.cajaSeleccionada != null) {
            if (this.state.sumaTotalVentas != null) {
                item = this.state.sumaTotalVentas.filter(item => item.codigo === this.state.cajaSeleccionada.codigo)[0]
            }
        }
        if (item != null) {         
            if (item.sumaEfectivo != null) {
                return item.sumaEfectivo
            } else {
                return '0.00'
            }
        } else {
            return '0.00'
        }
    }

    obtenerPermisosusuarios = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var usuariosRef = db.ref(`users/${user.uid}/usuarios/${this.state.usuario.code}`)
                usuariosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        if (snapshot.val().privilegios.caja === true) {
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
    render() {       
        return (
            <Layout title="Caja" onChangueUserState={usuario => {
                this.setState({ usuario: usuario })
                setTimeout(() => {
                    this.getCajasBaseDeDatos()
                    this.obtenerPermisosusuarios()
                }, 100)
            }}>

                {
                    this.state.estadoPermisos === true &&
                    <div>


                        {
                            this.state.estadoCaja === null &&
                            <div style={{ margin: 15 }}>
                                <CircularProgress size={30} />
                            </div>
                        }
                        {
                            this.state.estadoCaja != null &&
                            <MenuHerramientas>
                                {
                                    Boolean(this.state.estadoCaja) === true &&
                                    <>
                                        <Tooltip title="Estado de caja">
                                            <IconButton >
                                                <MonetizationOn style={{ color: '#00c853' }} />
                                            </IconButton>
                                        </Tooltip>
                                        <ItemMenuHerramienta
                                            titleButton="Cerrar Caja"
                                            color="primary"
                                            visible={true}
                                            onClick={() => this.setState({ openModalCerrarCaja: true })}
                                        />
                                    </>
                                }
                                {
                                    Boolean(this.state.estadoCaja) === false &&
                                    <>
                                        <Tooltip title="Estado de caja">
                                            <IconButton onClick={() => {
                                                this.setState({
                                                    codigoEmitirFactura: n.codigo,
                                                    estadoModalCancelarVenta: true,
                                                })
                                            }}>
                                                <MonetizationOn style={{ color: '#EF5350' }} />
                                            </IconButton>
                                        </Tooltip>
                                        <ItemMenuHerramienta
                                            titleButton="Abrir Caja"
                                            color="primary"
                                            visible={true}
                                            onClick={() => this.setState({ openModalAbrirCaja: true })}
                                        />
                                    </>
                                }


                                <ItemMenuHerramienta
                                    titleButton="Ver total"
                                    color="primary"
                                    visible={true}
                                    disabled={!this.state.estadoCaja}
                                    onClick={() => {
                                        if (this.state.estadoCaja) {
                                            this.setState({ estadoModalSimple: true })
                                        }
                                    }}
                                />
                                <ItemMenuHerramienta
                                    titleButton="Agregar dinero"
                                    color="primary"
                                    visible={true}
                                    disabled={!this.state.estadoCaja}
                                    onClick={() => {
                                        if (this.state.estadoCaja) {
                                            this.setState({ openModalDineroCajaAgregar: true })
                                        }
                                    }}
                                />
                                <ItemMenuHerramienta
                                    titleButton="Retirar dinero"
                                    color="primary"
                                    visible={true}
                                    disabled={!this.state.estadoCaja}
                                    onClick={() => {
                                        if (this.state.estadoCaja) {
                                            this.setState({ openModalDineroCajaRetirar: true })
                                        }
                                    }}
                                />

                                <div style={{ flex: 0.9 }}></div>

                                <Search
                                    id='buscar-cliente-clientes'
                                    textoSearch="Buscar..."
                                    textoTooltip="Buscar Cliente"
                                    handleSearch={this.handleSearch}
                                />
                            </MenuHerramientas>

                        }


                        <Divider />

                        <TablaNormal
                            textoTitleP="Cajas"
                            textoTitleS="Caja"
                            selectedItems={true}
                            toolbar={false}
                            notTab={true}
                            data={this.state.listaVentasCaja}
                            rows={this.state.rowsVentasCaja}
                            handleGetData={this.handleGetData}
                            estadoTabla={this.state.estadoTabla}
                            itemsSeleccionados={items => this.setState({ itemsSeleccionados: items })}
                        />

                        <ModalContainerNormal
                            open={this.state.openModalAbrirCaja}
                            handleClose={() => this.setState({ openModalAbrirCaja: false })}
                        >
                            <AbrirCaja usuario={this.state.usuario} handleClose={() => this.setState({ openModalAbrirCaja: false })} />
                        </ModalContainerNormal>

                        <ModalContainerNormal
                            open={this.state.openModalCerrarCaja}
                            handleClose={() => this.setState({ openModalCerrarCaja: false })}
                        >
                            <CerrarCaja
                                usuario={this.state.usuario}
                                handleClose={() =>
                                    this.setState({ openModalCerrarCaja: false })}
                                cajaSeleccionada={this.state.cajaSeleccionada}
                                sumaTotalVentas={this.obtenerSumaTotalCajaAbierta}
                            />
                        </ModalContainerNormal>
                        <ModalContainerNormal
                            open={this.state.openModalDineroCajaAgregar}
                            handleClose={() => this.setState({ openModalDineroCajaAgregar: false })}
                        >
                            <AgregarDineroCaja
                                usuario={this.state.usuario}
                                handleClose={() =>
                                    this.setState({ openModalDineroCajaAgregar: false })}
                                caja={this.state.cajaSeleccionada}
                            />
                        </ModalContainerNormal>
                        <ModalContainerNormal
                            open={this.state.openModalDineroCajaRetirar}
                            handleClose={() => this.setState({ openModalDineroCajaRetirar: false })}
                        >
                            <RetirarDineroCaja
                                usuario={this.state.usuario}
                                handleClose={() =>
                                    this.setState({ openModalDineroCajaRetirar: false })}
                                caja={this.state.cajaSeleccionada}
                            />
                        </ModalContainerNormal>

                        <ModalContainerNormal
                            open={this.state.estadoModalSimple}>
                            <VerTotales
                                sumaTotalVentas={this.state.sumaTotalVentas}
                                sumaTotalDineroIngresado={this.state.sumaTotalDineroIngresado}
                                sumaTotalDineroRetirado={this.state.sumaTotalDineroRetirado}
                                sumaTotalVentasDevueltas={this.state.sumaTotalVentasDevueltas}
                                sumaTotalComprasProductos={this.state.sumaTotalComprasProductos}
                                cajaSelecionada={this.state.cajaSeleccionada} handleClose={() => this.setState({ estadoModalSimple: false })}>
                            </VerTotales>
                        </ModalContainerNormal>
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
            </Layout>
        );
    }
}

export default Caja;