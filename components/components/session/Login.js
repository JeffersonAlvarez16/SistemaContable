import 'firebase/auth'

import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import firebase from 'firebase/app'
import setSnackBars from '../../plugins/setSnackBars'

// firebase




class Login extends Component {

    state = {
        password: '',
        usuario: '',
        statePassword: 'normal',
        stateUsuario: 'normal',
        showPassword: false,

        loading: false,
        success: false,
    };

    handleChangePassword = event => {
        if (event.target.value.length === 0) {
            this.setState({ statePassword: 'error' })
        } else {
            this.setState({ statePassword: 'normal' })
        }
        this.setState({ password: event.target.value })
    }

    handleChangeUsuario = (event) => {
        if (event.target.value.length === 0) {
            this.setState({ stateUsuario: 'error' })
        } else {
            this.setState({ stateUsuario: 'normal' })
        }
        this.setState({ usuario: event.target.value })
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }))
    }

    handleSetInitSession = () => {
        if (this.state.usuario.length === 0) {
            this.setState({
                stateUsuario: 'error'
            })
        }
        if (this.state.password.length === 0) {
            this.setState({
                statePassword: 'error'
            })
        }
        if (this.state.usuario.length > 0 &&
            this.state.password.length > 0) {
            this.setState({
                success: false,
                loading: true,
            })
            firebase.auth().signInWithEmailAndPassword(
                this.state.usuario,
                this.state.password).catch((error) => {
                    var errorCode = error.code;
                    if (errorCode === 'auth/invalid-email') {
                        setSnackBars.openSnack('error', 'rootSnackBar',
                            'Formato de correo electrónico erroneo', 2000)
                    }
                    if (errorCode === 'auth/user-not-found') {
                        setSnackBars.openSnack('error', 'rootSnackBar',
                            'Usuario no registrado', 2000)
                    }
                    if (errorCode === 'auth/wrong-password') {
                        setSnackBars.openSnack('error', 'rootSnackBar',
                            'Contraseña erronea', 2000)
                    }
                    this.setState({
                        loading: false,
                        success: true,
                    });
                });
        }

    }

    _onKeyPress = (event) => {
        if (event.charCode === 13) { // enter key pressed
            event.preventDefault();
            this.handleSetInitSession()
        }
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100vh'
            }}>

                <div id='rootSnackBar'></div>
                <Paper
                    elevation={5}
                    style={{
                        minWidth: 300,
                        padding: 30,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="display2" component="h1" style={{
                        marginTop: 20,
                        textAlign: 'center',
                        color: 'black'
                    }}>
                        ServiFac
                    </Typography>
                    <Typography variant="headline" component="h1" style={{
                        textAlign: 'center',
                        color: 'gray',
                        fontSize: 15,
                        marginBottom: 20,
                        marginTop: 18
                    }}>
                        Ingresa al sistema
                    </Typography>
                    <form
                        noValidate
                        autoComplete="off"
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <TextField
                            error={this.state.stateUsuario === 'normal' ? false : true}
                            id="user"
                            type='text'
                            value={this.state.usuario}
                            onChange={this.handleChangeUsuario}
                            label="Correo Electronico"
                            margin="normal"
                            onFocus={() => {
                                this.state.usuario.length === 0 &&
                                    this.setState({ stateUsuario: 'error' })
                            }}
                            style={{
                                marginTop: 10,
                                marginBottom: 20
                            }}
                        />
                        <FormControl
                            style={{
                                marginBottom: 20
                            }}
                        >
                            <InputLabel error={this.state.statePassword === 'normal' ? false : true} htmlFor="adornment-password">Contraseña</InputLabel>
                            <Input
                                id="adornment-password"
                                label="Nombre de usuario"
                                error={this.state.statePassword === 'normal' ? false : true}
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChangePassword}
                                onFocus={() => {
                                    this.state.password.length === 0 &&
                                        this.setState({ statePassword: 'error' })
                                }}
                                onKeyPress={this._onKeyPress}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                        >
                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </form>

                    <div style={{
                        marginLeft: 20,
                        marginRight: 20,
                        position: 'relative',
                    }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                marginTop: 20,
                                marginBottom: 10,
                                width: '100%'
                            }}
                            disabled={this.state.stateUsuario === 'normal' && this.state.statePassword === 'normal' ? this.state.loading : true}
                            onClick={this.handleSetInitSession}
                        >
                            Iniciar sesion
                        </Button>
                        {
                            this.state.loading &&
                            <CircularProgress size={24}
                                style={{
                                    color: 'primary',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: -8,
                                    marginLeft: -12,
                                }}
                            />
                        }
                    </div>

                    <Button size="small" color="primary" style={{
                        marginBottom: 0
                    }}
                        onClick={() => setSnackBars.openSnack('info', 'rootSnackBar', 'Por favor comuniquese con soporte', 2000)}
                    >
                        No recuerdo mi contraseña
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color="default"
                        style={{
                            marginTop: 20,
                            marginBottom: 20
                        }}
                        onClick={() => { location.href='https://puntoventa.facbtaapps.now.sh' }
                        }
                    >
                        Punto de venta
            </Button>
                </Paper>
            </div>
        )
    }
}

export default Login