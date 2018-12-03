import React, { Component } from 'react';
import Layout from '../components/containers/Layout';
import { CircularProgress } from '@material-ui/core';


import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

class DeudasCobrar extends Component {

    state = {
        usuario: '',
        estadoPermisos: null
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
    render() {
        return (
            <Layout title="Cuentas por Cobrar" onChangueUserState={usuario => {
                this.setState({ usuario: usuario })
                setTimeout(() => {
                    this.obtenerPermisosusuarios()
                }, 100)
            }
            }>

                {
                    this.state.estadoPermisos === true &&
                    <div>

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