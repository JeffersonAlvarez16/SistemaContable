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

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                uidUser: user.uid
            })
        })
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
        const { productosSeleccionados, facturaElectronica, uidUser } = this.state
        if (this.comprobarCamposLlenos()) {
            this.setState({ estadoModalGuardarVenta: true })
            this.updateDataProductos()
            this.setSaveRegistroVenta()
            this.setOperacionStock(productosSeleccionados)
            setTimeout(() => {
                this.contentFactura.nuevaVenta()
                this.sectionFactura.nuevaVenta()
                this.setState({ estadoModalGuardarVenta: false })
            }, 1000)
            if (Boolean(facturaElectronica)) {
                var jsonData = this.createJsonFacturaElectronica()
                console.log(jsonData)
                this.postSet(uidUser, jsonData)
                /* (async () => {
                        const rawResponse = await fetch('https://tranquil-shelf-98582.herokuapp.com/generarfactura', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'uid': uidUser
                            },
                            body: jsonData
                        });
                        const content = await rawResponse.json();
                        console.log(content);
                    })(); */
            }
        } else {
            setSnackBars.openSnack('error', 'rootSnackBar', 'LLenar todos los campos', 2000)
        }
    }

    postSet = async (uidUser, jsonData) => {
        const rawResponse = await fetch('https://tranquil-shelf-98582.herokuapp.com/generarfactura', {
            method: 'POST',
            json: true,
            headers: {
                'Content-Type': 'application/json',
                'id': uidUser
            },
            body:  JSON.stringify(jsonData) 
        });
        const content = await rawResponse.json();
        console.log(content);
    }

    //comprobar campos llenos 
    comprobarCamposLlenos = () => {
        const { cliente, productosSeleccionados, dinero_resibido } = this.state
        if (
            cliente.length > 0 &&
            productosSeleccionados.length > 0 &&
            dinero_resibido.length > 0
        ) {
            return true
        } else {
            return false
        }
    }

    //Registra la venta 
    setSaveRegistroVenta = () => {
        const { cliente, descuento, observacion, dinero_resibido, cambio, sumaSubTotal, sumaIva, sumaTotal } = this.state
        var codigoVenta = funtions.guidGenerator()
        var db = firebase.database();
        var operacionVentaRef = db.ref('users/' + firebase.auth().currentUser.uid + '/ventas/' + codigoVenta);
        var order = new Date()

        operacionVentaRef.set({
            codigo: codigoVenta,
            cliente: cliente,
            descuento: descuento,
            observacion: observacion,
            dinero_resibido: dinero_resibido,
            cambio: cambio,
            subtotal: sumaSubTotal,
            iva: sumaIva,
            total: sumaTotal,
            productos: this.state.productosSeleccionados,
            fecha_venta: `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
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
        const { cliente, observacion, dinero_resibido, sumaTotal, sumaIva, sumaSubTotal, descuento, cambio } = this.state
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
            fecha: `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
            hora: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
            cliente_proveedor: cliente,
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

        var date = new Date('05 October 2011 14:48 UTC')
        var json = {
            "ambiente": 1,
            "tipo_emision": 1,
            "fecha_emision": date.toISOString(),
            "emisor": {
                "ruc": "1900504893001",
                "obligado_contabilidad": true,
                "contribuyente_especial": "12345",
                "nombre_comercial": "AUTO REPUESTOS THIAGO",
                "razon_social": "SOTO VEGA JHOVANNI REMIGIO",
                "direccion": "A CINCUENTA METROS DEL PARQUE SAN JOSE",
                "establecimiento": {
                    "punto_emision": "002",
                    "codigo": "001",
                    "direccion": "A CINCUENTA METROS DEL PARQUE SAN JOSE"
                }
            },
            "moneda": "USD",
            "totales": {
                "total_sin_impuestos": sumaSubTotal,
                "impuestos": [
                    {
                        "base_imponible": precioProductosSinIva,
                        "valor": 0.0,
                        "codigo": "2",
                        "codigo_porcentaje": "0"
                    },
                    {
                        "base_imponible": precioProductosConIva,
                        "valor": sumaIva,
                        "codigo": "2",
                        "codigo_porcentaje": "2"
                    }
                ],
                "importe_total": sumaTotal,
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
            "items": this.state.productosSeleccionados.map(item => {
                return {
                    cantidad: item.cantidad,
                    codigo_principal: item.codigo_barras,
                    codigo_auxiliar: item.codigo,
                    precio_unitario: item.precio_venta_a,
                    descripcion: item.descripcion_producto,
                    precio_total_sin_impuestos: item.precio_venta_a,
                    impuestos: [
                        {
                            base_imponible: item.precio_venta_a,
                            valor: ((Number(item.precio_venta_a) * Number(item.porcentaje_iva)) / 100).toFixed(2),
                            tarifa: Number(item.porcentaje_iva),
                            codigo: "2",
                            codigo_porcentaje: "2"
                        }
                    ],
                    descuento: 0.0
                }
            })
            ,
            "valor_retenido_iva": sumaIva,
            "valor_retenido_renta": 0.00,
            "pagos": [
                {
                    "medio": "efectivo",
                    "total": sumaTotal
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

                            productosSeleccionados={productosSeleccionados => {
                                this.setState({ productosSeleccionados })
                                this.handleDineroResibido(this.state.dinero_resibido)
                                this.handleDescontar(this.state.descuento)
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