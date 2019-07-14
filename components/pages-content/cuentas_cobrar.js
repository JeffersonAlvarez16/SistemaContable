import 'firebase/database';
import 'firebase/auth'

import { Avatar, Chip, CircularProgress, Divider } from '@material-ui/core';
import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import ChipTabla from '../../components/modals_container/caja/ChipTabla';
import Dolar from '../../components/plugins/plugins/Dolar';
import IconButton from '@material-ui/core/IconButton';
import ItemMenuHerramienta from '../../components/components/menus/ItemMenuHerramienta';
import Layout from '../../components/containers/Layout';
import ModalContainerNormal from '../../components/modals_container/ModalContainerNormal';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import PagarDeuda from '../../components/modals_container/cuentas_por_cobrar/PagarDeuda';
import ReactGA from 'react-ga';
import ReturnTextTable from '../../components/components/tables/ReturnTextTable';
import Search from '../../components/components/Search';
import TablaNormal from '../../components/components/tables/TableNormal';
import Tooltip from '@material-ui/core/Tooltip';
import colors from '../../utils/colors';
import firebase from 'firebase/app';
import funtions from '../../utils/funtions';
import setSnackBars from '../../components/plugins/setSnackBars';
import ToolbarContainer from './components/tollbars/ToolbarContainer';

//firebase 













class DeudasCobrar extends Component {

    state = {
        usuario: '',
        estadoPermisos: null,

        listaCuentasCobrar: [],
        estadoTabla: 'cargando',
        listaCuentasCobrarTemporal: [],
        rowsCuentasCobrar: [
            { id: 'acciones', numeric: false, disablePadding: true, label: 'Acciones' },
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'cliente', numeric: true, disablePadding: false, label: 'Cliente' },
            { id: 'estado_cuenta', numeric: true, disablePadding: false, label: 'Estado de cuenta' },
            { id: 'lista_deudas', numeric: true, disablePadding: false, label: 'Deudas' },
            { id: 'lista_acreditado', numeric: true, disablePadding: false, label: 'Acreditado' },
            { id: 'lista_pendiente', numeric: true, disablePadding: false, label: 'Pendiente' },
            { id: 'fecha_pago', numeric: true, disablePadding: false, label: 'Fecha de pago' },
            { id: 'fecha_registro', numeric: true, disablePadding: false, label: 'Fecha de registrado' },
            { id: 'hora_registro', numeric: true, disablePadding: false, label: 'Cliente' },
            { id: 'tipo_cuenta', numeric: true, disablePadding: false, label: 'Tipo de cuenta' },
            { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
            { id: 'usuario', numeric: true, disablePadding: false, label: 'Empleado' },
        ],
        itemsSeleccionados: [],
        openModalPagarDeuda: false,
    }

    getCuentasCobrarBaseDeDatos = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var cajaVentasRef = db.ref('users/' + user.uid + '/cuentas_por_cobrar/cuentas_por_cobrar_basicas').orderByChild('usuario').equalTo(this.state.usuario.code)
                cajaVentasRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaCuentasCobrar: [],
                            listaCuentasCobrarTemporal: [],
                            estadoTabla: 'cargando',
                            sumaTotalListaDeudas: [],
                            sumaTotalListaDeudasAcreditado: [],
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        var filterList = lista.sort((a, b) => {
                            a = new Date(a.order);
                            b = new Date(b.order);
                            return a > b ? -1 : a < b ? 1 : 0;
                        })

                        filterList.forEach(it => {
                            this.sumaTotalListaDeudas(it.lista_deudas, it.codigo)
                            this.sumaTotalListaDeudasAcreditado(it.lista_acreditados, it.codigo)
                        })

