import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';



import NumberFormat from 'react-number-format';
import setSnackBars from '../plugins/setSnackBars';
import funtions from '../../utils/funtions';

const tiposCliente = [
    {
        value: 'ruc',
        label: 'RUC'
    },
    {
        value: 'cedula',
        label: 'CEDULA'
    },
    {
        value: 'pasaporte',
        label: 'PASAPORTE'
    }
]


class ModalNewCliente extends Component {

    state = {
        tipo_identificacion: '',
        cedula: '',
        nombres: '',
        direccion: '',
        correo: '',
        ciudad: '',
        telefono: '',
        tipo: '',

        stateCedula: 'normal',

        razon_social: '',
    }

    componentDidMount() {
        if (this.props.item) {
            this.setState({
                tipo_identificacion: this.props.item.tipo_identificacion,
                cedula: this.props.item.cedula,
                nombres: this.props.item.nombres,
                direccion: this.props.item.direccion,
                correo: this.props.item.correo,
                ciudad: this.props.item.ciudad,
                telefono: this.props.item.telefono,

                tipo: this.props.item.tipo,
                razon_social: this.props.item.razon_social,
            })
        }
    }

    handleChangeCedula = event => {
        const array = this.props.cedulas.filter((item) => item.nombre === event.target.value)
        if (array.length > 0) {
            this.setState({
                cedula: event.target.value,
                stateCedula: 'error'
            })
        } else {
            this.setState({
                cedula: event.target.value,
                stateCedula: 'normal'
            })
        }

    };

    handleChangeNombres = event => {
        this.setState({
            nombres: event.target.value,
        })
    };

    handleChangeDireccion = event => {
        this.setState({
            direccion: event.target.value,
        })
    };

    handleChangeCorreo = event => {
        this.setState({
            correo: event.target.value,
        })
    };

    changueTextCiudad = (value) => {
        this.setState({
            ciudad: value
        })
    }

    changueTextTelefono = (value) => {
        this.setState({
            telefono: value
        })
    }

