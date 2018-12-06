import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography, TextField } from '@material-ui/core';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import setSnackBars from '../../plugins/setSnackBars';

class ModalFinalizaPago extends React.Component {
    state = {
        medio: '',
        total: '',
        propiedades_numero: '',
        propiedades_banco: '',

        fecha_vencimiento: `${new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()}`,
        monto: '',

        valor_acreditado:''
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var empresaRef = db.ref('users/' + user.uid + "/configuracion/dias_a_pagar_defecto")
                empresaRef.on('value', (snap) => {
                    if (snap.val()) {
                        Date.prototype.addDays = function (days) {
                            var date = new Date(this.valueOf())
                            date.setDate(date.getDate() + days)
                            var dayDate = date.getDate()
                            var mes = date.getMonth() + 1
                            if (dayDate.toString().length === 1) {
                                dayDate = '0' + dayDate
                            }
                            if (mes.toString().length === 1) {
                                mes = '0' + mes
                            }
                            return `${date.getFullYear()}-${mes}-${dayDate}`;
                        }
                        var date = new Date();
                        this.setState({
                            fecha_vencimiento: date.addDays(Number(snap.val().dias))
                        })
                    }
                })
            }
        })
    }


    comprobarTextLlenos = () => {
        if (
            this.state.propiedades_banco.length > 0 &&
            this.state.propiedades_numero.length > 0
        ) {
            return true
        } else {
            return false
        }

    }

    finalizarPago = () => {
        switch (this.props.tipo_pago) {
            case 'efectivo': {
                this.props.handleAceptar({ tipo_pago: 'efectivo' })
                break
            }
            case 'credito': {
                this.props.handleAceptar({
                    tipo_pago: 'credito',
                    fecha_vencimiento: this.state.fecha_vencimiento,
                    monto: this.props.total,
                    valor_acreditado: this.state.valor_acreditado
                })
                break
            }
            case 'tarjeta-credito': {
                if (this.comprobarTextLlenos()) {
                    this.props.handleAceptar({
                        tipo_pago: 'tarjeta-credito',
                        medio: 'Tarjeta de crédito',
                        total: this.props.total,
                        propiedades_numero: this.state.propiedades_numero,
                        propiedades_banco: this.state.propiedades_banco,
                    })
                }
                break
            }
            case 'tarjeta-debito': {
                if (this.comprobarTextLlenos()) {
                    this.props.handleAceptar({
                        tipo_pago: 'tarjeta-debito',
                        medio: 'Tarjeta de débito',
                        total: this.props.total,
                        propiedades_numero: this.state.propiedades_numero,
                        propiedades_banco: this.state.propiedades_banco,
                    })
                }
                break
            }
            case 'cheque': {
                if (this.comprobarTextLlenos()) {
                    this.props.handleAceptar({
                        tipo_pago: 'cheque',
                        medio: 'Cheque',
                        total: this.props.total,
                        propiedades_numero: this.state.propiedades_numero,
                        propiedades_banco: this.state.propiedades_banco,
                    })
                }
                break
            }
            case 'transferencia': {
                this.props.handleAceptar({ tipo_pago: 'transferencia' })
                break
            }
            default: {
                break
            }
        }
    }

    render() {

        return (
            <div>
                <div id='rootSnackBarModalFinalizar'></div>
                {
                    this.props.tipo_pago === 'efectivo' &&
                    <DialogTitle >{`Pago en efectivo`}</DialogTitle>
                }
                {
                    this.props.tipo_pago === 'credito' &&
                    <DialogTitle >{`Pago a crédito`}</DialogTitle>
                }
                {
                    this.props.tipo_pago === 'tarjeta-credito' &&
                    <DialogTitle >{`Pago con tarjeta de crédito`}</DialogTitle>
                }
                {
                    this.props.tipo_pago === 'tarjeta-debito' &&
                    <DialogTitle >{`Pago con tarjeta de débito`}</DialogTitle>
                }
                {
                    this.props.tipo_pago === 'cheque' &&
                    <DialogTitle >{`Pago con cheque`}</DialogTitle>
                }
                {
                    this.props.tipo_pago === 'transferencia' &&
                    <DialogTitle >{`Pago con transferencia bancaria`}</DialogTitle>
                }
                <DialogContent>
                    <Typography variant="title" gutterBottom>
                        {`Total: ${this.props.total}`}
                    </Typography>
                    {
                        this.props.tipo_pago === 'efectivo' &&
                        <></>
                    }
                    {
                        this.props.tipo_pago === 'credito' &&
                        <>
                            <TextField
                                id="filled-acreditoa-venta"
                                label="Valor acreditado"
                                value={this.state.valor_acreditado}
                                onChange={event => this.setState({
                                    valor_acreditado: event.target.value
                                })}
                                margin="normal"
                                variant="outlined"
                                style={{ width: '100%' }}
                            >
                            </TextField>
                            <TextField
                                id="filled-fecha-venta"
                                label="Fecha de pago"
                                type="date"
                                error={this.state.fecha_vencimiento.length > 0 ? false : true}
                                value={this.state.fecha_vencimiento}
                                onChange={event => this.setState({
                                    fecha_vencimiento: event.target.value
                                })}
                                margin="normal"
                                variant="outlined"
                                style={{ width: '100%' }}
                            >
                            </TextField>
                        </>
                    }
                    {
                        this.props.tipo_pago === 'tarjeta-credito' &&
                        <>
                            <TextField
                                id="filled-fecha-venta"
                                helperText={this.state.propiedades_numero.length > 0 ? '' : 'Complete este campo'}
                                label="Numero de la tarjeta de crédito"
                                error={this.state.propiedades_numero.length > 0 ? false : true}
                                value={this.state.propiedades_numero}
                                onChange={event => this.setState({
                                    propiedades_numero: event.target.value
                                })}
                                margin="normal"
                                variant="outlined"
                                style={{ width: '100%' }}
                                autoComplete='off'
                            >
                            </TextField>
                            <TextField
                                id="filled-fecha-venta"
                                helperText={this.state.propiedades_banco.length > 0 ? '' : 'Complete este campo'}
                                label="Banco"
                                error={this.state.propiedades_banco.length > 0 ? false : true}
                                value={this.state.propiedades_banco}
                                onChange={event => this.setState({
                                    propiedades_banco: event.target.value
                                })}
                                margin="normal"
                                variant="outlined"
                                style={{ width: '100%' }}
                                autoComplete='off'
                            >
                            </TextField>
                        </>
                    }
                    {
                        this.props.tipo_pago === 'tarjeta-debito' &&
                        <>
                            <TextField
                                id="filled-fecha-venta"
                                helperText={this.state.propiedades_numero.length > 0 ? '' : 'Complete este campo'}
                                label="Numero de la tarjeta de débito"
                                error={this.state.propiedades_numero.length > 0 ? false : true}
                                value={this.state.propiedades_numero}
                                onChange={event => this.setState({
                                    propiedades_numero: event.target.value
                                })}
                                margin="normal"
                                variant="outlined"
                                style={{ width: '100%' }}
                                autoComplete='off'
                            >
                            </TextField>
                            <TextField
                                id="filled-fecha-venta"
                                label="Banco"
                                helperText={this.state.propiedades_banco.length > 0 ? '' : 'Complete este campo'}
                                error={this.state.propiedades_banco.length > 0 ? false : true}
                                value={this.state.propiedades_banco}
                                onChange={event => this.setState({
                                    propiedades_banco: event.target.value
                                })}
                                margin="normal"
                                variant="outlined"
                                style={{ width: '100%' }}
                                autoComplete='off'
                            >
                            </TextField>
                        </>
                    }
                    {
                        this.props.tipo_pago === 'cheque' &&
                        <>
                            <TextField
                                id="filled-fecha-venta"
                                helperText={this.state.propiedades_numero.length > 0 ? '' : 'Complete este campo'}
                                label="Numero de cheque"
                                error={this.state.propiedades_numero.length > 0 ? false : true}
                                value={this.state.propiedades_numero}
                                onChange={event => this.setState({
                                    propiedades_numero: event.target.value
                                })}
                                margin="normal"
                                variant="outlined"
                                style={{ width: '100%' }}
                                autoComplete='off'
                            >
                            </TextField>
                            <TextField
                                id="filled-fecha-venta"
                                helperText={this.state.propiedades_banco.length > 0 ? '' : 'Complete este campo'}
                                label="Banco"
                                error={this.state.propiedades_banco.length > 0 ? false : true}
                                value={this.state.propiedades_banco}
                                onChange={event => this.setState({
                                    propiedades_banco: event.target.value
                                })}
                                margin="normal"
                                variant="outlined"
                                style={{ width: '100%' }}
                                autoComplete='off'
                            >
                            </TextField>
                        </>
                    }
                    {
                        this.props.tipo_pago === 'transferencia' &&
                        <></>
                    }
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => this.finalizarPago()} color="primary" >
                        Aceptar
                </Button>
                    <Button onClick={() => this.props.handleClose()} color="primary" >
                        Cancelar
                </Button>
                </DialogActions>
            </div>
        );

    }
}

export default ModalFinalizaPago