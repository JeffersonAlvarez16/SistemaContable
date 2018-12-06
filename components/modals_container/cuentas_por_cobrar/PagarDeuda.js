import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import { Chip } from '@material-ui/core';
import colors from '../../../utils/colors';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import funtions from '../../../utils/funtions';

class PagarDeuda extends Component {
    state = {
        valorPagar: '',
        textoValorPagar: ''
    }

    calcularPagoDeuda = () => {
        var total = this.props.valorPendiente()
        if (Number(this.state.valorPagar) > 0) {
            if (Number(this.state.valorPagar) < Number(total)) {
                this.setState({
                    textoValorPagar: 'Este valor se acreditará a su deuda'
                })
            } else if (Number(this.state.valorPagar) === Number(total)) {
                this.setState({
                    textoValorPagar: 'La cuenta se canceladará por completo'
                })
            }
        } else {
            this.setState({
                textoValorPagar: 'El valor es mayor a su deuda pendiente'
            })
        }
    }

    handlePagar = () => {
        var total = this.props.valorPendiente()
        if (Number(this.state.valorPagar) < Number(total)) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var db = firebase.database();
                    var codigo = funtions.guidGenerator()
                    var cajaVentasRef = db.ref('users/' + user.uid + '/cuentas_por_cobrar/cuentas_por_cobrar_basicas/' + this.props.cuentaSeleccionada.cliente.codigo + '/lista_acreditados/' + codigo)
                    cajaVentasRef.set({
                        codigo: codigo,
                        valor: this.state.valorPagar,
                        fecha_registro: funtions.obtenerFechaActual(),
                        hora_registro: funtions.obtenerHoraActual(),
                        estado: true,
                        tipo: 'pago_deuda'
                    })
                    var cajaRefValorAcreditado = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_normales/' + this.props.cajaSeleccionada.codigo + '/lista_dinero_acreditado_venta_credito/' + codigo)
                    cajaRefValorAcreditado.set({
                        codigo: codigo,
                        valor: this.state.valorPagar,
                        fecha_registro: funtions.obtenerFechaActual(),
                        hora_registro: funtions.obtenerHoraActual(),
                        estado: true,
                        tipo: 'pago_deuda'
                    })
                    this.props.handleClose()
                }
            })
        } else if (Number(this.state.valorPagar) === Number(total)) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var db = firebase.database();
                    var codigo = funtions.guidGenerator()
                    var cajaRefCuentaPagada = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_normales/' + this.props.cajaSeleccionada.codigo + '/lista_cuentas_pagadas/' + codigo)
                    var cajaRefCuentaValorTotal = db.ref('users/' + firebase.auth().currentUser.uid + '/caja/cajas_normales/' + this.props.cajaSeleccionada.codigo)
                    cajaRefCuentaValorTotal.once('value', (snap) => {
                        if (snap.val()) {
                            cajaRefCuentaValorTotal.update({
                                valor_caja: (Number(snap.val().valor_caja) + Number(this.state.valorPagar)).toFixed(2)
                            })
                        }
                    })
                    cajaRefCuentaPagada.set({
                        codigo: codigo,
                        valor: this.state.valorPagar,
                        fecha_registro: funtions.obtenerFechaActual(),
                        hora_registro: funtions.obtenerHoraActual(),
                        estado: true,
                        tipo: 'pago_deuda'
                    })
                    var cuentaCobradaRef = db.ref('users/' + firebase.auth().currentUser.uid + '/cuentas_por_cobrar/cuentas_cobradas/' + this.props.cuentaSeleccionada.codigo)
                    cuentaCobradaRef.set(this.props.cuentaSeleccionada)
                    var cuentaPorCobrarRef = db.ref('users/' + firebase.auth().currentUser.uid + '/cuentas_por_cobrar/cuentas_por_cobrar_basicas/' + this.props.cuentaSeleccionada.codigo)
                    cuentaPorCobrarRef.remove()
                    this.props.handleClose()
                }
            })
        }
    }

    render() {
        return (
            <div >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" gutterBottom color='inherit' >
                            Pagar deuda
                        </Typography>
                        <div style={{ flex: 1 }}></div>
                        <IconButton color="inherit" aria-label="Menu" onClick={() => this.props.handleClose()}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div style={{ marginLeft: 16, marginRight: 16, marginBottom: 8, marginTop: 8, flexDirection: 'column', display: 'flex' }}>
                    <Chip
                        label={<div style={{ color: colors.getColorWhite() }}>Deuda Total <strong>{this.props.valorTotal()}</strong></div>}
                        style={{
                            background: colors.getColorPrymary(),
                            marginTop: 8
                        }}
                    />
                    <Chip
                        label={<div style={{ color: colors.getColorWhite() }}>Acreditado <strong>{this.props.valorAcreditado()}</strong></div>}
                        style={{
                            background: colors.getColorPrymary(),
                            marginTop: 8
                        }}
                    />
                    <Chip
                        label={<div style={{ color: colors.getColorWhite() }}>Deuda pendiente <strong>{this.props.valorPendiente()}</strong></div>}
                        style={{
                            background: colors.getColorPrymaryDark(),
                            marginTop: 8
                        }}
                    />
                </div>
                <Divider />
                <div style={{ marginLeft: 16, marginRight: 16, marginBottom: 8, flexDirection: 'column', display: 'flex' }}>
                    <TextField
                        id="standard-valor-a-apagar"
                        label="Valor a pagar"
                        autoComplete='off'
                        helperText={this.state.textoValorPagar}
                        value={this.state.valorPagar}
                        onChange={e => {
                            if (Number(e.target.value) <= Number(this.props.valorPendiente())) {
                                this.setState({ valorPagar: e.target.value })
                            }
                            setTimeout(() => { this.calcularPagoDeuda() }, 100)
                        }}
                        margin="normal"
                        InputProps={{
                            startAdornment: <InputAdornment style={{
                                marginTop: 18
                            }} position="start">$</InputAdornment>,
                        }}
                        variant='filled'
                        autoFocus
                    />
                    <TextField
                        id="standard-valor-a-apagar-descripcion"
                        label="Observacion"
                        autoComplete='off'
                        value={this.state.observacion}
                        onChange={e => this.setState({ observacion: e.target.value })}
                        margin="normal"
                        variant='filled'
                        multiline
                        rows={2}
                    />
                </div>
                <Divider />
                <div style={{ marginLeft: 16, marginTop: 16, marginRight: 16, marginBottom: 16, flexDirection: 'column', display: 'flex' }}>
                    <Button variant="contained" color="primary" disabled={!this.state.valorPagar.length > 0}
                        onClick={this.handlePagar}
                    >
                        Pagar
                    </Button>
                </div>
            </div>
        );
    }
}

export default PagarDeuda; 0