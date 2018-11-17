import React, { Component } from 'react';
import Layout from '../components/containers/Layout';
import MenuHerramientas from '../components/components/menus/MenuHerramientas';
import ItemMenuHerramienta from '../components/components/menus/ItemMenuHerramienta';
import Search from '../components/components/Search';
import Divider from '@material-ui/core/Divider';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import TablaNormal from '../components/components/tables/TableNormal';
import ModalContainerNormal from '../components/modals_container/ModalContainerNormal';
import AbrirCaja from '../components/modals_container/caja/AbrirCaja';
import CerrarCaja from '../components/modals_container/caja/CerrarCaja';

class Caja extends Component {

    state = {

        listaVentasCaja: [],
        estadoTabla: 'cargando',
        listaVentasCajaTemporal: [],
        rowsVentasCaja: [
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'nombre', numeric: true, disablePadding: false, label: 'Nombre' },
            { id: 'tipo_cliente', numeric: true, disablePadding: false, label: 'Tipo Cliente' },
            { id: 'fecha_nacimiento', numeric: true, disablePadding: false, label: 'Fecha Nacimiento' },
            { id: 'sexo', numeric: true, disablePadding: false, label: 'Sexo' },
            { id: 'telefono', numeric: true, disablePadding: false, label: 'Telefono' },
            { id: 'celular', numeric: true, disablePadding: false, label: 'Telefono' },
            { id: 'numero_identificacion', numeric: true, disablePadding: false, label: 'Numero identificación' },
            { id: 'direccion', numeric: true, disablePadding: false, label: 'Dirección' },
            { id: 'barrio', numeric: true, disablePadding: false, label: 'Barrio' },
            { id: 'ciudad', numeric: true, disablePadding: false, label: 'Ciudad' },
            { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
            { id: 'observacion', numeric: true, disablePadding: false, label: 'Observación' },
            { id: 'limite_deuda', numeric: true, disablePadding: false, label: 'Límite deuda' },
            { id: 'credito', numeric: true, disablePadding: false, label: 'Crédito' },
            { id: 'fecha_registro', numeric: true, disablePadding: false, label: 'Fecha registro' },
            { id: 'hora_registro', numeric: true, disablePadding: false, label: 'Hora registro' },
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
    }

    componentDidMount() {
        this.obtenerEstadoCaja()
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var cajaVentasRef = db.ref('users/' + user.uid + '/caja_ventas');
                var cajaVentasRef = db.ref('users/' + user.uid + '/caja_ventas');
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
                        this.setState({
                            listaVentasCaja: filterList,
                            listaVentasCajaTemporal: filterList,
                            estadoTabla: 'llena'
                        })
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
        const { usuario } = this.state
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/caja/' + usuario.code).orderByChild('order').limitToLast(1)
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        const caja = funtions.snapshotToArray(snapshot)[0]
                        this.setState({
                            estadoCaja: caja.estado
                        })
                    }else{
                        this.setState({
                            estadoCaja: null
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

        if (item.id === 'nombre') {
            return <div style={{ width: 'max-content' }}>{this.getColorActivadoDesactivado(n.estado, n.nombre)}</div>
        }

        if (item.id === 'usuario') {
            return n.usuario
        }
    }

    render() {
        return (
            <Layout title="Caja" onChangueUserState={usuario => this.setState({ usuario: usuario })}>

                <MenuHerramientas>
                    {
                        Boolean(this.state.estadoCaja) === true &&
                        <ItemMenuHerramienta
                            titleButton="Cerrar Caja"
                            color="primary"
                            visible={true}
                            onClick={() => this.setState({ openModalCerrarCaja: true })}
                        />
                    }
                    {
                        Boolean(this.state.estadoCaja) === false &&
                        <ItemMenuHerramienta
                            titleButton="Abrir Caja"
                            color="primary"
                            visible={true}
                            onClick={() => this.setState({ openModalAbrirCaja: true })}
                        />
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
                        disabled={!this.state.itemsSeleccionados.length > 0}
                        onClick={() => {
                            if (this.state.itemsSeleccionados.length > 0) {
                                this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'eliminar' })
                            }
                        }}
                    />
                    <ItemMenuHerramienta
                        titleButton="Agregar dinero"
                        color="primary"
                        visible={true}
                        disabled={!this.state.itemsSeleccionados.length > 0}
                        onClick={() => {
                            if (this.state.itemsSeleccionados.length > 0) {
                                this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'activar' })
                            }
                        }}
                    />
                    <ItemMenuHerramienta
                        titleButton="Retirar dinero"
                        color="primary"
                        visible={true}
                        disabled={!this.state.itemsSeleccionados.length > 0}
                        onClick={() => {
                            if (this.state.itemsSeleccionados.length > 0) {
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

                <Divider />

                <TablaNormal
                    textoTitleP="Clientes"
                    textoTitleS="Cliente"
                    selectedItems={false}
                    toolbar={false}
                    notTab={true}
                    data={this.state.listaVentasCaja}
                    rows={this.state.rowslistaVentasCaja}
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
                    <CerrarCaja usuario={this.state.usuario} handleClose={() => this.setState({ openModalCerrarCaja: false })} />
                </ModalContainerNormal>

            </Layout>
        );
    }
}

export default Caja;