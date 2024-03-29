import React, { Component } from 'react';
import MenuHerramientas from '../../menus/MenuHerramientas'
import ItemMenuHerramienta from '../../menus/ItemMenuHerramienta'
import TablaNormal from '../../tables/TableNormal'
import Divider from '@material-ui/core/Divider';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import funtions from '../../../../utils/funtions';
import ReturnTextTable from '../../tables/ReturnTextTable';
import ModalCompraProductos from '../../../modals_container/ModalCompraProductos';
import FullScreenDialog from '../../FullScreenDialog';
import Search from '../../Search';

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
    }

    componentDidMount() {
        this.cargarData()
    }

    cargarData = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/operaciones_stock');
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
        });
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
            return n.cliente_proveedor==='Consumidor Final'?n.cliente_proveedor:<>
             <ReturnTextTable
                referencia="proveedores"
                codigo={n.cliente_proveedor}
                datoTraido="nombre"
                estado={true}
            />
             <ReturnTextTable
                referencia="clientes"
                codigo={n.cliente_proveedor}
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

    render() {
        return (
            <div>
                <MenuHerramientas>
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
                        <MenuItem onClick={() => this.setState({
                            tipoAjuste: 'devolucion_cliente',
                            estadoModalSimpleCompraProductos: true
                        })}>
                            Devolución del cliente
                        </MenuItem>
                        <MenuItem onClick={() => this.setState({
                            tipoAjuste: 'compra_producto',
                            estadoModalSimpleCompraProductos: true
                        })}>
                            Compra de productos
                        </MenuItem>
                        <MenuItem onClick={() => this.setState({
                            tipoAjuste: 'ajuste-stock-entrada',
                            estadoModalSimpleCompraProductos: true
                        })}>
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
                        <MenuItem onClick={() => this.setState({
                            tipoAjuste: 'devolucion-proveedor',
                            estadoModalSimpleCompraProductos: true
                        })}>
                            Devolución al proveedor
                        </MenuItem>
                        <MenuItem onClick={() => this.setState({
                            tipoAjuste: 'ajuste-stock-salida',
                            estadoModalSimpleCompraProductos: true
                        })}>
                            Ajuste de Stock
                        </MenuItem>
                    </Menu>

                    {/* <ItemMenuHerramienta
                        titleButton="Editar"
                        color="primary"
                        visible={true}
                        onClick={() => console.log("Hola")}
                    />
                    <ItemMenuHerramienta
                        titleButton="Cancelar"
                        color="primary"
                        visible={true}
                        onClick={() => console.log("Hola")}
                    /> */}

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
                        usuario={this.props.usuario}
                        tipoAjuste={this.state.tipoAjuste}
                    />
                </FullScreenDialog>

            </div>
        );
    }
}

export default Stock;