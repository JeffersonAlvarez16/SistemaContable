import React, { Component } from 'react';
import Layout from '../components/containers/Layout';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MenuHerramientas from '../components/components/menus/MenuHerramientas';
import ItemMenuHerramienta from '../components/components/menus/ItemMenuHerramienta';
import Search from '../components/components/Search';
import { Divider, Tooltip, IconButton } from '@material-ui/core';
import TablaNormal from '../components/components/tables/TableNormal';
import funtions from '../utils/funtions';
import CloseIcon from '@material-ui/icons/Close';



//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import FullScreenDialog from '../components/components/FullScreenDialog';
import ModalNewEditarUsuarios from '../components/plugins/Usuarios/ModalNewEditarUsuarios';
import ModalContainerNormal from '../components/modals_container/ModalContainerNormal';
import ModalEliminarUsuario from '../components/modals_container/usuarios/ModalEliminarUsuario';
import setSnackBars from '../components/plugins/setSnackBars';
import ReturnTextTable from '../components/components/tables/ReturnTextTable';


class Usuarios extends Component {
    state = {
        usuario: {},
        itemsSeleccionados: [],
        listaUsuarios: [],
        estadoTabla: 'cargando',
        listaVentasTemporal: [],

        rowslistaUsuarios: [
            { id: 'accions', numeric: false, disablePadding: true, label: 'Acciones' },
            { id: 'nombre_usuario', numeric: false, disablePadding: true, label: 'Nombre Usuario' },
            { id: 'tipo_usuario', numeric: false, disablePadding: true, label: 'Tipo Usuario' },
            { id: 'privilegios', numeric: true, disablePadding: false, label: 'Privilegios' },
            { id: 'privilegiosGenerales', numeric: true, disablePadding: false, label: 'Privilegios Generales' },
            /*  { id: 'valor', numeric: true, disablePadding: false, label: 'Valor de Retención' },
             { id: 'tipo_retencion', numeric: true, disablePadding: false, label: 'Tipo de Retención' },
             { id: 'telefono', numeric: true, disablePadding: false, label: 'Sujeto - Telefono' },
             { id: 'identificacion', numeric: true, disablePadding: false, label: 'Sujeto - Identificación' },
             { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
             { id: 'fecha', numeric: true, disablePadding: false, label: 'Fecha' },
             { id: 'hora', numeric: true, disablePadding: false, label: 'Hora' },
             { id: 'empleado', numeric: true, disablePadding: false, label: 'Empleado' }, */
        ],

        openModalNewUsuario: false,
        openModalEliminarUsuario: false,
        itemEditar: {},
        tipo_accion: ''
    }

    componentDidMount() {
        this.obtenerDataBaseDatos()
    }

