import React, { Component } from 'react';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import funtions from '../../../utils/funtions';
import { Divider } from '@material-ui/core';

class RetirarDineroCaja extends Component {

    state = {
        saldoAgregado: '',
        observacion: ''
    }


    retirarDinero = () => {
        const { usuario, handleClose, caja } = this.props
        const { saldoAgregado, observacion } = this.state
        const codigo = funtions.guidGenerator()
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var cajaUsuarioRef = db.ref('users/' + user.uid + '/caja/cajas_normales/' + caja.codigo + '/retiro_dinero/' + codigo)
                var operacionGastos = db.ref('users/' + firebase.auth().currentUser.uid + '/gastos/'+codigo)               
                operacionGastos.set({
                    fecha: funtions.obtenerFechaActual(),
                    usuario: usuario.code,
                    observacion,
                    total_final: saldoAgregado,
                })
                cajaUsuarioRef.update({
                    valor: saldoAgregado,
                    observacion,
                    fecha: funtions.obtenerFechaActual(),
                    hora: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
                    estado: false,
                    usuario: usuario.code
                })

                var cajaRefValorActual = db.ref('users/' + user.uid + '/caja/cajas_normales/' + caja.codigo)
                cajaRefValorActual.once('value', (snap) => {
                    if (snap.val()) {
                        cajaRefValorActual.update({
                            valor_caja: Number( Number(snap.val().valor_caja)-Number(saldoAgregado) ).toFixed(2)
                        })

                    }
                })
            }
        })
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography
                    variant="title"
                    gutterBottom
                    style={{ marginTop: 16, marginLeft: 16, marginRight: 16 }}
                >
                    Retirar dinero a caja
                </Typography>
                <Divider />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <TextField
                        id="outlined-number-valor-agregado-caja"
                        label="Valor $"
                        error={this.state.saldoAgregado.length > 0 ? false : true}
                        value={this.state.saldoAgregado}
                        onChange={e => this.setState({ saldoAgregado: e.target.value })}
                        margin="normal"
                        style={{ marginLeft: 16, marginRight: 16 }}
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-number-valor-observacion"
                        label="Observacion"
                        value={this.state.observacion}
                        onChange={e => this.setState({ observacion: e.target.value })}
                        margin="normal"
                        variant="outlined"
                        style={{ marginLeft: 16, marginRight: 16, marginTop: 10, marginBottom: 20 }}
                        multiline
                        rows={2}
                    />
                </div>
                <Divider />
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 16,
                    marginRight: 16,
                    marginBottom: 16,
                    marginTop: 16,
                }}>
                    <Button color="primary" variant="contained" onClick={() =>{
                        this.retirarDinero()
                        this.props.handleClose()
                    }}>
                        Retirar
                    </Button>
                    <Button color="primary" onClick={() =>
                        this.props.handleClose()
                    }>
                        Cancelar
                    </Button>
                </div>
            </div>
        );
    }
}

export default RetirarDineroCaja;