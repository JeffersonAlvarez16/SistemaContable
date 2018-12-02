import React, { Component } from 'react';
import Layout from '../components/containers/Layout';

class DeudasCobrar extends Component {

    state={
        usuario:''
    }
    render() {
        return (
            <Layout title="Deudas por Cobrar" onChangueUserState={usuario => {
                this.setState({ usuario: usuario })
               /*  setTimeout(() => {
                    this.obtenerPermisosusuarios()
                }, 100) */
            }
            }>
            
            </Layout>
        );
    }
}

export default DeudasCobrar;