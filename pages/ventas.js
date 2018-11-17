import React, { Component } from 'react';
import Layout from '../components/containers/Layout';
import Grid from '@material-ui/core/Grid';
import SectionFactura from '../components/components/SectionFactura';
import SectionContentFactura from '../components/components/SectionContentFactura';
import MenuHerramientas from '../components/components/menus/MenuHerramientas';
import Search from '../components/components/Search';
import TablaNormal from '../components/components/tables/TableNormal';
import Divider from '@material-ui/core/Divider';
import ItemMenuHerramienta from '../components/components/menus/ItemMenuHerramienta';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import IconButton from '@material-ui/core/IconButton';
import InputIcon from '@material-ui/icons/Input';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneIcon from '@material-ui/icons/Done';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import ReturnTextTable from '../components/components/tables/ReturnTextTable';
import FullScreenDialog from '../components/components/FullScreenDialog';
import NuevaVenta from '../components/plugins/nueva_venta';
import funtions from '../utils/funtions';
import ModalCompraProductos from '../components/modals_container/ModalCompraProductos';
import setSnackBars from '../components/plugins/setSnackBars';
import ModalContainerNormal from '../components/modals_container/ModalContainerNormal';
import EmitirFacturaModal from '../components/plugins/EmitirFacturaModal';



class Ventas extends Component {

