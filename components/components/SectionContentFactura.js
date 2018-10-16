import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Search from './Search';
import SimpleTable from './TableList';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import funtions from '../../utils/funtions';

class SectionContentFactura extends Component {

    state = {
        arryList: [],
        estadoSearch: 'cargando',
        arryListTemporal: [],
        categorias: [],
        openModal: false,
        itemProducto: null,
        proveedores: [],
        listaProductosFactura: [],
        itemProductoCargado: {},
        rows: [
            { id: 'nombre', numeric: true, disablePadding: false, label: 'Nombre' },
            { id: 'precio_u', numeric: true, disablePadding: false, label: 'Precio/U' },
            { id: 'cantidad', numeric: true, disablePadding: false, label: 'Cantidad' },
            { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
            { id: 'aciones', numeric: true, disablePadding: false, label: 'Aciones' }
        ]
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/productos');
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            arryList: [],
                            arryListTemporal: [],
                            estadoSearch: 'cargando'
                        })
                        var hhh = funtions.snapshotToArray(snapshot)
                        this.setState({
                            arryList: hhh,
                            arryListTemporal: hhh,
                            estadoSearch: 'llena'
                        })
                        this.setState({
                            categorias: funtions.categorieToKey(funtions.repeatTo(funtions.inventarioToCategories(snapshot))),
                            proveedores: funtions.categorieToKey(funtions.repeatTo(funtions.inventarioToProveedores(snapshot)))
                        })
                    } else {
                        this.setState({
                            arryList: [],
                            arryListTemporal: [],
                            categorias: [],
                            proveedores: [],
                            estadoSearch: 'vacio'
                        })
                    }
                });
                /*for(var i=0;i<400;i++){
                    this.setNewProductosData()
                } */

            }
        });
    }

    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }
        if (item.id === 'nombre') {
            return n.nombre
        }
        if (item.id === 'total') {
            return n.precio_menor * n.cantidad
        }
        if (item.id === 'precio_u') {
            return n.precio_menor
        }
        if (item.id === 'cantidad') {
            return n.cantidad
        }
        if (item.id === 'aciones') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                <IconButton variant="fab" color='secondary' aria-label="Add" mini style={{ marginRight: 10 }} >
                    <AddIcon />
                </IconButton >
                <IconButton variant="fab" color='secondary' aria-label="Add" mini style={{ marginRight: 10 }}>
                    <RemoveIcon />
                </IconButton >
                <IconButton variant="fab" color='secondary' aria-label="Add" mini style={{ marginRight: 10 }}>
                    <DeleteIcon />
                </IconButton >
            </div>
        }
    }

    handleClickOpen = () => {
        this.setState({ openModal: true });
    };

    handleClose = () => {
        this.setState({ openModal: false, itemProducto: null, });
    };

    andleDeleteItems = (itemsId) => {
        itemsId.map(item => {
            var db = firebase.database();
            var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/productos/' + item);
            productosRef.remove()
        })
        setSnackBars.openSnack('info', 'rootSnackBar', itemsId.length === 1 ? itemsId.length + ' producto eliminado' : itemsId.length + ' productos eliminados', 2000)
    }

    handleEditItem = (itemId) => {
        var db = firebase.database();
        var productoRef = db.ref('users/' + firebase.auth().currentUser.uid + '/productos/' + itemId);
        productoRef.on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({
                    itemProducto: {}
                })
                var hhh = snapshot.val()
                this.setState({
                    itemProducto: hhh
                })
                this.handleClickOpen()
            }
        });
    }

    handleSearch = (codigo) => {
        let array = this.state.arryListTemporal.filter((item) => item.codigo === codigo)
        console.log(array[0])
        this.setState({
            itemProductoCargado: array[0]
        })
    }

    render() {
        return (
            <div>
                <Grid container >
                    <Grid item xs={6} >
                        <Search
                            loading={this.state.estadoSearch}
                            id='buscar-producto-venta'
                            textoSearch="Ingrese el codigo de su producto"
                            textoTooltip="Buscar por codigo de producto"
                            handleSearch={this.handleSearch}
                        />

                    </Grid>
                    <Grid item xs={6} >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: 16,
                            marginLeft: 16,
                            marginRight: 16
                        }}>
                            <Typography variant="title" gutterBottom>
                                {this.state.itemProductoCargado ? this.state.itemProductoCargado.nombre : 'Nombre de producto'}
                            </Typography>
                            <div style={{ flex: 1 }} />
                            <Typography variant="subheading" gutterBottom >
                                {this.state.itemProductoCargado ? this.state.itemProductoCargado.codigo : 'codigo'}
                            </Typography>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: 16,
                            marginLeft: 16,
                            marginRight: 16
                        }}>
                            <Typography variant="subheading" gutterBottom>
                                {this.state.itemProductoCargado ? '$ ' + this.state.itemProductoCargado.precio_menor : 'precio'}
                            </Typography>
                            <div style={{ flex: 1 }} />
                            <Typography variant="subheading" gutterBottom>
                                {this.state.itemProductoCargado ? 'cantidad: ' + this.state.itemProductoCargado.cantidad : 'precio'}
                            </Typography>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: 16,
                            marginLeft: 16,
                            marginRight: 16
                        }}>
                            <div style={{ flex: 1 }} />
                            <Button variant="outlined" size="small" color="primary" >
                                Agregar
                            </Button>
                        </div>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} >
                        <SimpleTable
                            textoTitleP="Productos"
                            textoTitleS="Producto"
                            actionsNot={true}
                            data={this.state.listaProductosFactura}
                            rows={this.state.rows}
                            handleGetData={this.handleGetData}
                            handleClickOpen={this.handleClickOpen}
                            handleEditItem={this.handleEditItem}
                            handleDeleteItems={this.handleDeleteItems}
                            estadoTabla='llena'
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default SectionContentFactura;