    checkFormProduc = () => {
        if (
            this.state.tipo_identificacion.length > 0 &&
            this.state.cedula.length > 0 &&
            this.state.stateCedula === 'normal' &&
            this.state.nombres.length > 0 &&
            //this.state.direccion.length > 0 &&
            this.state.correo.length > 0 &&
            this.state.ciudad.length > 0 &&
            this.state.telefono.length > 0 &&
            this.state.tipo.length > 0 
        ) {
            const item = {
                tipo_identificacion: this.state.tipo_identificacion,
                cedula: this.state.cedula.replace('CI: ', ''),
                nombres: this.state.nombres,
                direccion: this.state.direccion,
                correo: this.state.correo,
                ciudad: this.state.ciudad,
                telefono: this.state.telefono.replace('TEL: ', ''),
                tipo: this.state.tipo,
                razon_social: this.state.razon_social
            }
            if (this.props.item) {
                this.props.setUpdateProducto(item)
                setSnackBars.openSnack('success', 'rootSnackBar', 'Contacto actualizado correctamente', 2000)
                this.props.handleClose()

            } else {
                this.props.setNewProducto(item)
                setSnackBars.openSnack('success', 'rootSnackBar', 'Contacto creado correctamente', 2000)
                this.props.handleClose()

            }
        } else {
            setSnackBars.openSnack('error', 'rootSnackBarERROR', 'Ingrese el contacto correctamente', 2000)
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
                            {this.props.item ? 'Editar contacto' : 'Nuevo contacto'}
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
                                id="standard-tipo"
                                select
                                error={this.state.tipo.length > 0 ? false : true}
                                value={`${this.state.tipo}`}
                                onChange={(event) => this.setState({ tipo: event.target.value })}
                                style={styles.styleAutoComplete}
                                required
                                label="Tipo de contacto"
                                margin="normal"
                                variant="outlined"
                            >

                                <MenuItem key="1" value="Cliente">
                                    Cliente
                                </MenuItem>
                                <MenuItem key="2" value="Proveedor">
                                    Proveedor
                                </MenuItem>

                            </TextField>

                            <TextField
                                id="standard-tipo-identifi"
                                select
                                error={this.state.tipo_identificacion.length > 0 ? false : true}
                                value={`${this.state.tipo_identificacion}`}
                                onChange={(event) => this.setState({ tipo_identificacion: event.target.value })}
                                style={styles.styleText}
                                required
                                label="Tipo de identificación"
                                margin="normal"
                                variant="outlined"
                            >
                                {tiposCliente.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                error={this.state.cedula.length > 0 ? this.state.stateCedula === 'error' ? true : false : true}
                                disabled={this.state.tipo_identificacion.length > 0 ? false : true}
                                style={styles.styleText}
                                id="standard-cedula"
                                label={`Número de ${this.state.tipo_identificacion}`}
                                required
                                value={this.state.cedula}
                                onChange={this.handleChangeCedula}
                                margin="normal"
                                variant="outlined"
                                helperText={this.state.stateCedula === 'error' ? 'Cédula registrada' : ''}
                            />

                            {
                                this.state.tipo_identificacion === 'ruc' &&
                              
                                    <TextField
                                        error={this.state.razon_social.length > 0 ? false : true}
                                        style={styles.styleAutoComplete}
                                        id="standard-razon"
                                        label={`Razón social`}
                                        required
                                        value={this.state.razon_social}
                                        onChange={(event) => this.setState({ razon_social: event.target.value })}
                                        margin="normal"
                                        variant="outlined"
                                    />

                            }

                            <TextField
                                error={this.state.nombres.length > 0 ? false : true}
                                value={`${this.state.nombres}`}
                                id="standard-nombre"
                                onChange={(event) => this.setState({ nombres: event.target.value })}
                                style={styles.styleAutoComplete}
                                required
                                label={`Nombres del ${this.state.tipo}`}
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                style={styles.styleText}
                                label="Telefono"
                                required
                                id="standard-telefono"
                                error={this.state.telefono.length > 0 ? false : true}
                                value={`${this.state.telefono}`}
                                onChange={(event) => this.setState({ telefono: event.target.value })}
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    inputComponent: NumberFormatTelefono,
                                }}
                            />


                            {/*    <AutoCompleteTextField
                                styleText={styles.styleAutoComplete}
                                nameTextFiel="Categoria"
                                dataAutoComplete={this.props.dataAutoCompleteCategorias}
                                value={this.state.categoriaProducto}
                                changueText={this.changueTextCategorias}
                                textItemVacio='Esta categoria no existe, pero será creada'
                            /> */}


                            <TextField
                                style={styles.styleText}
                                label="Direccion"
                                //required
                                id="standard-direccion"
                                //error={this.state.direccion.length > 0 ? false : true}
                                value={`${this.state.direccion}`}
                                onChange={(event) => this.setState({ direccion: event.target.value })}
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                style={styles.styleText}
                                label="Correo"
                                type="email"
                                required
                                autoComplete="email"
                                id="standard-coreo"
                                error={this.state.correo.length > 0 ? false : true}
                                value={`${this.state.correo}`}
                                onChange={(event) => this.setState({ correo: event.target.value })}
                                /* InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }} */
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                style={styles.styleText}
                                label="Ciudad"
                                id="standard-ciudad"
                                error={this.state.ciudad.length > 0 ? false : true}
                                value={`${this.state.ciudad}`}
                                required
                                onChange={(event) => this.setState({ ciudad: event.target.value })}
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

function NumberFormatCedula(props) {
    const { onChange } = props;
    return (
        <NumberFormat
            {...props}
            mask="_"
            format="CI: ##########"
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

function NumberFormatTelefono(props) {
    const { onChange } = props;
    return (
        <NumberFormat
            {...props}
            mask="_"
            format="TEL: ##########"
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

export default ModalNewCliente;