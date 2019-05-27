import React, { Component } from 'react';
import AutoCompleteSelectedProducto from '../../plugins/AutoCompleteSelectedProducto';
import { Grid, IconButton, TextField, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import TablaNormal from '../tables/TableNormal';


import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import setSnackBars from '../../plugins/setSnackBars';
import colors from '../../../utils/colors';
import ContenedorPreciosTotalesVista from '../../plugins/ventas/ContenedorPreciosTotalesVista';
import ContenedorBotonesVenta from '../../plugins/ventas/ContenedorBotonesVenta';

class PuntoVenta extends Component {

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



        rowslistaProductos: [
            { id: 'acciones', numeric: true, disablePadding: false, label: '' },
            { id: 'precio_por_defecto', numeric: true, disablePadding: false, label: 'Precio' },
            { id: 'cantidad', numeric: true, disablePadding: false, label: 'Cantidad' },
            { id: 'descripcion_producto', numeric: true, disablePadding: false, label: 'Descripcion' },
            { id: 'precio_venta', numeric: true, disablePadding: false, label: 'Precio/U' },
            { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
        ],
        clienteFacturacion: '',
        clienteSeleccionado: null,

        //tipo de pago
        tipo_pago: 'efectivo',
        //estado de modals
        estadoModalFinalizaPago: false,
        estadoModalSimpleConfigurarPrecios: false,
        //seleecionar producto por defecto
        seleccionarProductoPordefecto: true,
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
        //numero de factura
        numero_factura: ''
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                uidUser: user.uid
            })
        })
    }


    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }
        if (item.id === 'precio_por_defecto') {
            return <div style={{ width: 80, position: 'relative', left: -80 }}>
                {
                    Boolean(n.tipo_precio_seleccionado) == false &&
                    <TextField
                        id={"filled-unidad-precio-defecto"}
                        select
                        label="P.G"
                        value={n.precio_por_defecto}
                        onChange={event => {
                            var array = this.state.listaProductosSeleccionados
                            array.forEach((it, i) => {
                                if (it.codigo === n.codigo) {
                                    var item = it
                                    item.precio_por_defecto = event.target.value
                                    array[i] = item
                                    this.setState({
                                        listaProductosSeleccionados: array
                                    })
                                }
                            })
                            setTimeout(() => {
                                var array2 = this.state.listaProductosSeleccionadosEditados
                                array2.forEach((it, i) => {
                                    if (it.codigo === n.codigo) {
                                        var item = it
                                        item.precio_venta = Number(((Number(n.precio_costo) * Number(this.obtenerPorcentajePrecio(n.precio_por_defecto))) + Number(n.precio_costo)).toFixed(2))
                                        array2[i] = item
                                        this.setState({
                                            listaProductosSeleccionadosEditados: array2
                                        })
                                    }
                                })

                            }, 100)
                            setTimeout(() => {
                                this.calcularValoresTotales()
                            }, 200)
                        }}
                        margin="normal"
                        variant="standard"
                        style={{ width: 'max-content', height: 30 }}
                    >
                        {
                            this.state.precios != null &&
                            this.state.precios.map(item => {
                                return <MenuItem key={item.codigo} value={item.codigo}>{`${item.nombre}`}</MenuItem>
                            })
                        }
                    </TextField>
                }
                {
                    Boolean(n.tipo_precio_seleccionado) &&
                    <TextField
                        id={"filled-unidad-precio-defecto"}
                        select
                        label="P.P"
                        value={n.precio_por_defecto}
                        onChange={event => {
                            var array = this.state.listaProductosSeleccionados
                            array.forEach((it, i) => {
                                if (it.codigo === n.codigo) {
                                    var item = it
                                    item.precio_por_defecto = event.target.value
                                    array[i] = item
                                    this.setState({
                                        listaProductosSeleccionados: array
                                    })
                                }
                            })
                            setTimeout(() => {
                                var array2 = this.state.listaProductosSeleccionadosEditados
                                array2.forEach((it, i) => {
                                    if (it.codigo === n.codigo) {
                                        var item = it
                                        item.precio_venta = Number(((Number(n.precio_costo) * Number(this.obtenerPorcentajePrecioPerzonalizado(this.state.listaProductosSeleccionadosEditados.filter(it => it.codigo === n.codigo)[0].precios_perzonalizados, n.precio_por_defecto))) + Number(n.precio_costo)).toFixed(2))
                                        array2[i] = item
                                        this.setState({
                                            listaProductosSeleccionadosEditados: array2
                                        })
                                    }
                                })

                            }, 100)
                            setTimeout(() => {
                                this.calcularValoresTotales()
                            }, 200)
                        }}
                        margin="normal"
                        variant="standard"
                        style={{ width: 'max-content', height: 30 }}
                    >
                        {
                            this.state.listaProductosSeleccionadosEditados.filter(it => it.codigo === n.codigo)[0].precios_perzonalizados.map(item => {
                                return <MenuItem key={item.codigo} value={item.codigo}>{`${item.nombre}`}</MenuItem>
                            })
                        }
                    </TextField>
                }
            </div>
        }
        if (item.id === 'cantidad') {

            var restaRetorno = <div style={{ width: 'max-content', display: 'flex', flexDirection: 'row' }}>
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
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            en stock <div style={{ color: colors.getColorPrymaryDark() }}>{Number(n.stock_actual) - Number(this.state.listaProductosSeleccionadosEditados.filter(item => n.codigo === item.codigo)[0].cantidad)}</div>
                        </div>
                        <div style={{ color: colors.getColorPrymary() }}>
                            {`${n.unidad_medida}`}
                        </div>
                    </div>
                </div>
            </div>

            return restaRetorno
        }
        if (item.id === 'descripcion_producto') {
            return Boolean(n.tiene_iva) ? `* ${n.descripcion_producto}` : n.descripcion_producto
        }
        if (item.id === 'precio_venta') {
            var precioR = 0
            if (Boolean(n.tipo_precio_seleccionado)) {
                precioR = ((Number(n.precio_costo) * Number(this.obtenerPorcentajePrecioPerzonalizado(this.state.listaProductosSeleccionadosEditados.filter(it => it.codigo === n.codigo)[0].precios_perzonalizados, n.precio_por_defecto))) + Number(n.precio_costo)).toFixed(2)
            } else {
                precioR = ((Number(n.precio_costo) * Number(this.obtenerPorcentajePrecio(n.precio_por_defecto))) + Number(n.precio_costo)).toFixed(2)
            }

            return precioR
        }
        if (item.id === 'total') {
            var precioR = 0
            if (Boolean(n.tipo_precio_seleccionado)) {
                precioR = ((Number(n.precio_costo) * Number(this.obtenerPorcentajePrecioPerzonalizado(this.state.listaProductosSeleccionadosEditados.filter(it => it.codigo === n.codigo)[0].precios_perzonalizados, n.precio_por_defecto))) + Number(n.precio_costo)).toFixed(2)
            } else {
                precioR = ((Number(n.precio_costo) * Number(this.obtenerPorcentajePrecio(n.precio_por_defecto))) + Number(n.precio_costo)).toFixed(2)
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
            </IconButton>
        }

    }
    obtenerPreciosPersonalizados = async (codigoProducto) => {
        var db = firebase.database();
        var productosRef = await db.ref('users/' + this.state.uidUser + '/precios_personalizados/' + codigoProducto).once('value')

        return Object.values(productosRef.val())
    }

    obtenerPorcentajePrecioPerzonalizado = (preciosPerzonalizados, precio_por_defecto) => {
        var porcentaje = 0
        preciosPerzonalizados.filter(it => {
            if (it.codigo === precio_por_defecto) {
                porcentaje = it.porcentaje
            }
        })
        return porcentaje
    }

    onChangueSelecteccionarProducto = async item => {
        console.log(item);
        var array = this.state.listaProductosSeleccionados
        var arrayValoresSelecionados = this.state.listaProductosSeleccionadosEditados
        var array2 = array.filter(item2 => item2.codigo === item.codigo)

        if (array2.length === 0) {
            if (Number(item.stock_actual) === 0) {
                setSnackBars.openSnack('error', 'rootSnackBar', 'Producto vacío', 2000)
            } else {
                array.push(item)
                if (Boolean(!this.state.seleccionarProductoPordefecto)) {
                    if (this.state.precioSeleccionadoCargar != null) {
                        item.precio_por_defecto = this.state.precioSeleccionadoCargar
                    }
                }

                var precioP = 0;
                if (Boolean(item.tipo_precio_seleccionado)) {
                    precioP = await this.obtenerPreciosPersonalizados(item.codigo)
                }
                var porcentaje = Boolean(item.tipo_precio_seleccionado) ? Number(this.obtenerPorcentajePrecioPerzonalizado(precioP, item.precio_por_defecto)) : Number(this.obtenerPorcentajePrecio(item.precio_por_defecto))

                arrayValoresSelecionados.push({
                    codigo: item.codigo,
                    cantidad: '1',
                    precio_venta_a: item.precio_venta_a,
                    precio_costo: item.precio_costo,
                    precios_perzonalizados: precioP,
                    tiene_iva: item.tiene_iva,
                    porcentaje_iva: item.porcentaje_iva,
                    stock_actual: item.stock_actual,
                    codigo_barras: item.codigo_barras,
                    tipo_precio_seleccionado: item.tipo_precio_seleccionado,
                    descripcion_producto: item.descripcion_producto,
                    precio_venta: Number((Number(item.precio_costo) * porcentaje) + Number(item.precio_costo)).toFixed(2),
                })

                this.setState({
                    itemProductoCargado: null
                })
            }
            this.calcularValoresTotales()
        } else {
            setSnackBars.openSnack('info', 'rootSnackBar', 'Producto ya ingresado!', 2000)
        }

        this.setState({
            listaProductosSeleccionados: array,
            listaProductosSeleccionadosEditados: arrayValoresSelecionados,
        })
    }

    calcularValoresTotales = () => {
        var sumatotalConIVA = 0
        var sumatotal = 0
        var sumatotalProductosSinIva = 0
        var sumatotalProductosConIva = 0
        var iva = 0
        this.state.listaProductosSeleccionadosEditados.forEach(item => {
            var stock = this.state.listaProductosSeleccionadosEditados.filter(it => it.codigo === item.codigo)[0].cantidad
            var precioCosto = this.state.listaProductosSeleccionadosEditados.filter(it => it.codigo === item.codigo)[0].precio_costo
            var reultado = 0
            if (Boolean(item.tipo_precio_seleccionado)) {
                reultado = (precioCosto * Number(this.obtenerPorcentajePrecioPerzonalizado(item.precios_perzonalizados, this.state.listaProductosSeleccionados.filter(it => it.codigo === item.codigo)[0].precio_por_defecto))) + Number(precioCosto)
            } else {
                reultado = (precioCosto * Number(this.obtenerPorcentajePrecio(this.state.listaProductosSeleccionados.filter(it => it.codigo === item.codigo)[0].precio_por_defecto))) + Number(precioCosto)
            }
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
            iva = (Number(stock) * Number(precioIva))
            var cantidad = (Number(stock) * Number(precio))
            sumatotal = sumatotal + cantidad
        })
        var subtotal = Number(Number(sumatotalProductosConIva.toFixed(3)) / 1.12).toFixed(3)
        var iva = Number(subtotal * 0.12).toFixed(3)
        setTimeout(() => {
            this.setState({
                sumaSubTotal: subtotal,
                sumaIva: iva,
                sumaTotal: Number((Number(subtotal) + Number(iva) + Number(sumatotalProductosSinIva)).toFixed(2)),
                precioProductosSinIva: sumatotalProductosSinIva.toFixed(3),
                precioProductosConIva: sumatotalProductosConIva.toFixed(3)
            })
        }, 10);
        // this.setState({ productosSeleccionados: this.state.listaProductosSeleccionadosEditados })



    }

    render() {
        const styles = {
            styleText: {
                width: '100%',
                marginTop: 130,
                marginLeft: 75
            }
        }
        return (
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
                            <Grid item xs={4}>
                                <div style={{
                                    display: 'flex',
                                    paddingLeft: 16,
                                    paddingRight: 16,
                                    flexDirection: 'column',
                                }}>


                                    <AutoCompleteSelectedProducto
                                        puntoVenta={true}
                                        styleText={styles.styleText}
                                        onChangue={this.onChangueSelecteccionarProducto}
                                    >

                                    </AutoCompleteSelectedProducto>
                                </div>


                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={12} style={{ marginLeft: 55 }}>
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

                    <Grid item xs={3} style={{ marginTop: 475, height: '100vh' }}>
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

                            handleDescontar={(descuento) => this.handleDescontar(descuento)}
                            handleDineroResibido={this.handleDineroResibido}
                            handleObservacion={this.handleObservacion}
                            handleFacturaElectronica={this.handleFacturaElectronica}
                            puntoVenta={true}
                            tipo_pago={this.state.tipo_pago}
                        />
                        <ContenedorBotonesVenta
                            handleFinalizarVenta={this.abrirModalFinalizarVenta}
                            handleClose={() =>
                                this.props.handleClose()
                            }
                        />
                    </Grid>

                </Grid>
            </div>
        );
    }
}

export default PuntoVenta;