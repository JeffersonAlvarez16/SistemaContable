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



class Productos extends Component {

    state = {
        //valor para cambiar de tab
        valueTab: 0,
        //usuario 
        usuario:null
    }


    handleChangeTab = (event, valueTab) => {
        this.setState({ valueTab });
    };

    render() {

        return (
            <Layout title="Productos" onChangueUserState={usuario => this.setState({ usuario: usuario })}>

                {/* Tab bar */}
                <AppBar position="static" color="inherit">
                    <Tabs indicatorColor="primary" value={this.state.valueTab} onChange={this.handleChangeTab} textColor="primary">
                        <Tab label="Lista de productos" />
                        {/* <Tab label="Stock" />
                        <Tab label="Proveedores" /> */}
                    </Tabs>
                </AppBar>

                <div>
                    {this.state.valueTab === 0 && <ListaProductos usuario={this.state.usuario}/>}
                    {/* this.state.valueTab === 1 && <Stock usuario={this.state.usuario}/> */}
                    {/* this.state.valueTab === 2 && <Proveedores usuario={this.state.usuario}/> */}
                </div>

            </Layout>
        );
    }
}

export default Productos;