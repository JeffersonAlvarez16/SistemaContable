import React, { Component } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

class AnadirVencimiento extends React.Component {

    state = {
        fecha_vencimiento: ''
    }

    componentDidMount() {
        if (this.props.producto) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var db = firebase.database();
                    var productosRef = db.ref('users/' + user.uid + '/productos/' + this.props.producto.codigo + '/fecha_vencimiento');
                    productosRef.on('value', (snapshot) => {
                        if (snapshot.val()) {
                            this.setState({
                                fecha_vencimiento: snapshot.val()
                            })
                        }
                    })
                }
            })
        }
    }

    handleAnadirVencimiento = () => {
        var db = firebase.database();
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/productos/' + this.props.producto.codigo);
        productosRef.update({
            fecha_vencimiento: this.state.fecha_vencimiento
        });
        this.props.handleClose()
    }

    render() {
        return (
            <div>
                <DialogTitle id="alert-dialog-title">{"Añadir nueva fecha de vencimiento"}</DialogTitle>

                <DialogContent>
                    <TextField
                        id="date-fecha-vencimiento"
                        label="Fecha de vencimiento"
                        type="date"
                        //defaultValue={`${new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear()}`}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => this.setState({ fecha_vencimiento: event.target.value })}
                        value={this.state.fecha_vencimiento}
                        margin="normal"
                        variant="filled"
                        style={{ width: '100%' }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary" >
                        Cancelar
                </Button>
                    <Button onClick={this.handleAnadirVencimiento} color="primary" >
                        Añadir vencimiento
                </Button>
                </DialogActions>
            </div>
        );
    }
}

export default AnadirVencimiento;