import React, { Component } from 'react';
import MenuHerramientas from '../../../../components/components/menus/MenuHerramientas'
import ItemMenuHerramienta from '../../../../components/components/menus/ItemMenuHerramienta'
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
import ModalNewProducto from '../../../../components/modals_container/ModalNewProducto';
import ModalContainerNormal from '../../../modals_container/ModalContainerNormal';
import DeleteActivarDesactivar from '../../../plugins/deleteActivarDesactivar';
import ReturnTextTable from '../../tables/ReturnTextTable';
import setSnackBars from '../../../plugins/setSnackBars';
import AnadirVencimiento from '../../../plugins/anadirVencimiento';

import Search from '../../Search';



class ListaProductos extends Component {

    state = {
        //lista de los pruductos
        listaProductos: [],
        //lista de los pruductos temporales
        listaProductosTemporal: [],
        //columnas de la tabla de productos
        rowsListaProductos: [
            { id: 'acciones', numeric: false, disablePadding: true, label: 'Acciones' },
            { id: 'descripcion_producto', numeric: true, disablePadding: false, label: 'Descripcion' },
            { id: 'codigo_barras', numeric: true, disablePadding: false, label: 'C. Barras' },
            { id: 'codigo_referencia', numeric: true, disablePadding: false, label: 'C. Referencia' },
            { id: 'stock_actual', numeric: true, disablePadding: false, label: 'Stock Actual' },

            { id: 'precio_costo', numeric: true, disablePadding: false, label: 'Precio Costo' },
            { id: 'precio_venta_a', numeric: true, disablePadding: false, label: 'P. venta A' },
            { id: 'precio_venta_b', numeric: true, disablePadding: false, label: 'P. venta B' },
            { id: 'precio_venta_c', numeric: true, disablePadding: false, label: 'P. venta C' },

            { id: 'categoria_producto', numeric: true, disablePadding: false, label: 'Categoria' },
            { id: 'proveedor', numeric: true, disablePadding: false, label: 'Proveedor' },
            { id: 'marca_producto', numeric: true, disablePadding: false, label: 'Marca' },
            { id: 'porcentaje_iva', numeric: true, disablePadding: false, label: 'Iva (%)' },
            { id: 'localizacion_producto', numeric: true, disablePadding: false, label: 'Localización' },
            { id: 'numero_ventas', numeric: true, disablePadding: false, label: 'Numero de ventas' },
            { id: 'unidad_medida', numeric: true, disablePadding: false, label: 'Unidad de medida' },
            { id: 'producto_fraccionado', numeric: true, disablePadding: false, label: 'Fraccionado' },

            { id: 'stock_minimo', numeric: true, disablePadding: false, label: 'Stock Minimo' },
            { id: 'stock_maximo', numeric: true, disablePadding: false, label: 'Stock Maximo' },

            { id: 'fecha_vencimiento', numeric: true, disablePadding: false, label: 'Fecha vencimiento' },
            { id: 'fecha_registro', numeric: true, disablePadding: false, label: 'Fecha registro' },
            { id: 'hora_registro', numeric: true, disablePadding: false, label: 'Hora registro' },

            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },

            { id: 'tiene_iva', numeric: true, disablePadding: false, label: 'Tiene Iva' },
            { id: 'estado', numeric: true, disablePadding: false, label: 'Estado' },
            { id: 'usuario', numeric: true, disablePadding: false, label: 'Usuario' },
        ],
        //estado de la tabla
        estadoTabla: 'cargando',
        //Estado del modal fullScrenn
        openModalFullScreen: false,
        estadoModalSimple: false,
        estadoModalSimpleFechaNacimiento: false,
        estadoModalDeleteActivarDesactivar: 'eliminar',
        //item Selecionado
        itemsSeleccionados: [],
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
                        var filterList = lista.sort((a, b) => {
                            a = new Date(a.order);
                            b = new Date(b.order);
                            return a > b ? -1 : a < b ? 1 : 0;
                        })
                        this.setState({
                            listaProductos: filterList,
                            listaProductosTemporal: filterList,
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
            return this.getColorActivadoDesactivado(n.estado, n.codigo)
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

        if (item.id === 'descripcion_producto') {
            return <div style={{ width: 'max-content' }}>
                {this.getColorActivadoDesactivado(n.estado, n.descripcion_producto)}
            </div>
        }

        if (item.id === 'codigo_barras') {
            return this.getColorActivadoDesactivado(n.estado, n.codigo_barras)
        }

        if (item.id === 'codigo_referencia') {
            return this.getColorActivadoDesactivado(n.estado, n.codigo_referencia)
        }

        if (item.id === 'precio_costo') {
            return this.getColorActivadoDesactivado(n.estado, n.precio_costo)
        }

        if (item.id === 'precio_venta_a') {
            return this.getColorActivadoDesactivado(n.estado, n.precio_venta_a)
        }

        if (item.id === 'precio_venta_b') {
            return this.getColorActivadoDesactivado(n.estado, n.precio_venta_b)
        }

        if (item.id === 'precio_venta_c') {
            return this.getColorActivadoDesactivado(n.estado, n.precio_venta_c)
        }

        if (item.id === 'categoria_producto') {
            return <ReturnTextTable
                referencia="categorias"
                codigo={n.categoria_producto}
                datoTraido="nombre"
                estado={n.estado}
            />
        }

        if (item.id === 'proveedor') {
            return <ReturnTextTable
                referencia="proveedores"
                codigo={n.proveedor}
                datoTraido="nombre"
                estado={n.estado}
            />
        }

        if (item.id === 'marca_producto') {
            return <ReturnTextTable
                referencia="marcas"
                codigo={n.marca_producto}
                datoTraido="nombre"
                estado={n.estado}
            />
        }

        if (item.id === 'porcentaje_iva') {
            return this.getColorActivadoDesactivado(n.estado, n.porcentaje_iva)
        }

        if (item.id === 'localizacion_producto') {
            return this.getColorActivadoDesactivado(n.estado, n.localizacion_producto)
        }

        if (item.id === 'numero_ventas') {
            return this.getColorActivadoDesactivado(n.estado, n.numero_ventas)
        }

        if (item.id === 'unidad_medida') {
            return this.getColorActivadoDesactivado(n.estado, n.unidad_medida)
        }

        if (item.id === 'producto_fraccionado') {
            return n.producto_fraccionado === true ? this.getColorActivadoDesactivado(n.estado, "Sí") : this.getColorActivadoDesactivado(n.estado, "No")
        }

        if (item.id === 'stock_actual') {
            return this.getColorActivadoDesactivado(n.estado, n.stock_actual)
        }

        if (item.id === 'stock_minimo') {
            return this.getColorActivadoDesactivado(n.estado, n.stock_minimo)
        }

        if (item.id === 'stock_maximo') {
            return this.getColorActivadoDesactivado(n.estado, n.stock_maximo)
        }

        if (item.id === 'fecha_vencimiento') {
            return <div style={{ width: 'max-content' }}>
                {this.getColorActivadoDesactivado(n.estado, n.fecha_vencimiento)}
            </div>
        }

        if (item.id === 'fecha_registro') {
            return <div style={{ width: 'max-content' }}>
                {this.getColorActivadoDesactivado(n.estado, n.fecha_registro)}
            </div>
        }

        if (item.id === 'hora_registro') {
            return this.getColorActivadoDesactivado(n.estado, n.hora_registro)
        }

        if (item.id === 'tiene_iva') {
            return n.tiene_iva === true ? this.getColorActivadoDesactivado(n.estado, "Sí") : this.getColorActivadoDesactivado(n.estado, "No")
        }

        if (item.id === 'estado') {
            return n.estado === true ? this.getColorActivadoDesactivado(n.estado, "Sí") : this.getColorActivadoDesactivado(n.estado, "No")
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

    handleEliminarItems = (itemsSeleccionados) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                itemsSeleccionados.forEach(element => {
                    var productosRef = db.ref('users/' + user.uid + '/productos/' + element.codigo);
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
                    var productosRef = db.ref('users/' + user.uid + '/productos/' + element.codigo);
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
                    var productosRef = db.ref('users/' + user.uid + '/productos/' + element.codigo);
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
        this.setState({ listaProductos: [], estadoTabla: 'cargando' })
        funtions.setTime(300, () => {
            let array = funtions.filterObjectsCodigo(this.state.listaProductosTemporal, codigo)
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

    render() {
        return (
            <div >


                <MenuHerramientas>

                    <ItemMenuHerramienta
                        titleButton="Nuevo Producto"
                        color="primary"
                        visible={true}
                        //disabled={this.state.itemsSeleccionados.length > 0}
                        onClick={() => {
                            this.setState({ itemSeleccionado: null })
                            this.setState({ openModalFullScreen: true })
                        }}
                    />

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
                    textoTitleP="Productos"
                    textoTitleS="Producto"
                    selectedItems={true}
                    toolbar={false}
                    data={this.state.listaProductos}
                    rows={this.state.rowsListaProductos}
                    handleGetData={this.handleGetData}
                    estadoTabla={this.state.estadoTabla}
                    itemsSeleccionados={items => this.setState({ itemsSeleccionados: items })}
                />

                <FullScreenDialog openModal={this.state.openModalFullScreen}>
                    <ModalNewProducto
                        item={this.state.itemSeleccionado}
                        handleClose={() => this.setState({ openModalFullScreen: false })}
                        setNewProducto={this.setNewProducto}
                        setUpdateProducto={this.setUpdateProducto}
                        usuario={this.props.usuario}
                    >
                    </ModalNewProducto>
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

                <ModalContainerNormal
                    open={this.state.estadoModalSimpleFechaNacimiento}
                    handleClose={() => this.setState({ estadoModalSimpleFechaNacimiento: false })}
                >
                    <AnadirVencimiento
                        producto={this.state.itemsSeleccionados[0]}
                        handleClose={() => this.setState({ estadoModalSimpleFechaNacimiento: false })}
                    />
                </ModalContainerNormal>
            </div>
        );
    }
}

export default ListaProductos;