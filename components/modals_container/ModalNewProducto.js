import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import TextField from '@material-ui/core/TextField';
import AutoCompleteTextField from '../plugins/AutoCompleteTextField';
import AutoCompleteAdmin from '../plugins/AutoCompleteAdmin';
import funtions from '../../utils/funtions';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import NumberFormat from 'react-number-format';
import setSnackBars from '../plugins/setSnackBars';


class ModalNewProducto extends Component {

    state = {
        codigo_automatico: '',
        codigo_barras: '',
        codigo_referencia: '',

        descripcion_producto: '',
        categoria_producto: {
            nombre: ''
        },
        proveedor: '',
        marca_producto: {
            nombre: ''
        },
        porcentaje_iva: '',
        localizacion_producto: '',
        numero_ventas: '',

        precio_costo: '',
        precio_venta_a: '',
        precio_venta_b: '',
        precio_venta_c: '',

        stock_actual: '',
        stock_minimo: '',
        stock_maximo: '',

        unidad_medida: '',
        producto_fraccionado: false,
        cantidad_productos: '',

        fecha_vencimiento: '',
        fecha_registro: '',
        hora_registro: '',

        estado_producto: '',
        usuario:{},

        //estados
        tiene_iva: false,


    }

    componentDidMount() {
        this.setState({
            usuario: this.props.usuario
        })
        /*  if (this.props.item) {
             this.setState({
                 codigo_automatico: this.props.item.codigo,
                 numeroMayor: this.props.item.precio_mayor,
                 numeroMenor: this.props.item.precio_menor,
                 numeroIva: this.props.item.iva,
                 cantidadProductos: this.props.item.cantidad,
                 descripcion_producto: this.props.item.nombre,
                 categoriaProducto: this.props.item.categoria,
                 proveedorProducto: this.props.item.proveedor,
             })
         } */
    }



