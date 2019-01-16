import React, { Component } from 'react';
import Layout from '../components/containers/Layout';
import Search from '../components/components/Search';
import SimpleTable from '../components/components/TableList';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import ChipsArray from '../components/components/ChipArray';
import funtions from '../utils/funtions';
import FullScreenDialog from '../components/components/FullScreenDialog';
import ModalNewProducto from '../components/modals_container/ModalNewProducto';
import setSnackBars from '../components/plugins/setSnackBars';

import ListaProductos from '../components/components/productos/components/ListaProductos'
import Stock from '../components/components/productos/components/Stock'
import Proveedores from '../components/components/productos/components/Proveedores'
import ControlVencimiento from '../components/components/productos/components/ControlVencimiento'
import { CircularProgress } from '@material-ui/core';

import Ventas_01 from '../components/components/ventas/Ventas_01'
import VentasDevueltas_01 from '../components/components/ventas/VentasDevueltas_01'
import HistorialVentas_01 from '../components/components/ventas/HistorialVentas_01'

class VentasFac extends Component {

    state = {
        //valor para cambiar de tab
        valueTab: 0,
        //usuario 
        usuario: null,
        estadoPermisos: null
    }
    componentDidMount() {

    }

    obtenerDataBaseDatos = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var usuariosRef = db.ref(`users/${user.uid}/usuarios/${this.state.usuario.code}`)
                usuariosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        if (snapshot.val().privilegios.productos === true) {
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

    handleChangeTab = (event, valueTab) => {
        this.setState({ valueTab });
    };

    render() {

        return (
            <Layout title="Ventas" onChangueUserState={usuario => {

                this.setState({ usuario: usuario })
                setTimeout(() => {
                    this.obtenerDataBaseDatos()
                }, 100)
            }}>



                {
                    this.state.estadoPermisos &&
                    <>
                        <AppBar position="static" color="inherit">
                            <Tabs indicatorColor="primary" value={this.state.valueTab} onChange={this.handleChangeTab} textColor="primary">
                                <Tab label="Ventas" />
                                <Tab label="Ventas canceladas" />
                                <Tab label="Historial de ventas" />
                            </Tabs>
                        </AppBar>
                        <div>
                            {this.state.valueTab === 0 && <Ventas_01 usuario={this.state.usuario} />}
                            {this.state.valueTab === 1 && <VentasDevueltas_01 usuario={this.state.usuario} />}
                            {this.state.valueTab === 2 && <HistorialVentas_01 usuario={this.state.usuario} />}
                        </div>
                    </>
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

export default VentasFac;