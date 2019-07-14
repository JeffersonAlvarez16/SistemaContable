import React, { Component } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ItemMenuHerramienta from '../../components/components/menus/ItemMenuHerramienta';
import { Divider, Tooltip, IconButton, ExpansionPanel, Typography, ExpansionPanelDetails } from '@material-ui/core';
import TablaNormal from '../../components/components/tables/TableNormal';
import funtions from '../../utils/funtions';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import { Chip } from '@material-ui/core';
import ReactGA from 'react-ga';


//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import FullScreenDialog from '../../components/components/FullScreenDialog';
import ModalNewEditarUsuarios from '../../components/plugins/Usuarios/ModalNewEditarUsuarios';
import ModalEliminarUsuario from '../../components/modals_container/usuarios/ModalEliminarUsuario';
import setSnackBars from '../../components/plugins/setSnackBars';
import ReturnTextTable from '../../components/components/tables/ReturnTextTable';
import colors from '../../utils/colors';
import ToolbarContainer from './components/tollbars/ToolbarContainer';
import ModalContainerNormal from '../modals_container/ModalContainerNormal';


class Usuarios extends Component {
    state = {
        usuario: {},
        itemsSeleccionados: [],
        listaUsuarios: [],
        estadoTabla: 'cargando',
        listaVentasTemporal: [],

        rowslistaUsuarios: [
            { id: 'accions', numeric: false, disablePadding: true, label: '' },
            { id: 'estado', numeric: false, disablePadding: true, label: 'Estado' },
            { id: 'nombre_usuario', numeric: false, disablePadding: true, label: 'Nombre Usuario' },
            { id: 'tipo_usuario', numeric: false, disablePadding: true, label: 'Tipo Usuario' },
            { id: 'privilegios', numeric: true, disablePadding: false, label: 'Privilegios' },
            { id: 'privilegiosGenerales', numeric: true, disablePadding: false, label: 'Privilegios Generales' },
        ],

        openModalNewUsuario: false,
        openModalEliminarUsuario: false,
        itemEditar: {},
        tipo_accion: '',
        estadoPermisos: null
    }

