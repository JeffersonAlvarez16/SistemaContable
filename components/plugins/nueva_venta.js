import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import SectionContentFactura from '../components/SectionContentFactura';
import SectionFactura from '../components/SectionFactura';
import funtions from '../../utils/funtions';
import CircularProgress from '@material-ui/core/CircularProgress';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import setSnackBars from './setSnackBars';
import ModalContainerNormal from '../modals_container/ModalContainerNormal';
import DeleteActivarDesactivar from './deleteActivarDesactivar';

class NuevaVenta extends Component {

    state = {
        usuario: null,

        sumaSubTotal: 0,
        sumaIva: 0,
        sumaTotal: 0,

        mostrarVentana: null,

        productosSeleccionados: [],

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

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.props.handleClose()
        }
    }

    getClienteDataBase = cliente => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/clientes/' + cliente);
                productosRef.on('value', (snapshot) => {
                    this.setState({
                        clienteCargadoDB: snapshot.val()
                    })
                })
            }
        })
    }

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
    handleFinalizarVenta = () => {
        const { productosSeleccionados, facturaElectronica, uidUser, tipo_venta } = this.state
        if (this.comprobarCamposLlenos()) {

            this.updateDataProductos()
            this.setOperacionStock(productosSeleccionados)
            var codigoRegistroVenta = funtions.guidGenerator()
            this.setSaveRegistroVenta(codigoRegistroVenta)
            /*  setTimeout(() => {
                 this.contentFactura.nuevaVenta()
                 this.sectionFactura.nuevaVenta()
             }, 1000) */
            if (tipo_venta === 'factura') {
                this.setState({ estadoModalGuardarVenta: true })
                var jsonData = this.createJsonFacturaElectronica()
                this.saveFacturasJson(jsonData, codigoRegistroVenta)
                if (Boolean(facturaElectronica)) {
                    this.postSet(uidUser, jsonData, codigoRegistroVenta)
                    this.setState({ estadoModalGuardarVenta: false })
                } else {
                    this.setState({ estadoModalGuardarVenta: false })
                }
            }
            this.props.handleClose()
            setSnackBars.openSnack('success', 'rootSnackBar', 'Venta guardada', 2000)
        } else {
            setSnackBars.openSnack('error', 'rootSnackBar', 'LLenar todos los campos', 2000)
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

        const content = await rawResponse.json();
        setSnackBars.openSnack('success', 'rootSnackBar', `Factura emitida con exito ${content.estado}`, 2000)
        /* if (content != null) {
            this.setState({ estadoModalGuardarVenta: false })
        } */
    }

    //comprobar campos llenos 
    comprobarCamposLlenos = () => {
        const { cliente, productosSeleccionados, dinero_resibido } = this.state
        if (
            this.comprobarTipoVenta() > 0 &&
            productosSeleccionados.length > 0 &&
            dinero_resibido.length > 0
        ) {
            return true
        } else {
            return false
        }
    }

    comprobarTipoVenta = () => {
        const { tipo_venta, cliente } = this.state
        if (tipo_venta === 'final') {
            return true
        } else {
            if (cliente.length > 0) {
                return true
            } else {
                return false
            }
        }
    }

    //Registra la venta 
    setSaveRegistroVenta = codigoVenta => {
        const { cliente,
            descuento,
            observacion,
            dinero_resibido,
            cambio,
            sumaSubTotal,
            sumaIva,
            sumaTotal,
            tipo_venta,
            facturaElectronica
        } = this.state

        var db = firebase.database();
        var operacionVentaRef = db.ref('users/' + firebase.auth().currentUser.uid + '/ventas/' + codigoVenta);
        var order = new Date()

        operacionVentaRef.set({
            codigo: codigoVenta,
            cliente: tipo_venta === 'final' ? 'Consumidor Final' : cliente,
            descuento: descuento,
            tipo_venta,
            factura_emitida: Boolean(facturaElectronica) ? 'pendiente' : 'no_emitida',
            observacion: observacion,
            dinero_resibido: dinero_resibido,
            cambio: cambio,
            subtotal: sumaSubTotal,
            iva: sumaIva,
            total: sumaTotal,
            productos: this.state.productosSeleccionados,
            fecha_venta: funtions.obtenerFechaActual(),
            hora_venta: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            empleado: this.props.usuario.code,
            order: '' + order,
            estado: true,
        })
    }

    // actualizar el stok de los productos
    updateDataProductos = () => {
        const { productosSeleccionados } = this.state
        productosSeleccionados.forEach(item => {
            var db = firebase.database();
            var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/productos/' + item.codigo);
            productosRef.update({
                stock_actual: Number(item.stock_actual) - Number(item.cantidad)
            });
        })
    }

    //opercacion stock
    setOperacionStock = (listaProductos) => {
        const { cliente, observacion, dinero_resibido, sumaTotal, tipo_venta, sumaSubTotal, descuento, cambio } = this.state
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
            tipo_operacion: 'venta-producto',
            fecha: funtions.obtenerFechaActual(),
            hora: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            cliente_proveedor: tipo_venta === 'final' ? 'Consumidor Final' : cliente,
            productos: arrayProductos,
            total_final: sumaTotal,
            empleado: this.props.usuario.code,
            observacion: observacion,
            subtotal: sumaSubTotal,
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

    //crar json para factura electrónica
    createJsonFacturaElectronica = () => {
        const {
            sumaSubTotal,
            precioProductosSinIva,
            precioProductosConIva,
            sumaIva,
            sumaTotal,
            descuento,
            clienteCargadoDB,
            productosSeleccionados,
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
                "email": clienteCargadoDB.email,
                "identificacion": clienteCargadoDB.numero_identificacion,
                "tipo_identificacion": clienteCargadoDB.tipo_identificacion,
                "razon_social": clienteCargadoDB.nombre,
                "direccion": clienteCargadoDB.direccion,
                "telefono": clienteCargadoDB.celular
            },
            "items": productosSeleccionados.map(item => {
                return {
                    cantidad: Number(item.cantidad),
                    codigo_principal: item.codigo_barras.length > 0 ? item.codigo_barras : '0',
                    codigo_auxiliar: item.codigo,
                    precio_unitario: Number(item.precio_venta_a),
                    descripcion: Boolean(item.tiene_iva) ? '* ' + item.descripcion_producto : item.descripcion_producto,
                    precio_total_sin_impuestos: Number(item.precio_venta_a) * Number(item.cantidad),
                    impuestos: [
                        {
                            base_imponible: Number(item.precio_venta_a) * Number(item.cantidad),
                            valor: Boolean(item.tiene_iva) ? Number(((Number(item.precio_venta_a) * Number(item.porcentaje_iva)) / 100).toFixed(2)) : 0,
                            tarifa: Boolean(item.tiene_iva) ? Number(item.porcentaje_iva) : 0,
                            codigo: '2',
                            codigo_porcentaje: Boolean(item.tiene_iva) ? '2' : '0'
                        }
                    ],
                    descuento: 0.0
                }
            })
            ,
            "valor_retenido_iva": Number(sumaIva),
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

    render() {

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
                    <Grid item xs={9}>
                        <SectionContentFactura
                            ref={element => this.contentFactura = element}

                            handleSubTotal={suma => {
                                this.setState({ sumaSubTotal: suma })
                                //this.handleDineroResibido(this.state.dinero_resibido)
                                //this.handleDescontar(this.state.descuento)
                            }}

                            handleSumaTotalIva={sumaIva => {
                                this.setState({ sumaIva: sumaIva })
                            }}

                            handleSumaTotal={sumaTotal => {
                                this.setState({ sumaTotal })
                            }}

                            handlePrecioPrductosSinIva={precioProductosSinIva => {
                                this.setState({ precioProductosSinIva })
                            }}

                            handlePrecioPrductosConIva={precioProductosConIva => {
                                this.setState({ precioProductosConIva })
                            }}

                            productosSeleccionadosData={this.state.productosSeleccionados}
                            productosSeleccionados={productosSeleccionados => {
                                this.setState({ productosSeleccionados })
                                this.handleDineroResibido(this.state.dinero_resibido)
                                this.handleDescontar(this.state.descuento)
                            }}

                            tipo_venta={this.state.tipo_venta}
                            handleTipoVenta={tipo_venta => {
                                this.setState({ tipo_venta })
                                this.setState({ facturaElectronica: false })
                            }}

                            usuario={this.props.usuario}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <SectionFactura

                            ref={element => this.sectionFactura = element}

                            usuario={this.props.usuario}

                            sumaTotal={this.state.sumaTotal}
                            sumaIva={this.state.sumaIva}
                            sumaSubTotal={this.state.sumaSubTotal}

                            tipo_venta={this.state.tipo_venta}

                            handleCliente={cliente => {
                                this.getClienteDataBase(cliente)
                                this.setState({ cliente })
                            }}

                            descuento={this.state.descuento}
                            handleDescontar={descuento => {
                                this.handleDescontar(descuento)
                            }}

                            dinero_resibido={this.state.dinero_resibido}
                            handleDineroResibido={dinero_resibido => {
                                this.handleDineroResibido(dinero_resibido)
                            }}

                            observacion={this.state.observacion}
                            handleObservacion={observacion => {
                                this.handleObservacion(observacion)
                            }}

                            handleFacturaElectronica={() =>
                                this.setState({
                                    facturaElectronica: !this.state.facturaElectronica
                                })
                            }

                            cambio={this.state.cambio}

                            facturaElectronica={this.state.facturaElectronica}
                            handleFinalizarVenta={this.handleFinalizarVenta}

                            handleClose={this.props.handleClose}

                        />
                    </Grid>

                </Grid>

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
            </div>
        </>
    }
}

export default NuevaVenta