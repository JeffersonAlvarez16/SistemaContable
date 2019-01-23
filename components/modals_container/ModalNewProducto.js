import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import AutoCompleteAdmin from '../plugins/AutoCompleteAdmin';
import funtions from '../../utils/funtions';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import NumberFormat from 'react-number-format';
import setSnackBars from '../plugins/setSnackBars';
import AutoCompleteProveedor from '../plugins/AutoCompleteProveedores';
import AutoCompleteProveedores from '../plugins/AutoCompleteRetenciones';
import ContainerSelectPrecios from '../plugins/ContainerSelectPrecios';
import ContainerSelectPreciosPersonalizados from '../plugins/ContainerSelectPreciosPersonalizados';
import ModalSettingsPricesPersonalizados from './ModalSettingsPricesPersonalizados';



class ModalNewProducto extends Component {

    state = {
        codigo: '',
        codigo_barras: '',
        codigo_referencia: '',

        descripcion_producto: '',
        categoria_producto: 'null',
        proveedor: '',
        marca_producto: 'null',
        porcentaje_iva: '',
        localizacion_producto: '',
        numero_ventas: '',

        precio_costo: '',
        precio_venta_a: '',
        precio_venta_b: '',
        precio_venta_c: '',
        precios: [],
        precio_por_defecto: '',
        tipo_precio_seleccionado: true,

        stock_actual: '0',
        stock_minimo: '10',
        stock_maximo: '100',

        unidad_medida: '',
        producto_fraccionado: false,
        cantidad_productos: '',

        fecha_vencimiento: '',
        fecha_registro: '',
        hora_registro: '',

        estado_producto: '',
        usuario: '',
        order: '',

        //estados
        tiene_iva: false,
        estado: true,

        //cantidad actual para actualizar
        cantidad_actual_temporal: '',

        //repetido codigo de barras
        errorCodigoBarrasRepetido: false,
        errorCodigoBarrasRepetidoMensaje: '',
        //repetido codigo de referencia        
        errorCodigoReferenciaRepetido: false,
        errorCodigoReferenciaRepetidoMensaje: ''

    }

