import React, { Component } from 'react';
import Layout from '../components/containers/Layout';
import funtions from '../utils/funtions';
import SimpleTable from '../components/components/TableList';

import firebase, { functions } from 'firebase/app';
import 'firebase/database';
import Search from '../components/components/Search';
import FullScreenDialog from '../components/components/FullScreenDialog';
import setSnackBars from '../components/plugins/setSnackBars';
import ModalNewCliente from '../components/modals_container/ModalNewCliente';
import ChipsArray from '../components/components/ChipArray';

class Contactos extends Component {

    state = {
        arryList: [],
        estadoTabla: 'cargando',
        arryListTemporal: [],
        openModal: false,
        itemCliente: null,
        cedulas:[],
        tipos_contactos:[],
        rows: [
            { id: 'cedula', numeric: false, disablePadding: true, label: 'CI/RUC/NIE' },
            { id: 'nombres', numeric: true, disablePadding: false, label: 'Nombres' },
            { id: 'correo', numeric: true, disablePadding: false, label: 'Correo' },
            { id: 'ciudad', numeric: true, disablePadding: false, label: 'Ciudad' },
            { id: 'telefono', numeric: true, disablePadding: false, label: 'Telefono' }
        ]
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/contactos');
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
                            cedulas: funtions.categorieToKey(funtions.repeatTo(funtions.contactosToCedulas(snapshot))),
                            tipos_contactos: funtions.categorieToKey(funtions.repeatTo(funtions.contactosToTipos(snapshot))),
                        })

                    } else {
                        this.setState({
                            arryList: [],
                            arryListTemporal: [],
                            estadoTabla: 'vacio'
                        })
                    }
                });
                /*  for (var i = 0; i < 50; i++) {
                    this.setNewProductosData('19006775'+i)
                } 
                 */
            }
        });
    }

    handleGetData = (n, item) => {
        if (item.id === 'cedula') {
            return n.cedula
        }
        if (item.id === 'nombres') {
            return n.nombres
        }
        if (item.id === 'correo') {
            return n.correo
        }
        if (item.id === 'ciudad') {
            return n.ciudad
        }
        if (item.id === 'telefono') {
            return n.telefono
        }
    }

    handleSearch = (cedula) => {
        this.setState({ arryList: [], estadoTabla: 'cargando' })
        funtions.setTime(300, () => {
            let array = funtions.filterObjectsCedula(this.state.arryListTemporal, cedula)
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

    handleClickOpen = () => {
        this.setState({ openModal: true });
    };

    handleClose = () => {
        this.setState({ openModal: false, itemCliente: null, });
    };

    handleDeleteItems = (itemsId) => {
        itemsId.map(item => {
            var db = firebase.database();
            var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/contactos/' + item);
            productosRef.remove()
        })
        setSnackBars.openSnack('info', 'rootSnackBar', itemsId.length === 1 ? itemsId.length + ' Contacto eliminado' : itemsId.length + ' productos eliminados', 2000)
    }

    handleEditItem = (itemId) => {
        var db = firebase.database();
        var productoRef = db.ref('users/' + firebase.auth().currentUser.uid + '/contactos/' + itemId);
        productoRef.on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({
                    itemCliente: {}
                })
                var hhh = snapshot.val()
                this.setState({
                    itemCliente: hhh
                })
                this.handleClickOpen()
            }
        });
    }

    setNewProducto = (producto) => {
        var db = firebase.database();
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/contactos/' + producto.cedula);
        productosRef.set({
            tipo_identificacion: producto.tipo_identificacion,
            cedula: producto.cedula,
            nombres: producto.nombres,
            direccion: producto.direccion,
            correo: producto.correo,
            ciudad: producto.ciudad,
            telefono: producto.telefono,
            tipo: producto.tipo,
            razon_social: producto.razon_social
        });
    }

    setUpdateProducto = (producto) => {
        var db = firebase.database();
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/contactos/' + producto.cedula);
        productosRef.update({
            tipo_identificacion: producto.tipo_identificacion,
            cedula: producto.cedula,
            nombres: producto.nombres,
            direccion: producto.direccion,
            correo: producto.correo,
            ciudad: producto.ciudad,
            telefono: producto.telefono,
            tipo: producto.tipo,
            razon_social: producto.razon_social
        });
    }

    setNewProductosData = (cedula) => {
        var db = firebase.database();
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/contactos/' + cedula);
        productosRef.set({
            tipo_identificacion: 'cedula',
            cedula: cedula,
            nombres: 'Darwin Efrain Alvarez Paqui',
            direccion: 'Av Principal y Amazonica',
            correo: 'darwin.da64@gmail.com',
            ciudad: 'Panguitza',
            telefono: '0985056954',
            tipo: 'cliente',
            razon_social: 'Empresa'
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
                    arryList: funtions.filterObjectsTipos(this.state.arryListTemporal, value),
                    estadoTabla: 'llena'
                })
            })

        }
    }

    render() {
        return (
            <Layout title="Contactos">
                <div id="rootSnackBar"></div>
                <Search
                    id='buscar-ccontactos'
                    textoSearch="Ingrese la cedula de su contacto"
                    textoTooltip="Buscar por cedula de contacto"
                    handleSearch={this.handleSearch}
                />
                <ChipsArray
                    title="Tipos de Contactos"
                    data={this.state.tipos_contactos}
                    handleChangueList={this.handleChangueList}
                />
                <SimpleTable
                    textoTitleP="Contactos"
                    textoTitleS="Contacto"
                    data={this.state.arryList}
                    rows={this.state.rows}
                    handleGetData={this.handleGetData}
                    handleClickOpen={this.handleClickOpen}
                    handleEditItem={this.handleEditItem}
                    handleDeleteItems={this.handleDeleteItems}
                    estadoTabla={this.state.estadoTabla}
                />
                <FullScreenDialog openModal={this.state.openModal}>
                    <ModalNewCliente
                        item={this.state.itemCliente}
                        handleClose={this.handleClose}
                        setNewProducto={this.setNewProducto}
                        setUpdateProducto={this.setUpdateProducto}
                        cedulas={this.state.cedulas}
                    >
                    </ModalNewCliente>
                </FullScreenDialog>
            </Layout>
        );
    }
}

export default Contactos