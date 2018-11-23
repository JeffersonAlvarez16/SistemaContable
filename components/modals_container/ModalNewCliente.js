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
        document.addEventListener("keydown", this.escFunction, false);
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
            setTimeout(() => {
                this.comprobarCedula(this.props.item.numero_identificacion)
                if (!this.props.item) {
                    this.comprobarCedulaRegistrada(this.state.numero_identificacion)
                }
                this.comprobarEmail(this.props.item.email)
            }, 100)
        } else {
            this.setState({
                usuario: this.props.usuario.code,
                empresa: false,
                codigo: funtions.guidGenerator(),
                tipo_identificacion: '05',
            })
        }
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.props.handleClose()
        }
    }

    getCheckFormEmpresa = valor => {
        if (valor === true) {
            var ce1 = this.state.celular.length > 0
            var ce2 = this.state.telefono.length > 0
            return ce1 && ce2 ? true : false
        } else {
            var ce1 = this.state.celular.length > 0
            return ce1 ? true : false
        }
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

                //Obtenemos el digito de la region que sonlos dos primeros digitos
                var digito_region = cedula.substring(0, 2);

                //Pregunto si la region existe ecuador se divide en 24 regiones
                if (digito_region >= 1 && digito_region <= 24) {

                    // Extraigo el ultimo digito
                    var ultimo_digito = cedula.substring(9, 10);

                    var tres_ultimos_digitos = cedula.substring(10, 13)

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
                        if (tres_ultimos_digitos === '001') {
                            this.setState({ texto_numero_cedula: 'El ruc:' + cedula + ' es correcto' })
                            this.setState({ comprobacion_numero_cedula: true })
                        } else {
                            this.setState({ texto_numero_cedula: 'El ruc:' + cedula + ' es incorrecto' })
                            this.setState({ comprobacion_numero_cedula: false })
                        }
                    } else {
                        this.setState({ texto_numero_cedula: 'El ruc:' + cedula + ' es incorrecto' })
                        this.setState({ comprobacion_numero_cedula: false })
                    }

                } else {
                    // imprimimos en consola si la region no pertenece
                    this.setState({ texto_numero_cedula: 'Este ruc no pertenece a ninguna region' })
                    this.setState({ comprobacion_numero_cedula: false })
                }
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
            this.state.email.length > 0 &&
            this.state.numero_identificacion.length > 0 &&
            this.state.direccion.length > 0 &&
            this.getCheckFormEmpresa(this.state.empresa) &&
            this.state.comprobacion_numero_cedula &&
            !this.state.identificacionRegistrada
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
                                            required
                                            disabled
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
                                            error={this.state.nombre.length === 0}
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
                                            error={this.state.email.length === 0 ? true : !Boolean(this.state.comprobacion_email)}
                                            value={this.state.email}
                                            helperText={this.state.comprobacion_texto_email}
                                            onChange={event => {
                                                this.setState({ email: event.target.value })
                                                setTimeout(() => { this.comprobarEmail(this.state.email) }, 100)
                                            }}
                                            margin="normal"
                                            variant="filled"
                                            style={styles.styleText}
                                        >
                                        </TextField>

                                        <TextField
                                            id="filled-tipo-identificacion"
                                            select
                                            label="Tipo de indentificación"
                                            value={this.state.tipo_identificacion}
                                            disabled={this.props.item}
                                            onChange={event => {
                                                this.setState({ tipo_identificacion: event.target.value })
                                                setTimeout(() => {
                                                    if (this.state.tipo_identificacion === '05') {
                                                        if (this.state.numero_identificacion.length === 13) {
                                                            this.setState({ numero_identificacion: this.state.numero_identificacion.slice(0, -3) })
                                                        }
                                                    }
                                                    this.comprobarCedula(this.state.numero_identificacion)
                                                    if (!this.props.item) {
                                                        this.comprobarCedulaRegistrada(this.state.numero_identificacion)
                                                    }
                                                }, 100)
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            style={styles.styleText}
                                        >
                                            <MenuItem value={'04'}>RUC</MenuItem>
                                            <MenuItem value={'05'}>Cedula</MenuItem>
                                        </TextField>

                                        <TextField
                                            id="filled-numero-identificacion-cliente"
                                            label="Número de identificación"
                                            required
                                            helperText={this.state.texto_numero_cedula}
                                            error={this.state.numero_identificacion.length === 0 ? true : !Boolean(this.state.comprobacion_numero_cedula) ? true : this.state.identificacionRegistrada}
                                            value={this.state.numero_identificacion}
                                            disabled={this.props.item}
                                            onChange={event => {
                                                if (this.state.tipo_identificacion === '04') {
                                                    if (event.target.value.length <= 13) {
                                                        this.setState({ numero_identificacion: event.target.value })
                                                    }
                                                }
                                                if (this.state.tipo_identificacion === '05') {
                                                    if (event.target.value.length <= 10) {
                                                        this.setState({ numero_identificacion: event.target.value })
                                                    }
                                                }
                                                setTimeout(() => {
                                                    this.comprobarCedula(this.state.numero_identificacion)
                                                    if (!this.props.item) {
                                                        this.comprobarCedulaRegistrada(this.state.numero_identificacion)
                                                    }
                                                }, 100)

                                            }}
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
                                            error={this.state.direccion.length === 0}
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

                                        <TextField
                                            style={styles.styleText}
                                            id="standard-celular-cliente"
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


                                        {
                                            this.state.empresa === true &&
                                            <>
                                                <TextField
                                                    id="filled-telefono-cliente"
                                                    label="Telefono"
                                                    required
                                                    error={this.state.telefono.length === 0}
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
                                                    id="filled-telefono-cliente"
                                                    label="Telefono"
                                                    required
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