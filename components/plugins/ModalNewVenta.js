import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import SectionContentFactura from '../components/SectionContentFactura';
import SectionFactura from '../components/SectionFactura';
import funtions from '../../utils/funtions';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import MonetizationOn from '@material-ui/icons/MonetizationOn';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import setSnackBars from './setSnackBars';
import ModalContainerNormal from '../modals_container/ModalContainerNormal';
import DeleteActivarDesactivar from './deleteActivarDesactivar';
import AutoCompleteSelectedProducto from './AutoCompleteSelectedProducto';
import ModalNewVentaJs from './ModalNewVentaJs';
import { TextField, MenuItem, Typography, FormControlLabel, Switch, Button, Tooltip } from '@material-ui/core';
import ContenedorProductoVista from './ventas/ContenedorProductoVista';
import TablaNormal from '../components/tables/TableNormal';
import ContenedorClienteVista from './ventas/ContenedorClienteVista';
import ContenedorPreciosTotalesVista from './ventas/ContenedorPreciosTotalesVista';
import ContenedorSeleccionarTipoPrecio from './ventas/ContenedorSeleccionarTipoPrecio';
import ContenedorSeleccionarTipoPago from './ventas/ContenedorSeleccionarTipoPago';
import ContenedorBotonesVenta from './ventas/ContenedorBotonesVenta';
import ModalFinalizaPago from '../modals_container/ventas/ModalFinalizaPago';
import ModalSettingsPrices from '../modals_container/ModalSettingsPrices';

class ModalNewVenta extends Component {

