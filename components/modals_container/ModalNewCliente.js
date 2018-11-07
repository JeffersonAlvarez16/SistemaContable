import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import NumberFormat from 'react-number-format';
import setSnackBars from '../plugins/setSnackBars';
import funtions from '../../utils/funtions';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'


class ModalNewCliente extends Component {

    state = {
        codigo: '',
        empresa: '',
        nombre: '',
        fecha_nacimiento: '',
        sexo: '',
        telefono: '',
        celular: '',
        numero_identificacion: '',
        tipo_identificacion: 0,
        direccion: '',
        email: '',
        observacion: '',
        barrio: '',
        ciudad: '',
        limite_deuda: '',
        credito: '',
        estado: '',
        fecha_registro: '',
        hora_registro: '',
        usuario: '',
        order: '',
    }

    componentDidMount() {
        if (this.props.item) {
            this.setState({
                codigo: this.props.item.codigo,
                empresa: this.props.item.empresa,
                nombre: this.props.item.nombre,
                fecha_nacimiento: this.props.item.fecha_nacimiento,
                sexo: this.props.item.sexo,
                telefono: this.props.item.telefono,
                celular: this.props.item.celular,
                numero_identificacion: this.props.item.numero_identificacion,
                tipo_identificacion: this.props.item.tipo_identificacion,
                direccion: this.props.item.direccion,
                email: this.props.item.email,
                observacion: this.props.item.observacion,
                barrio: this.props.item.barrio,
                ciudad: this.props.item.ciudad,
                limite_deuda: this.props.item.limite_deuda,
                credito: this.props.item.credito,
                estado: this.props.item.estado,
                fecha_registro: this.props.item.fecha_registro,
                hora_registro: this.props.item.hora_registro,
                usuario: this.props.item.usuario,
                order: this.props.item.order,
            })
        } else {
            this.setState({
                usuario: this.props.usuario.code,
                empresa: false,
                codigo: funtions.guidGenerator(),
                tipo_identificacion: '05',
            })
        }
    }

    getCheckFormEmpresa = valor => {
        if (valor === true) {
            var ce1 = this.state.celular.length > 0
            var ce2 = this.state.telefono.length > 0
            return ce1 && ce2 ? true : false
        } else {
            return true
        }
    }

    checkFormProduc = () => {

        if (
            this.state.codigo.length > 0 &&
            this.state.nombre.length > 0 &&
            this.state.email.length > 0 &&
            this.state.numero_identificacion.length > 0 &&
            this.state.direccion.length > 0 &&
            this.getCheckFormEmpresa(this.state.empresa)
        ) {
            var order = new Date()
            const item = {
                codigo: this.state.codigo,
                empresa: this.state.empresa,
                nombre: this.state.nombre,
                fecha_nacimiento: this.state.fecha_nacimiento,
                sexo: this.state.sexo,
                telefono: this.state.telefono,
                celular: this.state.celular,
                numero_identificacion: this.state.numero_identificacion,
                tipo_identificacion: this.state.tipo_identificacion,
                direccion: this.state.direccion,
                email: this.state.email,
                observacion: this.state.observacion,
                barrio: this.state.barrio,
                ciudad: this.state.ciudad,
                limite_deuda: this.state.limite_deuda,
                credito: this.state.credito,
                estado: this.props.item ? this.state.estado : true,
                fecha_registro: this.props.item ? this.state.fecha_registro : `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
                hora_registro: this.props.item ? this.state.hora_registro : `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
                usuario: this.props.item ? this.state.usuario : this.props.usuario.code,
                order: this.props.item ? this.state.order : order + "",
            }
            if (this.props.item) {
                this.setUpdateProducto(item)
                setSnackBars.openSnack('success', 'rootSnackBar', 'Cliente actualizado correctamente', 2000)
                this.props.handleClose()

            } else {
                this.setNewProducto(item)
                setSnackBars.openSnack('success', 'rootSnackBar', 'Cliente creado correctamente', 2000)
                this.props.handleClose()

            }
        } else {
            setSnackBars.openSnack('error', 'rootSnackBarERROR', 'Ingrese el cliente correctamente', 2000)
        }
    }

    setNewProducto = (producto) => {
        var db = firebase.database();
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/clientes/' + producto.codigo);
        productosRef.set({
            ...producto
        });
    }

    setUpdateProducto = (producto) => {
        var db = firebase.database();
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/clientes/' + producto.codigo);
        productosRef.update({
            ...producto
        });
    }

