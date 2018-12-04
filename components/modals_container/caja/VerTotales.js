import React, { Component } from 'react';
import { Toolbar, AppBar, IconButton, Typography, Divider, Grid, Chip, FormLabel, Paper } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import TablaNormal from '../../components/tables/TableNormal';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import funtions from '../../../utils/funtions';


class VerTotales extends Component {

    state = {

        listaVentasCaja: [],
        estadoTabla: 'cargando',
        listaVentasCajaTemporal: [],
        rowsVentasCaja: [
            { id: 'cliente', numeric: false, disablePadding: true, label: 'Cliente' },
            { id: 'subtotal', numeric: true, disablePadding: false, label: 'Subtotal' },
            { id: 'total', numeric: true, disablePadding: false, label: 'Valor Total' },
        ],
        itemsSeleccionados: [],
        //usuario
        usuario: '',
        /////////////////////////
        dineroIngresado: 0,
        saldoAcreditado: 0,
        dineroRetirado: 0,
        compraProductos: 0,
        compraDevueltas: 0,
        //sumaTotalVentas array
        sumaTotalVentas: 0.00,
        sumaTotalIngresos: 0.00,
        sumaTotalEgresos: 0.00,
        saldoFinal: 0

    }

    componentDidMount() {
        this.cargarVentas()
        this.sumaTotalVentas()
        this.sumaTotalIngreso()
        this.sumaTotalEgresos()
        this.saldoFinal()
    }

    sumaTotalVentas = () => {
        if (Object.keys(this.props.sumaTotalVentas).length != 0) {
            var suma = suma + this.props.sumaTotalVentas[0].sumaEfectivo
            this.setState({
                sumaTotalVentas: +this.props.sumaTotalVentas[0].sumaEfectivo
            })
        }
    }

    sumaTotalIngreso = () => {
        if (Object.keys(this.props.sumaTotalDineroIngresado).length != 0) {
            this.setState({
                dineroIngresado: this.props.sumaTotalDineroIngresado[0].suma
            })
        } else {
            this.setState({
                dineroIngresado: 0
            })
        }
        setTimeout(() => {
            this.setState({
                sumaTotalIngresos: Number(this.state.dineroIngresado)+Number(this.state.sumaTotalVentas)
            })
        }, 50)
    }

    sumaTotalEgresos = () => {
        if (Object.keys(this.props.sumaTotalComprasProductos).length != 0) {
            this.setState({
                compraProductos: this.props.sumaTotalComprasProductos[0].suma
            })
        } else {
            this.setState({
                compraProductos: 0
            })
        }
        if (Object.keys(this.props.sumaTotalDineroRetirado).length != 0) {
            this.setState({
                dineroRetirado: this.props.sumaTotalDineroRetirado[0].suma
            })
        } else {
            this.setState({
                dineroRetirado: 0
            })
        }
        if (Object.keys(this.props.sumaTotalVentasDevueltas).length != 0) {
            this.setState({
                compraDevueltas: this.props.sumaTotalVentasDevueltas[0].sumaEfectivo
            })
        } else {
            this.setState({
                compraDevueltas: 0
            })
        }
        setTimeout(() => {
            this.setState({
                sumaTotalEgresos: Number(this.state.compraDevueltas) + Number(this.state.compraProductos) + Number(this.state.dineroRetirado)
            })
        }, 10)
    }

    saldoFinal = () => {
        setTimeout(() => {
            this.setState({
                saldoFinal: Number(this.state.sumaTotalVentas) + Number(this.state.dineroIngresado) + Number(this.props.cajaSelecionada.saldo_inicial) - Number(this.state.sumaTotalEgresos)
            })
        }, 100)
    }

    cargarVentas = () => {
        if (this.props.cajaSelecionada.ventas != null) {
            var item = null
            var ventas = Object.values(this.props.cajaSelecionada.ventas)
            this.setState({
                listaVentasCaja: ventas,
                estadoTabla: 'llena'
            })
        } else {
            this.setState({
                listaVentasCaja: [],
                estadoTabla: 'vacia'
            })
        }

    }

