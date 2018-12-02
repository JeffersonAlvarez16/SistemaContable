import React, { Component } from 'react';
import Layout from '../components/containers/Layout';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MenuHerramientas from '../components/components/menus/MenuHerramientas';
import ItemMenuHerramienta from '../components/components/menus/ItemMenuHerramienta';
import Search from '../components/components/Search';
import { Divider, Tooltip, IconButton, ExpansionPanel, Typography, ExpansionPanelDetails, Chip } from '@material-ui/core';
import TablaNormal from '../components/components/tables/TableNormal';
import funtions from '../utils/funtions';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';



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
            { id: 'estado', numeric: false, disablePadding: true, label: 'Estado' },
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
        tipo_accion: '',
        estadoPermisos: null
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

                {
                    n.tipo_usuario === 'administrador' ?
                        <strong style={{ textAlign: 'center' }}>No se puede Editar el usuario<br /> Administrador</strong>
                        :
                        <div style={{ display: 'flex' }}>
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


            </div>
        }

        if (item.id === 'estado') {
            return <div style={{ width: 'max-content' }}>{
                n.estado === true ?               
                   <strong style={{ textAlign: 'center' }}>Activo</strong>
                     :
                   <strong style={{ textAlign: 'center' }}>Inactivo</strong>
            }</div>
        }
        if (item.id === 'nombre_usuario') {
            return <div style={{ width: 'max-content' }}>{n.nombre}</div>
        }

        if (item.id === 'tipo_usuario') {
            return <div style={{ width: 'max-content' }}>{this.MaysPrimera(n.tipo_usuario)}</div>

        }



        if (item.id === 'privilegios') {
            return <div style={{ width: 'max-content' }}>
                <ExpansionPanel style={{ width: 350,backgroundColor:'#009688' }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography style={{color:'white'}}>Ver Privilegios</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div style={{ width: 'max-content' }}>
                            <div>Acceso a Productos
                {
                                    n.privilegios.productos ?
                                        <strong> Activado </strong>
                                        :
                                        <strong> Desactivado </strong>
                                }
                            </div>
                            <div>Acceso a Devolucion de Clientes
                {
                                    n.privilegios.stock.devolucion_cliente ?
                                        <strong> Activado </strong>
                                        :
                                        <strong> Desactivado </strong>
                                }
                            </div>
                            <div>Acceso a Compra de Productos
                {
                                    n.privilegios.stock.compra_productos ?
                                        <strong> Activado </strong>
                                        :
                                        <strong> Desactivado </strong>
                                }
                            </div>
                            <div>Acceso a Devolucion a Proveedores
                {
                                    n.privilegios.stock.devolucion_proveedor ?
                                        <strong> Activado </strong>
                                        :
                                        <strong> Desactivado </strong>
                                }
                            </div>
                            <div>Acceso a Ajustes de Stock
                {
                                    n.privilegios.stock.ajuste_stock ?
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
                    </ExpansionPanelDetails>
                </ExpansionPanel>

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
        if (accion === 'activar') {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var db = firebase.database();
                    var productosRef = db.ref('users/' + user.uid + '/usuarios/' + usuarioSeleccionado.code);
                    productosRef.update({
                        estado: true
                    })
                    this.setState({ estadoModalSimple: false })
                    setSnackBars.openSnack('info', 'rootSnackBar', 'Usuario activado correctamente', 2000)
                }
            })
        } else {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var db = firebase.database();
                    var productosRef = db.ref('users/' + user.uid + '/usuarios/' + usuarioSeleccionado.code);
                    productosRef.update({
                        estado: false
                    })
                    this.setState({ estadoModalSimple: false })
                    setSnackBars.openSnack('info', 'rootSnackBar', 'Usuario Desactivado correctamente', 2000)
                }
            })
        }

    }

    obtenerPermisosusuarios = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var usuariosRef = db.ref(`users/${user.uid}/usuarios/${this.state.usuario.code}`)
                usuariosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        if (snapshot.val().privilegios.usuarios === true) {
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

    MaysPrimera(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    render() {
        return (
            <Layout title="Usuarios" onChangueUserState={usuario => {
                this.setState({ usuario: usuario })
                setTimeout(() => {
                    this.obtenerPermisosusuarios()
                }, 100)
            }
            }>
                {
                    this.state.estadoPermisos === true &&
                    <div>
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

export default Usuarios