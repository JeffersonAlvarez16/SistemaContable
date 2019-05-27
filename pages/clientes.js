import React, { Component } from 'react';
import Layout from '../components/containers/Layout';
import funtions from '../utils/funtions';
import SimpleTable from '../components/components/TableList';

import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AddIcon from '@material-ui/icons/Add';


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
import { TextField, IconButton, Tooltip, CircularProgress, Chip, Avatar } from '@material-ui/core';
import colors from '../utils/colors';
import ReactGA from 'react-ga';

class Clientes extends Component {

    state = {
        listaClientes: [],
        estadoTabla: 'cargando',
        listaClientesTemporal: [],
        openModalNewCliente: false,
        itemCliente: null,
        itemsSeleccionados: [],
        rowslistaClientes: [
            { id: 'acciones', numeric: false, disablePadding: true, label: '' },
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'nombre', numeric: true, disablePadding: false, label: 'Nombre' },
            { id: 'identificacion', numeric: true, disablePadding: false, label: 'Numero de identificación' },
            { id: 'celular', numeric: true, disablePadding: false, label: 'Telefono' },
            { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
            { id: 'direccion', numeric: true, disablePadding: false, label: 'Dirección' },
            { id: 'tipo_identificacion', numeric: true, disablePadding: false, label: 'Tipo de identificación' },
            { id: 'tipo_cliente', numeric: true, disablePadding: false, label: 'Tipo Cliente' },
            { id: 'fecha_nacimiento', numeric: true, disablePadding: false, label: 'Fecha Nacimiento' },
            { id: 'sexo', numeric: true, disablePadding: false, label: 'Sexo' },
            { id: 'telefono', numeric: true, disablePadding: false, label: 'Telefono' },
            { id: 'barrio', numeric: true, disablePadding: false, label: 'Barrio' },
            { id: 'ciudad', numeric: true, disablePadding: false, label: 'Ciudad' },
            { id: 'observacion', numeric: true, disablePadding: false, label: 'Observación' },
            { id: 'limite_deuda', numeric: true, disablePadding: false, label: 'Límite deuda' },
            { id: 'credito', numeric: true, disablePadding: false, label: 'Crédito' },
            { id: 'fecha_registro', numeric: true, disablePadding: false, label: 'Fecha registro' },
            { id: 'hora_registro', numeric: true, disablePadding: false, label: 'Hora registro' },
            { id: 'usuario', numeric: true, disablePadding: false, label: 'Usuario' },
        ],
        //usuario
        usuario: '',
        estadoPermisos: null
    }

    componentDidMount() {
        ReactGA.pageview(location.pathname)
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
                <Tooltip title="Editar" placement="left">
                    <IconButton aria-label="Editar" onClick={() => {
                        this.setState({
                            estadoacciones: 'editar'
                        })
                        setTimeout(() => {
                            this.comprobarUsuario(n)
                        }, 100)
                        /*  this.setState({ itemSeleccionado: n })
                          this.setState({ openModalNewCliente: true }) */
                    }}>
                        <EditIcon color='primary' />
                    </IconButton>
                </Tooltip>
                {
                    Boolean(n.estado) ?
                        <Tooltip title="Desactivar" placement="right">
                            <IconButton aria-label="Desactivar" onClick={() => {
                                this.setState({
                                    estadoacciones: 'desactivar'
                                })
                                setTimeout(() => {
                                    this.comprobarUsuario(n)
                                }, 100)
                                /* this.setState({ itemSeleccionado: n })
                                this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'desactivar' }) */
                            }}>
                                <VisibilityOffIcon />
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="Activar">
                            <IconButton aria-label="Activar" onClick={() => {
                                this.setState({
                                    estadoacciones: 'activar'
                                })
                                setTimeout(() => {
                                    this.comprobarUsuario(n)
                                }, 100)

                                /*   this.setState({ itemSeleccionado: n })
                                  this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'activar' }) */
                            }}>
                                <VisibilityIcon color='primary' />
                            </IconButton>
                        </Tooltip>
                }


            </div>
        }

        if (item.id === 'nombre') {
            return <div style={{ width: 'max-content' }}>{this.getColorActivadoDesactivado(n.estado,
                <Chip
                    label={<div>{n.nombre}</div>}
                    clickable
                    style={{ background: colors.getColorPrymaryGrey200() }}
                />
            )}</div>
        }
        if (item.id === 'identificacion') {
            return <div style={{ width: 'max-content' }}>{this.getColorActivadoDesactivado(n.estado,
                <Chip
                    label={<div style={{ color: colors.getColorWhite() }}>{n.numero_identificacion}</div>}
                    clickable
                    style={{ background: colors.getColorPrymary() }}
                />
            )}</div>
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
            return this.getColorActivadoDesactivado(n.estado,
                <Chip
                    label={<div>{n.celular}</div>}
                    clickable
                    style={{ background: colors.getColorPrymaryGrey200() }}
                />
            )
        }

