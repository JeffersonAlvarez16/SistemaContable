import React, { Component } from 'react';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import funtions from '../../../utils/funtions';

class CerrarCaja extends Component {

    state = {
        saldoFinal: 0,
        saldo_inicial: 0,
        totalSistema: 0,
        observacion: 0,

        estadoCaja: null,
        codigoReferencia: null,
    }

    componentDidMount() {
        const { usuario } = this.props
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/caja/' + usuario.code).orderByChild('order').limitToLast(1)
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        const caja = funtions.snapshotToArray(snapshot)[0]
                        this.setState({
                            estadoCaja: caja.estado,
                            codigoReferencia: caja.codigo,
                            saldo_inicial: caja.saldo_inicial,
                        })
                    }
                })
            }
        })
    }

    cerrarCaja = () => {
        const { usuario } = this.props
        const { codigoReferencia, saldoFinal, observacion } = this.state
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var cajaUsuarioRef = db.ref('users/' + user.uid + '/caja/' + usuario.code + "/" + codigoReferencia)
                cajaUsuarioRef.update({
                    saldo_final: saldoFinal,
                    ventas: [],
                    observacion,
                    fecha_cerrar: `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
                    hora_cerrrar: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
                    estado: false,
                })
            }
        })
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                margin: 16
            }}>

                <Typography variant="title" gutterBottom>
                    Cerrar Caja
                </Typography>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <TextField
                        id="outlined-number-saldo-inicial"
                        label="Saldo Inicial"
                        value={this.state.saldo_inicial}
                        onChange={e => this.setState({ saldo_inicial: e.target.value })}
                        margin="normal"
                        variant="outlined"
                        disabled
                        style={{
                            marginRight:10
                        }}
                    />
                    <TextField
                        id="outlined-number-saldo-final"
                        label="Saldo final"
                        value={this.state.saldoFinal}
                        onChange={e => this.setState({ saldoFinal: e.target.value })}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <TextField
                    id="outlined-number-total-sisitema"
                    label="Total del sistema"
                    disabled
                    value={this.state.totalSistema}
                    onChange={e => this.setState({ totalSistema: e.target.value })}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-number-obervacion"
                    label="Obervación"
                    multiline
                    rows="3"
                    value={this.state.observacion}
                    onChange={e => this.setState({ observacion: e.target.value })}
                    margin="normal"
                    variant="outlined"
                />
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Button disabled={!this.state.estadoCaja} color="primary" variant="contained" onClick={() =>
                        this.cerrarCaja()
                    }>
                        Cerrar Caja
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

export default CerrarCaja;