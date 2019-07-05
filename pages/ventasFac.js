import 'firebase/database';
import 'firebase/auth'

import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import ChipsArray from '../components/components/ChipArray';
import { CircularProgress } from '@material-ui/core';
import ControlVencimiento from '../components/components/productos/components/ControlVencimiento'
import FullScreenDialog from '../components/components/FullScreenDialog';
import HistorialVentas_01 from '../components/components/ventas/HistorialVentas_01'
import Layout from '../components/containers/Layout';
import ListaProductos from '../components/components/productos/components/ListaProductos'
import ModalNewProducto from '../components/modals_container/ModalNewProducto';
import Proveedores from '../components/components/productos/components/Proveedores'
import PuntoVenta from '../components/components/ventas/PuntoVenta';
import ReactGA from 'react-ga';
import Search from '../components/components/Search';
import SimpleTable from '../components/components/TableList';
import Stock from '../components/components/productos/components/Stock'
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import VentasDevueltas_01 from '../components/components/ventas/VentasDevueltas_01'
import Ventas_01 from '../components/components/ventas/Ventas_01'
import firebase from 'firebase/app';
import funtions from '../utils/funtions';
import setSnackBars from '../components/plugins/setSnackBars';

class VentasFac extends Component {

    state = {
        //valor para cambiar de tab
        valueTab: 0,
        //usuario 
        usuario: null,
        estadoPermisos: null
    }
    componentDidMount() {
        ReactGA.pageview(location.pathname)
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
        var db = firebase.database()

        if (valueTab === 0) {
          

            ReactGA.event({
                category: 'ventas',
                action: 'VentasDiarias'
            })
            var controlCaja = db.ref(`users/${firebase.auth().currentUser.uid}/control_interaccion/ventas/ventasDiarias`)
            controlCaja.once('value', (snapshot) => {
                if (snapshot.val()) {
                    controlCaja.update({
                        contador: snapshot.val().contador + 1,
                    })

                } else {
                    controlCaja.update({
                        contador: 1,
                    })

                }
            });
        } else if (valueTab === 1) {
            ReactGA.event({
                category: 'ventas',
                action: 'VentasCanceladas'
            })
            var controlCaja = db.ref(`users/${firebase.auth().currentUser.uid}/control_interaccion/ventas/ventas-canceladas`)
            controlCaja.once('value', (snapshot) => {
                if (snapshot.val()) {
                    controlCaja.update({
                        contador: snapshot.val().contador + 1,
                    })

                } else {
                    controlCaja.update({
                        contador: 1,
                    })

                }
            });
        } else {
            ReactGA.event({
                category: 'ventas',
                action: 'HistorialVentas'
            })
            var controlCaja = db.ref(`users/${firebase.auth().currentUser.uid}/control_interaccion/ventas/historial-ventas`)
            controlCaja.once('value', (snapshot) => {
                if (snapshot.val()) {
                    controlCaja.update({
                        contador: snapshot.val().contador + 1,
                    })

                } else {
                    controlCaja.update({
                        contador: 1,
                    })

                }
            });
        }

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
                              {/*   <Tab label="Punto de Venta" /> */}
                                <Tab label="Facturar" />
                                <Tab label="Ventas canceladas" />
                                <Tab label="Historial de ventas" />
                            </Tabs>
                        </AppBar>
                        <div>
                          {/*   {this.state.valueTab === 0 && <PuntoVenta usuario={this.state.usuario}></PuntoVenta>} */}
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