    obtenerDataBaseDatos = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var retencionesRef = db.ref('users/' + user.uid + '/usuarios/').orderByChild('codigo')
                retencionesRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaUsuarios: [],
                            listaUsuariosTemporal: [],
                            estadoTabla: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        /* var filterList = lista.sort((a, b) => {
                            a = new Date(a.order);
                            b = new Date(b.order);
                            return a > b ? -1 : a < b ? 1 : 0;
                        }) */
                        this.setState({
                            listaUsuarios: lista,
                            listaUsuariosTemporal: lista,
                            estadoTabla: 'llena'
                        })
                    } else {
                        this.setState({
                            listaUsuarios: [],
                            listaUsuariosTemporal: [],
                            estadoTabla: 'vacio'
                        })
                    }
                });
            }
        });
    }

    handleGetData = (n, item) => {
        if (item.id === 'accions') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Tooltip title="Editar" placement="left">
                    <IconButton aria-label="Editar"
                        onClick={() => {
                            this.setState({
                                itemEditar: n,
                                openModalNewUsuario: true,
                                tipo_accion: 'editar'

                            })
                        }}>
                        <EditIcon color='primary' />
                    </IconButton>
                </Tooltip>

                {
                    Boolean(n.estado) ?
                        <Tooltip title="Desactivar" placement="right">
                            <IconButton
                                aria-label="Desactivar"
                                onClick={() => {
                                    this.setState({
                                        openModalEliminarUsuario: true,
                                        tipo_accion: 'desactivar',
                                        itemEditar: n
                                    })
                                }}>
                                <VisibilityOffIcon />
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="Activar">
                            <IconButton
                                aria-label="Activar"
                                onClick={() => {
                                    this.setState({
                                        openModalEliminarUsuario: true,
                                        tipo_accion: 'activar',
                                        itemEditar: n

                                    })
                                }}>
                                <VisibilityIcon color='primary' />
                            </IconButton>
                        </Tooltip>
                }


            </div>
        }

        if (item.id === 'nombre_usuario') {
            return <div style={{ width: 'max-content' }}>{n.nombre}</div>
        }

        if (item.id === 'tipo_usuario') {
            return <div style={{ width: 'max-content' }}>{n.tipo_usuario}</div>

        }



        if (item.id === 'privilegios') {
            return <div style={{ width: 'max-content' }}>
                <div>Acceso a Productos
                {
                        n.privilegios.productos ?
                            <strong> Activado </strong>
                            :
                            <strong> Desactivado </strong>
                    }
                </div>
                <div>Acceso a Stock
                {
                        n.privilegios.stock ?
                            <strong> Activado </strong>
                            :
                            <strong> Desactivado </strong>
                    }
                </div>
                <div>Acceso a Proveedores
                {
                        n.privilegios.proveedores ?
                            <strong> Activado </strong>
                            :
                            <strong> Desactivado </strong>
                    }
                </div>
                <div>Acceso a Clientes
                {
                        n.privilegios.clientes ?
                            <strong> Activado </strong>
                            :
                            <strong> Desactivado </strong>
                    }
                </div>
                <div>Acceso a Ventas
                {
                        n.privilegios.ventas ?
                            <strong> Activado </strong>
                            :
                            <strong> Desactivado </strong>
                    }
                </div>
                <div>Acceso a Retenciones
                {
                        n.privilegios.retenciones ?
                            <strong> Activado </strong>
                            :
                            <strong> Desactivado </strong>
                    }
                </div>
                <div>Acceso a Usuarios
                {
                        n.privilegios.usuarios ?
                            <strong> Activado </strong>
                            :
                            <strong> Desactivado </strong>
                    }
                </div>
            </div>
        }
        if (item.id === 'privilegiosGenerales') {
            return <div style={{ width: 'max-content' }}>{
                n.privilegiosGenerales.generales ?
                    <strong> Tiene Acceso a Configurar Precios</strong>
                    :
                    <strong> No tiene Acceso a Configurar Precios</strong>
            }</div>
        }
    }


    handleEliminarUsuario = codigo => {
        var db = firebase.database();
        var userRef = db.ref('users/' + firebase.auth().currentUser.uid + '/usuarios/' + codigo.code);
        userRef.remove()
        setSnackBars.openSnack('warning', 'rootSnackBar', 'Usuario eliminado con exito', 2000)
    }

    handleActivarUsuario = (usuarioSeleccionado, accion) => {
        console.log(accion)
        if (accion === 'activar') {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var db = firebase.database();
                    var productosRef = db.ref('users/' + user.uid + '/usuarios/' + usuarioSeleccionado.code);
                    console.log(productosRef.toString())
                    productosRef.update({
                        estado: true
                    })
                    this.setState({ estadoModalSimple: false })
                    setSnackBars.openSnack('info', 'rootSnackBar', 'Usuario activado correctamente', 2000)

                }
            })
        }else{
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var db = firebase.database();
                    var productosRef = db.ref('users/' + user.uid + '/usuarios/' + usuarioSeleccionado.code);
                   
                    productosRef.update({
                        estado: false
                    })
                    this.setState({ estadoModalSimple: false })
                    setSnackBars.openSnack('info', 'rootSnackBar', 'Usuario activado correctamente', 2000)

                }
            })
        }

    }
    render() {
        return (
            <Layout title="Usuarios" onChangueUserState={usuario => this.setState({ usuario: usuario })}>
                <MenuHerramientas>

                    <ItemMenuHerramienta
                        titleButton="Nuevo Usuario"
                        color="primary"
                        visible={true}
                        onClick={() => {
                            this.setState({ itemEditar: null })
                            this.setState({ openModalNewUsuario: true })
                        }}
                    />
                    <div>
                        joder carajop
                    </div>
                    <div>
                        joder carajop
                    </div>
                    <div>
                        joder carajop
                    </div>
                    <div>
                        joder carajop
                    </div>
                    <div>
                        joder carajop
                    </div>
                    <div style={{ flex: 0.9 }}></div>

                    <Search
                        id='buscar-cliente-clientes'
                        textoSearch="Buscar..."
                        textoTooltip="Buscar Usuario"
                        handleSearch={this.handleSearch}
                    />
                </MenuHerramientas>
                <Divider />
                <TablaNormal
                    textoTitleP="Usuarios"
                    textoTitleS="Usuarios"
                    selectedItems={true}
                    toolbar={false}
                    notTab={true}
                    data={this.state.listaUsuarios}
                    rows={this.state.rowslistaUsuarios}
                    handleGetData={this.handleGetData}
                    estadoTabla={this.state.estadoTabla}
                    itemsSeleccionados={items => {
                        this.setState({ itemsSeleccionados: items })
                    }}
                />

                <ModalContainerNormal
                    open={this.state.openModalNewUsuario} >
                    <ModalNewEditarUsuarios
                        handleClose={() => this.setState({ openModalNewUsuario: false, itemEditar: null })}
                        item={this.state.itemEditar} />
                </ModalContainerNormal>

                <ModalContainerNormal open={this.state.openModalEliminarUsuario}>
                    <ModalEliminarUsuario
                        usuario={this.state.codigoEliminarUsuario}
                        tipo_accion={this.state.tipo_accion}
                        handleClose={() => this.setState({ openModalEliminarUsuario: false, itemEditar: null })}
                        handleActivarUsuario={() => {
                            this.handleActivarUsuario(this.state.itemEditar, this.state.tipo_accion)
                            this.setState({ openModalEliminarUsuario: false, })
                        }} />
                </ModalContainerNormal>
                {/*  <ModalNewEditarUsuarios
                        usuario={this.state.usuario}
                        openModal={this.state.openModalNewUsuario}
                        
                       /> */}

            </Layout>
        );
    }
}

export default Usuarios