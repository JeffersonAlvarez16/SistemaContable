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
import FileCopy from '@material-ui/icons/FileCopy';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneIcon from '@material-ui/icons/Done';

import TextField from '@material-ui/core/TextField';

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
import ModalCancelarVenta from '../components/modals_container/ventas/ModalCancelarVenta';
import ModalEditarVenta from '../components/modals_container/ventas/ModalEditarVenta';
import { CircularProgress } from '@material-ui/core';

import ReactToPrint from "react-to-print";
import ResivoVenta from '../components/plugins/plantillas/resivo_venta';
import ContainerPlantillas from '../components/plugins/plantillas/container_plantillas';
import ModalNewVenta from '../components/plugins/ModalNewVenta';

class Ventas extends Component {

    state = {

        itemsSeleccionados: [],
        listaVentas: [],
        estadoTabla: 'cargando',
        listaVentasTemporal: [],

        rowslistaVentas: [
            { id: 'accions', numeric: false, disablePadding: true, label: 'Resivo' },
            { id: 'factura_emitida', numeric: false, disablePadding: true, label: 'Estado Factura' },
            { id: 'cliente', numeric: true, disablePadding: false, label: 'Cliente' },
            { id: 'productos', numeric: true, disablePadding: false, label: 'Productos' },
            { id: 'tipo_pago', numeric: true, disablePadding: false, label: 'Tipo de pago' },
            { id: 'subtotal', numeric: true, disablePadding: false, label: 'SubTotal' },
            { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Precio Iva' },
            { id: 'descuento', numeric: true, disablePadding: false, label: 'Descuento' },
            { id: 'dinero_resibido', numeric: true, disablePadding: false, label: 'Dinero recibido' },
            { id: 'cambio', numeric: true, disablePadding: false, label: 'Cambio/Vuelto' },
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'observacion', numeric: true, disablePadding: false, label: 'Observación' },
            { id: 'empleado', numeric: true, disablePadding: false, label: 'Empleado' },
            { id: 'fecha_venta', numeric: true, disablePadding: false, label: 'Fecha de venta' },
            { id: 'hora_venta', numeric: true, disablePadding: false, label: 'Hora de venta' },
        ],
        //usuario
        usuario: {},
        // modals
        openModalNewVenta: false,
        estadoModalSimpleCompraProductos: false,
        estadoModalEmitirFactura: false,
        estadoModalCancelarVenta: false,
        estadoModalEditarVenta: false,
        openModalNewVentaFinal: false,
        //item para editar
        itemEditar: null,
        //fecha actual
        fechaActual: `${new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()}`,

        //permisosUsuarios

        estadoPermisos: null,
        estadoacciones:'',
        permisoUsuario:null
    }

    obtenerFechFormateada = () => {
        const { fechaActual } = this.state
        var fecha = fechaActual.split('-')
        var nueva = fecha[2] + '-' + fecha[1] + '-' + fecha[0]
        return nueva
    }

    componentDidMount() {
        this.obtenerDataBaseDatos()
    }

    obtenerDataBaseDatos = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/ventas').orderByChild('fecha_venta').equalTo(this.obtenerFechFormateada())
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

        if (item.id === 'accions') {
            return <>
                <ReactToPrint
                    ref={el => (this.refEventoImprimir = el)}
                    trigger={() => <></>}
                    content={() => this.refImprimirResivo}
                />
                <IconButton onClick={() => {
                    this.enviarToPlantillaData(n)
                }}
                >
                    <LocalPrintshopIcon />
                </IconButton>
            </>
        }

        if (item.id === 'cliente') {
            return n.cliente === 'Consumidor Final' ? n.cliente : <>
                <ReturnTextTable
                    referencia="clientes"
                    codigo={n.cliente.codigo}
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
            {/* <div style={{ width: 'max-content' }}>
                    <IconButton>
                        <FileCopy />
                    </IconButton>
            </div> */}
        }

        if (item.id === 'subtotal') {
            return <div style={{ width: 'max-content' }}>{n.subtotal}</div>
        }

        if (item.id === 'tipo_pago') {
            return <div style={{ width: 'max-content' }}>{n.tipo_pago}</div>
        }

