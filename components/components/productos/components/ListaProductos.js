import React, { Component } from 'react';
import MenuHerramientas from '../../../../components/components/menus/MenuHerramientas'
import ItemMenuHerramienta from '../../../../components/components/menus/ItemMenuHerramienta'
import TablaNormal from '../../tables/TableNormal'
import Divider from '@material-ui/core/Divider';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import funtions from '../../../../utils/funtions';

//dialogs
import FullScreenDialog from '../../../../components/components/FullScreenDialog';
import ModalNewProducto from '../../../../components/modals_container/ModalNewProducto';

class ListaProductos extends Component {

    state={
        //lista de los pruductos
        listaProductos:[],
        //lista de los pruductos temporales
        listaProductosTemporal:[],
        //columnas de la tabla de productos
        rowsListaProductos: [
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'nombre', numeric: true, disablePadding: false, label: 'Nombre' },
            { id: 'precio_mayor', numeric: true, disablePadding: false, label: 'Precio Mayor' },
            { id: 'precio_menor', numeric: true, disablePadding: false, label: 'Precio Menor' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Iva (%)' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Iva (%)' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Iva (%)' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Iva (%)' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Iva (%)' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Iva (%)' },
            { id: 'cantidad', numeric: true, disablePadding: false, label: 'Cantidad' }
        ],
        //estado de la tabla
        estadoTabla:'cargando',
        //Estado del modal fullScrenn
        openModalFullScreen:false
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/productos');
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaProductos: [],
                            listaProductosTemporal: [],
                            estadoTabla: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        this.setState({
                            listaProductos: lista,
                            listaProductosTemporal: lista,
                            estadoTabla: 'llena'
                        })
                        /* this.setState({
                            categorias: funtions.categorieToKey(funtions.repeatTo(funtions.inventarioToCategories(snapshot))),
                            proveedores: funtions.categorieToKey(funtions.repeatTo(funtions.inventarioToProveedores(snapshot)))
                        }) */
                    } else {
                        this.setState({
                            listaProductos: [],
                            listaProductosTemporal: [],
                            //categorias: [],
                            //proveedores: [],
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

    render() {
        return (
            <div >
                <MenuHerramientas>
                    <ItemMenuHerramienta
                        titleButton="Nuevo"
                        color="primary"
                        visible={true}
                        onClick={() => this.setState({openModalFullScreen:true})}
                    />
                    <ItemMenuHerramienta
                        titleButton="Editar"
                        color="primary"
                        visible={true}
                        onClick={() => console.log("Hola")}
                    />
                    <ItemMenuHerramienta
                        titleButton="Eliminar"
                        color="primary"
                        visible={true}
                        onClick={() => console.log("Hola")}
                    />
                    <ItemMenuHerramienta
                        titleButton="Añadir vencimiento"
                        color="primary"
                        visible={true}
                        onClick={() => console.log("Hola")}
                    />
                    <ItemMenuHerramienta
                        titleButton="Activar"
                        color="primary"
                        visible={true}
                        onClick={() => console.log("Hola")}
                    />
                    <ItemMenuHerramienta
                        titleButton="Desactivar"
                        color="primary"
                        visible={true}
                        onClick={() => console.log("Hola")}
                    />
                </MenuHerramientas>

                <Divider />

                <TablaNormal
                    textoTitleP="Productos"
                    textoTitleS="Producto"                    
                    selectedItems={false}
                    toolbar={false}                    
                    data={this.state.listaProductos}
                    rows={this.state.rowsListaProductos}
                    handleGetData={this.handleGetData}
                    estadoTabla={this.state.estadoTabla}
                />

                <FullScreenDialog openModal={this.state.openModalFullScreen}>
                    <ModalNewProducto
                        item={this.state.itemProducto}
                        handleClose={()=>this.setState({openModalFullScreen:false})}
                        setNewProducto={this.setNewProducto}
                        setUpdateProducto={this.setUpdateProducto}
                        usuario={this.props.usuario}
                    >
                    </ModalNewProducto>
                </FullScreenDialog>
            </div>
        );
    }
}

export default ListaProductos;