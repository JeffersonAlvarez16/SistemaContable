import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MonetizationOn from '@material-ui/icons/MonetizationOn';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'


import funtions from '../utils/funtions';
import ReturnTextTable from '../components/components/tables/ReturnTextTable';
import ModalCompraProductos from '../components/modals_container/ModalCompraProductos';
import Search from '../components/components/Search';
import FullScreenDialog from '../components/components/FullScreenDialog';
import MenuHerramientas from '../components/components/menus/MenuHerramientas';
import TablaNormal from '../components/components/tables/TableNormal';
import ItemMenuHerramienta from '../components/components/menus/ItemMenuHerramienta';
import Layout from '../components/containers/Layout';
import { TextField, IconButton, Tooltip, CircularProgress } from '@material-ui/core';
import setSnackBars from '../components/plugins/setSnackBars';

class Stock extends Component {

    state = {
        listaStock: [],
        listaStockTemporal: [],
        rowslistaStock: [
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'tipo_operacion', numeric: true, disablePadding: false, label: 'Tipo de operación' },
            { id: 'fecha', numeric: true, disablePadding: false, label: 'Fecha' },
            { id: 'hora', numeric: true, disablePadding: false, label: 'Hora' },
            { id: 'cliente_proveedor', numeric: true, disablePadding: false, label: 'Cliente/Proveedor' },
            { id: 'productos', numeric: true, disablePadding: false, label: 'Productos' },
            { id: 'empleado', numeric: true, disablePadding: false, label: 'Empleado' },
            { id: 'subtotal', numeric: true, disablePadding: false, label: 'Sub Total' },
            { id: 'total_final', numeric: true, disablePadding: false, label: 'Total final' },
            { id: 'descuento', numeric: true, disablePadding: false, label: 'Descuento' },
            { id: 'valor_pagado', numeric: true, disablePadding: false, label: 'Valor Pagado' },
            { id: 'vuelto', numeric: true, disablePadding: false, label: 'Vuelto' },
            { id: 'observacion', numeric: true, disablePadding: false, label: 'Observación' },
            { id: 'otros_gastos', numeric: true, disablePadding: false, label: 'Otros Gastos' },
            { id: 'flete', numeric: true, disablePadding: false, label: 'Flete' },
            { id: 'medio_pago', numeric: true, disablePadding: false, label: 'Medio pago' },
            { id: 'saldo_favor', numeric: true, disablePadding: false, label: 'Saldo a favor' },
            { id: 'en_deuda', numeric: true, disablePadding: false, label: 'En deuda' },
            { id: 'acreditado', numeric: true, disablePadding: false, label: 'Acreditado' },
        ],
        estadoTabla: 'llena',
        //items selecionados tabla
        itemsSeleccionados: [],
        //referencias menus 
        referenciaMenuEntrada: null,
        referenciaMenuSalida: null,
        //estados modals
        estadoModalSimpleCompraProductos: false,
        //tipo de ajuste para productos
        tipoAjuste: '',
        //fecha actual del sistem