    loadUserUID = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    uidUser: user.uid
                })
            }
        })
    }

    componentDidMount() {
        this.loadUserUID()
        this.obtenerPrecios()
        this.obtenerPreciosPersonalizados()
        document.addEventListener("keydown", this.escFunction, false);
        //pregutnando si biene un item por los props para saber si esditar y crear
        if (this.props.item) {
            this.setState({
                codigo: this.props.item.codigo,
                codigo_barras: this.props.item.codigo_barras,
                codigo_referencia: this.props.item.codigo_referencia,

                precio_costo: this.props.item.precio_costo,
                precio_venta_a: this.props.item.precio_venta_a,
                precio_venta_b: this.props.item.precio_venta_b,
                precio_venta_c: this.props.item.precio_venta_c,
                precio_por_defecto: this.props.item.precio_por_defecto,
                tipo_precio_seleccionado: true,

                descripcion_producto: this.props.item.descripcion_producto,
                categoria_producto: this.props.item.categoria_producto,
                proveedor: this.props.item.proveedor,
                marca_producto: this.props.item.marca_producto,
                porcentaje_iva: this.props.item.porcentaje_iva,
                localizacion_producto: this.props.item.localizacion_producto,
                numero_ventas: this.props.item.numero_ventas,

                unidad_medida: this.props.item.unidad_medida,
                producto_fraccionado: this.props.item.producto_fraccionado,

                stock_actual: `${this.props.item.stock_actual}`,
                //cantidad actual para actualizar
                cantidad_actual_temporal: `${this.props.item.stock_actual}`,
                stock_minimo: this.props.item.stock_minimo,
                stock_maximo: this.props.item.stock_maximo,

                fecha_vencimiento: this.props.item.fecha_vencimiento,
                fecha_registro: this.props.item.fecha_registro,
                hora_registro: this.props.item.hora_registro,

                tiene_iva: this.props.item.tiene_iva,
                estado: this.props.item.estado,
                usuario: this.props.item.usuario,
                order: this.props.item.order
            })
        } else {
            this.obtenerPreciosDefectoConfiguracion()
            this.setState({
                usuario: this.props.usuario.code,
                porcentaje_iva: '12',
                codigo: funtions.guidGenerator(),
                unidad_medida: 'unidades',
                tipo_precio_seleccionado: true
            })
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var db = firebase.database();
                    var productosRef = db.ref('users/' + user.uid + '/configuracion/iva_activado')
                    productosRef.on('value', (snapshot) => {
                        if (snapshot.val()) {
                            if (snapshot.val() === true) {
                                this.setState({
                                    tiene_iva: true
                                })
                            } else {
                                this.setState({
                                    tiene_iva: false
                                })
                            }

                        }
                    })

                }
            })
        }
    }


    obtenerPrecios = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/precios')
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            precios: funtions.snapshotToArray(snapshot)
                        })
                    }
                })
            }
        })
    }

    obtenerPreciosPersonalizados = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/precios_personalizados/' + this.state.codigo)
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            preciosPerzonalizados: funtions.snapshotToArray(snapshot)
                        })
                    }
                })
                productosRef.once('value', (snapshot) => {
                    if (snapshot.val()) {
                    } else {
                        var codigo1 = funtions.guidGenerator()
                        var precio1 = {
                            codigo: codigo1,
                            codigoProducto: this.state.codigo,
                            estado: true,
                            id: codigo1,
                            nombre: "Precio A",
                            nuevo_precio: "0.00",
                            porcentaje: 0.0
                        }
                        var codigo2 = funtions.guidGenerator()
                        var precio2 = {
                            codigo: codigo2,
                            codigoProducto: this.state.codigo,
                            estado: true,
                            id: codigo2,
                            nombre: "Precio B",
                            nuevo_precio: "0.00",
                            porcentaje: 0.0
                        }
                        var codigo3 = funtions.guidGenerator()
                        var precio3 = {
                            codigo: codigo3,
                            codigoProducto: this.state.codigo,
                            estado: true,
                            id: codigo3,
                            nombre: "Precio C",
                            nuevo_precio: "0.00",
                            porcentaje: 0.0
                        }
                        var codigo4 = funtions.guidGenerator()
                        var precio4 = {
                            codigo: codigo4,
                            codigoProducto: this.state.codigo,
                            estado: true,
                            id: codigo4,
                            nombre: "Precio D",
                            nuevo_precio: "0.00",
                            porcentaje: 0.0
                        }
                        var lista = [
                            precio1,
                            precio2,
                            precio3,
                            precio4
                        ]
                        this.setState({
                            preciosPerzonalizados: lista,
                            precio_por_defecto: lista[0].codigo
                        })
                    }
                })
            }
        })
    }
    guardarPreciosPersonalizados = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/precios_personalizados/' + this.state.codigo)
                productosRef.set(this.state.preciosPerzonalizados)
            }
        })
    }

    obtenerPreciosDefectoConfiguracion = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/configuracion/precio_por_defecto')
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            precio_por_defecto: snapshot.val()
                        })
                    }
                })
            }
        })
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.props.handleClose()
        }
    }

    setUpdateProducto = (producto) => {
        var db = firebase.database();
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/productos/' + producto.codigo);
        productosRef.update({
            ...producto
        })
        this.guardarPreciosPersonalizados()
    }

    setNewProducto = (producto) => {
        var db = firebase.database();
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/productos/' + producto.codigo);
        productosRef.set({
            ...producto
        })
        this.guardarPreciosPersonalizados()
    }



    checkFormProduc = () => {
        if (
            this.state.codigo.toString().length > 0 &&
            this.state.proveedor.toString().length > 0 &&
            this.state.precio_costo.toString().length > 0 &&
            this.state.descripcion_producto.toString().length > 0 &&
            this.state.categoria_producto.toString().length > 4 &&
            this.state.marca_producto.toString().length > 4 &&
            this.state.unidad_medida.toString().length > 0 &&
            this.state.stock_actual.toString().length > 0 &&
            this.state.stock_minimo.toString().length > 0 &&
            this.state.stock_maximo.toString().length > 0
        ) {
            var order = new Date()
            const item = {
                //como remplazar un valor dentro de un string
                //cantidad: this.state.cantidadProductos.replace(' productos', ''),
                codigo: this.state.codigo,
                codigo_barras: this.state.codigo_barras,
                codigo_referencia: this.state.codigo_referencia,

                precio_costo: this.state.precio_costo,
                precio_venta_a: this.state.precio_venta_a,
                precio_venta_b: this.state.precio_venta_b,
                precio_venta_c: this.state.precio_venta_c,
                precio_por_defecto: this.state.precio_por_defecto,
                tipo_precio_seleccionado: this.state.tipo_precio_seleccionado,

                descripcion_producto: this.state.descripcion_producto,
                categoria_producto: this.state.categoria_producto,
                proveedor: this.state.proveedor,
                marca_producto: this.state.marca_producto,
                porcentaje_iva: this.state.porcentaje_iva,
                localizacion_producto: this.state.localizacion_producto,
                numero_ventas: this.state.numero_ventas,

                unidad_medida: this.state.unidad_medida,
                producto_fraccionado: this.state.producto_fraccionado,

                stock_actual: `${this.state.stock_actual}`,
                stock_minimo: this.state.stock_minimo,
                stock_maximo: this.state.stock_maximo,

                fecha_vencimiento: this.state.fecha_vencimiento,
                fecha_registro: this.props.item ? this.state.fecha_registro : funtions.obtenerFechaActual(),
                hora_registro: this.props.item ? this.state.hora_registro : `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,

                tiene_iva: this.state.tiene_iva,
                estado: this.props.item ? this.state.estado : true,
                usuario: this.props.usuario.code,
                order: this.props.item ? this.state.order : order + "",
            }
            if (this.props.item) {
                this.setUpdateProducto(item)
                setSnackBars.openSnack('success', 'rootSnackBar', 'Producto actualizado correctamente', 2000)
                this.props.handleClose()

            } else {
                this.setNewProducto(item)
                setSnackBars.openSnack('success', 'rootSnackBar', 'Producto creado correctamente', 2000)
                this.props.handleClose()

            }
        } else {
            setSnackBars.openSnack('error', 'rootSnackBarERROR', 'Ingrese el producto correctamente', 2000)
        }
    }

    seleccionarPreciosPersonalizados = () => {
        this.setState({
            tipo_precio_seleccionado: !this.state.tipo_precio_seleccionado
        })
    }

    

    validar_codigo = (texto) => {
        var regex =/^([a-zA-Z0-9])+$/;
        return regex.test(texto) ? true : false;
    }

    onChangeCodigoBarras = (event) => {       
        if(this.validar_codigo(event.target.value)){
            this.setState({ codigo_barras: event.target.value })
        }
        this.resivirItemCodigoBarras(event.target.value)
    }

    resivirItemCodigoBarras = (texto) => {
        var db = firebase.database()
        var productosRef = db.ref('users/' + this.state.uidUser + "/productos").orderByChild('codigo_barras').equalTo(texto)
        productosRef.once('value', snap => {
            if (snap.val()) {
                var listainterna = funtions.snapshotToArray(snap)
                if (listainterna[0].codigo === this.state.codigo) {
                    this.setState({
                        errorCodigoBarrasRepetido: false,
                        errorCodigoBarrasRepetidoMensaje: 'El codigo pertenece a este producto'
                    })
                } else {
                    this.setState({
                        errorCodigoBarrasRepetido: true,
                        errorCodigoBarrasRepetidoMensaje: 'El codigo esta utilizado por otro producto'
                    })
                }
            } else {
                this.setState({
                    errorCodigoBarrasRepetido: false,
                    errorCodigoBarrasRepetidoMensaje: 'El codigo es único'
                })
            }
        })
    }

    onChangeCodigoReferencia = (event) => {
        if(this.validar_codigo(event.target.value)){
            this.setState({ codigo_referencia: event.target.value })
        }else{
            this.validar_codigo(event.target.value)
        }
        this.resivirItemCodigoReferencia(event.target.value)
    }

    resivirItemCodigoReferencia = (texto) => {
        var db = firebase.database()
        var productosRef = db.ref('users/' + this.state.uidUser + "/productos").orderByChild('codigo_referencia').equalTo(texto)
        productosRef.once('value', snap => {
            if (snap.val()) {
                var listainterna = funtions.snapshotToArray(snap)
                if (listainterna[0].codigo === this.state.codigo) {
                    this.setState({
                        errorCodigoReferenciaRepetido: false,
                        errorCodigoReferenciaRepetidoMensaje: 'El codigo pertenece a este producto'
                    })
                } else {
                    this.setState({
                        errorCodigoReferenciaRepetido: true,
                        errorCodigoReferenciaRepetidoMensaje: 'El codigo esta utilizado por otro producto'
                    })
                }
            } else {
                this.setState({
                    errorCodigoReferenciaRepetido: false,
                    errorCodigoReferenciaRepetidoMensaje: 'El codigo es único'
                })
            }
        })
    }

    render() {

        const styles = {
            styleText: {
                margin: 10,
                width: '100%'
            },
            styleAutoComplete: {
                margin: 10,
                width: '96%'
            }
        }

        return (
            <div>
                <div id='rootSnackBarERROR'></div>
                <AppBar style={{
                    position: 'relative',
                }}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" style={{ flex: 1, marginLeft: 30 }}>
                            {this.props.item ? 'Editar Producto' : 'Nuevo producto'}
                        </Typography>
                        <Button color="inherit"
                            onClick={this.checkFormProduc}
                        >
                            Guardar
                        </Button>
                    </Toolbar>
                </AppBar>

                <form autoComplete="off">
                    <Grid container spacing={24} style={{ width: '100vw' }}>
                        <Grid container xs={6} spacing={24} style={{ padding: 24 }}>
                            <Grid item xs={6}>
                                <TextField
                                    style={styles.styleText}
                                    id="standard-codigo-automatico"
                                    label="Codigo automático"
                                    error={this.state.codigo.length === 0}
                                    required
                                    disabled
                                    onChange={(event) => this.setState({ codigo: event.target.value })}
                                    value={this.state.codigo}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    style={styles.styleText}
                                    id="standard-codigo-barras"
                                    label="Codigo de barras"
                                    autoFocus
                                    error={this.state.errorCodigoBarrasRepetido}
                                    helperText={this.state.errorCodigoBarrasRepetidoMensaje}
                                    required
                                    onChange={(event) => this.onChangeCodigoBarras(event)}                                 
                                    value={this.state.codigo_barras}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    style={styles.styleText}
                                    id="standard-codigo-referencia"
                                    label="Codigo de referencia"
                                    error={this.state.errorCodigoReferenciaRepetido}
                                    helperText={this.state.errorCodigoReferenciaRepetidoMensaje}
                                    required
                                    onChange={(event) => this.onChangeCodigoReferencia(event)}
                                    value={this.state.codigo_referencia}
                                    margin="normal"
                                    variant="filled" />

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.tiene_iva}
                                            onChange={() => this.setState({ tiene_iva: !this.state.tiene_iva })}
                                        />}
                                    label="Tiene iva"
                                />
                                {
                                    this.state.tiene_iva &&
                                    <TextField
                                        style={styles.styleText}
                                        id="standard-porcentaje-iva"
                                        label="Porcentaje Iva"
                                        error={this.state.porcentaje_iva.length === 0}
                                        required
                                        onChange={(event) => this.setState({ porcentaje_iva: event.target.value })}
                                        value={this.state.porcentaje_iva}
                                        margin="normal"
                                        variant="filled"
                                    >
                                    </TextField>
                                }

                                <TextField
                                    id="date-fecha-vencimiento"
                                    label="Fecha de vencimiento"
                                    type="date"
                                    //defaultValue={`${new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear()}`}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event) => this.setState({ fecha_vencimiento: event.target.value })}
                                    value={this.state.fecha_vencimiento}
                                    margin="normal"
                                    variant="filled"
                                    style={styles.styleText}
                                />

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.producto_fraccionado}
                                            onChange={() => this.setState({ producto_fraccionado: !this.state.producto_fraccionado })}
                                        />}
                                    label="Venta fraccionada"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <AutoCompleteProveedores
                                    styleText={styles.styleText}
                                    dataRef="proveedores"
                                    dataRefObject="proveedor"
                                    error={this.state.proveedor.length === 0}
                                    onChangue={(item) => this.setState({ proveedor: item.codigo })}
                                    usuario={this.props.usuario}
                                    codigoProveedor={this.state.proveedor}
                                />

                                <Grid container spacing={24}>
                                    <Grid item xs={12}>
                                        <TextField
                                            style={styles.styleText}
                                            id="standard-precio-costo-item"
                                            label="Precio costo"
                                            error={this.state.precio_costo.length === 0}
                                            required
                                            onChange={(event) => this.setState({ precio_costo: event.target.value })}
                                            value={this.state.precio_costo}
                                            margin="normal"
                                            variant="filled"
                                            InputProps={{
                                                inputComponent: NumberFormatCustom,
                                            }}
                                        />

                                        {
                                            Boolean(this.state.tipo_precio_seleccionado) === true &&
                                            <TextField
                                                id="filled-unidad-medida"
                                                select
                                                label="Precio por defecto - Personalizado"
                                                error={this.state.precio_por_defecto.length === 0}
                                                value={this.state.precio_por_defecto}
                                                onChange={event => this.setState({ precio_por_defecto: event.target.value })}
                                                margin="normal"
                                                variant="outlined"
                                                style={styles.styleText}
                                            >
                                                {
                                                    this.state.preciosPerzonalizados != null &&
                                                    this.state.preciosPerzonalizados.map((item, i) => {
                                                        var itemR =
                                                            itemR = <MenuItem selected key={item.codigo} value={item.codigo}>{`${item.nombre}`}</MenuItem>
                                                        return itemR
                                                    })
                                                }
                                            </TextField>
                                        }
                                        {
                                            Boolean(this.state.tipo_precio_seleccionado) === false &&
                                            <TextField
                                                id="filled-unidad-medida"
                                                select
                                                label="Precio por defecto - General"
                                                error={this.state.precio_por_defecto.length === 0}
                                                value={this.state.precio_por_defecto}
                                                onChange={event => this.setState({ precio_por_defecto: event.target.value })}
                                                margin="normal"
                                                variant="outlined"
                                                style={styles.styleText}
                                            >
                                                {
                                                    this.state.precios.map(item => {
                                                        return <MenuItem key={item.codigo} value={item.codigo}>{`${item.nombre}`}</MenuItem>
                                                    })
                                                }
                                            </TextField>
                                        }
                                        <TextField
                                            style={styles.styleText}
                                            id="standard-descripcion-producto"
                                            label="Descripcion del producto"
                                            error={this.state.descripcion_producto.length === 0}
                                            required
                                            onChange={(event) => this.setState({ descripcion_producto: event.target.value })}
                                            value={this.state.descripcion_producto}
                                            margin="normal"
                                            variant="filled"
                                        />
                                        <AutoCompleteAdmin
                                            id="standard-categoria-productos"
                                            styleText={styles.styleText}
                                            nameTextFiel="Categoria"
                                            dataRef="categorias"
                                            dataRefObject="categoria"
                                            itemCategoria={this.state.categoria_producto}
                                            changueText={itemCodigo => this.setState({ categoria_producto: itemCodigo })}
                                            textItemVacio='Categorias vacias'
                                        />

                                        <AutoCompleteAdmin
                                            id="standard-categoria-marcas"
                                            styleText={styles.styleText}
                                            nameTextFiel="Marca"
                                            dataRef="marcas"
                                            dataRefObject="marca"
                                            itemCategoria={this.state.marca_producto}
                                            changueText={itemCodigo => this.setState({ marca_producto: itemCodigo })}
                                            textItemVacio='Marcas vacias'
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs={12}>

                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid container xs={6}>
                            <Grid item xs={6}>
                                {/* <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.tipo_precio_seleccionado}
                                            onChange={() => this.seleccionarPreciosPersonalizados()}
                                        />}
                                    label="Precios personalizados"
                                />
                                { */}
                                {/* Boolean(this.state.tipo_precio_seleccionado) === true && */}
                                <ModalSettingsPricesPersonalizados
                                    codigoProducto={this.state.codigo}
                                    precio_costo={this.state.precio_costo}
                                    preciosPerzonalizados={this.state.preciosPerzonalizados}
                                    setPreciosPerzonalizados={(preciosPerzonalizados) => this.setState({ preciosPerzonalizados })}
                                >
                                </ModalSettingsPricesPersonalizados>
                                {/*  } 
                                 {
                                    Boolean(this.state.tipo_precio_seleccionado) === false &&
                                    <ContainerSelectPrecios
                                        precio_costo={this.state.precio_costo}
                                        estadoAbrir={this.state.precio_costo.length > 0}
                                    />
                                } */}
                            </Grid>
                            <Grid item xs={6} style={{ marginTop: 25 }}>
                                <TextField
                                    id="filled-unidad-medida"
                                    select
                                    label="Tipo de medida"
                                    error={this.state.unidad_medida.length === 0}
                                    value={this.state.unidad_medida}
                                    onChange={event => this.setState({ unidad_medida: event.target.value })}
                                    margin="normal"
                                    variant="outlined"
                                    style={styles.styleText}
                                >
                                    <MenuItem value={'unidades'}>Unidades</MenuItem>
                                    <MenuItem value={'litros'}>Litros</MenuItem>
                                    <MenuItem value={'metros'}>Metros</MenuItem>
                                    <MenuItem value={'cajas'}>Cajas</MenuItem>
                                    <MenuItem value={'piezas'}>Piezas</MenuItem>
                                    <MenuItem value={'kilos'}>Kilos</MenuItem>
                                    <MenuItem value={'libras'}>Libras</MenuItem>
                                </TextField>
                                <Grid container spacing={24}>
                                    <Grid item xs={6}>
                                        <TextField
                                            style={styles.styleText}
                                            id="standard-stock-actual-item"
                                            label="Stock actual"
                                            error={this.state.stock_actual.length === 0}
                                            required
                                            disabled
                                            onChange={(event) => this.setState({ stock_actual: event.target.value })}
                                            value={this.state.stock_actual}
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            style={styles.styleText}
                                            id="standard-localizacion-producto"
                                            label="Localización"
                                            required
                                            onChange={(event) => this.setState({ localizacion_producto: event.target.value })}
                                            value={this.state.localizacion_producto}
                                            margin="normal"
                                            variant="filled"
                                        />

                                    </Grid>
                                </Grid>

                                <Grid container spacing={24}>
                                    <Grid item xs={6}>
                                        <TextField
                                            style={styles.styleText}
                                            id="standard-stock-minimo"
                                            label="Stock minimo"
                                            error={this.state.stock_minimo.length === 0}
                                            required
                                            onChange={(event) => this.setState({ stock_minimo: event.target.value })}
                                            value={this.state.stock_minimo}
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            style={styles.styleText}
                                            id="standard-stock-maximo"
                                            label="Stock máximo"
                                            error={this.state.stock_maximo.length === 0}
                                            required
                                            onChange={(event) => this.setState({ stock_maximo: event.target.value })}
                                            value={this.state.stock_maximo}
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </form>

            </div>
        );
    }
}

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            prefix=""
        />
    );
}

export default ModalNewProducto;