    checkFormProduc = () => {
        if (
            this.state.codigo_automatico.length > 0 &&
            this.state.descripcion_producto.length > 0 &&
            this.state.categoriaProducto.length > 0 &&
            this.state.proveedorProducto.length > 0 &&
            this.state.numeroMayor.length > 0 &&
            this.state.numeroMenor.length > 0 &&
            this.state.numeroIva.length > 0 &&
            this.state.cantidadProductos.length > 0
        ) {
            const item = {
                cantidad: this.state.cantidadProductos.replace(' productos', ''),
                categoria: this.state.categoriaProducto,
                proveedor: this.state.proveedorProducto,
                codigo: this.state.codigo_automatico,
                iva: this.state.numeroIva.replace('% ', ''),
                nombre: this.state.descripcion_producto,
                precio_mayor: this.state.numeroMayor,
                precio_menor: this.state.numeroMenor
            }
            if (this.props.item) {
                this.props.setUpdateProducto(item)
                setSnackBars.openSnack('success', 'rootSnackBar', 'Producto actualizado correctamente', 2000)
                this.props.handleClose()

            } else {
                this.props.setNewProducto(item)
                setSnackBars.openSnack('success', 'rootSnackBar', 'Producto creado correctamente', 2000)
                this.props.handleClose()

            }
        } else {
            setSnackBars.openSnack('error', 'rootSnackBarERROR', 'Ingrese el producto correctamente', 2000)
        }
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
                                    error={this.state.codigo_automatico.length > 0 ? false : true}
                                    required
                                    onChange={(event) => this.setState({ codigo_automatico: event.target.value })}
                                    value={this.state.codigo_automatico}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    style={styles.styleText}
                                    id="standard-codigo-barras"
                                    label="Codigo de barras"
                                    error={this.state.codigo_barras.length > 0 ? false : true}
                                    required
                                    onChange={(event) => this.setState({ codigo_barras: event.target.value })}
                                    value={this.state.codigo_barras}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    style={styles.styleText}
                                    id="standard-codigo-referencia"
                                    label="Codigo de referencia"
                                    error={this.state.codigo_referencia.length > 0 ? false : true}
                                    required
                                    onChange={(event) => this.setState({ codigo_referencia: event.target.value })}
                                    value={this.state.codigo_referencia}
                                    margin="normal"
                                    variant="filled" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    style={styles.styleText}
                                    id="standard-precio-costo"
                                    label="Precio costo"
                                    error={this.state.codigo_automatico.length > 0 ? false : true}
                                    required
                                    onChange={(event) => this.setState({ codigo_automatico: event.target.value })}
                                    value={this.state.codigo_automatico}
                                    margin="normal"
                                    variant="filled"
                                />
                                <TextField
                                    style={styles.styleText}
                                    id="standard-precio-a"
                                    label="Precio A"
                                    error={this.state.codigo_automatico.length > 0 ? false : true}
                                    required
                                    onChange={(event) => this.setState({ codigo_automatico: event.target.value })}
                                    value={this.state.codigo_automatico}
                                    margin="normal"
                                    variant="filled"
                                />

                                <Grid container spacing={24}>
                                    <Grid item xs={6}>
                                        <TextField
                                            style={styles.styleText}
                                            id="standard-precio-b"
                                            label="Precio B"
                                            error={this.state.codigo_barras.length > 0 ? false : true}
                                            required
                                            onChange={(event) => this.setState({ codigo_barras: event.target.value })}
                                            value={this.state.codigo_barras}
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            style={styles.styleText}
                                            id="standard-precio-c"
                                            label="Precio C"
                                            error={this.state.codigo_referencia.length > 0 ? false : true}
                                            required
                                            onChange={(event) => this.setState({ codigo_referencia: event.target.value })}
                                            value={this.state.codigo_referencia}
                                            margin="normal"
                                            variant="filled" />
                                    </Grid>
                                </Grid>



                            </Grid>

                        </Grid>
                        <Grid container xs={6} spacing={24} style={{ padding: 24 }}>
                            <Grid item xs={6}>
                                <TextField
                                    style={styles.styleText}
                                    id="standard-descripcion-producto"
                                    label="Descripcion del producto"
                                    error={this.state.descripcion_producto.length > 0 ? false : true}
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
                                    changueText={item => this.setState({ categoria_producto: item })}
                                    textItemVacio='Categorias vacias'
                                />

                                <AutoCompleteAdmin
                                    id="standard-categoria-marcas"
                                    styleText={styles.styleText}
                                    nameTextFiel="Marca"
                                    dataRef="marcas"
                                    dataRefObject="marca"
                                    itemCategoria={this.state.marca_producto}
                                    changueText={item => this.setState({ marca_producto: item })}
                                    textItemVacio='Marcas vacias'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    style={styles.styleText}
                                    id="standard-localizacion-producto"
                                    label="Localización"
                                    error={this.state.descripcion_producto.length > 0 ? false : true}
                                    required
                                    onChange={(event) => this.setState({ descripcion_producto: event.target.value })}
                                    value={this.state.descripcion_producto}
                                    margin="normal"
                                    variant="filled"
                                />
                                <TextField
                                    style={styles.styleText}
                                    id="standard-stock-actual"
                                    label="Stock actual"
                                    error={this.state.descripcion_producto.length > 0 ? false : true}
                                    required
                                    onChange={(event) => this.setState({ descripcion_producto: event.target.value })}
                                    value={this.state.descripcion_producto}
                                    margin="normal"
                                    variant="filled"
                                />
                                <Grid container spacing={24}>
                                    <Grid item xs={6}>
                                        <TextField
                                            style={styles.styleText}
                                            id="standard-stock-minimo"
                                            label="Stock minimo"
                                            error={this.state.descripcion_producto.length > 0 ? false : true}
                                            required
                                            onChange={(event) => this.setState({ descripcion_producto: event.target.value })}
                                            value={this.state.descripcion_producto}
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            style={styles.styleText}
                                            id="standard-stock-maximo"
                                            label="Stock máximo"
                                            error={this.state.descripcion_producto.length > 0 ? false : true}
                                            required
                                            onChange={(event) => this.setState({ descripcion_producto: event.target.value })}
                                            value={this.state.descripcion_producto}
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Divider />

                    <Grid container spacing={24} style={{ width: '100vw' }}>
                        <Grid item xs={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.tiene_iva}
                                        onChange={() => this.setState({ tiene_iva: !this.state.tiene_iva })}
                                    />}
                                label="Tiene iva"
                            />
                            <TextField
                                style={styles.styleText}
                                id="standard-porcentaje-iva"
                                label="Porcentaje Iva"
                                disabled={!this.state.tiene_iva}
                                //error={this.state.descripcion_producto.length > 0 ? false : true}
                                required
                                onChange={(event) => this.setState({ descripcion_producto: event.target.value })}
                                value={this.state.descripcion_producto}
                                margin="normal"
                                variant="filled"
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
                        <Grid item xs={4}>
                            <FormControl style={{ width: '100%' }}>
                                <InputLabel htmlFor="unidad-medida">Unidad de medida</InputLabel>
                                <Select
                                    value={this.state.unidad_medida}
                                    onChange={event => this.setState({ unidad_medida: event.target.value })}
                                    inputProps={{
                                        name: 'unidad-medidad-de',
                                        id: 'unid-medida',
                                    }}
                                >
                                    <MenuItem value={'unidades'}>Unidades</MenuItem>
                                    <MenuItem value={'litros'}>Litros</MenuItem>
                                    <MenuItem value={'metros'}>Metros</MenuItem>
                                    <MenuItem value={'cajas'}>Cajas</MenuItem>
                                    <MenuItem value={'piezas'}>Piezas</MenuItem>
                                    <MenuItem value={'kilos'}>Kilos</MenuItem>
                                    <MenuItem value={'libras'}>Libras</MenuItem>
                                </Select>
                            </FormControl>

