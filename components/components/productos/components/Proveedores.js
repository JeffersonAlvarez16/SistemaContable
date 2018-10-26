import React, { Component } from 'react';
import MenuHerramientas from '../../menus/MenuHerramientas'
import ItemMenuHerramienta from '../../menus/ItemMenuHerramienta'
import TablaNormal from '../../tables/TableNormal'
import Divider from '@material-ui/core/Divider';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import funtions from '../../../../utils/funtions';

//dialogs
import FullScreenDialog from '../../../../components/components/FullScreenDialog';
import ModalNewEditProveedor from '../../../../components/modals_container/ModalNewEditProveedor';
import ModalContainerNormal from '../../../modals_container/ModalContainerNormal';
import DeleteActivarDesactivar from '../../../plugins/deleteActivarDesactivar';
import setSnackBars from '../../../plugins/setSnackBars';

class Proveedores extends Component {

    state = {
        listaProveedores: [],
        rowslistaStock: [
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'nombre', numeric: true, disablePadding: false, label: 'Nombre' },
            { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
            { id: 'tipo', numeric: true, disablePadding: false, label: 'Tipo' },
            { id: 'celular', numeric: true, disablePadding: false, label: 'celular' },
            { id: 'telefono', numeric: true, disablePadding: false, label: 'Telefono' },
            { id: 'direccion', numeric: true, disablePadding: false, label: 'Dirección' },
            { id: 'observacion', numeric: true, disablePadding: false, label: 'Observacion' },
            { id: 'usuario', numeric: true, disablePadding: false, label: 'Empleado' },
            { id: 'ciudad', numeric: true, disablePadding: false, label: 'Ciudad' },
            { id: 'barrio', numeric: true, disablePadding: false, label: 'Barrio' },
            { id: 'fecha', numeric: true, disablePadding: false, label: 'Fecha de registro' },
            { id: 'hora', numeric: true, disablePadding: false, label: 'Hora' },
        ],
        estadoTabla: 'llena',

        //modals
        openModalFullScreen: false,
        estadoModalSimple: false,
        estadoModalDeleteActivarDesactivar: 'eliminar',
        //item Selecionado
        itemsSeleccionados: []
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/proveedores');
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaProveedores: [],
                            listaProveedoresTemporal: [],
                            estadoTabla: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        this.setState({
                            listaProveedores: lista,
                            listaProveedoresTemporal: lista,
                            estadoTabla: 'llena'
                        })
                        /* this.setState({
                            categorias: funtions.categorieToKey(funtions.repeatTo(funtions.inventarioToCategories(snapshot))),
                            proveedores: funtions.categorieToKey(funtions.repeatTo(funtions.inventarioToProveedores(snapshot)))
                        }) */
                    } else {
                        this.setState({
                            listaProveedores: [],
                            listaProveedoresTemporal: [],
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
            return this.getColorActivadoDesactivado(n.estado, n.codigo)
        }
        if (item.id === 'nombre') {
            return this.getColorActivadoDesactivado(n.estado, n.nombre)
        }
        if (item.id === 'email') {
            return this.getColorActivadoDesactivado(n.estado, n.email)
        }
        if (item.id === 'tipo') {
            return this.getColorActivadoDesactivado(n.estado, n.tipo)
        }
        if (item.id === 'celular') {
            return this.getColorActivadoDesactivado(n.estado, n.celular)
        }
        if (item.id === 'telefono') {
            return this.getColorActivadoDesactivado(n.estado, n.telefono)
        }
        if (item.id === 'direccion') {
            return this.getColorActivadoDesactivado(n.estado, n.direccion)
        }
        if (item.id === 'observacion') {
            return this.getColorActivadoDesactivado(n.estado, n.observacion)
        }
        if (item.id === 'usuario') {
            return this.getColorActivadoDesactivado(n.estado, n.usuario.nombre)
        }
        if (item.id === 'ciudad') {
            return this.getColorActivadoDesactivado(n.estado, n.ciudad)
        }
        if (item.id === 'barrio') {
            return this.getColorActivadoDesactivado(n.estado, n.barrio)
        }
        if (item.id === 'fecha') {
            return this.getColorActivadoDesactivado(n.estado, n.fecha)
        }
        if (item.id === 'hora') {
            return this.getColorActivadoDesactivado(n.estado, n.hora)
        }
    }

    getColorActivadoDesactivado = (estado, texto) =>
        estado === false ?
            <div style={{ color: 'rgba(0,0,0,0.5)' }}>
                {texto}
            </div>
            : texto


    handleEliminarItems = (itemsSeleccionados) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                itemsSeleccionados.forEach(element => {
                    var productosRef = db.ref('users/' + user.uid + '/proveedores/' + element.codigo);
                    productosRef.remove()
                });
            }
        })
        this.setState({ 
            itemsSeleccionados:[],
            estadoModalSimple: false })
        setSnackBars.openSnack('success', 'rootSnackBar', 'Proveedores eliminados correctamente', 2000)
    }

    handleActivarItems = (itemsSeleccionados) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                itemsSeleccionados.forEach(element => {
                    var productosRef = db.ref('users/' + user.uid + '/proveedores/' + element.codigo);
                    productosRef.update({
                        estado: true
                    })
                });
            }
        })
        this.setState({ estadoModalSimple: false })
        setSnackBars.openSnack('info', 'rootSnackBar', 'Proveedores activados correctamente', 2000)
    }

    handleDesactivarItems = (itemsSeleccionados) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                itemsSeleccionados.forEach(element => {
                    var productosRef = db.ref('users/' + user.uid + '/proveedores/' + element.codigo);
                    productosRef.update({
                        estado: false
                    })
                });
            }
        })
        this.setState({ estadoModalSimple: false })
        setSnackBars.openSnack('warning', 'rootSnackBar', 'Proveedores desactivados correctamente', 2000)
    }


    render() {
        return (
            <div>
                <MenuHerramientas>
                    <ItemMenuHerramienta
                        titleButton="Nuevo"
                        color="primary"
                        visible={true}
                        disabled={this.state.itemsSeleccionados.length > 0}
                        onClick={() => this.setState({ openModalFullScreen: true })}
                    />
                    <ItemMenuHerramienta
                        titleButton="Editar"
                        color="primary"
                        visible={true}
                        disabled={this.state.itemsSeleccionados.length === 1?false:true }
                        onClick={() => {
                            if (this.state.itemsSeleccionados.length > 0) {
                                this.setState({ openModalFullScreen: true })
                            }
                        }}
                    />
                    <ItemMenuHerramienta
                        titleButton="Eliminar"
                        color="primary"
                        visible={true}
                        disabled={!this.state.itemsSeleccionados.length > 0}
                        onClick={() => {
                            if (this.state.itemsSeleccionados.length > 0) {
                                this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'eliminar' })
                            }
                        }}
                    />
                    <ItemMenuHerramienta
                        titleButton="Activar"
                        color="primary"
                        visible={true}
                        disabled={!this.state.itemsSeleccionados.length > 0}
                        onClick={() => {
                            if (this.state.itemsSeleccionados.length > 0) {
                                this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'activar' })
                            }
                        }}
                    />
                    <ItemMenuHerramienta
                        titleButton="Desactivar"
                        color="primary"
                        visible={true}
                        disabled={!this.state.itemsSeleccionados.length > 0}
                        onClick={() => {
                            if (this.state.itemsSeleccionados.length > 0) {
                                this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'desactivar' })
                            }
                        }}
                    />
                </MenuHerramientas>

                <Divider />

                <TablaNormal
                    textoTitleP="Proveedores"
                    textoTitleS="Proveedor"
                    selectedItems={false}
                    toolbar={false}
                    data={this.state.listaProveedores}
                    rows={this.state.rowslistaStock}
                    handleGetData={this.handleGetData}
                    estadoTabla={this.state.estadoTabla}
                    itemsSeleccionados={items => this.setState({ itemsSeleccionados: items })}
                />

                <FullScreenDialog openModal={this.state.openModalFullScreen}>
                    <ModalNewEditProveedor
                        item={this.state.itemsSeleccionados[0]}
                        handleClose={() => this.setState({ openModalFullScreen: false })}
                        usuario={this.props.usuario}
                    />
                </FullScreenDialog>

                <ModalContainerNormal
                    open={this.state.estadoModalSimple}
                    handleClose={() => this.setState({ estadoModalSimple: false })}
                >
                    <DeleteActivarDesactivar
                        tipo={this.state.estadoModalDeleteActivarDesactivar}
                        handleClose={() => this.setState({ estadoModalSimple: false })}
                        handleEliminarItems={() => this.handleEliminarItems(this.state.itemsSeleccionados)}
                        handleActivarItems={() => this.handleActivarItems(this.state.itemsSeleccionados)}
                        handleDesactivarItems={() => this.handleDesactivarItems(this.state.itemsSeleccionados)}
                    />
                </ModalContainerNormal>
            </div>
        );
    }
}

export default Proveedores;