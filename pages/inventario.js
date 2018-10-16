import React, { Component } from 'react';
import Layout from '../components/containers/Layout';
import Search from '../components/components/Search';
import SimpleTable from '../components/components/TableList';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import ChipsArray from '../components/components/ChipArray';
import funtions from '../utils/funtions';
import FullScreenDialog from '../components/components/FullScreenDialog';
import ModalNewProducto from '../components/modals_container/ModalNewProducto';
import setSnackBars from '../components/plugins/setSnackBars';



class Inventario extends Component {

    state = {
        arryList: [],
        estadoTabla: 'cargando',
        arryListTemporal: [],
        categorias: [],
        openModal: false,
        itemProducto: null,
        proveedores: [],
        rows: [
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'nombre', numeric: true, disablePadding: false, label: 'Nombre' },
            { id: 'precio_mayor', numeric: true, disablePadding: false, label: 'Precio Mayor' },
            { id: 'precio_menor', numeric: true, disablePadding: false, label: 'Precio Menor' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Iva (%)' },
            { id: 'cantidad', numeric: true, disablePadding: false, label: 'Cantidad' }
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
                            estadoTabla: 'cargando'
                        })
                        var hhh = funtions.snapshotToArray(snapshot)
                        this.setState({
                            arryList: hhh,
                            arryListTemporal: hhh,
                            estadoTabla: 'llena'
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
                            estadoTabla: 'vacio'
                        })
                    }
                });
                /*for(var i=0;i<400;i++){
                    this.setNewProductosData()
                } */

            }
        });
    }

    setNewProducto = (producto) => {
        var db = firebase.database();
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/productos/' + producto.codigo);
        productosRef.set({
            cantidad: producto.cantidad,
            categoria: producto.categoria,
            codigo: producto.codigo,
            iva: producto.iva,
            nombre: producto.nombre,
            precio_mayor: producto.precio_mayor,
            precio_menor: producto.precio_menor,
            proveedor: producto.proveedor
        });
    }

    setNewProductosData = () => {
        var db = firebase.database();
        var codigo = funtions.guidGenerator()
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/productos/' + codigo);
        productosRef.set({
            cantidad: '175',
            categoria: 'Filtros',
            codigo: codigo,
            iva: '13',
            nombre: 'filtros',
            precio_mayor: '17,56',
            precio_menor: '16',
            proveedor: 'BtaApps'
        });
    }

    setUpdateProducto = (producto) => {
        var db = firebase.database();
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/productos/' + producto.codigo);
        productosRef.update({
            cantidad: producto.cantidad,
            categoria: producto.categoria,
            codigo: producto.codigo,
            iva: producto.iva,
            nombre: producto.nombre,
            precio_mayor: producto.precio_mayor,
            precio_menor: producto.precio_menor,
            proveedor: producto.proveedor
        });
    }

    handleChangueList = (value) => {
        this.setState({ arryList: [], estadoTabla: 'cargando' })
        if (value === 'todos') {
            funtions.setTime(300, () => {
                this.setState({
                    arryList: this.state.arryListTemporal,
                    estadoTabla: 'llena'
                })
            })
        } else {
            funtions.setTime(500, () => {
                this.setState({
                    arryList: funtions.filterObjectsCategories(this.state.arryListTemporal, value),
                    estadoTabla: 'llena'
                })
            })

        }
    }

    handleSearch = (codigo) => {
        this.setState({ arryList: [], estadoTabla: 'cargando' })
        funtions.setTime(300, () => {
            let array = funtions.filterObjectsCodigo(this.state.arryListTemporal, codigo)
            if (array.length > 0) {
                this.setState({ estadoTabla: 'llena' })
            } else {
                this.setState({ estadoTabla: 'sin_resultados' })
            }
            this.setState({
                arryList: array
            })

        })
    }

    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }
        if (item.id === 'nombre') {
            return n.nombre
        }
        if (item.id === 'precio_mayor') {
            return n.precio_mayor
        }
        if (item.id === 'precio_menor') {
            return n.precio_menor
        }
        if (item.id === 'iva') {
            return n.iva
        }
        if (item.id === 'cantidad') {
            return n.cantidad
        }
    }

    handleClickOpen = () => {
        this.setState({ openModal: true });
    };

    handleClose = () => {
        this.setState({ openModal: false, itemProducto: null, });
    };

    handleDeleteItems = (itemsId) => {
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

    render() {

        return (
            <Layout title="Inventario">
                <div id="rootSnackBar"></div>
                <Search
                    id='buscar-producto'
                    textoSearch="Ingrese el codigo de su producto"
                    textoTooltip="Buscar por codigo de producto"
                    handleSearch={this.handleSearch}
                />
                <ChipsArray
                    title="Categorias de productos"
                    data={this.state.categorias}
                    handleChangueList={this.handleChangueList}
                />
                <SimpleTable
                    textoTitleP="Productos"
                    textoTitleS="Producto"
                    data={this.state.arryList}
                    rows={this.state.rows}
                    handleGetData={this.handleGetData}
                    handleClickOpen={this.handleClickOpen}
                    handleEditItem={this.handleEditItem}
                    handleDeleteItems={this.handleDeleteItems}
                    estadoTabla={this.state.estadoTabla}
                />
                <FullScreenDialog openModal={this.state.openModal}>
                    <ModalNewProducto
                        item={this.state.itemProducto}
                        handleClose={this.handleClose}
                        dataAutoCompleteCategorias={this.state.categorias}
                        dataAutoCompleteProveedores={this.state.proveedores}
                        setNewProducto={this.setNewProducto}
                        setUpdateProducto={this.setUpdateProducto}
                    >
                    </ModalNewProducto>
                </FullScreenDialog>
            </Layout>
        );
    }
}

export default Inventario;