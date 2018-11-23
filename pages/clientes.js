import React, { Component } from 'react';
import Layout from '../components/containers/Layout';
import funtions from '../utils/funtions';
import SimpleTable from '../components/components/TableList';

import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


import firebase, { functions } from 'firebase/app';
import 'firebase/database';
import Search from '../components/components/Search';
import FullScreenDialog from '../components/components/FullScreenDialog';
import setSnackBars from '../components/plugins/setSnackBars';
import ModalNewCliente from '../components/modals_container/ModalNewCliente';
import ChipsArray from '../components/components/ChipArray';
import MenuHerramientas from '../components/components/menus/MenuHerramientas';
import ItemMenuHerramienta from '../components/components/menus/ItemMenuHerramienta';
import TablaNormal from '../components/components/tables/TableNormal';

import Divider from '@material-ui/core/Divider';
import ModalContainerNormal from '../components/modals_container/ModalContainerNormal';
import DeleteActivarDesactivar from '../components/plugins/deleteActivarDesactivar';
import ReturnTextTable from '../components/components/tables/ReturnTextTable';


class Clientes extends Component {

    state = {
        listaClientes: [],
        estadoTabla: 'cargando',
        listaClientesTemporal: [],
        openModalNewCliente: false,
        itemCliente: null,
        itemsSeleccionados: [],
        rowslistaClientes: [
            { id: 'acciones', numeric: false, disablePadding: true, label: 'Acciones' },
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'nombre', numeric: true, disablePadding: false, label: 'Nombre' },
            { id: 'identificacion', numeric: true, disablePadding: false, label: 'Numero de identificación' },
            { id: 'tipo_cliente', numeric: true, disablePadding: false, label: 'Tipo Cliente' },
            { id: 'fecha_nacimiento', numeric: true, disablePadding: false, label: 'Fecha Nacimiento' },
            { id: 'sexo', numeric: true, disablePadding: false, label: 'Sexo' },
            { id: 'telefono', numeric: true, disablePadding: false, label: 'Telefono' },
            { id: 'celular', numeric: true, disablePadding: false, label: 'Telefono' },
            { id: 'numero_identificacion', numeric: true, disablePadding: false, label: 'Numero identificación' },
            { id: 'direccion', numeric: true, disablePadding: false, label: 'Dirección' },
            { id: 'barrio', numeric: true, disablePadding: false, label: 'Barrio' },
            { id: 'ciudad', numeric: true, disablePadding: false, label: 'Ciudad' },
            { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
            { id: 'observacion', numeric: true, disablePadding: false, label: 'Observación' },
            { id: 'limite_deuda', numeric: true, disablePadding: false, label: 'Límite deuda' },
            { id: 'credito', numeric: true, disablePadding: false, label: 'Crédito' },
            { id: 'fecha_registro', numeric: true, disablePadding: false, label: 'Fecha registro' },
            { id: 'hora_registro', numeric: true, disablePadding: false, label: 'Hora registro' },
            { id: 'usuario', numeric: true, disablePadding: false, label: 'Usuario' },
        ],
        //usuario
        usuario: '',
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/clientes');
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaClientes: [],
                            listaClientesTemporal: [],
                            estadoTabla: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        var filterList = lista.sort((a, b) => {
                            a = new Date(a.order);
                            b = new Date(b.order);
                            return a > b ? -1 : a < b ? 1 : 0;
                        })
                        this.setState({
                            listaClientes: filterList,
                            listaClientesTemporal: filterList,
                            estadoTabla: 'llena'
                        })
                    } else {
                        this.setState({
                            listaClientes: [],
                            listaClientesTemporal: [],
                            estadoTabla: 'vacio'
                        })
                    }
                });
            }
        });
    }

    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return this.getColorActivadoDesactivado(n.estado, n.codigo)
        }

        if (item.id === 'acciones') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Tooltip title="Editar"  placement="left">
                    <IconButton aria-label="Editar" onClick={()=>{
                        this.setState({ itemSeleccionado: n })
                        this.setState({ openModalNewCliente: true })
                    }}>
                        <EditIcon color='primary' />
                    </IconButton>
                </Tooltip>
                {
                    Boolean(n.estado) ?
                        <Tooltip title="Desactivar" placement="right">
                            <IconButton aria-label="Desactivar" onClick={() => {
                                this.setState({ itemSeleccionado: n })
                                this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'desactivar' })
                            }}>
                                <VisibilityOffIcon />
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="Activar">
                            <IconButton aria-label="Activar" onClick={() => {
                                this.setState({ itemSeleccionado: n })
                                this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'activar' })
                            }}>
                                <VisibilityIcon color='primary' />
                            </IconButton>
                        </Tooltip>
                }


            </div>
        }

        if (item.id === 'nombre') {
            return <div style={{ width: 'max-content' }}>{this.getColorActivadoDesactivado(n.estado, n.nombre)}</div>
        }
        if (item.id === 'identificacion') {
            return <div style={{ width: 'max-content' }}>{this.getColorActivadoDesactivado(n.estado, n.numero_identificacion)}</div>
        }

        if (item.id === 'tipo_cliente') {
            return this.getColorActivadoDesactivado(n.estado, n.empresa === true ? 'empresa' : 'persona')
        }

        if (item.id === 'fecha_nacimiento') {
            return this.getColorActivadoDesactivado(n.estado, n.fecha_nacimiento)
        }

        if (item.id === 'sexo') {
            return this.getColorActivadoDesactivado(n.estado, n.sexo)
        }

        if (item.id === 'telefono') {
            return this.getColorActivadoDesactivado(n.estado, n.telefono)
        }

        if (item.id === 'celular') {
            return this.getColorActivadoDesactivado(n.estado, n.celular)
        }

        if (item.id === 'numero_identificacion') {
            return this.getColorActivadoDesactivado(n.estado, n.numero_identificacion)
        }

        if (item.id === 'direccion') {
            return <div style={{ width: 'max-content' }}>{this.getColorActivadoDesactivado(n.estado, n.direccion)}</div>
        }

        if (item.id === 'barrio') {
            return this.getColorActivadoDesactivado(n.estado, n.barrio)
        }

        if (item.id === 'ciudad') {
            return this.getColorActivadoDesactivado(n.estado, n.ciudad)
        }

        if (item.id === 'email') {
            return this.getColorActivadoDesactivado(n.estado, n.email)
        }

        if (item.id === 'observacion') {
            return this.getColorActivadoDesactivado(n.estado, n.observacion)
        }

        if (item.id === 'limite_deuda') {
            return this.getColorActivadoDesactivado(n.estado, n.limite_deuda)
        }

        if (item.id === 'credito') {
            return this.getColorActivadoDesactivado(n.estado, n.credito)
        }

        if (item.id === 'fecha_registro') {
            return this.getColorActivadoDesactivado(n.estado, n.fecha_registro)
        }

        if (item.id === 'hora_registro') {
            return this.getColorActivadoDesactivado(n.estado, n.hora_registro)
        }

        if (item.id === 'usuario') {
            return <ReturnTextTable
            referencia="usuarios"
            codigo={n.usuario}
            datoTraido="nombre"
            estado={n.estado}
        />
        }
    }

    getColorActivadoDesactivado = (estado, texto) =>
        estado === false ?
            <div style={{ color: 'rgba(0,0,0,0.5)' }}>
                {texto}
            </div>
            : texto

    handleSearch = (codigo) => {
        this.setState({ listaProductos: [], estadoTabla: 'cargando' })
        funtions.setTime(300, () => {
            let array = funtions.filterObjectsCodigo(this.state.listaClientesTemporal, codigo)
            if (array.length > 0) {
                this.setState({ estadoTabla: 'llena' })
            } else {
                this.setState({ estadoTabla: 'sin_resultados' })
            }
            this.setState({
                listaProductos: array
            })

        })
    }


    handleEliminarItems = (itemsSeleccionados) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                itemsSeleccionados.forEach(element => {
                    var productosRef = db.ref('users/' + user.uid + '/clientes/' + element.codigo);
                    productosRef.remove()
                });
            }
        })
        this.setState({
            itemsSeleccionados: [],
            estadoModalSimple: false
        })
        setSnackBars.openSnack('success', 'rootSnackBar', 'Clientes eliminados correctamente', 2000)
    }

    handleActivarItems = (itemsSeleccionados) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                itemsSeleccionados.forEach(element => {
                    var productosRef = db.ref('users/' + user.uid + '/clientes/' + element.codigo);
                    productosRef.update({
                        estado: true
                    })
                });
            }
        })
        this.setState({ estadoModalSimple: false })
        setSnackBars.openSnack('info', 'rootSnackBar', 'Clientes activados correctamente', 2000)
    }

    handleDesactivarItems = (itemsSeleccionados) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                itemsSeleccionados.forEach(element => {
                    var productosRef = db.ref('users/' + user.uid + '/clientes/' + element.codigo);
                    productosRef.update({
                        estado: false
                    })
                });
            }
        })
        this.setState({ estadoModalSimple: false })
        setSnackBars.openSnack('warning', 'rootSnackBar', 'Clientes desactivados correctamente', 2000)
    }

    render() {
        return (
            <Layout title="Clientes" onChangueUserState={usuario => this.setState({ usuario: usuario })}>

                <MenuHerramientas>
                    <ItemMenuHerramienta
                        titleButton="Nuevo Cliente"
                        color="primary"
                        visible={true}
                        onClick={() => this.setState({  itemSeleccionado:null, openModalNewCliente: true })}
                    />
                  

                    <div style={{ flex: 0.9 }}></div>

                    <Search
                        id='buscar-cliente-clientes'
                        textoSearch="Buscar..."
                        textoTooltip="Buscar Cliente"
                        handleSearch={this.handleSearch}
                    />
                </MenuHerramientas>

                <Divider />

                <TablaNormal
                    textoTitleP="Clientes"
                    textoTitleS="Cliente"
                    selectedItems={true}
                    toolbar={false}
                    notTab={true}
                    data={this.state.listaClientes}
                    rows={this.state.rowslistaClientes}
                    handleGetData={this.handleGetData}
                    estadoTabla={this.state.estadoTabla}
                    itemsSeleccionados={items => this.setState({ itemsSeleccionados: items })}
                />

                <FullScreenDialog openModal={this.state.openModalNewCliente}>
                    <ModalNewCliente
                        item={this.state.itemSeleccionado}
                        handleClose={() => this.setState({ openModalNewCliente: false })}
                        usuario={this.state.usuario}
                    >
                    </ModalNewCliente>
                </FullScreenDialog>

                <ModalContainerNormal
                    open={this.state.estadoModalSimple}
                    handleClose={() => this.setState({ estadoModalSimple: false })}
                >
                    <DeleteActivarDesactivar
                        tipo={this.state.estadoModalDeleteActivarDesactivar}
                        handleClose={() => this.setState({ estadoModalSimple: false })}
                        handleEliminarItems={() => this.handleEliminarItems([this.state.itemSeleccionado])}
                        handleActivarItems={() => this.handleActivarItems([this.state.itemSeleccionado])}
                        handleDesactivarItems={() => this.handleDesactivarItems([this.state.itemSeleccionado])}
                    />
                </ModalContainerNormal>
            </Layout>
        );
    }
}

export default Clientes