                        this.setState({
                            listaCuentasCobrar: filterList,
                            listaCuentasCobrarTemporal: filterList,
                            estadoTabla: 'llena'
                        })
                    } else {
                        this.setState({
                            listaCuentasCobrar: [],
                            listaCuentasCobrarTemporal: [],
                            estadoTabla: 'vacio',
                            estadoCaja: false
                        })
                    }
                });
            }
        });
    }

    sumaTotalListaDeudas = (deudas, codigo) => {
        var suma = 0
        var acreditado = 0
        var newArray = this.state.sumaTotalListaDeudas
        if (deudas != null) {
            var array = Object.values(deudas)
            console.log(array);
            array.forEach(element => {
                console.log(Number(element.valor))
                suma = Number(element.valor) + Number(suma),
                    acreditado = Number(element.valor_acreditado) + Number(acreditado)
            });
            newArray.push({
                suma: suma,
                codigo,
                acreditado: acreditado,
                deuda_pendiente: Number(suma - acreditado).toFixed(2)
            })
            this.setState({
                sumaTotalListaDeudas: newArray
            })
        }
    }
    sumaTotalListaDeudasAcreditado = (deudas, codigo) => {
        var acreditado = 0
        var newArray = this.state.sumaTotalListaDeudasAcreditado
        if (deudas != null) {
            var array = Object.values(deudas)
            array.forEach(element => {
                acreditado = Number(element.valor) + Number(acreditado)
            });
            newArray.push({
                codigo,
                acreditado: acreditado
            })
            this.setState({
                sumaTotalListaDeudasAcreditado: newArray
            })
        }
    }

    obtenerPermisosusuarios = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var usuariosRef = db.ref(`users/${user.uid}/usuarios/${this.state.usuario.code}`)
                usuariosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        if (snapshot.val().privilegios.cuentas_cobrar === true) {
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

    sumaTotalListaDeudasPendientes = (codigo) => {
        if (this.state.sumaTotalListaDeudas != null) {
            if (this.state.sumaTotalListaDeudas.length > 0) {
                var sumaTotalDeudas = this.state.sumaTotalListaDeudas.filter(it => it.codigo === codigo)[0].suma
                var sumaTotalDeudasAcreditado = 0
                if (this.state.sumaTotalListaDeudasAcreditado != null) {
                    if (this.state.sumaTotalListaDeudasAcreditado.length > 0) {
                        sumaTotalDeudasAcreditado = this.state.sumaTotalListaDeudasAcreditado.filter(it => it.codigo === codigo)[0] != null ? this.state.sumaTotalListaDeudasAcreditado.filter(it => it.codigo === codigo)[0].acreditado : 0.00
                    }
                }
                return Number(sumaTotalDeudas - sumaTotalDeudasAcreditado).toFixed(2)
            }
        } else {
            return 0.00
        }
    }

    obtenerEstadoDeCaja = () => {
        var db = firebase.database();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var operacionVentaRefCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_abiertas_usuario')
                operacionVentaRefCaja.on('value', (snap) => {
                    if (snap.val()) {
                        var caja = funtions.snapshotToArray(snap).filter(it => it.usuario === this.state.usuario.code)[0]
                        if (caja != null) {
                            this.setState({
                                cajaSeleccionada: caja,
                                estadoCaja: caja.estado,
                            })
                        } else {
                            this.setState({
                                cajaSeleccionada: null,
                                estadoCaja: false,
                            })
                        }
                    } else {
                        this.setState({
                            cajaSeleccionada: null,
                            estadoCaja: false,
                        })
                    }
                })
            }
        })
    }

    handleGetData = (n, item) => {
        if (item.id === 'acciones') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                        if (this.state.estadoCaja) {
                            this.setState({ codigoCuentaSeleccionada: n.codigo, cuentaSeleccionada: n, openModalPagarDeuda: true })
                        } else {
                            setSnackBars.openSnack('error', 'rootSnackBar', 'Abrir caja!', 1000)
                        }
                    }}
                >
                    Pagar
                </Button>
            </div>
        }
        if (item.id === 'codigo') {
            return n.codigo
        }
        if (item.id === 'estado_cuenta') {
            return n.estado_cuenta === 'deuda' ?
                <Chip
                    label={<div style={{ color: colors.getColorWhite() }}>En deuda</div>}
                    clickable
                    style={{
                        background: colors.getColorPrymaryLightCajaActivada()
                    }}

                />
                :
                <div >Cerrada</div>
        }
        if (item.id === 'cliente') {
            return <div style={{ width: 'max-content' }}>
                <ReturnTextTable
                    referencia="clientes"
                    codigo={n.cliente.codigo}
                    datoTraido="nombre"
                    estado={n.estado}
                />
            </div>
        }

        if (item.id === 'lista_deudas') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                {
                    n.lista_acreditados != null ?
                        <ChipTabla
                            codigo={n.codigo}
                            cantidad={Object.values(n.lista_deudas).length}
                            total={Number(this.state.sumaTotalListaDeudas.filter(item => item.codigo === n.codigo)[0].suma).toFixed(2)}
                            label={'Deuda total'}
                            background={colors.getColorPrymary()}
                            backgroundDark={colors.getColorPrymaryDark()}
                        />
                        :
                        <Chip
                            avatar={<Avatar style={{ width: 'max-content', paddingLeft: 15, paddingRight: 15, paddingTop: 3, paddingBottom: 3 }}>
                                0
                            </Avatar>}
                            label="Deuda total"
                            clickable
                            color="inherit"
                        />
                }
            </div>
        }

        if (item.id === 'lista_acreditado') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                {
                    n.lista_acreditados != null ?
                        <ChipTabla
                            codigo={n.codigo}
                            cantidad={Object.values(n.lista_acreditados).length}
                            total={Number(this.state.sumaTotalListaDeudasAcreditado.filter(item => item.codigo === n.codigo)[0].acreditado).toFixed(2)}
                            label={'Acreditado'}
                            background={colors.getColorPrymary()}
                            backgroundDark={colors.getColorPrymaryDark()}
                        />
                        :
                        <Chip
                            avatar={<Avatar style={{ width: 'max-content', paddingLeft: 15, paddingRight: 15, paddingTop: 3, paddingBottom: 3 }}>
                                0
                            </Avatar>}
                            label="Acreditado"
                            clickable
                            color="inherit"
                        />
                }
            </div>
        }
        if (item.id === 'lista_pendiente') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                {
                    n.lista_acreditados != null ?
                        <Chip
                            label={
                                <div style={{ color: colors.getColorWhite(), display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ marginRight: 8 }}>
                                        Pendiente:
                                    </div>
                                    <Dolar>{this.sumaTotalListaDeudasPendientes(n.codigo)}</Dolar>
                                </div>
                            }
                            style={{
                                background: colors.getColorPrymary()
                            }}
                        />
                        :
                        <Chip
                            label={
                                <div style={{ color: colors.getColorWhite(), display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ marginRight: 8 }}>
                                        Pendiente:
                                    </div>
                                    <Dolar>{this.sumaTotalListaDeudasPendientes(n.codigo)}</Dolar>
                                </div>
                            }
                            style={{
                                background: colors.getColorPrymary()
                            }}
                        />
                }
            </div>
        }

        if (item.id === 'fecha_pago') {
            return n.fecha_pago
        }
        if (item.id === 'fecha_registro') {
            return n.fecha_registro
        }
        if (item.id === 'hora_registro') {
            return n.hora_registro
        }
        if (item.id === 'tipo_cuenta') {
            return n.tipo_cuenta
        }
        if (item.id === 'total') {
            return n.total
        }
        if (item.id === 'usuario') {
            return <ReturnTextTable
                referencia="usuarios"
                codigo={n.usuario}
                datoTraido="nombre"
                estado={n.estado}
            />
        }
    }

    getValorTotalPagar = () => {
        var numero = 0
        Number(this.state.sumaTotalListaDeudas ?
            this.state.sumaTotalListaDeudas.length > 0 ?
                this.state.codigoCuentaSeleccionada != null ?
                    numero = Number(this.state.sumaTotalListaDeudas.filter(item => item.codigo === this.state.codigoCuentaSeleccionada)[0].suma)
                    :
                    numero = 0.00
                :
                numero = 0.00
            :
            numero = 0.00).toFixed(2)
        return numero.toFixed(2)
    }

    componentDidMount() {
        ReactGA.pageview(location.pathname)

        this.setState({ usuario: this.props.user })
        setTimeout(() => {
            this.obtenerPermisosusuarios()
            this.obtenerEstadoDeCaja()
            this.getCuentasCobrarBaseDeDatos()
        }, 100)
    }

    getValorTotalPagarAcreditado = () => {
        var numero = 0
        Number(this.state.sumaTotalListaDeudasAcreditado ?
            this.state.sumaTotalListaDeudasAcreditado.length > 0 ?
                this.state.codigoCuentaSeleccionada != null ?
                    numero = Number(this.state.sumaTotalListaDeudasAcreditado.filter(item => item.codigo === this.state.codigoCuentaSeleccionada)[0].acreditado)
                    :
                    numero = 0.00
                :
                numero = 0.00
            :
            numero = 0.00).toFixed(2)
        return numero.toFixed(2)
    }

    getValorTotalPagarPendiente = () => {
        this.sumaTotalListaDeudasPendientes(this.state.codigoCuentaSeleccionada)
        return this.sumaTotalListaDeudasPendientes(this.state.codigoCuentaSeleccionada)
    }

    render() {
        return (
            <>

                {
                    this.state.estadoPermisos === true &&
                    <div>
                        <ToolbarContainer title={'Cuentas por Cobrar'} open={this.props.open}>
                            {
                                Boolean(this.state.estadoCaja) === true &&
                                <>
                                    <Tooltip title="Estado de caja">
                                        <IconButton >
                                            <MonetizationOn style={{ color: '#00c853' }} />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            }
                            {
                                Boolean(this.state.estadoCaja) === false &&
                                <>
                                    <Tooltip title="Estado de caja">
                                        <IconButton>
                                            <MonetizationOn style={{ color: '#EF5350' }} />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            }

                            <div style={{ flex: 0.9 }}></div>

                            <Search
                                id='buscar-cliente-clientes'
                                textoSearch="Buscar..."
                                textoTooltip="Buscar Cliente"
                                handleSearch={this.handleSearch}
                            />
                        </ToolbarContainer>

                        <Divider />

                        <TablaNormal
                            textoTitleP="Cuentas por cobrar"
                            textoTitleS="Cuenta"
                            selectedItems={true}
                            toolbar={false}
                            notTab={true}
                            data={this.state.listaCuentasCobrar}
                            rows={this.state.rowsCuentasCobrar}
                            handleGetData={this.handleGetData}
                            estadoTabla={this.state.estadoTabla}
                            itemsSeleccionados={items => this.setState({ itemsSeleccionados: items })}
                        />

                        <ModalContainerNormal
                            open={this.state.openModalPagarDeuda}
                            handleClose={() => this.setState({ openModalPagarDeuda: false })}
                        >
                            <PagarDeuda
                                usuario={this.state.usuario}
                                handleClose={() =>
                                    this.setState({ openModalPagarDeuda: false })}
                                valorTotal={this.getValorTotalPagar}
                                valorAcreditado={this.getValorTotalPagarAcreditado}
                                valorPendiente={this.getValorTotalPagarPendiente}
                                cuentaSeleccionada={this.state.cuentaSeleccionada}

                                cajaSeleccionada={this.state.cajaSeleccionada}
                            />
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
            </>
        );
    }
}

export default DeudasCobrar;