    componentDidMount() {
        ReactGA.pageview(location.pathname)

        this.setState({ usuario: this.props.user })
        setTimeout(() => {
            this.obtenerPermisosusuarios()
            this.obtenerDataBaseDatos()
        }, 100)

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
                        <div></div>
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
                                    <Tooltip title="Activar" placement="right">
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
                    <Chip
                        label={<div style={{ color: colors.getColorWhite() }}>Activo</div>}
                        clickable
                        style={{ background: colors.getColorPrymaryGreen300(), marginRight: 8 }}
                    />
                    :
                    <Chip
                        label={<div style={{ color: colors.getColorWhite() }}>Inactivo</div>}
                        clickable
                        style={{ background: colors.getColorPrymaryRed300(), marginRight: 8 }}
                    />
            }</div>
        }
        if (item.id === 'nombre_usuario') {
            return <div style={{ width: 'max-content' }}>
                <Chip
                    label={<div>{n.nombre}</div>}
                    clickable
                    style={{ background: colors.getColorPrymaryGrey200(), marginRight: 8 }}
                />
            </div>
        }

        if (item.id === 'tipo_usuario') {
            return <div style={{ width: 'max-content' }}>
                {
                    n.tipo_usuario === 'administrador' &&
                    <Chip
                        label={<div style={{ color: colors.getColorWhite() }}>{this.MaysPrimera(n.tipo_usuario)}</div>}
                        clickable
                        style={{ background: colors.getColorPrymary(), marginRight: 8 }}
                    />
                }
                {
                    n.tipo_usuario === 'vendedor' &&
                    <Chip
                        label={<div style={{ color: colors.getColorWhite() }}>{this.MaysPrimera(n.tipo_usuario)}</div>}
                        clickable
                        style={{ background: colors.getColorPrymaryLight(), marginRight: 8 }}
                    />
                }
            </div>

        }



        if (item.id === 'privilegios') {
            return <div style={{ width: 'max-content' }}>
                <ExpansionPanel style={{ width: 'max-content', background: colors.getColorPrymaryBlue300() }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography style={{ color: 'white' }}>Ver Privilegios</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div style={{ width: 400 }}>
                            <div style={{ marginBottom: 6, display: 'flex', flexDirection: 'row' }}>
                                <Chip
                                    label={<div style={{ color: colors.getColorWhite() }}>Acceso a Productos</div>}
                                    clickable
                                    style={{ background: colors.getColorPrymaryDarkBlue300(), marginRight: 8 }}
                                />
                                <div style={{ flex: 1 }}></div>
                                {
                                    Boolean(n.privilegios.productos) ?
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Activado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkGreen300() }}
                                        />
                                        :
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Desactivado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkRed300() }}
                                        />
                                }
                            </div>
                            <div style={{ marginBottom: 6, display: 'flex', flexDirection: 'row' }}>
                                <Chip
                                    label={<div style={{ color: colors.getColorWhite() }}>Acceso a Devolucion de Clientes</div>}
                                    clickable
                                    style={{ background: colors.getColorPrymaryDarkBlue300(), marginRight: 8 }}
                                />
                                <div style={{ flex: 1 }}></div>
                                {
                                    Boolean(n.privilegios.stock.devolucion_cliente) ?
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Activado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkGreen300() }}
                                        />
                                        :
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Desactivado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkRed300() }}
                                        />
                                }
                            </div>
                            <div style={{ marginBottom: 6, display: 'flex', flexDirection: 'row' }}>
                                <Chip
                                    label={<div style={{ color: colors.getColorWhite() }}>Acceso a Compra de Productos</div>}
                                    clickable
                                    style={{ background: colors.getColorPrymaryDarkBlue300(), marginRight: 8 }}
                                />
                                <div style={{ flex: 1 }}></div>
                                {
                                    Boolean(n.privilegios.stock.compra_productos) ?
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Activado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkGreen300() }}
                                        />
                                        :
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Desactivado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkRed300() }}
                                        />
                                }
                            </div>
                            <div style={{ marginBottom: 6, display: 'flex', flexDirection: 'row' }}>
                                <Chip
                                    label={<div style={{ color: colors.getColorWhite() }}>Acceso a Devolucion a Proveedores</div>}
                                    clickable
                                    style={{ background: colors.getColorPrymaryDarkBlue300(), marginRight: 8 }}
                                />
                                <div style={{ flex: 1 }}></div>
                                {
                                    Boolean(n.privilegios.stock.devolucion_proveedor) ?
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Activado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkGreen300() }}
                                        />
                                        :
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Desactivado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkRed300() }}
                                        />
                                }
                            </div>
                            <div style={{ marginBottom: 6, display: 'flex', flexDirection: 'row' }}>
                                <Chip
                                    label={<div style={{ color: colors.getColorWhite() }}>Acceso a Ajustes de Stock</div>}
                                    clickable
                                    style={{ background: colors.getColorPrymaryDarkBlue300(), marginRight: 8 }}
                                />
                                <div style={{ flex: 1 }}></div>
                                {
                                    Boolean(n.privilegios.stock.ajuste_stock) ?
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Activado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkGreen300() }}
                                        />
                                        :
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Desactivado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkRed300() }}
                                        />
                                }
                            </div>
                            <div style={{ marginBottom: 6, display: 'flex', flexDirection: 'row' }}>
                                <Chip
                                    label={<div style={{ color: colors.getColorWhite() }}>Acceso a Proveedores</div>}
                                    clickable
                                    style={{ background: colors.getColorPrymaryDarkBlue300(), marginRight: 8 }}
                                />
                                <div style={{ flex: 1 }}></div>
                                {
                                    Boolean(n.privilegios.proveedores) ?
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Activado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkGreen300() }}
                                        />
                                        :
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Desactivado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkRed300() }}
                                        />
                                }
                            </div>
                            <div style={{ marginBottom: 6, display: 'flex', flexDirection: 'row' }}>
                                <Chip
                                    label={<div style={{ color: colors.getColorWhite() }}>Acceso a Clientes</div>}
                                    clickable
                                    style={{ background: colors.getColorPrymaryDarkBlue300(), marginRight: 8 }}
                                />
                                <div style={{ flex: 1 }}></div>
                                {
                                    Boolean(n.privilegios.clientes) ?
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Activado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkGreen300() }}
                                        />
                                        :
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Desactivado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkRed300() }}
                                        />
                                }
                            </div>
                            <div style={{ marginBottom: 6, display: 'flex', flexDirection: 'row' }}>
                                <Chip
                                    label={<div style={{ color: colors.getColorWhite() }}>Acceso a Ventas</div>}
                                    clickable
                                    style={{ background: colors.getColorPrymaryDarkBlue300(), marginRight: 8 }}
                                />
                                <div style={{ flex: 1 }}></div>
                                {
                                    Boolean(n.privilegios.ventas) ?
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Activado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkGreen300() }}
                                        />
                                        :
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Desactivado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkRed300() }}
                                        />
                                }
                            </div>
                            <div style={{ marginBottom: 6, display: 'flex', flexDirection: 'row' }}>
                                <Chip
                                    label={<div style={{ color: colors.getColorWhite() }}>Acceso a Retenciones</div>}
                                    clickable
                                    style={{ background: colors.getColorPrymaryDarkBlue300(), marginRight: 8 }}
                                />
                                <div style={{ flex: 1 }}></div>
                                {
                                    Boolean(n.privilegios.retenciones) ?
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Activado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkGreen300() }}
                                        />
                                        :
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Desactivado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkRed300() }}
                                        />
                                }
                            </div>
                            <div style={{ marginBottom: 6, display: 'flex', flexDirection: 'row' }}>
                                <Chip
                                    label={<div style={{ color: colors.getColorWhite() }}>Acceso a Usuarios</div>}
                                    clickable
                                    style={{ background: colors.getColorPrymaryDarkBlue300(), marginRight: 8 }}
                                />
                                <div style={{ flex: 1 }}></div>
                                {
                                    Boolean(n.privilegios.usuarios) ?
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Activado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkGreen300() }}
                                        />
                                        :
                                        <Chip
                                            label={<div style={{ color: colors.getColorWhite() }}>Desactivado</div>}
                                            clickable
                                            style={{ background: colors.getColorPrymaryDarkRed300() }}
                                        />
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
            <>
                {
                    this.state.estadoPermisos === true &&
                    <div>
                        <ToolbarContainer title={'Usuarios'} open={this.props.open}>
                            <ItemMenuHerramienta
                                titleButton="Nuevo Usuario"
                                color="primary"
                                visible={true}
                                onClick={() => {

                                    ReactGA.event({
                                        category: 'usuarios',
                                        action: 'nuevoUsuario'
                                    })
                                    this.setState({ itemEditar: null })
                                    this.setState({ openModalNewUsuario: true })
                                }}
                            >
                                <AddIcon />
                            </ItemMenuHerramienta>

                        </ToolbarContainer>
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


            </>
        );
    }
}

export default Usuarios