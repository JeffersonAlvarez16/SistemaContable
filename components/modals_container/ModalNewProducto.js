import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import AutoCompleteTextField from '../plugins/AutoCompleteTextField';
import funtions from '../../utils/funtions';


import NumberFormat from 'react-number-format';
import setSnackBars from '../plugins/setSnackBars';


class ModalNewProducto extends Component {

    state = {
        codigo: '',
        numeroMayor: '',
        numeroMenor: '',
        numeroIva: '',
        cantidadProductos: '',
        nombreProducto: '',
        categoriaProducto: '',
        proveedorProducto: '',
    }

    componentDidMount() {
        if (this.props.item) {
            this.setState({
                codigo: this.props.item.codigo,
                numeroMayor: this.props.item.precio_mayor,
                numeroMenor: this.props.item.precio_menor,
                numeroIva: this.props.item.iva,
                cantidadProductos: this.props.item.cantidad,
                nombreProducto: this.props.item.nombre,
                categoriaProducto: this.props.item.categoria,
                proveedorProducto: this.props.item.proveedor,
            })
        }
    }

    handleChangeMayor = event => {
        this.setState({
            numeroMayor: event.target.value,
        })
    };

    handleChangeMenor = event => {
        this.setState({
            numeroMenor: event.target.value,
        })
    };

    handleChangeIva = event => {
        this.setState({
            numeroIva: event.target.value,
        })
    };

    handleChangeCantidadProductos = event => {
        this.setState({
            cantidadProductos: event.target.value,
        })
    };

    changueTextCategorias = (value) => {
        this.setState({
            categoriaProducto: value
        })
    }

    changueTextProveedores = (value) => {
        this.setState({
            proveedorProducto: value
        })
    }

    checkFormProduc = () => {
        if (
            this.state.codigo.length > 0 &&
            this.state.nombreProducto.length > 0 &&
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
                codigo: this.state.codigo,
                iva: this.state.numeroIva.replace('% ', ''),
                nombre: this.state.nombreProducto,
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
                width: '46%'
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

                <div style={{
                    marginTop: 50,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        maxWidth: 500
                    }}>
                        <form autoComplete="off">
                            <TextField
                                style={styles.styleText}
                                id="standard-codigo"
                                label="Codigo automático"
                                error={this.state.codigo.length > 0 ? false : true}
                                required
                                onChange={(event) => this.setState({ codigo: event.target.value })}
                                value={this.state.codigo}
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                error={this.state.nombreProducto.length > 0 ? false : true}
                                value={`${this.state.nombreProducto}`}
                                onChange={(event) => this.setState({ nombreProducto: event.target.value })}
                                style={styles.styleText}
                                required
                                id="standard-nombre-p"
                                label="Nombre del producto"
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
                            />

                        </form>
                    </div>
                </div>
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