    state = {
        usuario: null,

        sumaSubTotal: 0,
        sumaIva: 0,
        sumaTotal: 0,

        mostrarVentana: null,

        productosSeleccionados: [],

        //nuevos
        listaProductosSeleccionadosEditados: [],
        listaProductosSeleccionados: [],
        itemProductoCargado: null,

        cargaAutomatica: false,

        rowslistaProductos: [
            { id: 'acciones', numeric: true, disablePadding: false, label: 'Acciones' },
            { id: 'cantidad', numeric: true, disablePadding: false, label: 'Cantidad' },
            { id: 'descripcion_producto', numeric: true, disablePadding: false, label: 'Descripcion' },
            { id: 'precio_venta', numeric: true, disablePadding: false, label: 'Precio/U' },
            { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
        ],
        clienteFacturacion: '',
        clienteSeleccionado: null,

        //precio seleccionado
        precioSeleccionado: null,
        //tipo de pago
        tipo_pago: 'efectivo',
        //estado de modals
        estadoModalFinalizaPago: false,
        estadoModalSimpleConfigurarPrecios: false,
        //


        clienteCargadoDB: '',

        cliente: '',
        descuento: 0,
        observacion: '',
        dinero_resibido: 0,
        cambio: 0,


        //valores adicionales para la factura
        precioProductosSinIva: 0,
        precioProductosConIva: 0,

        //factura electronica
        facturaElectronica: false,

        // estado modales
        estadoModalGuardarVenta: false,

        //id del usuario
        uidUser: '',

        //tipo de venta
        tipo_venta: 'factura',
        // ambiente
        ambienteFacturacion: 0,
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                uidUser: user.uid
            })
        })
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var empresaRef = db.ref('auth_admins/' + user.uid + "/ambiente")
                empresaRef.on('value', (snap) => {
                    if (snap.val()) {
                        this.setState({ ambienteFacturacion: snap.val() })
                    }
                })
            }
        })
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var empresaRef = db.ref('users/' + user.uid + "/precios")
                empresaRef.on('value', (snap) => {
                    if (snap.val()) {
                        var array = funtions.snapshotToArray(snap)
                        this.setState({
                            precios: array,
                            precioSeleccionado: array[0]
                        })
                    }
                })
            }
        })
        if (this.props.item) {
            this.setState({
                cambio: this.props.item.cambio,
                cliente: this.props.item.cliente,
                codigo: this.props.item.codigo,
                descuento: this.props.item.descuento,
                dinero_resibido: this.props.item.dinero_resibido,
                empleado: this.props.item.empleado,
                estado: this.props.item.estado,
                factura_emitida: this.props.item.factura_emitida,
                fecha_venta: this.props.item.fecha_venta,
                hora_venta: this.props.item.hora_venta,
                iva: this.props.item.iva,
                observacion: this.props.item.observacion,
                order: this.props.item.order,
                productosSeleccionados: this.props.item.productos,
                subtotal: this.props.item.subtotal,
                tipo_venta: this.props.item.tipo_venta,
                total: this.props.item.total
            })
        }
    }

    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }
        if (item.id === 'cantidad') {

            var restaRetorno = <div style={{ width: 'max-content', display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', alignItems: 'center', paddingRight: 10 }}>{`${n.unidad_medida}`}</div>
                <TextField
                    id="handle-precio-edit-cantidad"
                    margin="dense"
                    type="number"
                    value={this.state.listaProductosSeleccionadosEditados.filter(item => n.codigo === item.codigo)[0].cantidad}
                    onChange={event => {
                        var array = this.state.listaProductosSeleccionadosEditados
                        array.filter(item => n.codigo === item.codigo)[0].cantidad = event.target.value
                        this.setState({
                            listaProductosSeleccionadosEditados: array
                        })
                        this.calcularValoresTotales()
                    }}
                    placeholder='00'
                    style={{ width: 50 }}
                />
                <div style={{ width: 'max-content', display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: 10 }}>
                    {`en stock ${Number(n.stock_actual) - Number(this.state.listaProductosSeleccionadosEditados.filter(item => n.codigo === item.codigo)[0].cantidad)}`}
                </div>
            </div>

            return restaRetorno
        }
        if (item.id === 'descripcion_producto') {
            return Boolean(n.tiene_iva) ? `* ${n.descripcion_producto}` : n.descripcion_producto
        }
        if (item.id === 'precio_venta') {
            var precioR = 0
            if (this.state.precioSeleccionado != null) {
                precioR = ((Number(n.precio_costo) * Number(this.state.precioSeleccionado.porcentaje)) + Number(n.precio_costo)).toFixed(2)
            }
            return precioR
        }
        if (item.id === 'total') {
            var precioR = 0
            if (this.state.precioSeleccionado != null) {
                precioR = ((Number(n.precio_costo) * Number(this.state.precioSeleccionado.porcentaje)) + Number(n.precio_costo)).toFixed(2)
            }
            var itemValor = this.state.listaProductosSeleccionadosEditados.filter(item => item.codigo === n.codigo)[0]
            var sumaTotal = itemValor.cantidad * precioR
            return sumaTotal.toFixed(2)
        }
        if (item.id === 'acciones') {
            return <IconButton variant="fab" mini color="default" aria-label="quit" onClick={() => {
                const arraySeleccionados = this.state.listaProductosSeleccionados
                const arraySeleccionadosEditados = this.state.listaProductosSeleccionadosEditados
                var contador1 = 0
                var contador2 = 0
                arraySeleccionados.forEach(item => {
                    if (item.codigo === n.codigo) {
                        arraySeleccionados.splice(contador1, 1);
                        this.setState({ listaProductosSeleccionados: arraySeleccionados })
                    }
                    contador1++
                })
                arraySeleccionadosEditados.forEach(item => {
                    if (item.codigo === n.codigo) {
                        arraySeleccionadosEditados.splice(contador2, 1);
                        this.setState({ listaProductosSeleccionadosEditados: arraySeleccionadosEditados })
                    }
                    contador2++
                })
                this.calcularValoresTotales()
            }}>
                <CloseIcon />
            </IconButton >
        }

    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.props.handleClose()
        }
    }
    /* 
        getClienteDataBase = cliente => {
            console.log("object")
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var db = firebase.database();
                    var productosRef = db.ref('users/' + user.uid + '/clientes/' + cliente);
                    productosRef.on('value', (snapshot) => {
                        console.log(snapshot.val())
                        this.setState({
                            clienteCargadoDB: snapshot.val()
                        })
                    })
                }
            })
        } */

    getStatusUsuario = () => {
        if (this.state.usuario) {
            if (this.state.usuario.code) {
                this.setState({
                    mostrarVentana: true
                })
            } else {
                this.setState({
                    mostrarVentana: false
                })
            }
        }
    }

    onClick = () => {
        this.contentFactura.finalizarVenta()
    };

    handleNuevaVenta = () => {
        this.sectionFactura.nuevaVenta()
    }

    handleDescontar = descuento => {
        this.setState({
            descuento: descuento
        })
        setTimeout(() => {
            const { sumaSubTotal, sumaIva, dinero_resibido } = this.state
            var sumaDescuento = ((Number(sumaSubTotal) + Number(sumaIva)) - Number(descuento)).toFixed(2)
            this.setState({
                sumaTotal: sumaDescuento
            })
            this.handleDineroResibido(dinero_resibido)
        }, 100)
    }

    handleDineroResibido = dinero_resibido => {
        this.setState({
            dinero_resibido: dinero_resibido
        })
        setTimeout(() => {
            const { sumaTotal } = this.state
            var sumaCambio = Number(dinero_resibido) > 0 ? (Number(dinero_resibido) - Number(sumaTotal)).toFixed(2) : 0
            this.setState({
                cambio: sumaCambio
            })
        }, 100)
    }

    handleObservacion = observacion => {
        this.setState({
            observacion
        })
    }

    //finalizar venta
    handleFinalizarVenta = item => {
        const { listaProductosSeleccionadosEditados, facturaElectronica, uidUser, tipo_venta } = this.state
        var codigoRegistroVenta = funtions.guidGenerator()
        switch (item.tipo_pago) {
            case 'efectivo': {
                this.updateDataProductos()
                this.setOperacionStockEfectivo(listaProductosSeleccionadosEditados)
                this.setSaveRegistroVentaEfectivo(codigoRegistroVenta)
                this.enviarFacturaElectronica(codigoRegistroVenta, uidUser, tipo_venta, facturaElectronica, item)
                break
            }
            case 'credito': {
                this.updateDataProductos()
                this.setOperacionStockCredito(listaProductosSeleccionadosEditados, item.valor_acreditado)
                this.setSaveRegistroVentaCredito(codigoRegistroVenta, item)
                this.enviarFacturaElectronica(codigoRegistroVenta, uidUser, tipo_venta, facturaElectronica, item)
                break
            }
            case 'tarjeta-credito': {
                this.updateDataProductos()
                this.setOperacionStockTarjetaCredito(listaProductosSeleccionadosEditados)
                this.setSaveRegistroVentaTarjetaCredito(codigoRegistroVenta, item)
                this.enviarFacturaElectronica(codigoRegistroVenta, uidUser, tipo_venta, facturaElectronica, item)
                break
            }
            case 'tarjeta-debito': {
                this.updateDataProductos()
                this.setOperacionStockTarjetaCredito(listaProductosSeleccionadosEditados)
                this.setSaveRegistroVentaTarjetaCredito(codigoRegistroVenta, item)
                this.enviarFacturaElectronica(codigoRegistroVenta, uidUser, tipo_venta, facturaElectronica, item)
                break
            }
            case 'cheque': {
                this.updateDataProductos()
                this.setOperacionStockTarjetaCredito(listaProductosSeleccionadosEditados)
                this.setSaveRegistroVentaTarjetaCredito(codigoRegistroVenta, item)
                this.enviarFacturaElectronica(codigoRegistroVenta, uidUser, tipo_venta, facturaElectronica, item)
                break
            }
            default: {
                break
            }
        }
    }



    enviarFacturaElectronica = (codigoRegistroVenta, uidUser, tipo_venta, facturaElectronica, item) => {
        if (tipo_venta === 'factura') {

            var jsonData = {}
            switch (item.tipo_pago) {
                case 'efectivo': {
                    jsonData = this.createJsonFacturaElectronicaEfectivo()
                    this.saveFacturasJson(jsonData, codigoRegistroVenta)
                    this.enviarFacturaElectrónica(facturaElectronica, uidUser, jsonData, codigoRegistroVenta)
                    this.setState({ abrirModalFinalizarVenta: false })
                    break
                }
                case 'credito': {
                    jsonData = this.createJsonFacturaElectronicaCredito(item)
                    this.saveFacturasJson(jsonData, codigoRegistroVenta)
                    this.enviarFacturaElectrónica(facturaElectronica, uidUser, jsonData, codigoRegistroVenta)
                    this.setState({ abrirModalFinalizarVenta: false })
                    break
                }
                case 'tarjeta-credito': {
                    jsonData = this.createJsonFacturaElectronicaTarjetaCredito(item)
                    this.saveFacturasJson(jsonData, codigoRegistroVenta)
                    this.enviarFacturaElectrónica(facturaElectronica, uidUser, jsonData, codigoRegistroVenta)
                    this.setState({ abrirModalFinalizarVenta: false })
                    break
                }
                case 'tarjeta-debito': {
                    jsonData = this.createJsonFacturaElectronicaTarjetaCredito(item)
                    this.saveFacturasJson(jsonData, codigoRegistroVenta)
                    this.enviarFacturaElectrónica(facturaElectronica, uidUser, jsonData, codigoRegistroVenta)
                    this.setState({ abrirModalFinalizarVenta: false })
                    break
                }
                case 'cheque': {
                    jsonData = this.createJsonFacturaElectronicaTarjetaCredito(item)
                    this.saveFacturasJson(jsonData, codigoRegistroVenta)
                    this.enviarFacturaElectrónica(facturaElectronica, uidUser, jsonData, codigoRegistroVenta)
                    this.setState({ abrirModalFinalizarVenta: false })
                    break
                }
                default: {
                    break
                }
            }
        }
        setTimeout(() => {
            this.props.handleClose()
        }, 500)
        setSnackBars.openSnack('success', 'rootSnackBar', 'Venta guardada', 2000)
    }

    enviarFacturaElectrónica = (facturaElectronica, uidUser, jsonData, codigoRegistroVenta) => {
        if (Boolean(facturaElectronica)) {
            this.postSet(uidUser, jsonData, codigoRegistroVenta)
        }
    }

    saveFacturasJson = (jsonData, codigoRegistroVenta) => {
        var db = firebase.database();
        var operacionFacturaJson = db.ref('users/' + firebase.auth().currentUser.uid + '/facturas_ventas/' + codigoRegistroVenta);
        operacionFacturaJson.set(jsonData)
    }

    postSet = async (uidUser, jsonData, codigoRegistroVenta) => {
        const rawResponse = await fetch('https://stormy-bayou-19844.herokuapp.com/generarfactura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'id': uidUser,
                'codigo': codigoRegistroVenta,
            },
            body: JSON.stringify(jsonData)
        })

        /* const content = await rawResponse.json();
        setSnackBars.openSnack('success', 'rootSnackBar', `Factura emitida con exito ${content.estado}`, 2000)
        */ /* if (content != null) {
            this.setState({ estadoModalGuardarVenta: false })
        } */
    }

    //comprobar campos llenos 
    comprobarCamposLlenosEfectivo = () => {
        const { listaProductosSeleccionados, dinero_resibido } = this.state
        if (
            this.comprobarTipoVenta() > 0 &&
            listaProductosSeleccionados.length > 0 &&
            dinero_resibido.length > 0
        ) {
            return true
        } else {
            setSnackBars.openSnack('error', 'rootSnackBar', 'Completar todo los campos', 1000)
            return false
        }
    }

    comprobarCamposLlenosCredito = () => {
        const { listaProductosSeleccionados, dinero_resibido } = this.state
        if (
            this.comprobarTipoVenta() > 0 &&
            listaProductosSeleccionados.length > 0
        ) {
            return true
        } else {
            setSnackBars.openSnack('error', 'rootSnackBar', 'Completar todo los campos', 1000)
            return false
        }
    }
    ////////////////////////////////

    comprobarTipoVenta = () => {
        const { clienteSeleccionado, tipo_venta } = this.state
        if (tipo_venta === 'final') {
            return true
        } else {
            if (clienteSeleccionado != null) {
                if (clienteSeleccionado.toString().length > 0) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        }
    }

    //Registra la venta 
    setSaveRegistroVentaEfectivo = codigoVenta => {
        const {
            clienteSeleccionado,
            descuento,
            observacion,
            dinero_resibido,
            cambio,
            sumaSubTotal,
            sumaIva,
            sumaTotal,
            tipo_venta,
            facturaElectronica,
            listaProductosSeleccionadosEditados,
            tipo_pago
        } = this.state

        var db = firebase.database();
        var operacionVentaRef = db.ref('users/' + firebase.auth().currentUser.uid + '/ventas/' + codigoVenta);
        var order = new Date()

        var itemVenta={
            codigo: codigoVenta,
            cliente: tipo_venta === 'final' ? 'Consumidor Final' : clienteSeleccionado,
            descuento: descuento,
            tipo_venta,
            factura_emitida: Boolean(facturaElectronica) ? 'pendiente' : 'no_emitida',
            observacion: observacion,
            dinero_resibido: dinero_resibido,
            cambio: cambio,
            subtotal: sumaSubTotal,
            iva: sumaIva,
            total: sumaTotal,
            productos: listaProductosSeleccionadosEditados,
            fecha_venta: `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
            hora_venta: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            empleado: this.props.usuario.code,
            order: '' + order,
            estado: true,
            numero_tarjeta: '',
            nombre_banco: '',
            tipo_pago,
            valor_acreditado: '',
            fecha_a_pagar: '',
        }
        this.setVentaCaja(itemVenta)
        operacionVentaRef.set(itemVenta)
    }
    setSaveRegistroVentaCredito = (codigoVenta, item) => {
        const {
            clienteSeleccionado,
            descuento,
            observacion,
            dinero_resibido,
            cambio,
            sumaSubTotal,
            sumaIva,
            sumaTotal,
            tipo_venta,
            facturaElectronica,
            listaProductosSeleccionadosEditados,
            tipo_pago
        } = this.state

        var db = firebase.database();
        var operacionVentaRef = db.ref('users/' + firebase.auth().currentUser.uid + '/ventas/' + codigoVenta);
        var order = new Date()

        var itemVenta = {
            codigo: codigoVenta,
            cliente: tipo_venta === 'final' ? 'Consumidor Final' : clienteSeleccionado,
            descuento: descuento,
            tipo_venta,
            factura_emitida: Boolean(facturaElectronica) ? 'pendiente' : 'no_emitida',
            observacion: observacion,
            dinero_resibido: dinero_resibido,
            cambio: cambio,
            subtotal: sumaSubTotal,
            iva: sumaIva,
            total: sumaTotal,
            productos: listaProductosSeleccionadosEditados,
            fecha_venta: `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
            hora_venta: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            empleado: this.props.usuario.code,
            order: '' + order,
            estado: true,
            numero_tarjeta: '',
            nombre_banco: '',
            tipo_pago,
            valor_acreditado: item.valor_acreditado,
            fecha_a_pagar: item.fecha_vencimiento,
        }

        this.setVentaCaja(itemVenta)

        operacionVentaRef.set(itemVenta)
    }
    setSaveRegistroVentaTarjetaCredito = (codigoVenta, item) => {
        const {
            clienteSeleccionado,
            descuento,
            observacion,
            dinero_resibido,
            cambio,
            sumaSubTotal,
            sumaIva,
            sumaTotal,
            tipo_venta,
            facturaElectronica,
            listaProductosSeleccionadosEditados,
            tipo_pago
        } = this.state

        var db = firebase.database();
        var operacionVentaRef = db.ref('users/' + firebase.auth().currentUser.uid + '/ventas/' + codigoVenta);
        var order = new Date()

        var itemVenta={
            codigo: codigoVenta,
            cliente: tipo_venta === 'final' ? 'Consumidor Final' : clienteSeleccionado,
            descuento: descuento,
            tipo_venta,
            factura_emitida: Boolean(facturaElectronica) ? 'pendiente' : 'no_emitida',
            observacion: observacion,
            dinero_resibido: dinero_resibido,
            cambio: cambio,
            subtotal: sumaSubTotal,
            iva: sumaIva,
            total: sumaTotal,
            productos: listaProductosSeleccionadosEditados,
            fecha_venta: `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
            hora_venta: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            empleado: this.props.usuario.code,
            order: '' + order,
            estado: true,
            numero_tarjeta: item.propiedades_numero,
            nombre_banco: item.propiedades_banco,
            tipo_pago,
            valor_acreditado: '',
            fecha_a_pagar: '',
        }
        this.setVentaCaja(itemVenta)
        operacionVentaRef.set(itemVenta)

        
    }

    setVentaCaja(itemVenta){
        var db = firebase.database();
        var codigoVentaCaja = funtions.guidGenerator()
        var operacionVentaRefCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_normales').orderByChild('order').limitToLast(1);
        operacionVentaRefCaja.once('value', (snap) => {
            if (snap.val()) {
                var caja = funtions.snapshotToArray(snap)[0]
                if (Boolean(caja.estado)) {
                    var operacionVentaCaja = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo + '/ventas/' + codigoVentaCaja)
                    operacionVentaCaja.set(itemVenta)
                }
            }
        })
    }
    ////////////////////////////////////////
    // actualizar el stok de los productos
    updateDataProductos = () => {
        const { listaProductosSeleccionadosEditados } = this.state
        listaProductosSeleccionadosEditados.forEach(item => {
            var db = firebase.database();
            var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/productos/' + item.codigo);
            productosRef.once('value', (snap) => {
                if (snap.val()) {
                    productosRef.update({
                        stock_actual: Number(snap.val().stock_actual) - Number(item.cantidad)
                    });
                }
            })

        })
    }

    //opercacion stock
    setOperacionStockEfectivo = (listaProductos) => {
        const { clienteSeleccionado, observacion, dinero_resibido, sumaTotal, tipo_venta, sumaSubTotal, descuento, cambio, tipo_pago } = this.state
        var codigoStock = funtions.guidGenerator()
        var order = new Date()
        var db = firebase.database();
        var operacionStockRef = db.ref('users/' + firebase.auth().currentUser.uid + '/operaciones_stock/' + codigoStock);
        operacionStockRef.set({
            codigo: codigoStock,
            tipo_operacion: 'venta-producto',
            fecha: `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
            hora: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            cliente_proveedor: tipo_venta === 'final' ? 'Consumidor Final' : clienteSeleccionado,
            productos: listaProductos,
            total_final: sumaTotal,
            empleado: this.props.usuario.code,
            observacion: observacion,
            subtotal: sumaSubTotal,
            descuento: descuento,
            otros_gastos: '',
            flete: '',
            valor_pagado: dinero_resibido,
            medio_pago: tipo_pago,
            saldo_favor: '',
            en_deuda: '',
            vuelto: cambio,
            acreditado: '',
            order: order + ""
        })
    }

    setOperacionStockCredito = (listaProductos, valor_acreditado) => {
        const { clienteSeleccionado, observacion, dinero_resibido, sumaTotal, tipo_venta, sumaSubTotal, descuento, cambio, tipo_pago } = this.state
        var codigoStock = funtions.guidGenerator()
        var order = new Date()
        var db = firebase.database();
        var operacionStockRef = db.ref('users/' + firebase.auth().currentUser.uid + '/operaciones_stock/' + codigoStock);
        operacionStockRef.set({
            codigo: codigoStock,
            tipo_operacion: 'venta-producto',
            fecha: `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
            hora: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            cliente_proveedor: tipo_venta === 'final' ? 'Consumidor Final' : clienteSeleccionado,
            productos: listaProductos,
            total_final: sumaTotal,
            empleado: this.props.usuario.code,
            observacion: observacion,
            subtotal: sumaSubTotal,
            descuento: descuento,
            otros_gastos: '0.00',
            flete: '0.00',
            valor_pagado: '0.00',
            medio_pago: tipo_pago,
            saldo_favor: '0.00',
            en_deuda: (Number(sumaTotal) - Number(valor_acreditado)).toFixed(2),
            vuelto: '0.00',
            acreditado: valor_acreditado,
            order: order + ""
        })
    }
    setOperacionStockTarjetaCredito = (listaProductos) => {
        const { clienteSeleccionado, observacion, dinero_resibido, sumaTotal, tipo_venta, sumaSubTotal, descuento, cambio, tipo_pago } = this.state
        var codigoStock = funtions.guidGenerator()
        var order = new Date()
        var db = firebase.database();
        var operacionStockRef = db.ref('users/' + firebase.auth().currentUser.uid + '/operaciones_stock/' + codigoStock);
        operacionStockRef.set({
            codigo: codigoStock,
            tipo_operacion: 'venta-producto',
            fecha: `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
            hora: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            cliente_proveedor: tipo_venta === 'final' ? 'Consumidor Final' : clienteSeleccionado,
            productos: listaProductos,
            total_final: sumaTotal,
            empleado: this.props.usuario.code,
            observacion: observacion,
            subtotal: sumaSubTotal,
            descuento: descuento,
            otros_gastos: '0.00',
            flete: '0.00',
            valor_pagado: '0.00',
            medio_pago: tipo_pago,
            saldo_favor: '0.00',
            en_deuda: '0.00',
            vuelto: '0.00',
            acreditado: '0.00',
            order: order + ""
        })
    }
    //////////////////////////////////

    //crar json para factura electrónica
    createJsonFacturaElectronicaEfectivo = () => {
        const {
            sumaSubTotal,
            precioProductosSinIva,
            precioProductosConIva,
            sumaIva,
            sumaTotal,
            descuento,
            clienteSeleccionado,
            listaProductosSeleccionadosEditados,
            precioSeleccionado
        } = this.state

        var date = new Date()
        var json = {
            "ambiente": this.state.ambienteFacturacion,
            "tipo_emision": 1,
            "fecha_emision": date.toISOString(),
            "emisor": {
                "ruc": "",
                "obligado_contabilidad": false,
                "contribuyente_especial": "",
                "nombre_comercial": "",
                "razon_social": "",
                "direccion": "",
                "establecimiento": {
                    "punto_emision": "",
                    "codigo": "",
                    "direccion": ""
                }
            },
            "moneda": "USD",
            "totales": {
                "total_sin_impuestos": Number(sumaSubTotal),
                "impuestos": [
                    {
                        "base_imponible": Number(precioProductosSinIva),
                        "valor": 0.0,
                        "codigo": "2",
                        "codigo_porcentaje": "0"
                    },
                    {
                        "base_imponible": Number(precioProductosConIva),
                        "valor": Number(sumaIva),
                        "codigo": "2",
                        "codigo_porcentaje": "2"
                    }
                ],
                "importe_total": Number(sumaTotal),
                "propina": 0.0,
                "descuento": descuento
            },
            "comprador": {
                "email": clienteSeleccionado.email,
                "identificacion": clienteSeleccionado.numero_identificacion,
                "tipo_identificacion": clienteSeleccionado.tipo_identificacion,
                "razon_social": clienteSeleccionado.nombre,
                "direccion": clienteSeleccionado.direccion,
                "telefono": clienteSeleccionado.celular
            },
            "items": listaProductosSeleccionadosEditados.map(item => {
                return {
                    cantidad: Number(item.cantidad),
                    codigo_principal: item.codigo_barras.length > 0 ? item.codigo_barras : '0',
                    codigo_auxiliar: item.codigo,
                    precio_unitario: Number(((Number(item.precio_costo) * Number(precioSeleccionado.porcentaje)) + Number(item.precio_costo)).toFixed(2)),
                    descripcion: Boolean(item.tiene_iva) ? '* ' + item.descripcion_producto : item.descripcion_producto,
                    precio_total_sin_impuestos: Number((((Number(item.precio_costo) * Number(precioSeleccionado.porcentaje)) + Number(item.precio_costo)) * Number(item.cantidad)).toFixed(2)),
                    impuestos: [
                        {
                            base_imponible: Number((((Number(item.precio_costo) * Number(precioSeleccionado.porcentaje)) + Number(item.precio_costo)) * Number(item.cantidad)).toFixed(2)),
                            valor: Boolean(item.tiene_iva) ? Number(((((Number(item.precio_costo) * Number(precioSeleccionado.porcentaje)) + Number(item.precio_costo)) * Number(item.porcentaje_iva)) / 100).toFixed(2)) : 0,
                            tarifa: Boolean(item.tiene_iva) ? Number(item.porcentaje_iva) : 0,
                            codigo: '2',
                            codigo_porcentaje: Boolean(item.tiene_iva) ? '2' : '0'
                        }
                    ],
                    descuento: 0.0
                }
            })
            ,
            "valor_retenido_iva": 0.00,
            "valor_retenido_renta": 0.00,
            "pagos": [
                {
                    "medio": "efectivo",
                    "total": Number(sumaTotal)
                }
            ]
        }

        return json
    }
    createJsonFacturaElectronicaCredito = (item) => {
        const {
            sumaSubTotal,
            precioProductosSinIva,
            precioProductosConIva,
            sumaIva,
            sumaTotal,
            descuento,
            clienteSeleccionado,
            listaProductosSeleccionadosEditados,
            precioSeleccionado
        } = this.state

        var date = new Date()
        var json = {
            "ambiente": this.state.ambienteFacturacion,
            "tipo_emision": 1,
            "fecha_emision": date.toISOString(),
            "emisor": {
                "ruc": "",
                "obligado_contabilidad": false,
                "contribuyente_especial": "",
                "nombre_comercial": "",
                "razon_social": "",
                "direccion": "",
                "establecimiento": {
                    "punto_emision": "",
                    "codigo": "",
                    "direccion": ""
                }
            },
            "moneda": "USD",
            "totales": {
                "total_sin_impuestos": Number(sumaSubTotal),
                "impuestos": [
                    {
                        "base_imponible": Number(precioProductosSinIva),
                        "valor": 0.0,
                        "codigo": "2",
                        "codigo_porcentaje": "0"
                    },
                    {
                        "base_imponible": Number(precioProductosConIva),
                        "valor": Number(sumaIva),
                        "codigo": "2",
                        "codigo_porcentaje": "2"
                    }
                ],
                "importe_total": Number(sumaTotal),
                "propina": 0.0,
                "descuento": descuento
            },
            "comprador": {
                "email": clienteSeleccionado.email,
                "identificacion": clienteSeleccionado.numero_identificacion,
                "tipo_identificacion": clienteSeleccionado.tipo_identificacion,
                "razon_social": clienteSeleccionado.nombre,
                "direccion": clienteSeleccionado.direccion,
                "telefono": clienteSeleccionado.celular
            },
            "items": listaProductosSeleccionadosEditados.map(item => {
                return {
                    cantidad: Number(item.cantidad),
                    codigo_principal: item.codigo_barras.length > 0 ? item.codigo_barras : '0',
                    codigo_auxiliar: item.codigo,
                    precio_unitario: Number(((Number(item.precio_costo) * Number(precioSeleccionado.porcentaje)) + Number(item.precio_costo)).toFixed(2)),
                    descripcion: Boolean(item.tiene_iva) ? '* ' + item.descripcion_producto : item.descripcion_producto,
                    precio_total_sin_impuestos: Number((((Number(item.precio_costo) * Number(precioSeleccionado.porcentaje)) + Number(item.precio_costo)) * Number(item.cantidad)).toFixed(2)),
                    impuestos: [
                        {
                            base_imponible: Number((((Number(item.precio_costo) * Number(precioSeleccionado.porcentaje)) + Number(item.precio_costo)) * Number(item.cantidad)).toFixed(2)),
                            valor: Boolean(item.tiene_iva) ? Number(((((Number(item.precio_costo) * Number(precioSeleccionado.porcentaje)) + Number(item.precio_costo)) * Number(item.porcentaje_iva)) / 100).toFixed(2)) : 0,
                            tarifa: Boolean(item.tiene_iva) ? Number(item.porcentaje_iva) : 0,
                            codigo: '2',
                            codigo_porcentaje: Boolean(item.tiene_iva) ? '2' : '0'
                        }
                    ],
                    descuento: 0.0
                }
            })
            ,
            "valor_retenido_iva": 0.00,
            "valor_retenido_renta": 0.00,
            "credito": {
                "fecha_vencimiento": `${item.fecha_vencimiento}`,
                "monto": Number(item.monto) - Number(item.valor_acreditado)
            },
            "pagos": [
                {
                    "medio": 'efectivo',
                    "total": Number(item.valor_acreditado),
                }
            ]
        }

        return json
    }
    createJsonFacturaElectronicaTarjetaCredito = (item) => {
        const {
            sumaSubTotal,
            precioProductosSinIva,
            precioProductosConIva,
            sumaIva,
            sumaTotal,
            descuento,
            clienteSeleccionado,
            listaProductosSeleccionadosEditados,
            precioSeleccionado
        } = this.state

        var date = new Date()
        var json = {
            "ambiente": this.state.ambienteFacturacion,
            "tipo_emision": 1,
            "fecha_emision": date.toISOString(),
            "emisor": {
                "ruc": "",
                "obligado_contabilidad": false,
                "contribuyente_especial": "",
                "nombre_comercial": "",
                "razon_social": "",
                "direccion": "",
                "establecimiento": {
                    "punto_emision": "",
                    "codigo": "",
                    "direccion": ""
                }
            },
            "moneda": "USD",
            "totales": {
                "total_sin_impuestos": Number(sumaSubTotal),
                "impuestos": [
                    {
                        "base_imponible": Number(precioProductosSinIva),
                        "valor": 0.0,
                        "codigo": "2",
                        "codigo_porcentaje": "0"
                    },
                    {
                        "base_imponible": Number(precioProductosConIva),
                        "valor": Number(sumaIva),
                        "codigo": "2",
                        "codigo_porcentaje": "2"
                    }
                ],
                "importe_total": Number(sumaTotal),
                "propina": 0.0,
                "descuento": descuento
            },
            "comprador": {
                "email": clienteSeleccionado.email,
                "identificacion": clienteSeleccionado.numero_identificacion,
                "tipo_identificacion": clienteSeleccionado.tipo_identificacion,
                "razon_social": clienteSeleccionado.nombre,
                "direccion": clienteSeleccionado.direccion,
                "telefono": clienteSeleccionado.celular
            },
            "items": listaProductosSeleccionadosEditados.map(item => {
                return {
                    cantidad: Number(item.cantidad),
                    codigo_principal: item.codigo_barras.length > 0 ? item.codigo_barras : '0',
                    codigo_auxiliar: item.codigo,
                    precio_unitario: Number(((Number(item.precio_costo) * Number(precioSeleccionado.porcentaje)) + Number(item.precio_costo)).toFixed(2)),
                    descripcion: Boolean(item.tiene_iva) ? '* ' + item.descripcion_producto : item.descripcion_producto,
                    precio_total_sin_impuestos: Number((((Number(item.precio_costo) * Number(precioSeleccionado.porcentaje)) + Number(item.precio_costo)) * Number(item.cantidad)).toFixed(2)),
                    impuestos: [
                        {
                            base_imponible: Number((((Number(item.precio_costo) * Number(precioSeleccionado.porcentaje)) + Number(item.precio_costo)) * Number(item.cantidad)).toFixed(2)),
                            valor: Boolean(item.tiene_iva) ? Number(((((Number(item.precio_costo) * Number(precioSeleccionado.porcentaje)) + Number(item.precio_costo)) * Number(item.porcentaje_iva)) / 100).toFixed(2)) : 0,
                            tarifa: Boolean(item.tiene_iva) ? Number(item.porcentaje_iva) : 0,
                            codigo: '2',
                            codigo_porcentaje: Boolean(item.tiene_iva) ? '2' : '0'
                        }
                    ],
                    descuento: 0.0
                }
            })
            ,
            "valor_retenido_iva": 0.00,
            "valor_retenido_renta": 0.00,
            "pagos": [
                {
                    "medio": item.tipo_pago === 'tarjeta-credito' ? 'tarjeta_credito' : item.tipo_pago === 'tarjeta-debito' ? 'tarjeta_debito' : 'cheque',
                    "total": Number(item.total),
                    "propiedades": {
                        "numero": `${item.propiedades_numero}`,
                        "banco": `${item.propiedades_banco}`
                    }
                }
            ]
        }

        return json
    }
    ///////////////////////////
    onChangueSelecteccionarProducto = item => {
        var array = this.state.listaProductosSeleccionados
        var arrayValoresSelecionados = this.state.listaProductosSeleccionadosEditados
        var array2 = array.filter(item2 => item2.codigo === item.codigo)
        if (this.state.cargaAutomatica === false) {
            this.setState({ itemProductoCargado: item })
        } else {
            if (array2.length === 0) {
                if (Number(item.stock_actual) === 0) {
                    setSnackBars.openSnack('error', 'rootSnackBar', 'Producto vacío', 2000)
                } else {
                    array.push(item)
                    arrayValoresSelecionados.push({
                        codigo: item.codigo,
                        cantidad: '1',
                        precio_venta_a: item.precio_venta_a,
                        precio_costo: item.precio_costo,
                        tiene_iva: item.tiene_iva,
                        porcentaje_iva: item.porcentaje_iva,
                        stock_actual: item.stock_actual,
                        codigo_barras: item.codigo_barras,
                        descripcion_producto: item.descripcion_producto,
                        precio_venta: Number(((Number(item.precio_costo) * Number(this.state.precioSeleccionado.porcentaje)) + Number(item.precio_costo)).toFixed(2))
                    })
                    this.setState({
                        itemProductoCargado: null
                    })
                }
                this.calcularValoresTotales()
            } else {
                setSnackBars.openSnack('info', 'rootSnackBar', 'Producto ya ingresado!', 2000)
            }
        }
        this.setState({
            listaProductosSeleccionados: array,
            listaProductosSeleccionadosEditados: arrayValoresSelecionados,
        })
    }

    agregarItemSeleccionadoVista = (item) => {
        if (this.state.itemProductoCargado != null) {
            var array = this.state.listaProductosSeleccionados
            var arrayValoresSelecionados = this.state.listaProductosSeleccionadosEditados
            var array2 = array.filter(item2 => item2.codigo === item.codigo)
            if (array2.length === 0) {
                if (Number(item.stock_actual) === 0) {
                    setSnackBars.openSnack('error', 'rootSnackBar', 'Producto vacío', 2000)
                } else {
                    array.push(item)
                    arrayValoresSelecionados.push({
                        codigo: item.codigo,
                        cantidad: '1',
                        precio_venta_a: item.precio_venta_a,
                        precio_costo: item.precio_costo,
                        tiene_iva: item.tiene_iva,
                        porcentaje_iva: item.porcentaje_iva,
                        stock_actual: item.stock_actual,
                        codigo_barras: item.codigo_barras,
                        descripcion_producto: item.descripcion_producto,
                        precio_venta: Number(((Number(item.precio_costo) * Number(this.state.precioSeleccionado.porcentaje)) + Number(item.precio_costo)).toFixed(2)),
                    })
                    this.setState({
                        listaProductosSeleccionados: array,
                        listaProductosSeleccionadosEditados: arrayValoresSelecionados,
                    })

                    this.setState({
                        itemProductoCargado: null
                    })
                }
            } else {
                setSnackBars.openSnack('info', 'rootSnackBar', 'Producto ya ingresado!', 2000)
            }
            this.calcularValoresTotales()
        }
    }

    calcularValoresTotales = () => {
        var sumatotalConIVA = 0
        var sumatotal = 0
        var sumatotalProductosSinIva = 0
        var sumatotalProductosConIva = 0
        this.state.listaProductosSeleccionadosEditados.forEach(item => {
            var stock = this.state.listaProductosSeleccionadosEditados.filter(it => it.codigo === item.codigo)[0].cantidad
            var precioCosto = this.state.listaProductosSeleccionadosEditados.filter(it => it.codigo === item.codigo)[0].precio_costo
            var reultado = (precioCosto * Number(this.state.precioSeleccionado.porcentaje)) + Number(precioCosto)
            var precio = reultado

            var precioIva = 0
            if (item.tiene_iva === true) {
                precioIva = (precio * Number(item.porcentaje_iva)) / 100
                sumatotalProductosConIva += Number(precio) * Number(item.cantidad)
            } else {
                precioIva = 0
                sumatotalProductosSinIva += Number(precio) * Number(item.cantidad)
            }

            sumatotalConIVA = sumatotalConIVA + (Number(stock) * Number(precioIva))
            sumatotal = sumatotal + (Number(stock) * Number(precio))
        })
        this.setState({ sumaTotal: (sumatotal + sumatotalConIVA).toFixed(2) })
        this.setState({ sumaIva: sumatotalConIVA.toFixed(2) })
        this.setState({ sumaSubTotal: sumatotal.toFixed(2) })
        this.setState({ precioProductosSinIva: sumatotalProductosSinIva.toFixed(2) })
        this.setState({ precioProductosConIva: sumatotalProductosConIva.toFixed(2) })

        // this.setState({ productosSeleccionados: this.state.listaProductosSeleccionadosEditados })
        this.handleDineroResibido(this.state.dinero_resibido)
        this.handleDescontar(this.state.descuento)
    }



    seleccionarCliente = (item) => {
        this.setState({ clienteFacturacion: item.codigo })
        this.getClienteDataBase(item.codigo)
    }

    getClienteDataBase = (codigo) => {
        if (codigo) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    if (this.state.clienteFacturacion.length > 0) {
                        var db = firebase.database();
                        var productosRef = db.ref('users/' + user.uid + "/clientes/" + codigo);
                        productosRef.on('value', (snapshot) => {
                            if (snapshot.val()) {
                                this.setState({
                                    clienteSeleccionado: snapshot.val()
                                })
                            } else {
                                this.setState({
                                    clienteSeleccionado: null
                                })
                            }
                        })
                    }
                }
            })
        }
    }

    handleDescontar = descuento => {
        this.setState({
            descuento: descuento
        })
        setTimeout(() => {
            const { sumaSubTotal, sumaIva, dinero_resibido } = this.state
            var sumaDescuento = ((Number(sumaSubTotal) + Number(sumaIva)) - Number(descuento)).toFixed(2)
            this.setState({
                sumaTotal: sumaDescuento
            })
            this.handleDineroResibido(dinero_resibido)
        }, 100)
    }

    handleDineroResibido = dinero_resibido => {
        this.setState({
            dinero_resibido: dinero_resibido
        })
        setTimeout(() => {
            const { sumaTotal } = this.state
            var sumaCambio = Number(dinero_resibido) > 0 ? (Number(dinero_resibido) - Number(sumaTotal)).toFixed(2) : 0
            this.setState({
                cambio: sumaCambio
            })
        }, 100)
    }

    handleObservacion = observacion => {
        this.setState({
            observacion
        })
    }
    handleFacturaElectronica = () => {
        this.setState({
            facturaElectronica: !this.state.facturaElectronica
        })
    }

    abrirModalFinalizarVenta = () => {
        switch (this.state.tipo_pago) {
            case 'efectivo': {
                if (this.comprobarCamposLlenosEfectivo()) {
                    this.setState({ estadoModalFinalizaPago: true })
                }
                break
            }
            case 'credito': {
                if (this.comprobarCamposLlenosCredito()) {
                    this.setState({ estadoModalFinalizaPago: true })
                }
                break
            }
            case 'tarjeta-credito': {
                if (this.comprobarCamposLlenosCredito()) {
                    this.setState({ estadoModalFinalizaPago: true })
                }
                break
            }
            case 'tarjeta-debito': {
                if (this.comprobarCamposLlenosCredito()) {
                    this.setState({ estadoModalFinalizaPago: true })
                }
                break
            }
            case 'cheque': {
                if (this.comprobarCamposLlenosCredito()) {
                    this.setState({ estadoModalFinalizaPago: true })
                }
                break
            }
            default: {
                break
            }
        }
    }

    render() {

        const styles = {
            styleText: {
                width: '100%'
            }
        }
        return <>
            <div style={{
                zIndex: 30,
                background: 'white',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh'
            }}>
                <Grid container
                    variant="permanent"
                    style={{
                        minHeight: '100vh'
                    }}
                >

                    <Grid item xs={9} style={{ background: 'rgba(222, 239, 255)' }}>
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField
                                    id="filled-tipo-venta"
                                    select
                                    label="Tipo de venta"
                                    error={this.state.tipo_venta.length > 0 ? false : true}
                                    value={this.state.tipo_venta}
                                    onChange={event => this.setState({
                                        tipo_venta: event.target.value
                                    })}
                                    margin="normal"
                                    variant="outlined"
                                    style={styles.styleText}
                                >
                                    <MenuItem value={'factura'}>Factura</MenuItem>
                                    <MenuItem value={'final'}>Consumidor Final</MenuItem>
                                </TextField>

                                <AutoCompleteSelectedProducto
                                    styleText={styles.styleText}
                                    onChangue={this.onChangueSelecteccionarProducto}
                                >
                                </AutoCompleteSelectedProducto>

                                <ModalContainerNormal
                                    open={this.state.estadoModalGuardarVenta}
                                    handleClose={() => this.setState({ estadoModalGuardarVenta: true })}
                                >
                                    <div style={{
                                        width: 100,
                                        height: 100,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <CircularProgress />
                                    </div>
                                </ModalContainerNormal>

                            </Grid>
                            <Grid item xs={6}>
                                <ContenedorProductoVista
                                    itemProductoCargado={this.state.itemProductoCargado}
                                    cargaAutomatica={this.state.cargaAutomatica}
                                    cargaAutomaticaCambiar={() => this.setState({ cargaAutomatica: !this.state.cargaAutomatica })}
                                    agregarItemSeleccionadoVista={this.agregarItemSeleccionadoVista}
                                    precioSeleccionado={this.state.precioSeleccionado}
                                />
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={12} >
                                <TablaNormal
                                    textoTitleP="Productos"
                                    textoTitleS="Producto"
                                    selectedItems={true}
                                    toolbar={false}
                                    data={this.state.listaProductosSeleccionados}
                                    rows={this.state.rowslistaProductos}
                                    handleGetData={this.handleGetData}
                                    estadoTabla={this.state.listaProductosSeleccionados.length > 0 ? 'llena' : 'vacio'}
                                    itemsSeleccionados={items => console.log()}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} style={{ overflowY: 'auto', height: '100vh' }}>
                        {
                            this.state.tipo_venta === 'factura' &&
                            <ContenedorClienteVista
                                clienteSeleccionado={this.state.clienteSeleccionado}
                                errorCliente={this.state.clienteFacturacion.length > 0 ? false : true}
                                usuario={this.props.usuario}
                                seleccionarCliente={this.seleccionarCliente}
                            />
                        }

                        <ContenedorPreciosTotalesVista
                            descuento={this.state.descuento}
                            sumaSubTotal={this.state.sumaSubTotal}
                            sumaIva={this.state.sumaIva}
                            sumaTotal={this.state.sumaTotal}
                            observacion={this.state.observacion}
                            dinero_resibido={this.state.dinero_resibido}
                            cambio={this.state.cambio}
                            tipo_venta={this.state.tipo_venta}
                            facturaElectronica={this.state.facturaElectronica}

                            handleDescontar={this.handleDescontar}
                            handleDineroResibido={this.handleDineroResibido}
                            handleObservacion={this.handleObservacion}
                            handleFacturaElectronica={this.handleFacturaElectronica}

                            tipo_pago={this.state.tipo_pago}
                        />
                        <div style={{ marginLeft: 16, marginRight: 16 }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <ContenedorSeleccionarTipoPrecio
                                    precioSeleccionado={this.state.precioSeleccionado}
                                    precios={this.state.precios}
                                    handleChangeSeleccion={codigo => {
                                        var precio = this.state.precios.filter(p => p.codigo === codigo)[0]
                                        this.setState({
                                            precioSeleccionado: precio
                                        })
                                        setTimeout(() => {
                                            this.calcularValoresTotales()
                                        }, 100)
                                        setSnackBars.openSnack('info', 'rootSnackBar', 'Precio cambiado', 500)
                                    }}
                                />
                                <Tooltip title="Configurar precios">
                                    <IconButton onClick={() => {
                                        this.setState({
                                            estadoModalSimpleConfigurarPrecios: true
                                        })
                                    }}>
                                        <SettingsIcon color='default' />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <ContenedorSeleccionarTipoPago
                                tipo_pago={this.state.tipo_pago}
                                handleChangeSeleccionTipoPago={value => {
                                    this.setState({
                                        tipo_pago: value
                                    })
                                    setSnackBars.openSnack('info', 'rootSnackBar', 'Tipo de pago cambiado', 500)
                                }}
                            />
                            <ContenedorBotonesVenta
                                handleFinalizarVenta={this.abrirModalFinalizarVenta}
                                handleClose={() =>
                                    this.props.handleClose()
                                }
                            />
                        </div>
                    </Grid>
                </Grid>

                <ModalContainerNormal
                    open={this.state.estadoModalFinalizaPago}
                    handleClose={() => this.setState({ estadoModalFinalizaPago: true })}
                >
                    <ModalFinalizaPago
                        handleClose={() => this.setState({ estadoModalFinalizaPago: false })}
                        tipo_pago={this.state.tipo_pago}
                        total={this.state.sumaTotal}
                        handleAceptar={item => {
                            this.handleFinalizarVenta(item)
                        }}
                    />

                </ModalContainerNormal>

                <ModalContainerNormal
                    open={this.state.estadoModalSimpleConfigurarPrecios}
                    handleClose={() => this.setState({ estadoModalSimpleConfigurarPrecios: false })}
                >
                    <ModalSettingsPrices
                        handleClose={() => this.setState({ estadoModalSimpleConfigurarPrecios: false })}
                    >

                    </ModalSettingsPrices>
                </ModalContainerNormal>

            </div>
        </>
    }
}

export default ModalNewVenta