        //permisosUsuarios
        title: '',
        titlep: '',
        estadoPermisoDevolucionCliente: null,
        estadoPermisoDevolucionProveedor: null,
        estadoPermisoCompraProductos: null,
        estadoPermisoAjusteStock: null,
        fechaActual: '',
        //usuario
        usuario: null,
        cajaSeleccionada: null
    }



    componentDidMount() {
        this.cargarData()
        this.setState({
            fechaActual: funtions.obtenerFechaActual()
        })

    }

    cargarCaja = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var operacionVentaRefCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_abiertas_usuario')
                operacionVentaRefCaja.once('value', (snap) => {
                    if (snap.val()) {
                        var caja = funtions.snapshotToArray(snap).filter(it => it.usuario === this.state.usuario.code)[0]
                        if(caja!=null){
                            this.setState({
                                cajaSeleccionada:caja
                            })
                        }else{
                            this.setState({
                                cajaSeleccionada: null
                            }) 
                        }
                    } else {
                        this.setState({
                            cajaSeleccionada: null
                        })
                    }
                })
            }
        })

    }

    obtenerPermisosUsuarios = () => {
        console.log(this.state.usuario)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var usuariosRef = db.ref(`users/${user.uid}/usuarios/${this.state.usuario.code}`)
                usuariosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {                    
                        if (snapshot.val().privilegios.stock.devolucion_cliente === true) {
                            this.setState({
                                estadoPermisoDevolucionCliente: false,
                                title: ''
                            })
                        } else {
                            this.setState({
                                estadoPermisoDevolucionCliente: true,
                                title: ''
                            })
                        }
                        if (snapshot.val().privilegios.stock.devolucion_proveedor === true) {
                            this.setState({
                                estadoPermisoDevolucionProveedor: false,
                                title: ''
                            })
                        } else {

                            this.setState({
                                estadoPermisoDevolucionProveedor: true,

                            })
                        }
                        if (snapshot.val().privilegios.stock.compra_productos === true) {
                            this.setState({
                                estadoPermisoCompraProductos: false,

                            })
                        } else {

                            this.setState({
                                estadoPermisoCompraProductos: true,
                                titlep: 'No tiene Permiso para algunas acciones'
                            })
                        }
                        if (snapshot.val().privilegios.stock.ajuste_stock === true) {
                            this.setState({
                                estadoPermisoAjusteStock: false,
                                title: ''

                            })
                        } else {
                            this.setState({
                                estadoPermisoAjusteStock: true,


                            })
                        }

                    }
                });
            }
        });
    }

    cargarData = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/operaciones_stock').orderByChild('fecha').equalTo(funtions.obtenerFechaActual())
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaStock: [],
                            listaStockTemporal: [],
                            estadoTabla: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        var filterList = lista.sort((a, b) => {
                            a = new Date(a.order);
                            b = new Date(b.order);
                            return a > b ? -1 : a < b ? 1 : 0;
                        })
                        this.setState({
                            listaStock: filterList,
                            listaStockTemporal: filterList,
                            estadoTabla: 'llena'
                        })
                    } else {
                        this.setState({
                            listaStock: [],
                            listaStockTemporal: [],
                            estadoTabla: 'vacio'
                        })
                    }
                });
            }
        })
    }

    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }

        if (item.id === 'tipo_operacion') {
            return n.tipo_operacion
        }

        if (item.id === 'fecha') {
            return <div style={{ width: 'max-content' }}>{n.fecha}</div>
        }

        if (item.id === 'hora') {
            return n.hora
        }

        if (item.id === 'cliente_proveedor') {
            return n.cliente_proveedor === 'Consumidor Final' ? n.cliente_proveedor : <>
                <ReturnTextTable
                    referencia="proveedores"
                    codigo={n.cliente_proveedor.codigo}
                    datoTraido="nombre"
                    estado={true}
                />
                <ReturnTextTable
                    referencia="proveedores"
                    codigo={n.cliente_proveedor}
                    datoTraido="nombre"
                    estado={true}
                />
                <ReturnTextTable
                    referencia="clientes"
                    codigo={n.cliente_proveedor.codigo}
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

        if (item.id === 'total_final') {
            return n.total_final
        }

        if (item.id === 'empleado') {
            return <ReturnTextTable
                referencia="usuarios"
                codigo={n.empleado}
                datoTraido="nombre"
                estado={true}
            />
        }

        if (item.id === 'vendedor') {
            return n.vendedor
        }

        if (item.id === 'observacion') {
            return n.observacion
        }

        if (item.id === 'subtotal') {
            return n.subtotal
        }

        if (item.id === 'descuento') {
            return n.descuento
        }

        if (item.id === 'otros_gastos') {
            return n.otros_gastos
        }

        if (item.id === 'flete') {
            return n.flete
        }

        if (item.id === 'valor_pagado') {
            return n.valor_pagado
        }

        if (item.id === 'medio_pago') {
            return n.medio_pago
        }

        if (item.id === 'saldo_favor') {
            return n.saldo_favor
        }

        if (item.id === 'en_deuda') {
            return n.en_deuda
        }

        if (item.id === 'vuelto') {
            return n.vuelto
        }

        if (item.id === 'acreditado') {
            return n.acreditado
        }
    }

    handleSearch = (codigo) => {
        this.setState({ listaStock: [], estadoTabla: 'cargando' })
        funtions.setTime(300, () => {
            let array = funtions.filterObjectsCodigo(this.state.listaStockTemporal, codigo)
            if (array.length > 0) {
                this.setState({ estadoTabla: 'llena' })
            } else {
                this.setState({ estadoTabla: 'sin_resultados' })
            }
            this.setState({
                listaStock: array
            })

        })
    }

    cambiarListaPorFecha = fecha => {
        this.setState({ fechaActual: fecha })
        setTimeout(() => { this.cargarData() }, 100)
    }

    render() {
        console.log(this.state.cajaSeleccionada)
        const { titlep, estadoPermisoDevolucionCliente, estadoPermisoDevolucionProveedor, estadoPermisoAjusteStock, estadoPermisoCompraProductos, title } = this.state
        return (
            <Layout title="Stock" onChangueUserState={usuario => {
                this.setState({ usuario: usuario })
                setTimeout(() => {                   
                    this.obtenerPermisosUsuarios()
                    this.cargarCaja()
                }, 100)
            }}>
                <MenuHerramientas>
                    {
                        this.state.cajaSeleccionada != null && Boolean(this.state.cajaSeleccionada.estado) === true &&
                        <>
                            <Tooltip title="Estado de caja">
                                <IconButton >
                                    <MonetizationOn style={{ color: '#00c853' }} />
                                </IconButton>
                            </Tooltip>
                        </>
                    }
                    {
                        this.state.cajaSeleccionada === null &&
                        <>
                            <Tooltip title="Estado de caja">
                                <IconButton >
                                    <MonetizationOn style={{ color: '#EF5350' }} />
                                </IconButton>
                            </Tooltip>
                        </>
                    }

                    <ItemMenuHerramienta
                        titleButton="Entrada"
                        color="primary"
                        visible={true}
                        onClick={event => this.setState({ referenciaMenuEntrada: event.currentTarget })}
                    />
                    <Menu
                        id="simple-menu-entrada"
                        anchorEl={this.state.referenciaMenuEntrada}
                        open={Boolean(this.state.referenciaMenuEntrada)}
                        onClose={() => this.setState({ referenciaMenuEntrada: null })}
                    >
                        <MenuItem
                            disabled={estadoPermisoDevolucionCliente}
                            onClick={() => {
                                if (this.state.cajaSeleccionada != null) {
                                    this.setState({
                                        tipoAjuste: 'devolucion_cliente',
                                        estadoModalSimpleCompraProductos: true
                                    })
                                } else {
                                    setSnackBars.openSnack('error', 'rootSnackBar', 'Abrir Caja', 1000)
                                }
                            }}>
                            Devolución del cliente
                        </MenuItem>
                        <MenuItem
                            disabled={estadoPermisoCompraProductos}
                            onClick={() => {
                                if (this.state.cajaSeleccionada != null) {
                                    this.setState({
                                        tipoAjuste: 'compra_producto',
                                        estadoModalSimpleCompraProductos: true
                                    })
                                } else {
                                    setSnackBars.openSnack('error', 'rootSnackBar', 'Abrir Caja', 1000)
                                }

                            }}>
                            Compra de productos
                        </MenuItem>
                        <MenuItem
                            disabled={estadoPermisoAjusteStock}
                            onClick={() => {
                                if (this.state.cajaSeleccionada != null) {
                                    this.setState({
                                        tipoAjuste: 'ajuste_stock_entrada',
                                        estadoModalSimpleCompraProductos: true
                                    })
                                } else {
                                    setSnackBars.openSnack('error', 'rootSnackBar', 'Abrir Caja', 1000)
                                }

                            }}>
                            Ajuste de Stock
                        </MenuItem>

                    </Menu>

                    <ItemMenuHerramienta
                        titleButton="Salida"
                        color="primary"
                        visible={true}
                        onClick={event => this.setState({ referenciaMenuSalida: event.currentTarget })}
                    />

                    <Menu
                        id="simple-menu-salida"
                        anchorEl={this.state.referenciaMenuSalida}
                        open={Boolean(this.state.referenciaMenuSalida)}
                        onClose={() => this.setState({ referenciaMenuSalida: null })}
                    >
                        <MenuItem
                            disabled={estadoPermisoDevolucionProveedor}
                            onClick={() => {
                                if (this.state.cajaSeleccionada != null) {
                                    this.setState({
                                        tipoAjuste: 'devolucion_proveedor',
                                        estadoModalSimpleCompraProductos: true
                                    })
                                } else {
                                    setSnackBars.openSnack('error', 'rootSnackBar', 'Abrir Caja', 1000)
                                }

                            }}>
                            Devolución al proveedor
                        </MenuItem>
                        <MenuItem
                            disabled={estadoPermisoAjusteStock}
                            onClick={() => {
                                if (this.state.cajaSeleccionada != null) {
                                    this.setState({
                                        tipoAjuste: 'ajuste_stock_salida',
                                        estadoModalSimpleCompraProductos: true
                                    })
                                } else {
                                    setSnackBars.openSnack('error', 'rootSnackBar', 'Abrir Caja', 1000)
                                }

                            }}>
                            Ajuste de Stock
                        </MenuItem>

                    </Menu>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            id="datetime-local"
                            type="date"
                            defaultValue={this.state.fechaActual}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => this.cambiarListaPorFecha(e.target.value)}
                        />
                    </div>
                    <div style={{ flex: 0.9 }}></div>

                    <Search
                        id='buscar-producto'
                        textoSearch="Buscar..."
                        textoTooltip="Buscar producto"
                        handleSearch={this.handleSearch}
                    />
                </MenuHerramientas>

                <Divider />

                <TablaNormal
                    textoTitleP="Stocks"
                    textoTitleS="Stock"
                    selectedItems={true}
                    toolbar={false}
                    notTab={true}
                    data={this.state.listaStock}
                    rows={this.state.rowslistaStock}
                    handleGetData={this.handleGetData}
                    estadoTabla={this.state.estadoTabla}
                    itemsSeleccionados={items => this.setState({ itemsSeleccionados: items })}
                />

                <FullScreenDialog openModal={this.state.estadoModalSimpleCompraProductos}>
                    <ModalCompraProductos
                        handleClose={() => this.setState({
                            estadoModalSimpleCompraProductos: false,
                            referenciaMenuSalida: null,
                            referenciaMenuEntrada: null
                        })}
                        usuario={this.state.usuario}
                        tipoAjuste={this.state.tipoAjuste}
                    />
                </FullScreenDialog>
            </Layout>
        );
    }
}

export default Stock;