        if (item.id === 'tipo_identificacion') {
            return this.getColorActivadoDesactivado(n.estado, 
                <div>
                    {
                        n.tipo_identificacion==='05'&&
                        'Cedula'
                    }
                    {
                        n.tipo_identificacion==='04'&&
                        'Ruc'
                    }
                </div>
                )
        }

        if (item.id === 'direccion') {
            return <div style={{ width: 'max-content' }}>{this.getColorActivadoDesactivado(n.estado,
                <Chip
                    label={<div>{n.direccion}</div>}
                    clickable
                    style={{ background: colors.getColorPrymaryGrey200() }}
                />
            )}</div>
        }

        if (item.id === 'barrio') {
            return this.getColorActivadoDesactivado(n.estado, n.barrio)
        }

        if (item.id === 'ciudad') {
            return this.getColorActivadoDesactivado(n.estado, n.ciudad)
        }

        if (item.id === 'email') {
            return this.getColorActivadoDesactivado(n.estado,
                <Chip
                    label={<div style={{color: colors.getColorWhite()}}>{n.email}</div>}
                    clickable
                    style={{ background: colors.getColorPrymaryDarkBlue300() }}
                />
            )
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

    obtenerPermisosusuarios = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var usuariosRef = db.ref(`users/${user.uid}/usuarios/${this.state.usuario.code}`)
                usuariosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        if (snapshot.val().privilegios.clientes === true) {
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

    comprobarUsuario = (item) => {
        if (this.state.usuario.tipo_usuario === 'administrador') {
            if (this.state.estadoacciones === 'desactivar') {
                this.setState({ itemSeleccionado: item })
                this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'desactivar' })
            } else if (this.state.estadoacciones === 'activar') {
                this.setState({ itemSeleccionado: item })
                this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'activar' })
            } else {
                this.setState({ itemSeleccionado: item })
                this.setState({ openModalNewCliente: true })
            }
        } else {
            if (this.state.estadoacciones === 'desactivar') {
                if (item.usuario === this.state.usuario.code) {
                    this.setState({ itemSeleccionado: item })
                    this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'desactivar' })
                } else {
                    setSnackBars.openSnack('warning', 'rootSnackBar', 'Usted no registro este Cliente', 2000)
                }
            } else if (this.state.estadoacciones === 'activar') {
                if (item.usuario === this.state.usuario.code) {
                    this.setState({ itemSeleccionado: item })
                    this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'activar' })
                } else {
                    setSnackBars.openSnack('warning', 'rootSnackBar', 'Usted no registro este Cliente', 2000)
                }
            } else {
                if (item.usuario === this.state.usuario.code) {
                    this.setState({ itemSeleccionado: item })
                    this.setState({ openModalNewCliente: true })
                } else {
                    setSnackBars.openSnack('warning', 'rootSnackBar', 'Usted no registro este Cliente', 2000)
                }
            }
        }
    }

    nuevoCliente=()=>{  
        ReactGA.event({
            category: 'clientes',
            action: 'nuevoCliente'
        })
        var db=firebase.database()        
        var controlCaja = db.ref(`users/${firebase.auth().currentUser.uid}/control_interaccion/clientes/nuevoclientes`)
        var controlProductosGuardados = db.ref(`users/${firebase.auth().currentUser.uid}/control_interaccion/clientes/nuevoclientes/guardados`)
        var controlProductosCancelados = db.ref(`users/${firebase.auth().currentUser.uid}/control_interaccion/clientes/nuevoclientes/cancelados`)
        controlCaja.once('value', (snapshot) => {
            if (snapshot.val()) {
                controlCaja.update({
                    contador: snapshot.val().contador + 1,
                })
                controlProductosGuardados.once('value',snap=>{
                    if(snap.val()){
                        controlProductosCancelados.update({
                            contador:(snapshot.val().contador+1)-snap.val().contador
                        })
                    }
                })
              
            } else {
                controlCaja.update({
                    contador: 1,
                })
                controlProductosCancelados.update({
                    contador: 1
                })
                controlProductosGuardados.update({
                    contador: 0
                })
            }
        });
        this.setState({ itemSeleccionado: null, openModalNewCliente: true })
    }

    render() {
        return (
            <Layout title="Clientes" onChangueUserState={usuario => {
                this.setState({ usuario: usuario })
                setTimeout(() => {
                    this.obtenerPermisosusuarios()
                }, 100)
            }}>
                {
                    this.state.estadoPermisos === true &&
                    <div>

                        <MenuHerramientas>
                            <ItemMenuHerramienta
                                titleButton="Nuevo Cliente"
                                color="primary"
                                visible={true}
                                onClick={() => 
                                this.nuevoCliente()
                              }
                            >
                                <AddIcon />
                            </ItemMenuHerramienta>


                            <div style={{ flex: 0.95 }}></div>

                            <Search
                                id='buscar-cliente-clientes'
                                textoSearch="Buscar..."
                                textoTooltip="Buscar cliente"
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

export default Clientes