    handleGetData = (n, item) => {
        if (item.id === 'cliente') {
            return n.cliente.nombre
        }
        if (item.id === 'subtotal') {
            return n.subtotal
        }
        if (item.id === 'total') {
            return <div style={{ marginLeft: 25 }}>{n.total}</div>
        }
    }
    render() {
        return (
            <div style={{ width: 600, maxHeight: 650 }}>
                <AppBar style={{
                    position: 'relative',
                }}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" style={{ flex: 1, marginLeft: 30 }}>
                            Detalles Caja
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid item xs={12} style={{ margin: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Grid item xs={6}>
                            <Typography variant="headline" gutterBottom>
                                Ingresos
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="headline" gutterBottom>
                                Egresos
                            </Typography>
                        </Grid>
                    </div>
                </Grid>
                <Divider />
                <Grid item xs={12} style={{ margin: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Grid item xs={6}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Grid item xs={7}>
                                    <Typography style={{ fontSize: 17 }}>
                                        Total de Ventas
                                    </Typography>
                                    <br />
                                    <Typography style={{ fontSize: 17 }}>
                                        Dinero Ingresado
                                        </Typography>
                                    <br />
                                    <Typography style={{ fontSize: 17 }}>
                                        Saldos Acreditados
                                        </Typography>

                                </Grid>
                                <Grid item xs={5}>
                                    <Typography style={{ fontSize: 17 }}>
                                    <strong> {(this.state.sumaTotalVentas.toFixed(2))}</strong>
                                    </Typography>
                                    <br />
                                    <Typography style={{ fontSize: 17 }}>
                                    {
                                            Object.keys(this.props.sumaTotalDineroIngresado).length != 0 ?
                                                <strong>{this.props.sumaTotalDineroIngresado[0].suma}</strong>
                                                :
                                                <strong>0.00</strong>
                                        }
                                    </Typography>
                                    <br />
                                    <Typography style={{ fontSize: 17 }}>
                                    <strong>0.00</strong>
                                    </Typography>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Grid item xs={7}>
                                    <Typography style={{ fontSize: 17 }}>
                                        Dinero Retirado
                                        </Typography>
                                    <br />
                                    <Typography style={{ fontSize: 17 }}>
                                        Compra Productos
                                        </Typography>
                                    <br />
                                    <Typography style={{ fontSize: 17 }}>
                                        Compras Devueltas
                                        </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography style={{ fontSize: 17 }}>
                                        {
                                            Object.keys(this.props.sumaTotalDineroRetirado).length != 0 ?
                                                <strong>{this.props.sumaTotalDineroRetirado[0].suma}</strong>
                                                :
                                                <strong>0.00</strong>
                                        }
                                    </Typography>
                                    <br />
                                    <Typography style={{ fontSize: 17 }}>
                                        {
                                            Object.keys(this.props.sumaTotalComprasProductos).length != 0 ?
                                                <strong>{this.props.sumaTotalComprasProductos[0].suma}</strong>
                                                :
                                                <strong>0.00</strong>
                                        }
                                    </Typography>
                                    <br />
                                    <Typography style={{ fontSize: 17 }}>
                                        {
                                            Object.keys(this.props.sumaTotalVentasDevueltas).length != 0 ?
                                                <strong>{this.props.sumaTotalVentasDevueltas[0].sumaEfectivo}</strong>
                                                :
                                                <strong>0.00</strong>
                                        }
                                    </Typography>
                                </Grid>
                            </div>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} style={{ margin: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Grid item xs={6}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Grid item xs={7}>
                                    <Typography style={{ fontSize: 17 }}>
                                        <strong>Total Ingresos</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography style={{ fontSize: 17 }}>
                                        <strong>{(this.state.sumaTotalIngresos).toFixed(2)}</strong>
                                    </Typography>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>

                                <Grid item xs={7}>
                                    <Typography style={{ fontSize: 17 }}>
                                        <strong>Total Egresos</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography style={{ fontSize: 17 }}>
                                        <strong>{(this.state.sumaTotalEgresos).toFixed(2)}</strong>
                                    </Typography>
                                </Grid>
                            </div>
                        </Grid>
                    </div>
                </Grid>
                <Divider />
                <Grid item xs={12} style={{ margin: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Grid item xs={6}>

                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ display: 'flex', flexDirection: 'row', }}>

                                <Grid item xs={7}>
                                    <Typography variant="title" gutterBottom>
                                        <strong>Saldo Final</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography variant="title" gutterBottom>
                                        <strong>{(this.state.saldoFinal).toFixed(2)}</strong>
                                    </Typography>
                                </Grid>
                            </div>
                        </Grid>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default VerTotales;