                            <form noValidate>
                                <TextField
                                    id="date-fecha-vencimiento"
                                    label="Fecha de vencimiento"
                                    type="date"
                                    //defaultValue={`${new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear()}`}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={4}>
                        {
                            console.log(`${new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate()}`)
                            
                        }
                        {`${new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate()}`}

                        </Grid>
                    </Grid>

                    {/* <TextField
                                error={this.state.descripcion_producto.length > 0 ? false : true}
                                value={`${this.state.descripcion_producto}`}
                                onChange={(event) => this.setState({ descripcion_producto: event.target.value })}
                                style={styles.styleText}
                                required
                                id="standard-descripcion-producto"
                                label="Descripción del producto"
                                margin="normal"
                                variant="outlined"
                            />

                            <AutoCompleteTextField
                                id="standard-categoria"
                                styleText={styles.styleAutoComplete}
                                nameTextFiel="Categoria"
                                dataAutoComplete={this.props.dataAutoCompleteCategorias}
                                value={this.state.categoriaProducto}
                                changueText={this.changueTextCategorias}
                                textItemVacio='Esta categoria no existe, pero será creada'
                            />

                            <AutoCompleteTextField
                                id="standard-proveedor"
                                styleText={styles.styleAutoComplete}
                                nameTextFiel="Proveedor"
                                value={this.state.proveedorProducto}
                                dataAutoComplete={this.props.dataAutoCompleteProveedores}
                                changueText={this.changueTextProveedores}
                                textItemVacio='Este proveedor no existe, pero será creado'
                            />


                            <TextField
                                style={styles.styleText}
                                label="Precio por mayor"
                                required
                                id="standard-precio-mayor"
                                error={this.state.numeroMayor.length > 0 ? false : true}
                                value={`${this.state.numeroMayor}`}
                                onChange={(event) => this.setState({ numeroMayor: event.target.value })}
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                style={styles.styleText}
                                label="Precio por menor"
                                required
                                id="precio-menor"
                                error={this.state.numeroMenor.length > 0 ? false : true}
                                value={`${this.state.numeroMenor}`}
                                onChange={(event) => this.setState({ numeroMenor: event.target.value })}
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                style={styles.styleText}
                                label="Iva %"
                                error={this.state.numeroIva.length > 0 ? false : true}
                                value={`${this.state.numeroIva}`}
                                required
                                id="standard-iva"
                                onChange={(event) => this.setState({ numeroIva: event.target.value })}
                                InputProps={{
                                    inputComponent: NumberFormatIva,
                                }}
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                style={styles.styleText}
                                label="Cantidad de productos"
                                required
                                id="standard-cantidad"
                                error={this.state.cantidadProductos.length > 0 ? false : true}
                                value={`${this.state.cantidadProductos}`}
                                onChange={(event) => this.setState({ cantidadProductos: event.target.value })}
                                InputProps={{
                                    inputComponent: NumberFormatCantidad,
                                }}
                                margin="normal"
                                variant="outlined"
                            /> */}

                </form>

            </div>
        );
    }
}

function NumberFormatCustom(props) {
    const { onChange } = props;

    return (
        <NumberFormat
            {...props}
            decimalSeparator={','}
            thousandSeparator={'.'}
            prefix="$ "
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                })
            }}
        />
    );
}

function NumberFormatIva(props) {
    const { onChange } = props;
    return (
        <NumberFormat
            {...props}
            mask="_"
            format="% ##"
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                })
            }}
        />
    )
}

function NumberFormatCantidad(props) {
    const { onChange } = props;
    return (
        <NumberFormat
            {...props}
            format="###### productos"
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                })
            }}
        />
    )
}

export default ModalNewProducto;