        if (item.id === 'factura_emitida') {
            return n.cliente === 'Consumidor Final' ?
                <div style={{ display: 'flex', flexDirection: 'row', width: 'max-content' }}>
                    <Tooltip title="Devolver Venta">
                        <IconButton 
                        disabled={this.estate.permisoUsuario}
                        onClick={() => {
                            this.setState({
                                estadoacciones: 'devolver_venta'
                            })
                            setTimeout(() => {
                                this.comprobarUsuario(n)
                            }, 100)
                          /*   this.setState({
                                codigoEmitirFactura: n.codigo,
                                estadoModalCancelarVenta: true,
                            }) */
                        }}>
                            <CloseIcon style={{ color: '#EF5350' }} />
                        </IconButton>
                    </Tooltip>
                    <IconButton disabled>
                        <DoneIcon />
                    </IconButton>
                    <div style={{ display: 'flex', alignItems: 'center' }}>Consumidor Final</div>
                </div>
                :
                <div style={{ width: 'max-content' }}>
                    {
                        n.factura_emitida === 'emitida' &&
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <IconButton disabled>
                                <DoneAllIcon style={{ color: '#00c853' }} />
                            </IconButton>
                            <div style={{ color: '#00c853', display: 'flex', alignItems: 'center' }}>Emitida</div>
                        </div>
                    }
                    {
                        n.factura_emitida === 'no_emitida' &&
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Tooltip title="Devolver Venta">
                                <IconButton onClick={() => {
                                     this.setState({
                                        estadoacciones: 'devolver_venta'
                                    })
                                    setTimeout(() => {
                                        this.comprobarUsuario(n)
                                    }, 100)
                                    /* this.setState({
                                        codigoEmitirFactura: n.codigo,
                                        estadoModalCancelarVenta: true,
                                    }) */
                                }}>
                                    <CloseIcon style={{ color: '#EF5350' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Emitir Factura">
                                <IconButton onClick={() => {
                                     this.setState({
                                        estadoacciones: 'emitir_factura'
                                    })
                                    setTimeout(() => {
                                        this.comprobarUsuario(n)
                                    }, 100)
                                   /*  this.setState({
                                        codigoEmitirFactura: n.codigo,
                                        estadoModalEmitirFactura: true,
                                    }) */
                                }}>
                                    <InputIcon color='primary' />
                                </IconButton>
                            </Tooltip>
                        </div>
                    }
                    {
                        n.factura_emitida === 'pendiente' &&
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <IconButton disabled>
                                <CircularProgress size={20} thickness={5} style={{ color: '#42A5F5' }} />
                            </IconButton>
                            <div style={{ color: '#42A5F5', display: 'flex', alignItems: 'center' }}>Pendiente</div>
                        </div>
                    }
                    {
                        n.factura_emitida === 'error' &&
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <IconButton disabled>
                                <CloseIcon style={{ color: 'red' }} />
                            </IconButton>
                            <div style={{ color: 'red', display: 'flex', alignItems: 'center' }}>Error de emisión</div>
                        </div>
                    }
                </div >
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
                        this.postSet(user.uid, snapshot.val(), codigo)
                        var venteRef = db.ref('users/' + user.uid + '/ventas/' + codigo);
                        venteRef.update({
                            factura_emitida: 'pendiente'
                        })
                        //setSnackBars.openSnack('success', 'rootSnackBar', 'Factura emitida con exito', 2000)
                    }
                })
            }
        })
    }

    postSet = async (uidUser, jsonData, codigo) => {
        const rawResponse = await fetch('https://stormy-bayou-19844.herokuapp.com/generarfactura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'id': uidUser,
                'codigo': codigo,
            },
            body: JSON.stringify(jsonData)
        })

        /* const content = await rawResponse.json();
        console.log(content) */
    }

    cambiarListaPorFecha = fecha => {
        this.setState({ fechaActual: fecha })
        setTimeout(() => { this.obtenerDataBaseDatos() }, 100)
    }

    // actualizar el stock de los productos
    updateDataProductos = codigoVenta => {
        var db = firebase.database();
        var ventaRef = db.ref('users/' + firebase.auth().currentUser.uid + '/ventas/' + codigoVenta);
        ventaRef.on('value', (snapshot) => {
            if (snapshot.val()) {
                snapshot.val().productos.forEach(element => {
                    var productoRef = db.ref('users/' + firebase.auth().currentUser.uid + '/productos/' + element.codigo)
                    productoRef.once('value', (snapshot) => {
                        if (snapshot.val()) {
                            productoRef.update({
                                stock_actual: Number(snapshot.val().stock_actual) + Number(element.cantidad)
                            })
                        }
                    })
                })
                this.setOperacionStock(
                    snapshot.val().productos,
                    snapshot.val().cliente,
                    snapshot.val().dinero_resibido,
                    snapshot.val().total,
                    snapshot.val().subtotal,
                    snapshot.val().descuento,
                    snapshot.val().cambio,
                )
                setTimeout(() => { this.deleteVenta(snapshot.val().codigo) }, 300)
            }
        })
    }

    //opercacion stock
    setOperacionStock = (listaProductos, cliente, dinero_resibido, total, subtotal, descuento, cambio) => {
        var codigoStock = funtions.guidGenerator()
        var arrayProductos = []
        listaProductos.forEach(item => {
            arrayProductos.push({
                codigo: item.codigo,
                cantidad: item.cantidad,
                precio_venta_a: item.precio_venta_a
            })
        })
        var order = new Date()
        var db = firebase.database();
        var operacionStockRef = db.ref('users/' + firebase.auth().currentUser.uid + '/operaciones_stock/' + codigoStock);
        operacionStockRef.set({
            codigo: codigoStock,
            tipo_operacion: 'devolucion_cliente',
            fecha: `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
            hora: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            cliente_proveedor: cliente,
            productos: arrayProductos,
            total_final: total,
            empleado: this.state.usuario.code,
            observacion: '',
            subtotal: subtotal,
            descuento: descuento,
            otros_gastos: '',
            flete: '',
            valor_pagado: dinero_resibido,
            medio_pago: '',
            saldo_favor: '',
            en_deuda: '',
            vuelto: cambio,
            acreditado: '',
            order: order + ""
        });
    }

    deleteVenta = codigo => {
        var db = firebase.database();
        var ventRef = db.ref('users/' + firebase.auth().currentUser.uid + '/ventas/' + codigo);
        ventRef.remove()
        setSnackBars.openSnack('success', 'rootSnackBar', 'Venta eliminada con exito', 2000)
    }

    enviarToPlantillaData = item => {
        const itemFormat = {
            numero_venta: item.codigo,
            tipo_venta: item.tipo_venta,
            productos: item.productos,
            subtotal: item.subtotal,
            iva: item.iva,
            total: item.total,
            descuento: item.descuento,
            fecha_venta: item.fecha_venta,
            hora_venta: item.hora_venta,
            tipo_pago: item.tipo_pago,
            valor_acreditado: item.valor_acreditado,
            fecha_a_pagar: item.fecha_a_pagar,
            numero_tarjeta: item.numero_tarjeta,
            nombre_banco: item.nombre_banco,
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                if (item.tipo_venta === 'factura') {
                    var clienteRef = db.ref('users/' + user.uid + '/clientes/' + item.cliente.codigo);
                    var empresaRef = db.ref('auth_admins/' + user.uid + "/nombre_comercial")
                    clienteRef.once('value', (snapshot) => {
                        if (snapshot.val()) {
                            itemFormat.nombreCliente = snapshot.val().nombre
                            itemFormat.emailCliente = snapshot.val().email
                            itemFormat.identificacionCliente = snapshot.val().numero_identificacion
                            itemFormat.direccionCliente = snapshot.val().direccion

                            empresaRef.once('value', (snap) => {
                                if (snap.val()) {
                                    itemFormat.nombreEmpresa = snap.val()
                                    this.setState({
                                        itemFormateadoImprimir: itemFormat
                                    })
                                    this.refEventoImprimir.handlePrint()
                                }
                            })
                        }
                    })
                } else {
                    var empresaRef = db.ref('auth_admins/' + user.uid + "/nombre_comercial")
                    empresaRef.once('value', (snap) => {
                        if (snap.val()) {
                            itemFormat.nombreEmpresa = snap.val()
                            this.setState({
                                itemFormateadoImprimir: itemFormat
                            })
                            this.refEventoImprimir.handlePrint()
                        }
                    })
                }
            }
        })

    }

    obtenerPermisosusuarios = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var usuariosRef = db.ref(`users/${user.uid}/usuarios/${this.state.usuario.code}`)
                usuariosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        if (snapshot.val().privilegios.ventas === true) {
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
            if (this.state.estadoacciones === 'devolver_venta') {
                this.setState({
                    codigoEmitirFactura: item.codigo,
                    estadoModalCancelarVenta: true,
                })
            } else if (this.state.estadoacciones === 'emitir_factura') {
                this.setState({
                    codigoEmitirFactura: n.codigo,
                    estadoModalEmitirFactura: true,
                })
            } else {
                this.setState({ itemSeleccionado: item })
                this.setState({ openModalNewCliente: true })
            }
        } else {
            if (this.state.estadoacciones === 'devolver_venta') {
                if (item.usuario === this.state.usuario.code) {
                    this.setState({
                        codigoEmitirFactura: item.codigo,
                        estadoModalCancelarVenta: true,
                    })
                } else {
                    setSnackBars.openSnack('warning', 'rootSnackBar', `Usted ${this.state.usuario.nombre} no registro esta Venta`, 2000)
                }
            } else if (this.state.estadoacciones === 'emitir_factura') {
                if (item.usuario === this.state.usuario.code) {
                    this.setState({
                        codigoEmitirFactura: n.codigo,
                        estadoModalEmitirFactura: true,
                    })
                } else {
                    setSnackBars.openSnack('warning', 'rootSnackBar', `Usted ${this.state.usuario.nombre} no registro esta Venta`, 2000)
                }
            } 
        }
    }

    render() {

        return (
            <Layout title="Ventas" onChangueUserState={usuario => {
                this.setState({ usuario: usuario })
                setTimeout(() => {
                    this.obtenerPermisosusuarios()
                }, 100)
            }
            }>
                {
                    this.state.estadoPermisos&&
                    <div>

                        <MenuHerramientas>
                            <ItemMenuHerramienta
                                titleButton="Nueva Venta"
                                color="primary"
                                visible={true}
                                onClick={() => {
                                    this.setState({ itemEditar: null })
                                    this.setState({ openModalNewVenta: true })
                                }}
                            />
                            <ItemMenuHerramienta
                                titleButton="Nueva Venta"
                                color="primary"
                                visible={true}
                                onClick={() => {
                                    this.setState({ itemEditar: null })
                                    this.setState({ openModalNewVentaFinal: true })
                                }}
                            />

                            <TextField
                                id="datetime-local"
                                type="date"
                                defaultValue={this.state.fechaActual}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => this.cambiarListaPorFecha(e.target.value)}
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
                            <NuevaVenta
                                usuario={this.state.usuario}
                                handleClose={() => this.setState({ openModalNewVenta: false })}
                                item={this.state.itemEditar}
                            >
                            </NuevaVenta>
                        </FullScreenDialog>

                        <FullScreenDialog openModal={this.state.openModalNewVentaFinal}>
                            <ModalNewVenta
                                usuario={this.state.usuario}
                                handleClose={() => this.setState({ openModalNewVentaFinal: false })}
                                item={this.state.itemEditar}
                            >
                            </ModalNewVenta>
                        </FullScreenDialog>

                        <FullScreenDialog openModal={this.state.estadoModalSimpleCompraProductos}>
                            <ModalCompraProductos
                                handleClose={() => this.setState({
                                    estadoModalSimpleCompraProductos: false,
                                })}
                                usuario={this.state.usuario}
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

                        <ModalContainerNormal
                            open={this.state.estadoModalCancelarVenta}
                            handleClose={() => this.setState({ estadoModalCancelarVenta: false })}
                        >
                            <ModalCancelarVenta
                                handleClose={() => this.setState({ estadoModalCancelarVenta: false })}
                                handleCancelarVenta={() => {
                                    // this.recuperarJsonFactura(this.state.codigoEmitirFactura)
                                    this.updateDataProductos(this.state.codigoEmitirFactura)
                                    this.setState({ estadoModalCancelarVenta: false })
                                }}
                            />
                        </ModalContainerNormal>

                        <ModalContainerNormal
                            open={this.state.estadoModalEditarVenta}
                            handleClose={() => this.setState({ estadoModalEditarVenta: false })}
                        >
                            <ModalEditarVenta
                                handleClose={() => this.setState({ estadoModalEditarVenta: false })}
                                handleEditarVenta={() => {
                                    // this.recuperarJsonFactura(this.state.codigoEmitirFactura)
                                    this.setState({ openModalNewVenta: true })
                                    this.setState({ estadoModalEditarVenta: false })
                                }}
                            />
                        </ModalContainerNormal>

                        <ContainerPlantillas>
                            <ResivoVenta
                                item={this.state.itemFormateadoImprimir}
                                ref={el => (this.refImprimirResivo = el)}
                            />
                        </ContainerPlantillas>
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
                    <CircularProgress/>
                }

            </Layout>
        );
    }
}

export default Ventas