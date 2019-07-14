import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'


import ListaProductos from '../../components/components/productos/components/ListaProductos'
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