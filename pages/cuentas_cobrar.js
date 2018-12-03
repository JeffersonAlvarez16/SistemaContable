import React, { Component } from 'react';
import Layout from '../components/containers/Layout';
import { CircularProgress, Divider, Chip } from '@material-ui/core';

import MenuHerramientas from '../components/components/menus/MenuHerramientas';
import ItemMenuHerramienta from '../components/components/menus/ItemMenuHerramienta';
import Search from '../components/components/Search';

import Tooltip from '@material-ui/core/Tooltip';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import IconButton from '@material-ui/core/IconButton';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import funtions from '../utils/funtions';
import TablaNormal from '../components/components/tables/TableNormal';

class DeudasCobrar extends Component {

    state = {
        usuario: '',
        estadoPermisos: null,

        listaCuentasCobrar: [],
        estadoTabla: 'cargando',
        listaCuentasCobrarTemporal: [],
        rowsCuentasCobrar: [
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'fecha_registro', numeric: true, disablePadding: false, label: 'Fecha de registrado' },
            { id: 'fecha_pago', numeric: true, disablePadding: false, label: 'Fecha de pago' },
            { id: 'cliente', numeric: true, disablePadding: false, label: 'Valor actual de caja' },
            { id: 'hora_registro', numeric: true, disablePadding: false, label: 'Cliente' },
            { id: 'tipo_cuenta', numeric: true, disablePadding: false, label: 'Tipo de cuenta' },
            { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
            { id: 'usuario', numeric: true, disablePadding: false, label: 'Empleado' },
        ],
        itemsSeleccionados: [],
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
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        var filterList = lista.sort((a, b) => {
                            a = new Date(a.order);
                            b = new Date(b.order);
                            return a > b ? -1 : a < b ? 1 : 0;
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

    obtenerPermisosusuarios = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var usuariosRef = db.ref(`users/${user.uid}/usuarios/${this.state.usuario.code}`)
                usuariosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        console.log(snapshot.val())
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

    obtenerEstadoDeCaja = () => {
        var db = firebase.database();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var operacionVentaRefCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_abiertas_usuario')
                operacionVentaRefCaja.once('value', (snap) => {
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
        if (item.id === 'codigo') {
            return n.codigo
        }
        if (item.id === 'estado_cuenta') {
            return n.estado_cuenta==='deuda' ?
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
    }

    render() {
        return (
            <Layout title="Cuentas por Cobrar" onChangueUserState={usuario => {
                this.setState({ usuario: usuario })
                setTimeout(() => {
                    this.obtenerPermisosusuarios()
                    this.obtenerEstadoDeCaja()
                    this.getCuentasCobrarBaseDeDatos()
                }, 100)
            }
            }>

                {
                    this.state.estadoPermisos === true &&
                    <div>
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
                                        this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'eliminar' })
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

export default DeudasCobrar;