    state = {
        usuario: {},
        itemsSeleccionados: [],
        listaVentas: [],
        estadoTabla: 'cargando',
        listaVentasTemporal: [],

        rowslistaVentas: [
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'factura_emitida', numeric: false, disablePadding: true, label: 'Estado Factura' },
            { id: 'cliente', numeric: true, disablePadding: false, label: 'Cliente' },
            { id: 'productos', numeric: true, disablePadding: false, label: 'Productos' },
            { id: 'subtotal', numeric: true, disablePadding: false, label: 'SubTotal' },
            { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Precio Iva' },
            { id: 'descuento', numeric: true, disablePadding: false, label: 'Descuento' },
            { id: 'dinero_resibido', numeric: true, disablePadding: false, label: 'Dinero recibido' },
            { id: 'cambio', numeric: true, disablePadding: false, label: 'Cambio/Vuelto' },
            { id: 'observacion', numeric: true, disablePadding: false, label: 'Observación' },
            { id: 'empleado', numeric: true, disablePadding: false, label: 'Empleado' },
            { id: 'fecha_venta', numeric: true, disablePadding: false, label: 'Fecha de venta' },
            { id: 'hora_venta', numeric: true, disablePadding: false, label: 'Hora de venta' },
        ],
        //usuario
        usuario: '',
        // modals
        openModalNewVenta: false,
        estadoModalSimpleCompraProductos: false,
        estadoModalEmitirFactura: false,
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/ventas');
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaVentas: [],
                            listaVentasTemporal: [],
                            estadoTabla: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        var filterList = lista.sort((a, b) => {
                            a = new Date(a.order);
                            b = new Date(b.order);
                            return a > b ? -1 : a < b ? 1 : 0;
                        })
                        this.setState({
                            listaVentas: filterList,
                            listaVentasTemporal: filterList,
                            estadoTabla: 'llena'
                        })
                    } else {
                        this.setState({
                            listaVentas: [],
                            listaVentasTemporal: [],
                            estadoTabla: 'vacio'
                        })
                    }
                });
            }
        });
    }

    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }

        if (item.id === 'cliente') {
            return n.cliente === 'Consumidor Final' ? n.cliente : <>
                <ReturnTextTable
                    referencia="clientes"
                    codigo={n.cliente}
                    datoTraido="nombre"
                    estado={true}
                />
            </>
        }

        if (item.id === 'productos') {
            return n.productos.map(item => {
                return <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <div>{item.cantidad}</div>
                    <div style={{ width: 10 }} />
                    <ReturnTextTable
                        referencia="productos"
                        codigo={item.codigo}
                        datoTraido="descripcion_producto"
                        estado={true}
                    />
                </div>
            })
        }

        if (item.id === 'subtotal') {
            return <div style={{ width: 'max-content' }}>{n.subtotal}</div>
        }

        if (item.id === 'factura_emitida') {
            return n.cliente === 'Consumidor Final' ?
                <div style={{ display: 'flex', flexDirection: 'row', width: 'max-content' }}>
                    <IconButton disabled>
                        <DoneIcon />
                    </IconButton>
                    <div style={{ display: 'flex', alignItems: 'center' }}>Consumidor Final</div>
                </div>
                :
                <div style={{ width: 'max-content' }}>{
                    Boolean(n.factura_emitida) ?
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <IconButton disabled>
                                <DoneAllIcon style={{ color: '#42A5F5' }} />
                            </IconButton>
                            <div style={{ color: '#42A5F5', display: 'flex', alignItems: 'center' }}>Emitida</div>
                        </div>
                        :
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Tooltip title="Emitir Factura">
                                <IconButton onClick={() => {
                                    this.setState({
                                        codigoEmitirFactura: n.codigo,
                                        estadoModalEmitirFactura: true,
                                    })
                                }}>
                                    <InputIcon style={{ color: '#EF5350' }} />
                                </IconButton>
                            </Tooltip>
                            <div style={{ color: '#EF5350', display: 'flex', alignItems: 'center' }}>No emitida</div>
                        </div>
                }</div >
        }

        if (item.id === 'total') {
            return <div style={{ width: 'max-content' }}>{n.total}</div>
        }

        if (item.id === 'iva') {
            return <div style={{ width: 'max-content' }}>{n.iva}</div>
        }

        if (item.id === 'observacion') {
            return <div style={{ width: 'max-content' }}>{n.observacion}</div>
        }

        if (item.id === 'dinero_resibido') {
            return <div style={{ width: 'max-content' }}>{n.dinero_resibido}</div>
        }

        if (item.id === 'cambio') {
            return <div style={{ width: 'max-content' }}>{n.cambio}</div>
        }

        if (item.id === 'fecha_venta') {
            return <div style={{ width: 'max-content' }}>{n.fecha_venta}</div>
        }

        if (item.id === 'hora_venta') {
            return <div style={{ width: 'max-content' }}>{n.hora_venta}</div>
        }

        if (item.id === 'descuento') {
            return <div style={{ width: 'max-content' }}>{n.descuento}</div>
        }

        if (item.id === 'empleado') {
            return <ReturnTextTable
                referencia="usuarios"
                codigo={n.empleado}
                datoTraido="nombre"
                estado={true}
            />
        }

    }

    recuperarJsonFactura = codigo => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/facturas_ventas/' + codigo);
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.postSet(user.uid, snapshot.val())
                        var venteRef = db.ref('users/' + user.uid + '/ventas/' + codigo);
                        venteRef.update({
                            factura_emitida: true
                        })
                        setSnackBars.openSnack('success', 'rootSnackBar', 'Factura emitida con exito', 2000)
                    }
                })
            }
        })
    }

    postSet = async (uidUser, jsonData) => {
        const rawResponse = await fetch('https://stormy-bayou-19844.herokuapp.com/generarfactura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'id': uidUser,
            },
            body: JSON.stringify(jsonData)
        })

        const content = await rawResponse.json();
        //console.log(content)
    }

    render() {

        return (
            <Layout title="Ventas" onChangueUserState={usuario => this.setState({ usuario: usuario })}>

                <MenuHerramientas>
                    <ItemMenuHerramienta
                        titleButton="Nueva Venta"
                        color="primary"
                        visible={true}
                        onClick={() => {
                            /* var w = window.open('/nueva_venta', 'popUpWindow', "width=" + screen.availWidth + ",height=" + screen.availHeight)
                            window.addEventListener("beforeunload", (ev) => {
                                w.close()
                                ev.preventDefault();
                                return ev.returnValue = 'Are you sure you want to close?';
                            }); */
                            this.setState({ openModalNewVenta: true })
                        }}
                    />
                    {/* <ItemMenuHerramienta
                        titleButton="Editar Venta"
                        color="primary"
                        visible={true}
                        disabled={this.state.itemsSeleccionados.length === 1 ? false : true}
                        onClick={() => this.setState({ openModalNewVenta: true })}
                    /> */}
                    {/* <ItemMenuHerramienta
                        titleButton="Cancelar Venta"
                        color="primary"
                        visible={true}
                        disabled={!this.state.itemsSeleccionados.length > 0}
                        onClick={() => {
                            if (this.state.itemsSeleccionados.length > 0) {
                                this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'eliminar' })
                            }
                        }}
                    /> */}
                    <ItemMenuHerramienta
                        titleButton="Devolución de venta"
                        color="primary"
                        visible={true}
                        onClick={() => {
                            this.setState({ estadoModalSimpleCompraProductos: true })
                        }}
                    />
                    <ItemMenuHerramienta
                        titleButton="Imprimir resivo"
                        color="primary"
                        visible={true}
                        disabled={this.state.botonImprimirResivo}
                        onClick={() => {
                            if (this.state.itemsSeleccionados.length > 0) {
                                this.setState({ estadoModalSimple: true, estadoModalDeleteActivarDesactivar: 'desactivar' })
                            }
                        }}
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
                    textoTitleP="Ventas"
                    textoTitleS="Venta"
                    selectedItems={true}
                    toolbar={false}
                    notTab={true}
                    data={this.state.listaVentas}
                    rows={this.state.rowslistaVentas}
                    handleGetData={this.handleGetData}
                    estadoTabla={this.state.estadoTabla}
                    itemsSeleccionados={items => {
                        this.setState({ itemsSeleccionados: items })
                    }}
                />

                <FullScreenDialog openModal={this.state.openModalNewVenta}>
                    <NuevaVenta usuario={this.state.usuario} handleClose={() => this.setState({ openModalNewVenta: false })}>

                    </NuevaVenta>

                </FullScreenDialog>

                <FullScreenDialog openModal={this.state.estadoModalSimpleCompraProductos}>
                    <ModalCompraProductos
                        handleClose={() => this.setState({
                            estadoModalSimpleCompraProductos: false,
                        })}
                        usuario={this.props.usuario}
                        tipoAjuste='devolucion_cliente'
                    />
                </FullScreenDialog>

                <ModalContainerNormal
                    open={this.state.estadoModalEmitirFactura}
                    handleClose={() => this.setState({ estadoModalEmitirFactura: false })}
                >
                    <EmitirFacturaModal
                        handleClose={() => this.setState({ estadoModalEmitirFactura: false })}
                        handleEmitir={() => {
                            this.recuperarJsonFactura(this.state.codigoEmitirFactura)
                            this.setState({ estadoModalEmitirFactura: false })
                        }}
                    />
                </ModalContainerNormal>

            </Layout>
        );
    }
}

export default Ventas