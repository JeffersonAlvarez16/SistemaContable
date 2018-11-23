import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Search from './Search';
import SimpleTable from './TableList';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import funtions from '../../utils/funtions';
import AutoCompleteSelectedProducto from '../plugins/AutoCompleteSelectedProducto';
import TablaNormal from './tables/TableNormal';
import setSnackBars from '../plugins/setSnackBars';




class SectionContentFactura extends Component {


    state = {
        //nuevo
        listaSeleccionados: [],
        listaSeleccionadosValoresEditados: [],
        rowslistaProductos: [
            { id: 'acciones', numeric: true, disablePadding: false, label: 'Acciones' },
            { id: 'cantidad', numeric: true, disablePadding: false, label: 'Cantidad' },
            { id: 'descripcion_producto', numeric: true, disablePadding: false, label: 'Descripcion' },
            { id: 'precio_costo', numeric: true, disablePadding: false, label: 'Precio/U' },
            { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
        ],
        itemProductoCargado: null,
        cargaAutomatica: false,

        //sumas totales,
        sumaTotal: '',
        sumaTotalIva: '',

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/productos');
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            arryList: [],
                            arryListTemporal: [],
                            estadoSearch: 'cargando'
                        })
                        var hhh = funtions.snapshotToArray(snapshot)
                        this.setState({
                            arryList: hhh,
                            arryListTemporal: hhh,
                            estadoSearch: 'llena'
                        })
                        this.setState({
                            categorias: funtions.categorieToKey(funtions.repeatTo(funtions.inventarioToCategories(snapshot))),
                            proveedores: funtions.categorieToKey(funtions.repeatTo(funtions.inventarioToProveedores(snapshot)))
                        })
                    } else {
                        this.setState({
                            arryList: [],
                            arryListTemporal: [],
                            categorias: [],
                            proveedores: [],
                            estadoSearch: 'vacio'
                        })
                    }
                });
            }
        });
    }
    /* 
        componentWillReceiveProps(props) {
            if (props.productosSeleccionadosData.length > 0) {
                //console.log(props.productosSeleccionadosData)
                this.setProductosDesdeEditar(props.productosSeleccionadosData)
            }
        }
    
        setProductosDesdeEditar = array => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var db = firebase.database();
                    this.setState({
                        cargaAutomatica:true
                    })
                    array.forEach(item => {
                        var productosRef = db.ref('users/' + user.uid + "/productos/" + item.codigo);
                        productosRef.on('value', (snapshot) => {
                            if (snapshot.val()) {
                                //console.log(funtions.snapshotToArray(snapshot))
                                var it=snapshot.val()
                                var itKey=snapshot.key
                                it.id=itKey
                                console.log(it)
                                this.onChangueSelectedProducto(it)
                            }
                        })
                    })
                }
            })
        } */

    calcularValorTotal = () => {
        var sumatotalConIVA = 0
        var sumatotal = 0
        var sumatotalProductosSinIva = 0
        var sumatotalProductosConIva = 0
        this.state.listaSeleccionadosValoresEditados.forEach(item => {
            var stock = this.state.listaSeleccionadosValoresEditados.filter(it => it.codigo === item.codigo)[0].cantidad
            var precio = this.state.listaSeleccionadosValoresEditados.filter(it => it.codigo === item.codigo)[0].precio_venta_a

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
        this.props.handleSumaTotal((sumatotal + sumatotalConIVA).toFixed(2))
        this.props.handleSumaTotalIva(sumatotalConIVA.toFixed(2))
        this.props.handleSubTotal(sumatotal.toFixed(2))
        this.props.handlePrecioPrductosSinIva(sumatotalProductosSinIva.toFixed(2))
        this.props.handlePrecioPrductosConIva(sumatotalProductosConIva.toFixed(2))
        this.props.productosSeleccionados(this.state.listaSeleccionadosValoresEditados)
    }


    nuevaVenta = () => {
        this.setState({
            listaSeleccionados: [],
            listaSeleccionadosValoresEditados: [],
            itemProductoCargado: null,
            sumaTotal: 0,
            sumaTotalIva: 0,
        })
        this.props.handleSumaTotal(0.00)
        this.props.handleSumaTotalIva(0.00)
        this.props.handleSubTotal(0.00)
        this.props.productosSeleccionados([])
    }

    getNumeroStockActual = (item) => {
        var restaStock = Number(item.stock_actual) - Number(this.state.listaSeleccionadosValoresEditados.filter(item2 => item2.codigo === item.codigo)[0].cantidad)
        return restaStock
    }


    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }
        if (item.id === 'cantidad') {

            var restaRetorno = <div style={{ width: 'max-content', display: 'flex', flexDirection: 'row' }}>
                <TextField
                    id="handle-precio-edit-cantidad"
                    margin="dense"
                    type="number"
                    value={this.state.listaSeleccionadosValoresEditados.filter(item => n.codigo === item.codigo)[0].cantidad}
                    onChange={event => {
                        var array = this.state.listaSeleccionadosValoresEditados
                        array.filter(item => n.codigo === item.codigo)[0].cantidad = event.target.value
                        this.setState({
                            listaSeleccionadosValoresEditados: array
                        })
                        this.calcularValorTotal()
                    }}
                    placeholder='00'
                    style={{ width: 50 }}
                />
                <div style={{ width: 'max-content', display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: 10 }}>
                    {`en stock ${Number(n.stock_actual) - Number(this.state.listaSeleccionadosValoresEditados.filter(item => n.codigo === item.codigo)[0].cantidad)}`}
                </div>
            </div>

            return restaRetorno
        }
        if (item.id === 'descripcion_producto') {
            return n.descripcion_producto
        }
        if (item.id === 'precio_costo') {
            return n.precio_venta_a
        }
        if (item.id === 'total') {
            var itemValor = this.state.listaSeleccionadosValoresEditados.filter(item => item.codigo === n.codigo)[0]
            var sumaTotal = itemValor.cantidad * n.precio_venta_a
            return sumaTotal.toFixed(2)
        }
        if (item.id === 'acciones') {
            return <Button variant="fab" mini color="default" aria-label="quit" onClick={() => {
                const arraySeleccionados = this.state.listaSeleccionados
                const arraySeleccionadosEditados = this.state.listaSeleccionadosValoresEditados
                var contador1 = 0
                var contador2 = 0
                arraySeleccionados.forEach(item => {
                    if (item.codigo === n.codigo) {
                        arraySeleccionados.splice(contador1, 1);
                        this.setState({ listaSeleccionados: arraySeleccionados })
                    }
                    contador1++
                })
                arraySeleccionadosEditados.forEach(item => {
                    if (item.codigo === n.codigo) {
                        arraySeleccionadosEditados.splice(contador2, 1);
                        this.setState({ listaSeleccionadosValoresEditados: arraySeleccionadosEditados })
                    }
                    contador2++
                })
                this.calcularValorTotal()
            }}>
                <CloseIcon />
            </Button>
        }

    }

    onChangueSelectedProducto = item => {
        var array = this.state.listaSeleccionados
        var arrayValoresSelecionados = this.state.listaSeleccionadosValoresEditados
        var array2 = array.filter(item2 => item2.codigo === item.codigo)


        if (this.state.cargaAutomatica === false) {
            this.setState({
                itemProductoCargado: item
            })
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
                        tiene_iva: item.tiene_iva,
                        porcentaje_iva: item.porcentaje_iva,
                        stock_actual: item.stock_actual,
                        codigo_barras: item.codigo_barras,
                        descripcion_producto: item.descripcion_producto,
                    })
                    this.setState({
                        itemProductoCargado: null
                    })
                }
                this.calcularValorTotal()
            }
        }
        this.setState({
            listaSeleccionados: array,
            listaSeleccionadosValoresEditados: arrayValoresSelecionados,
        })



    }

    setItemToSeleccionados = (item) => {
        if (this.state.itemProductoCargado != null) {
            var array = this.state.listaSeleccionados
            var arrayValoresSelecionados = this.state.listaSeleccionadosValoresEditados
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
                        tiene_iva: item.tiene_iva,
                        porcentaje_iva: item.porcentaje_iva,
                        stock_actual: item.stock_actual,
                        codigo_barras: item.codigo_barras,
                        descripcion_producto: item.descripcion_producto,
                    })
                    this.setState({
                        listaSeleccionados: array,
                        listaSeleccionadosValoresEditados: arrayValoresSelecionados,
                    })

                    this.setState({
                        itemProductoCargado: null
                    })
                }
            }
            this.calcularValorTotal()
        }
    }

    render() {

        const styles = {
            styleText: {
                width: '100%'
            }
        }

        return (
            <div>
                <Grid container >
                    <Grid item xs={6} style={{ background: 'rgba(222, 239, 255)', paddingLeft: 16, paddingRight: 16 }}>
                        <TextField
                            id="filled-tipo-venta"
                            select
                            label="Tipo de venta"
                            error={this.props.tipo_venta.length > 0 ? false : true}
                            value={this.props.tipo_venta}
                            onChange={event => this.props.handleTipoVenta(event.target.value)}
                            margin="normal"
                            variant="outlined"
                            style={styles.styleText}
                        >
                            <MenuItem value={'factura'}>Factura</MenuItem>
                            <MenuItem value={'final'}>Consumidor Final</MenuItem>
                        </TextField>

                        <AutoCompleteSelectedProducto
                            styleText={styles.styleText}
                            onChangue={this.onChangueSelectedProducto}
                        >
                        </AutoCompleteSelectedProducto>

                    </Grid>
                    <Grid item xs={6} style={{ background: '#a0ffbe' }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: 16,
                            marginLeft: 16,
                            marginRight: 16
                        }}>
                            <Typography variant="title" gutterBottom>
                                {this.state.itemProductoCargado ? this.state.itemProductoCargado.descripcion_producto : 'Nombre de producto'}
                            </Typography>
                            <div style={{ flex: 1 }} />
                            <Typography variant="subheading" gutterBottom >
                                {this.state.itemProductoCargado ? this.state.itemProductoCargado.codigo : 'Codigo'}
                            </Typography>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: 16,
                            marginLeft: 16,
                            marginRight: 16,
                        }}>
                            <Typography variant="subheading" gutterBottom>
                                {this.state.itemProductoCargado ? '$ ' + this.state.itemProductoCargado.precio_venta_a : 'Precio'}
                            </Typography>
                            <div style={{ flex: 1 }} />
                            <Typography variant="subheading" gutterBottom>
                                {this.state.itemProductoCargado ? 'cantidad: ' + this.state.itemProductoCargado.stock_actual : 'Stock Actual'}
                            </Typography>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingBottom: 16,
                            paddingTop: 16,
                            paddingLeft: 16,
                            paddingRight: 16,
                            background: '#33ffa2',
                            height: 30
                        }}>
                            <div style={{ flex: 1 }} />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.cargaAutomatica}
                                        onChange={() => this.setState({ cargaAutomatica: !this.state.cargaAutomatica })}
                                    />}
                                label="Carga Automática"
                            />
                            <Button variant="contained" size="small" color="default" onClick={() => {
                                this.setItemToSeleccionados(this.state.itemProductoCargado)
                            }}>
                                Agregar
                            </Button>
                        </div>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} >
                        <Divider />
                        <TablaNormal
                            textoTitleP="Productos"
                            textoTitleS="Producto"
                            selectedItems={true}
                            toolbar={false}
                            data={this.state.listaSeleccionados}
                            rows={this.state.rowslistaProductos}
                            handleGetData={this.handleGetData}
                            estadoTabla={this.state.listaSeleccionados.length > 0 ? 'llena' : 'vacio'}
                            itemsSeleccionados={items => this.setState({ itemsSeleccionados: items })}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default SectionContentFactura;