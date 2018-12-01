import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import funtions from '../../utils/funtions';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';


import NumberFormat from 'react-number-format';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import { FormControlLabel, Switch } from '@material-ui/core';
import setSnackBars from '../plugins/setSnackBars';


class ModalNewEditProveedor extends Component {

    state = {
        codigo: '',
        nombre: '',
        tipo_proveedor: '',
        telefono: '',
        celular: '',
        direccion: '',
        ciudad: '',
        barrio: '',
        email: '',
        observacion: '',
        fecha_registro: '',
        hora_registro: '',
        usuario: '',
        estado: true,
        order: '',
        identificacion: '',
        tipo_identificacion: '',
        tipo_persona: false,
        //estado de identificacion en la base de datos si esta o no registrada
        identificacionRegistrada: false
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
        if (this.props.item) {
            this.setState({
                codigo: this.props.item.codigo,
                nombre: this.props.item.nombre,
                tipo_proveedor: this.props.item.tipo,
                telefono: this.props.item.telefono,
                celular: this.props.item.celular,
                direccion: this.props.item.direccion,
                ciudad: this.props.item.ciudad,
                barrio: this.props.item.barrio,
                email: this.props.item.email,
                observacion: this.props.item.observacion,
                fecha_registro: this.props.item.fecha,
                hora_registro: this.props.item.hora,
                estado: this.props.item.estado,
                usuario: this.props.item.usuario,
                order: this.props.item.order,
                identificacion: this.props.item.identificacion,
                tipo_identificacion: this.props.item.tipo_identificacion,
                tipo_persona: this.props.item.tipo_persona
            })
            setTimeout(() => {
                this.comprobarCedula(this.props.item.identificacion)
                if (!this.props.item) {
                    this.comprobarCedulaRegistrada(this.props.item.identificacion)
                }
                this.comprobarEmail(this.props.item.email)
            }, 100)
        } else {
            this.setState({
                codigo: funtions.guidGenerator(),
                usuario: this.props.usuario.code,
                tipo_identificacion: '05',
                tipo_proveedor: 'persona',
            })
        }
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.props.handleClose()
        }
    }

    setNewProveedor = (proveedor) => {
        var db = firebase.database();
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/proveedores/' + proveedor.codigo);
        productosRef.set({
            ...proveedor
        });
    }

    setUpdateProducto = (proveedor) => {
        var db = firebase.database();
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/proveedores/' + proveedor.codigo);
        productosRef.update({
            ...proveedor
        });
    }

    comprobarEmail = email => {
        if (this.validar_email(email)) {
            this.setState({ comprobacion_texto_email: 'El email es correcto' })
            this.setState({ comprobacion_email: true })
        } else {
            this.setState({ comprobacion_texto_email: 'El email es incorrecto' })
            this.setState({ comprobacion_email: false })
        }
    }
    validar_email = (email) => {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email) ? true : false;
    }

    comprobarCedulaRegistrada = cedula => {
        if (cedula.length === 10) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var db = firebase.database();
                    var productosRef = db.ref('users/' + user.uid + '/clientes').orderByChild('numero_identificacion').equalTo(cedula)
                    var productosRefRuc = db.ref('users/' + user.uid + '/clientes').orderByChild('numero_identificacion').equalTo(cedula + '001')
                    productosRef.on('value', (snapshot) => {
                        if (snapshot.val()) {
                            this.setState({ identificacionRegistrada: true, texto_numero_cedula: 'Numero de idetificación registrado' })
                        } else {
                            productosRefRuc.on('value', (snapshot) => {
                                if (snapshot.val()) {
                                    this.setState({ identificacionRegistrada: true, texto_numero_cedula: 'Numero de idetificación registrado' })
                                } else {
                                    this.setState({ identificacionRegistrada: false })
                                }
                            })
                        }
                    })

                }
            })
        }
        if (cedula.length === 13) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var db = firebase.database();
                    var productosRef = db.ref('users/' + user.uid + '/clientes').orderByChild('numero_identificacion').equalTo(cedula)
                    var productosRefRuc = db.ref('users/' + user.uid + '/clientes').orderByChild('numero_identificacion').equalTo(cedula.slice(0, -3))
                    productosRefRuc.on('value', (snapshot) => {
                        if (snapshot.val()) {
                            this.setState({ identificacionRegistrada: true, texto_numero_cedula: 'Numero de idetificación registrado' })
                        } else {
                            productosRef.on('value', (snapshot) => {
                                if (snapshot.val()) {
                                    this.setState({ identificacionRegistrada: true, texto_numero_cedula: 'Numero de idetificación registrado' })
                                } else {
                                    this.setState({ identificacionRegistrada: false })
                                }
                            })
                        }
                    })

                }
            })
        }
    }

    comprobarCedula = (cedula) => {
        if (this.state.tipo_identificacion === '05') {
            //Preguntamos si la cedula consta de 10 digitos
            if (cedula.length == 10) {

                //Obtenemos el digito de la region que sonlos dos primeros digitos
                var digito_region = cedula.substring(0, 2);

                //Pregunto si la region existe ecuador se divide en 24 regiones
                if (digito_region >= 1 && digito_region <= 24) {

                    // Extraigo el ultimo digito
                    var ultimo_digito = cedula.substring(9, 10);

                    //Agrupo todos los pares y los sumo
                    var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

                    //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
                    var numero1 = cedula.substring(0, 1);
                    var numero1 = (numero1 * 2);
                    if (numero1 > 9) { var numero1 = (numero1 - 9); }

                    var numero3 = cedula.substring(2, 3);
                    var numero3 = (numero3 * 2);
                    if (numero3 > 9) { var numero3 = (numero3 - 9); }

                    var numero5 = cedula.substring(4, 5);
                    var numero5 = (numero5 * 2);
                    if (numero5 > 9) { var numero5 = (numero5 - 9); }

                    var numero7 = cedula.substring(6, 7);
                    var numero7 = (numero7 * 2);
                    if (numero7 > 9) { var numero7 = (numero7 - 9); }

                    var numero9 = cedula.substring(8, 9);
                    var numero9 = (numero9 * 2);
                    if (numero9 > 9) { var numero9 = (numero9 - 9); }

                    var impares = numero1 + numero3 + numero5 + numero7 + numero9;

                    //Suma total
                    var suma_total = (pares + impares);

                    //extraemos el primero digito
                    var primer_digito_suma = String(suma_total).substring(0, 1);

                    //Obtenemos la decena inmediata
                    var decena = (parseInt(primer_digito_suma) + 1) * 10;

                    //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
                    var digito_validador = decena - suma_total;

                    //Si el digito validador es = a 10 toma el valor de 0
                    if (digito_validador == 10)
                        var digito_validador = 0;

                    //Validamos que el digito validador sea igual al de la cedula
                    if (digito_validador == ultimo_digito) {
                        this.setState({ texto_numero_cedula: 'la cedula:' + cedula + ' es correcta' })
                        this.setState({ comprobacion_numero_cedula: true })
                    } else {
                        this.setState({ texto_numero_cedula: 'la cedula:' + cedula + ' es incorrecta' })
                        this.setState({ comprobacion_numero_cedula: false })
                    }

                } else {
                    // imprimimos en consola si la region no pertenece
                    this.setState({ texto_numero_cedula: 'Esta cedula no pertenece a ninguna region' })
                    this.setState({ comprobacion_numero_cedula: false })
                }
            } else {
                //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
                this.setState({ texto_numero_cedula: 'Esta cedula tiene menos de 10 Digitos' })
                this.setState({ comprobacion_numero_cedula: false })
            }
        }

        if (this.state.tipo_identificacion === '04') {
            //Preguntamos si la ruc consta de 13 digitos
            if (cedula.length == 13) {
                this.setState({ texto_numero_cedula: 'El ruc:' + cedula + ' es correcto' })
                this.setState({ comprobacion_numero_cedula: true })
            } else {
                //imprimimos en consola si la cedula tiene mas o menos de 13 digitos
                this.setState({ texto_numero_cedula: 'Esta ruc tiene menos de 13 Digitos' })
                this.setState({ comprobacion_numero_cedula: false })
            }
        }

    }

    checkFormProduc = () => {
        if (
            this.state.codigo.length > 0 &&
            this.state.nombre.length > 0 &&
            this.state.celular.length > 0 &&
            this.state.direccion.length > 0 &&
            this.state.identificacion.length > 0 &&
            this.state.email.length > 0 &&
            this.state.tipo_proveedor.length > 0 &&
            this.state.comprobacion_numero_cedula &&
            !this.state.identificacionRegistrada
        ) {
            var order = new Date()
            const item = {
                codigo: this.state.codigo,
                nombre: this.state.nombre,
                tipo: this.state.tipo_proveedor,
                telefono: this.state.telefono,
                celular: this.state.celular,
                direccion: this.state.direccion,
                ciudad: this.state.ciudad,
                barrio: this.state.barrio,
                email: this.state.email,
                observacion: this.state.observacion,
                fecha: this.props.item ? this.state.fecha_registro : `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
                hora: this.props.item ? this.state.hora_registro : `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
                usuario: this.state.usuario,
                estado: this.state.estado,
                order: this.props.item ? this.state.order : order + "",
                identificacion: this.state.identificacion,
                tipo_identificacion: this.state.tipo_identificacion,
                tipo_persona: this.state.tipo_persona,
            }
            if (this.props.item) {
                this.setUpdateProducto(item)
                setSnackBars.openSnack('success', 'rootSnackBar', 'Proveedor actualizado correctamente', 2000)
                this.props.handleClose()

            } else {
                this.setNewProveedor(item)
                setSnackBars.openSnack('success', 'rootSnackBar', 'Proveedor creado correctamente', 2000)
                this.props.handleClose()

            }
        } else {
            setSnackBars.openSnack('error', 'rootSnackBarERROR', 'Ingrese el proveedor correctamente', 2000)
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
                            {this.props.item ? 'Editar Proveedor' : 'Nuevo Proveedor'}
                        </Typography>
                        {
                            this.props.item ?
                                <Button color="inherit"
                                    onClick={this.checkFormProduc}
                                >
                                    Actualizar
                                </Button>
                                :
                                <Button color="inherit"
                                    onClick={this.checkFormProduc}
                                >
                                    Guardar
                                </Button>
                        }

                    </Toolbar>
                </AppBar>


                <form autoComplete="off">
                    <Grid container spacing={24} style={{ width: '100vw' }}>
                        <Grid container xs={6} spacing={24} style={{ padding: 24 }}>
                            <Grid item xs={6}>


                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    style={styles.styleText}
                                    id="standard-codigo-automatico"
                                    label="Codigo automático"
                                    required
                                    disabled
                                    value={this.state.codigo}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    style={styles.styleText}
                                    id="standard-nombre"
                                    label="Nombre"
                                    error={this.state.nombre.length === 0}
                                    required
                                    onChange={(event) => this.setState({ nombre: event.target.value })}
                                    value={this.state.nombre}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    style={styles.styleText}
                                    id="standard-email"
                                    label="Correo electrónico"
                                    error={this.state.email.length === 0 ? true : !Boolean(this.state.comprobacion_email)}
                                    required
                                    helperText={this.state.comprobacion_texto_email}
                                    onChange={(event) => {
                                        this.setState({ email: event.target.value })
                                        setTimeout(() => { this.comprobarEmail(this.state.email) }, 100)
                                    }}
                                    value={this.state.email}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    style={styles.styleText}
                                    id="standard-observacion"
                                    label="Observación"
                                    required
                                    onChange={(event) => this.setState({ observacion: event.target.value })}
                                    value={this.state.observacion}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    id="filled-tipo-proveedor"
                                    select
                                    label="Tipo de proveedor"
                                    error={this.state.tipo_proveedor.length === 0}
                                    value={this.state.tipo_proveedor}
                                    onChange={event => this.setState({ tipo_proveedor: event.target.value })}
                                    margin="normal"
                                    variant="filled"
                                    style={styles.styleText}
                                >
                                    <MenuItem value={'persona'}>Persona</MenuItem>
                                    <MenuItem value={'empresa'}>Empresa</MenuItem>
                                </TextField>

                                <TextField
                                    id="filled-tipo-identificacion"
                                    select
                                    label="Tipo de indentificación"
                                    error={this.state.tipo_identificacion.length === 0}
                                    value={this.state.tipo_identificacion}
                                    disabled={this.props.item}
                                    onChange={event => {
                                        this.setState({ tipo_identificacion: event.target.value })
                                        setTimeout(() => {
                                            if (this.state.tipo_identificacion === '05') {
                                                if (this.state.identificacion.length === 13) {
                                                    this.setState({ identificacion: this.state.identificacion.slice(0, -3) })
                                                }
                                            }
                                            this.comprobarCedula(this.state.identificacion)
                                            if (!this.props.item) {
                                                this.comprobarCedulaRegistrada(this.state.identificacion)
                                            }
                                        }, 100)
                                    }}
                                    margin="normal"
                                    variant="filled"
                                    style={styles.styleText}
                                >
                                    <MenuItem value={'04'}>RUC</MenuItem>
                                    <MenuItem value={'05'}>Cedula</MenuItem>
                                </TextField>

                            </Grid>

                        </Grid>
                        <Grid container xs={6} spacing={24} style={{ padding: 24 }}>
                            <Grid item xs={6}>

                                <TextField
                                    style={styles.styleText}
                                    id="standard-telefono"
                                    label="Telefono"
                                    required
                                    onChange={(event) => this.setState({ telefono: event.target.value })}
                                    value={this.state.telefono}
                                    margin="normal"
                                    variant="filled"
                                />
                                <TextField
                                    style={styles.styleText}
                                    id="standard-celular"
                                    label="Celular"
                                    error={this.state.celular.length === 0}
                                    required
                                    onChange={(event) => {
                                        if (event.target.value.length <= 10) {
                                            this.setState({ celular: event.target.value })
                                        }
                                    }}
                                    value={this.state.celular}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    style={styles.styleText}
                                    id="standard-direccion"
                                    label="Dirección"
                                    error={this.state.direccion.length === 0}
                                    required
                                    onChange={(event) => this.setState({ direccion: event.target.value })}
                                    value={this.state.direccion}
                                    margin="normal"
                                    variant="filled"
                                />

                                <Grid container spacing={24}>
                                    <Grid item xs={6}>
                                        <TextField
                                            style={styles.styleText}
                                            id="standard-ciudad"
                                            label="Ciudad"
                                            required
                                            onChange={(event) => this.setState({ ciudad: event.target.value })}
                                            value={this.state.ciudad}
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            style={styles.styleText}
                                            id="standard-barrio"
                                            label="Barrio"
                                            required
                                            onChange={(event) => this.setState({ barrio: event.target.value })}
                                            value={this.state.barrio}
                                            margin="normal"
                                            variant="filled" />
                                    </Grid>
                                </Grid>

                                <TextField
                                    style={styles.styleText}
                                    id="standard-identificacion"
                                    label="Número de identificación"
                                    helperText={this.state.texto_numero_cedula}
                                    error={this.state.identificacion.length === 0 ? true : !Boolean(this.state.comprobacion_numero_cedula) ? true : this.state.identificacionRegistrada}
                                    required
                                    disabled={this.props.item}

                                    onChange={(event) => {
                                        if (this.state.tipo_identificacion === '04') {
                                            if (event.target.value.length <= 13) {
                                                this.setState({ identificacion: event.target.value })
                                            }
                                        }
                                        if (this.state.tipo_identificacion === '05') {
                                            if (event.target.value.length <= 10) {
                                                this.setState({ identificacion: event.target.value })
                                            }
                                        }
                                        setTimeout(() => {
                                            this.comprobarCedula(this.state.identificacion)
                                            if (!this.props.item) {
                                                this.comprobarCedulaRegistrada(this.state.identificacion)
                                            }
                                        }, 100)
                                    }}
                                    value={this.state.identificacion}
                                    margin="normal"
                                    variant="filled"
                                />
                                <Grid container variant="permanent" spacing={20} style={{ width: '95%', paddingLeft: 16 }}>
                                    <div style={{ display: this.props.tipo_venta === 'final' ? 'none' : 'block' }}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={this.state.tipo_persona}
                                                    onChange={() => {
                                                        this.setState({
                                                            tipo_persona: !this.state.tipo_persona
                                                        })
                                                    }}
                                                />}
                                            label="Persona Natural no Obligada a llevar contabilidad"
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>

                            </Grid>

                        </Grid>
                    </Grid>


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

export default ModalNewEditProveedor;