import React, { Component } from 'react';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AutoCompleteClientes from '../plugins/AutoCompleteClientes';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'


class SectionFactura extends Component {

    state = {
        clienteFacturacion: '',
        clienteSeleccionado: null,

    }

    nuevaVenta = () => {
        this.setState({
            clienteFacturacion: 'h',
            clienteSeleccionado: null,
        })
        this.props.handleDescontar(0)
        this.props.handleDineroResibido(0)
    }

    getClienteDataBase = (codigo) => {
        if (codigo) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    if (this.state.clienteFacturacion.length > 0) {
                        var db = firebase.database();
                        var productosRef = db.ref('users/' + user.uid + "/clientes/" + codigo);
                        productosRef.on('value', (snapshot) => {
                            if (snapshot.val()) {
                                this.setState({
                                    clienteSeleccionado: snapshot.val()
                                })
                            } else {
                                this.setState({
                                    clienteSeleccionado: null
                                })
                            }
                        })
                    }
                }
            })
        }
    }


    render() {

        const styles = {
            textFields: {
                marginRight: 16,
                marginLeft: 16,
                width: '90%'
            },
            styleClientes: {
                width: '100%',
            }
        }

        return (
            <Paper style={{ height: '100%', position: 'fixed' }}>
                <div style={{ display: this.props.tipo_venta === 'final' ? 'none' : 'block' }}>

                    <Typography variant="title" style={{ paddingTop: 16, paddingLeft: 16 }}>
                        {this.state.clienteSeleccionado ? this.state.clienteSeleccionado.nombre : 'Nombre del cliente'}
                    </Typography>
                    <Typography variant="subheading" style={{ paddingTop: 5, paddingLeft: 16 }}>
                        {this.state.clienteSeleccionado ? this.state.clienteSeleccionado.numero_identificacion : 'Identificación'}
                    </Typography>
                    <Typography variant="caption" style={{ paddingTop: 15, paddingLeft: 16 }}>
                        {this.state.clienteSeleccionado ? this.state.clienteSeleccionado.email : 'Email'}
                    </Typography>
                    <Typography variant="caption" style={{ paddingTop: 2, paddingLeft: 16 }}>
                        {this.state.clienteSeleccionado ? `${this.state.clienteSeleccionado.telefono} / ${this.state.clienteSeleccionado.celular}` : 'Teléfono/Celular'}
                    </Typography>

                    <div style={{ paddingLeft: 16, paddingRight: 16 }}>
                        <AutoCompleteClientes
                            id="standard-clientes-select"
                            styleText={styles.styleClientes}
                            nameTextFiel="Cliente"
                            dataRef="clientes"
                            dataRefObject="cliente"
                            itemCategoria={this.state.clienteFacturacion}
                            changueText={itemCode => {
                                this.setState({ clienteFacturacion: itemCode })
                                this.getClienteDataBase(itemCode)
                                this.props.handleCliente(itemCode)
                            }}
                            textItemVacio='Clientes vacios'
                            usuario={this.props.usuario}
                        />
                    </div>

                </div>

                <Divider style={{ marginTop: 15, marginBottom: 15 }} />

                <TextField
                    id="outlined-multiline-static-comentario"
                    label="Descuento"
                    variant="outlined"
                    margin="dense"
                    style={styles.textFields}
                    value={this.props.descuento}
                    onChange={e => {
                        this.props.handleDescontar(e.target.value)
                    }}
                    autoComplete='off'
                />

                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Typography variant="body2" style={{ paddingTop: 5, paddingLeft: 16 }}>
                        SubTotal
                    </Typography>
                    <div style={{ flex: 1 }}></div>
                    <Typography variant="body2" style={{ paddingTop: 5, paddingRight: 16 }}>
                        {Number(this.props.sumaSubTotal).toFixed(2)}
                    </Typography>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Typography variant="body2" style={{ paddingTop: 5, paddingLeft: 16 }}>
                        Iva
                    </Typography>
                    <div style={{ flex: 1 }}></div>
                    <Typography variant="body2" style={{ paddingTop: 5, paddingRight: 16 }}>
                        {Number(this.props.sumaIva).toFixed(2)}
                    </Typography>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Typography variant="body2" style={{ paddingTop: 5, paddingLeft: 16 }}>
                        Total
                    </Typography>
                    <div style={{ flex: 1 }}></div>
                    <Typography variant="body2" style={{ paddingTop: 5, paddingRight: 16 }}>
                        {(Number(this.props.sumaTotal)).toFixed(2)}
                    </Typography>
                </div>

                <TextField
                    id="outlined-multiline-static-comentario"
                    label="Comentario"
                    multiline
                    rows="2"
                    variant="outlined"
                    margin="dense"
                    style={styles.textFields}
                    value={this.props.observacion}
                    onChange={e => {
                        this.props.handleObservacion(e.target.value)
                    }}
                    autoComplete='off'
                />

                <Divider style={{ marginTop: 15, marginBottom: 15 }} />

                <Grid container variant="permanent" spacing={20} style={{ width: '95%' }}>
                    <Grid item xs={6} >
                        <TextField
                            id="outlined-name"
                            label="Dinero resivido"
                            margin="dense"
                            variant="outlined"
                            style={styles.textFields}
                            value={this.props.dinero_resibido}
                            error={this.props.dinero_resibido.length > 0 ? false : true}
                            onChange={e => {
                                this.props.handleDineroResibido(e.target.value)
                            }}
                            autoComplete='off'
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <TextField
                            id="outlined-vuelto"
                            label="Cambio"
                            margin="dense"
                            variant="outlined"
                            style={styles.textFields}
                            autoComplete='off'
                            value={this.props.cambio}
                        />
                    </Grid>
                </Grid>

                <Grid container variant="permanent" spacing={20} style={{ width: '95%', paddingLeft: 16 }}>
                    <div style={{ display: this.props.tipo_venta === 'final' ? 'none' : 'block' }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.props.facturaElectronica}
                                    onChange={() => this.props.handleFacturaElectronica()}
                                />}
                            label="Factura Electrónica"
                        />
                    </div>
                </Grid>

                <Divider style={{ marginTop: 15, marginBottom: 15 }} />

                <Grid container
                    variant="permanent" spacing={20} style={styles.textFields}>
                    <Grid item xs={6} style={{ padding: 5 }}>
                        <Button variant="contained" size="small" color="primary" style={{ width: '100%' }} onClick={this.props.handleFinalizarVenta}>
                            Aceptar
                        </Button>
                    </Grid>
                    <Grid item xs={6} style={{ padding: 5 }}>
                        <Button variant="contained" size="small" color="secondary" style={{ width: '100%' }}>
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>

            </Paper>
        );
    }
}

export default SectionFactura;