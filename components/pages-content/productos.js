import React, { Component } from 'react';
import Layout from '../../components/containers/Layout';
import Search from '../../components/components/Search';
import SimpleTable from '../../components/components/TableList';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import ChipsArray from '../../components/components/ChipArray';
import funtions from '../../utils/funtions';
import FullScreenDialog from '../../components/components/FullScreenDialog';
import ModalNewProducto from '../../components/modals_container/ModalNewProducto';
import setSnackBars from '../../components/plugins/setSnackBars';

import ListaProductos from '../../components/components/productos/components/ListaProductos'
import Stock from '../../components/components/productos/components/Stock'
import Proveedores from '../../components/components/productos/components/Proveedores'
import ControlVencimiento from '../../components/components/productos/components/ControlVencimiento'
import { CircularProgress } from '@material-ui/core';
import ReactGA from 'react-ga';


class Productos extends Component {

    state = {
        //valor para cambiar de tab
        valueTab: 0,
        //usuario 
        usuario: null,
        estadoPermisos: null
    }
    componentDidMount() {
        ReactGA.pageview(location.pathname)
        this.setState({ usuario: this.props.user })
        setTimeout(() => {
            this.obtenerDataBaseDatos()
        }, 100)
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
            <>

                
                {/* <AppBar position="static" color="inherit">
                    <Tabs indicatorColor="primary" value={this.state.valueTab} onChange={this.handleChangeTab} textColor="primary">
                        <Tab label="Lista de productos" />
                        <Tab label="Stock" />
                        <Tab label="Proveedores" />
                    </Tabs>
                </AppBar>
                <div>
                    {this.state.valueTab === 0 && <ListaProductos usuario={this.state.usuario} />}
                    {this.state.valueTab === 1 && <Stock usuario={this.state.usuario} />}
                    {this.state.valueTab === 2 && <Proveedores usuario={this.state.usuario} />}
                </div> */}
                {
                    this.state.estadoPermisos &&
                    <ListaProductos usuario={this.state.usuario} />
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

export default Productos;