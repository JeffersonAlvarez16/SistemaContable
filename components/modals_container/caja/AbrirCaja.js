import React, { Component } from 'react';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import funtions from '../../../utils/funtions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AbrirCaja extends Component {

    state = {
        saldo_inicial: 0,
        estadoCaja: null,
    }

    componentDidMount() {
        const { usuario } = this.props
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/caja/cajas_normales' + usuario.code).orderByChild('order').limitToLast(1)
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        const caja = funtions.snapshotToArray(snapshot)[0]
                        this.setState({
                            estadoCaja: caja.estado
                        })
                    }
                })
            }
        })
    }

    abrirCaja = () => {
        const { usuario } = this.props
        const { saldo_inicial } = this.state
        const codigo = funtions.guidGenerator()
        const order = new Date()
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var cajaUsuarioRef = db.ref('users/' + user.uid + '/caja/cajas_normales/' + codigo)
                var cajaUsuarioAbiertaRef = db.ref('users/' + user.uid + '/caja/cajas_abiertas_usuario/' + codigo)
                var item = {
                    codigo: codigo,
                    saldo_inicial: saldo_inicial,
                    saldo_final: '0',
                    usuario: usuario.code,
                    observacion: '',
                    ventas: [],
                    fecha_abrir: funtions.obtenerFechaActual(),
                    hora_abrir: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
                    fecha_cerrar: '',
                    hora_cerrrar: '',
                    estado: true,
                    usuario_cerrar: '',
                    order: '' + order,
                    valor_caja: saldo_inicial,
                }
                cajaUsuarioRef.set(item)
                cajaUsuarioAbiertaRef.set(item)                
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
                    Abrir Caja
                </Typography>
                <TextField
                    id="outlined-number-caja"
                    label="Saldo inicial"
                    value={this.state.saldo_inicial}
                    onChange={e => this.setState({ saldo_inicial: e.target.value })}
                    margin="normal"
                    variant="outlined"
                />
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Button disabled={this.state.estadoCaja} color="primary" variant="contained" onClick={() => {
                        this.abrirCaja()
                        this.props.handleClose()
                    }}>
                        Abrir Caja
                    </Button>
                    <Button color="primary" onClick={() =>
                        this.props.handleClose()
                    }>
                        Cancelar
                    </Button>
                </div>

            </div >
        );
    }
}

export default AbrirCaja;