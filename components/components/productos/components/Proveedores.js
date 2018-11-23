import React, { Component } from 'react';
import MenuHerramientas from '../../menus/MenuHerramientas'
import ItemMenuHerramienta from '../../menus/ItemMenuHerramienta'
import TablaNormal from '../../tables/TableNormal'
import Divider from '@material-ui/core/Divider';

import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


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
import ReturnTextTable from '../../tables/ReturnTextTable';
import Search from '../../Search';

class Proveedores extends Component {

    state = {
        listaProveedores: [],
        rowslistaStock: [
            { id: 'acciones', numeric: false, disablePadding: true, label: 'Acciones' },
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'nombre', numeric: true, disablePadding: false, label: 'Nombre' },
            { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
            { id: 'tipo_identificacion', numeric: true, disablePadding: false, label: 'Tipo de Identificacion' },
            { id: 'identificacion', numeric: true, disablePadding: false, label: 'identificacion' },
            { id: 'tipo_persona', numeric: true, disablePadding: false, label: 'Tipo Persona' },
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
        itemsSeleccionados: [],
        //uid de usuario
        usuarioUID: ''
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ usuarioUID: user.uid })
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
                        var filterList = lista.sort((a, b) => {
                            a = new Date(a.order);
                            b = new Date(b.order);
                            return a > b ? -1 : a < b ? 1 : 0;
                        })
                        this.setState({
                            listaProveedores: filterList,
                            listaProveedoresTemporal: filterList,
                            estadoTabla: 'llena'
                        })
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
            return n.codigo
        }
        if (item.id === 'acciones') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Tooltip title="Editar"  placement="left">
                    <IconButton aria-label="Editar" onClick={()=>{
                        this.setState({ itemSeleccionado: n })
                        this.setState({ openModalFullScreen: true })
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
            return <div style={{ width: 'max-content' }}>
                {this.getColorActivadoDesactivado(n.estado, n.nombre)}
            </div>
        }
        if (item.id === 'email') {
            return this.getColorActivadoDesactivado(n.estado, n.email)
        }
        if (item.id === 'tipo') {
            return this.getColorActivadoDesactivado(n.estado, n.tipo)
        }
        if (item.id === 'tipo_identificacion') {
           
            if(n.tipo_identificacion==='05'){                
                return this.getColorActivadoDesactivado(n.estado, "Cedula")
            }else{
                return this.getColorActivadoDesactivado(n.estado, "RUC")
            }
            
        }
        if (item.id === 'identificacion') {
            return this.getColorActivadoDesactivado(n.estado, n.identificacion)
        }

        if (item.id === 'tipo_persona') {
            if(n.tipo_persona===true){
                return this.getColorActivadoDesactivado(n.estado, "NO OBLIGADO A LLEVAR CONTABILIDAD")
            }else{
                return this.getColorActivadoDesactivado(n.estado, "OBLIGADO A LLEVAR CONTABILIDAD")  
            }
           
        }
        if (item.id === 'celular') {
            return this.getColorActivadoDesactivado(n.estado, n.celular)
        }
        if (item.id === 'telefono') {
            return this.getColorActivadoDesactivado(n.estado, n.telefono)
        }
        if (item.id === 'direccion') {
            return <div style={{ width: 'max-content' }}>
                {this.getColorActivadoDesactivado(n.estado, n.direccion)}
            </div>
        }
        if (item.id === 'observacion') {
            return <div style={{ width: '200px' }}>
                {this.getColorActivadoDesactivado(n.estado, n.observacion)}
            </div>
        }
        if (item.id === 'usuario') {
            return <ReturnTextTable
                referencia="usuarios"
                codigo={n.usuario}
                datoTraido="nombre"
                estado={n.estado}
            />
        }
        if (item.id === 'ciudad') {
            return this.getColorActivadoDesactivado(n.estado, n.ciudad)
        }
        if (item.id === 'barrio') {
            return this.getColorActivadoDesactivado(n.estado, n.barrio)
        }
        if (item.id === 'fecha') {
            return <div style={{ width: 'max-content' }}>
                {this.getColorActivadoDesactivado(n.estado, n.fecha)}
            </div>
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
            itemsSeleccionados: [],
            estadoModalSimple: false
        })
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

    handleSearch = (codigo) => {
        this.setState({ listaProveedores: [], estadoTabla: 'cargando' })
        funtions.setTime(300, () => {
            let array = funtions.filterObjectsCodigo(this.state.listaProveedoresTemporal, codigo)
            if (array.length > 0) {
                this.setState({ estadoTabla: 'llena' })
            } else {
                this.setState({ estadoTabla: 'sin_resultados' })
            }
            this.setState({
                listaProveedores: array
            })

        })
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
                        onClick={() => this.setState({ itemSeleccionado: null, openModalFullScreen: true })}
                    />
                    {/* <ItemMenuHerramienta
                        titleButton="Editar"
                        color="primary"
                        visible={true}
                        disabled={this.state.itemsSeleccionados.length === 1 ? false : true}
                        onClick={() => {
                            if (this.state.itemsSeleccionados.length > 0) {
                                console.log(this.state.itemsSeleccionados)
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
                    /> */}

                    <div style={{ flex: 0.8 }}></div>

                    <Search
                        id='buscar-producto'
                        textoSearch="Buscar..."
                        textoTooltip="Buscar producto"
                        handleSearch={this.handleSearch}
                    />
                </MenuHerramientas>

                <Divider />

                <TablaNormal
                    textoTitleP="Proveedores"
                    textoTitleS="Proveedor"
                    selectedItems={true}
                    toolbar={false}
                    data={this.state.listaProveedores}
                    rows={this.state.rowslistaStock}
                    handleGetData={this.handleGetData}
                    estadoTabla={this.state.estadoTabla}
                    itemsSeleccionados={items => this.setState({ itemsSeleccionados: items })}
                />

                <FullScreenDialog openModal={this.state.openModalFullScreen}>
                    <ModalNewEditProveedor
                        item={this.state.itemSeleccionado}
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
                        handleEliminarItems={() => this.handleEliminarItems([this.state.itemSeleccionado])}
                        handleActivarItems={() => this.handleActivarItems([this.state.itemSeleccionado])}
                        handleDesactivarItems={() => this.handleDesactivarItems([this.state.itemSeleccionado])}
                    />
                </ModalContainerNormal>
            </div>
        );
    }
}

export default Proveedores;