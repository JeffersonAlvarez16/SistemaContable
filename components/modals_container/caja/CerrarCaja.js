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
        sumaTotalVentas: 0,
        observacion: '',

        estadoCaja: null,
        codigoReferencia: null,
        textoSaldoFinal:''
    }

    componentDidMount() {
        const { cajaSeleccionada,sumaTotalVentas } = this.props
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                /*  var db = firebase.database();
                 var productosRef = db.ref('users/' + user.uid + '/caja/cajas_normales/').orderByChild('order').limitToLast(1) */
                if (cajaSeleccionada != null) {
                    /*  productosRef.on('value', (snapshot) => { */
                    /*  if (snapshot.val()) { */
                    this.setState({
                        estadoCaja: cajaSeleccionada.estado,
                        codigoReferencia: cajaSeleccionada.codigo,
                        saldo_inicial: cajaSeleccionada.saldo_inicial,
                        sumaTotalVentas: sumaTotalVentas
                    })
                    /*  } */
                    /*  }) */
                }
            }
        })
    }

    componentWillReceiveProps(props) {
        const { cajaSeleccionada,sumaTotalVentas } = props
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                /*  var db = firebase.database();
                 var productosRef = db.ref('users/' + user.uid + '/caja/cajas_normales/').orderByChild('order').limitToLast(1) */
                if (cajaSeleccionada != null) {
                    /*  productosRef.on('value', (snapshot) => { */
                    /*  if (snapshot.val()) { */
                    this.setState({
                        estadoCaja: cajaSeleccionada.estado,
                        codigoReferencia: cajaSeleccionada.codigo,
                        saldo_inicial: cajaSeleccionada.saldo_inicial,
                        sumaTotalVentas: sumaTotalVentas
                    })
                    /*  } */
                    /*  }) */
                }
            }
        })
    }

    totalDelSistema=()=>{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var cajaUsuarioRef = db.ref('users/' + user.uid + '/caja/cajas_normales/' + codigoReferencia)
                cajaUsuarioRef.update({
                    saldo_final: saldoFinal,
                    ventas: [],
                    observacion,
                    fecha_cerrar: `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
                    hora_cerrrar: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
                    estado: false,
                    usuario_cerrar: usuario.code
                })
                setTimeout(() => { handleClose() }, 100)
            }
        })
    }

    cerrarCaja = () => {
        const { usuario, handleClose } = this.props
        const { codigoReferencia, saldoFinal, observacion } = this.state
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var cajaUsuarioRef = db.ref('users/' + user.uid + '/caja/cajas_normales/' + codigoReferencia)
                cajaUsuarioRef.update({
                    saldo_final: saldoFinal,
                    observacion,
                    fecha_cerrar: `${new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear()}`,
                    hora_cerrrar: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
                    estado: false,
                    usuario_cerrar: usuario.code
                })
                setTimeout(() => { handleClose() }, 100)
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
                            marginRight: 10
                        }}
                    />
                    <TextField
                        id="outlined-number-saldo-final"
                        label="Saldo final"
                        value={this.state.saldoFinal}
                        helperText={this.state.textoSaldoFinal}
                        onChange={e => {
                            this.setState({ saldoFinal: e.target.value })
                            setTimeout(()=>{
                                if(Number(this.state.saldoFinal) >= Number(this.state.saldo_inicial)){
                                    this.setState({
                                        textoSaldoFinal:''
                                    })
                                }else{
                                    this.setState({
                                        textoSaldoFinal:'Este valor es menor que el Saldo inicial'
                                    })
                                }
                            },100)

                        }}
                        autoComplete='off'
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <TextField
                    id="outlined-number-total-sisitema"
                    label="Total del sistema"
                    disabled
                    value={this.state.sumaTotalVentas}
                    onChange={e => this.setState({ sumaTotalVentas: e.target.value })}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-number-obervacion"
                    label="Observación"
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