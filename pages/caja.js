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

class Caja extends Component {

    state = {

        listaVentasCaja: [],
        estadoTabla: 'cargando',
        listaVentasCajaTemporal: [],
        rowsVentasCaja: [
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'estado', numeric: true, disablePadding: false, label: 'Estado' },
            { id: 'saldo_inicial', numeric: true, disablePadding: false, label: 'Saldo Inicial' },
            { id: 'saldo_final', numeric: true, disablePadding: false, label: 'Saldo Final' },
            { id: 'operaciones', numeric: true, disablePadding: false, label: 'Estado de operaciones' },
            { id: 'fecha_abrir', numeric: true, disablePadding: false, label: 'Caja Abierta - Fecha' },
            { id: 'fecha_cerrar', numeric: true, disablePadding: false, label: 'Caja Cerrada - Fecha' },
            { id: 'hora_abrir', numeric: true, disablePadding: false, label: 'Caja Iniciada - Hora' },
            { id: 'hora_cerrrar', numeric: true, disablePadding: false, label: 'Caja Cerrada - Hora' },
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
                            estadoTabla: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        var filterList = lista.sort((a, b) => {
                            a = new Date(a.order);
                            b = new Date(b.order);
                            return a > b ? -1 : a < b ? 1 : 0;
                        })

                        var item = filterList[0]
                        this.sumaVentas(item.ventas)

                        this.setState({
                            listaVentasCaja: filterList,
                            listaVentasCajaTemporal: filterList,
                            estadoTabla: 'llena'
                        })
                        setTimeout(() => { this.obtenerEstadoCaja() }, 100)
                    } else {
                        this.setState({
                            listaVentasCaja: [],
                            listaVentasCajaTemporal: [],
                            estadoTabla: 'vacio'
                        })
                    }
                });
            }
        });
    }

    obtenerEstadoCaja = () => {
        const { listaVentasCaja } = this.state
        var item = listaVentasCaja[0]
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
        } if (item === null) {
            this.setState({
                estadoCaja: false,
                cajaSeleccionada: null
            })
        }
    }


    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }
        if (item.id === 'estado') {
            return n.estado ?
                <div style={{ color: '#EF5350' }}>Abierta</div>
                :
                <div >Cerrada</div>
        }
        if (item.id === 'saldo_inicial') {
            return <Chip
                label={Number(n.saldo_inicial).toFixed(2)}
                clickable
                color="primary"

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
            return n.fecha_abrir
        }
        if (item.id === 'fecha_cerrar') {
            return n.fecha_cerrar
        }
        if (item.id === 'hora_abrir') {
            return n.hora_abrir
        }
        if (item.id === 'hora_cerrrar') {
            return n.hora_cerrrar
        }
        if (item.id === 'operaciones') {

            return n.ventas != null ?
                <div>
                    <Chip
                        avatar={<Avatar style={{ width: 'max-content', paddingLeft: 15, paddingRight: 15, paddingTop: 3, paddingBottom: 3 }}>
                            {
                                Object.values(n.ventas).length
                            }
                        </Avatar>}
                        label="Ventas"
                        clickable
                        color="primary"
                        onDelete={() => this.setState({})}
                        deleteIcon={<div style={{ width: 'max-content', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <AttachMoneyIcon style={{ padding: 20, color: 'white' }} />
                            <div style={{ marginLeft: -20, marginRight: 20 }}>
                                {
                                    this.state.sumaTotalVentas
                                }

                            </div>
                        </div>}
                    />

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

    sumaVentas = (ventas) => {
        var suma = 0
        if (ventas != null) {
            var array = Object.values(ventas)
            array.forEach(element => {
                suma = Number(element.total) + Number(suma)
            });
            this.setState({
                sumaTotalVentas: suma.toFixed(2)
            })
        }
    }

    render() {
        return (
            <Layout title="Caja" onChangueUserState={usuario => {
                this.setState({ usuario: usuario })
                setTimeout(() => {
                    this.getCajasBaseDeDatos()
                }, 100)
            }}>

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
                            {
                                Boolean(this.state.estadoCaja) === null &&
                                <ItemMenuHerramienta
                                    titleButton="Abrir Caja"
                                    color="primary"
                                    visible={true}
                                    onClick={() => this.setState({ openModalAbrirCaja: true })}
                                />
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
                                        this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'activar' })
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
                                        this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'desactivar' })
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
                        sumaTotalVentas={this.state.sumaTotalVentas}
                    />
                </ModalContainerNormal>

            </Layout>
        );
    }
}

export default Caja;