    render() {

        const styles = {
            styleText: {
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
                            {this.props.item ? 'Editar cliente' : 'Nuevo cliente'}
                        </Typography>
                        <Button color="inherit"
                            onClick={this.checkFormProduc}
                        >
                            Guardar
                        </Button>
                    </Toolbar>
                </AppBar>

                <div>
                    <div >
                        <form autoComplete="off">

                            <Grid container spacing={24} style={{ width: '100vw' }}>
                                <Grid container xs={6} spacing={24} style={{ padding: 24 }}>
                                    <Grid item xs={6}>

                                        <TextField
                                            style={styles.styleText}
                                            id="standard-codigo-automatico"
                                            label="Codigo automático"
                                            //error={this.state.codigo.length > 0 ? false : true}
                                            required
                                            disabled
                                            //onChange={(event) => this.setState({ codigo: event.target.value })}
                                            value={this.state.codigo}
                                            margin="normal"
                                            variant="filled"
                                        />

                                        {
                                            this.state.empresa === false &&
                                            <>
                                                <TextField
                                                    id="filled-sexo-cliente"
                                                    select
                                                    label="Sexo"
                                                    //error={this.state.sexo.length > 0 ? false : true}
                                                    value={this.state.sexo}
                                                    onChange={event => this.setState({ sexo: event.target.value })}
                                                    margin="normal"
                                                    variant="outlined"
                                                    style={styles.styleText}
                                                >
                                                    <MenuItem value={'masculino'}>Masculino</MenuItem>
                                                    <MenuItem value={'femenino'}>Femenino</MenuItem>
                                                    <MenuItem value={'otro'}>Otro</MenuItem>
                                                </TextField>

                                                <TextField
                                                    id="date-fecha-nacimiento-cliente"
                                                    label="Fecha Nacimiento"
                                                    type="date"
                                                    //defaultValue={`${new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear()}`}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={(event) => this.setState({ fecha_nacimiento: event.target.value })}
                                                    value={this.state.fecha_nacimiento}
                                                    margin="normal"
                                                    variant="filled"
                                                    style={styles.styleText}
                                                />
                                            </>
                                        }




                                    </Grid>
                                    <Grid item xs={6}>


                                        <TextField
                                            style={styles.styleText}
                                            id="standard-nombre-cliente"
                                            label="Nombre"
                                            error={this.state.nombre.length > 0 ? false : true}
                                            required
                                            onChange={(event) => this.setState({ nombre: event.target.value })}
                                            value={this.state.nombre}
                                            margin="normal"
                                            variant="filled"
                                        />

                                        <TextField
                                            id="filled-email-cliente"
                                            label="Email"
                                            required
                                            error={this.state.email.length > 0 ? false : true}
                                            value={this.state.email}
                                            onChange={event => this.setState({ email: event.target.value })}
                                            margin="normal"
                                            variant="filled"
                                            style={styles.styleText}
                                        >
                                        </TextField>

                                        <TextField
                                            id="filled-tipo-identificacion"
                                            select
                                            label="Tipo de indentificación"
                                            //error={this.state.sexo.length > 0 ? false : true}
                                            value={this.state.tipo_identificacion}
                                            onChange={event => this.setState({ tipo_identificacion: event.target.value })}
                                            margin="normal"
                                            variant="outlined"
                                            style={styles.styleText}
                                        >
                                            <MenuItem value={'04'}>RUC</MenuItem>
                                            <MenuItem value={'05'}>Cedula</MenuItem>
                                            <MenuItem value={'06'}>Pasaporte</MenuItem>
                                            <MenuItem value={'07'}>Consumidor Final</MenuItem>
                                        </TextField>

                                        <TextField
                                            id="filled-numero-identificacion-cliente"
                                            label="Número de identificación"
                                            required
                                            error={this.state.numero_identificacion.length > 0 ? false : true}
                                            value={this.state.numero_identificacion}
                                            onChange={event => this.setState({ numero_identificacion: event.target.value })}
                                            margin="normal"
                                            variant="filled"
                                            style={styles.styleText}
                                        >
                                        </TextField>

                                    </Grid>
                                </Grid>
                                <Grid container xs={6} spacing={24} style={{ padding: 24 }}>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            style={{
                                                height: 56,
                                                marginBottom: 8,
                                                marginTop: 16
                                            }}
                                            control={
                                                <Switch
                                                    checked={this.state.empresa}
                                                    onChange={() => this.setState({ empresa: !this.state.empresa })}
                                                />}
                                            label="Empresa"
                                        />

                                        <TextField
                                            id="filled-tipo-direccion-cliente"
                                            label="Dirección"
                                            required
                                            error={this.state.direccion.length > 0 ? false : true}
                                            value={this.state.direccion}
                                            onChange={event => this.setState({ direccion: event.target.value })}
                                            margin="normal"
                                            variant="filled"
                                            style={styles.styleText}
                                        >
                                        </TextField>

                                        <Grid container spacing={24}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="filled-barrio-cliente"
                                                    label="Barrio"
                                                    //error={this.state.barrio.length > 0 ? false : true}
                                                    value={this.state.barrio}
                                                    onChange={event => this.setState({ barrio: event.target.value })}
                                                    margin="normal"
                                                    variant="filled"
                                                    style={styles.styleText}
                                                >
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="filled-ciudad-cliente"
                                                    label="Ciudad"
                                                    //error={this.state.ciudad.length > 0 ? false : true}
                                                    value={this.state.ciudad}
                                                    onChange={event => this.setState({ ciudad: event.target.value })}
                                                    margin="normal"
                                                    variant="filled"
                                                    style={styles.styleText}
                                                >
                                                </TextField>
                                            </Grid>
                                        </Grid>



                                    </Grid>
                                    <Grid item xs={6}>

                                        {
                                            this.state.empresa === true &&
                                            <>
                                                <TextField
                                                    style={styles.styleText}
                                                    id="standard-celular-cliente"
                                                    label="Celular"
                                                    error={this.state.celular.length > 0 ? false : true}
                                                    required
                                                    onChange={(event) => this.setState({ celular: event.target.value })}
                                                    value={this.state.celular}
                                                    margin="normal"
                                                    variant="filled"
                                                />

                                                <TextField
                                                    id="filled-telefono-cliente"
                                                    label="Telefono"
                                                    required
                                                    error={this.state.telefono.length > 0 ? false : true}
                                                    value={this.state.telefono}
                                                    onChange={event => this.setState({ telefono: event.target.value })}
                                                    margin="normal"
                                                    variant="filled"
                                                    style={styles.styleText}
                                                >
                                                </TextField>
                                            </>
                                        }

                                        {
                                            this.state.empresa === false &&
                                            <>
                                                <TextField
                                                    style={styles.styleText}
                                                    id="standard-celular-cliente"
                                                    label="Celular"
                                                    //error={this.state.celular.length > 0 ? false : true}
                                                    required
                                                    onChange={(event) => this.setState({ celular: event.target.value })}
                                                    value={this.state.celular}
                                                    margin="normal"
                                                    variant="filled"
                                                />

                                                <TextField
                                                    id="filled-telefono-cliente"
                                                    label="Telefono"
                                                    required
                                                    //error={this.state.telefono.length > 0 ? false : true}
                                                    value={this.state.telefono}
                                                    onChange={event => this.setState({ telefono: event.target.value })}
                                                    margin="normal"
                                                    variant="filled"
                                                    style={styles.styleText}
                                                >
                                                </TextField>
                                            </>
                                        }



                                        <TextField
                                            id="filled-observacion-cliente"
                                            label="Observación"
                                            //error={this.state.observacion.length > 0 ? false : true}
                                            value={this.state.observacion}
                                            onChange={event => this.setState({ observacion: event.target.value })}
                                            margin="normal"
                                            variant="filled"
                                            style={styles.styleText}
                                        >
                                        </TextField>

                                        <TextField
                                            id="filled-limite-cliente"
                                            label="Límite de deuda"
                                            //error={this.state.limite_deuda.length > 0 ? false : true}
                                            value={this.state.limite_deuda}
                                            onChange={event => this.setState({ limite_deuda: event.target.value })}
                                            margin="normal"
                                            variant="filled"
                                            style={styles.styleText}
                                        >
                                        </TextField>

                                        <TextField
                                            id="filled-credito-cliente"
                                            label="Crédito"
                                            //error={this.state.credito.length > 0 ? false : true}
                                            value={this.state.credito}
                                            onChange={event => this.setState({ credito: event.target.value })}
                                            margin="normal"
                                            variant="filled"
                                            style={styles.styleText}
                                        >
                                        </TextField>

                                    </Grid>
                                </Grid>
                            </Grid>
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