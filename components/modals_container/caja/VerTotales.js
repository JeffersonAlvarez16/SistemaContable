import React, { Component } from 'react';
import { Toolbar, AppBar, IconButton, Typography, Divider, Grid, Chip, FormLabel, Paper } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import TablaNormal from '../../components/tables/TableNormal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import funtions from '../../../utils/funtions';
import ContenedorItemDetalles from './ContenedorItemDetalles';


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
        sumaTotalVentas: 0.00,
        sumaTotalDineroIngresado: 0.00,
        sumaTotalDineroRetirado: 0.00,
        sumaTotalVentasDevueltas: 0.00,
        sumaTotalComprasProductos: 0.00,

        sumaTotalAjustesEntradas: 0.00,
        sumaTotalDevolucionesProveedores: 0.00,
        sumaTotalDevolucionesClientes: 0.00,
        sumaTotalAjustesSalidas: 0.00,
        sumaTotalVentasCreditoAcreditado: 0.00,
        sumaTotalCuentasPagadas: 0.00,

    }

    componentDidMount() {
        this.sumaTotalIngresos()
        this.sumaTotalEgresos()
    }

    sumaTotalIngresos = () => {

        if (this.props.cajaSelecionada.saldo_inicial != null) {
            this.setState({
                saldoInicial: Number(this.props.cajaSelecionada.saldo_inicial).toFixed(2)
            })
        } else {
            this.setState({
                saldoInicial: 0.00
            })
        }
        if (this.props.sumaTotalVentas.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0] != null) {
            this.setState({
                sumaTotalVentas: this.props.sumaTotalVentas.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0].sumaEfectivo
            })
        } else {
            this.setState({
                sumaTotalVentas: 0.00
            })
        }

        if (this.props.sumaTotalVentasCreditoAcreditado.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0] != null) {
            this.setState({
                sumaTotalVentasCreditoAcreditado: this.props.sumaTotalVentasCreditoAcreditado.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0].suma
            })
        } else {
            this.setState({
                sumaTotalVentasCreditoAcreditado: 0.00
            })
        }

        if (this.props.sumaTotalCuentasPagadas.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0] != null) {
            this.setState({
                sumaTotalCuentasPagadas: this.props.sumaTotalCuentasPagadas.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0].suma
            })
        } else {
            this.setState({
                sumaTotalCuentasPagadas: 0.00
            })
        }

        if (this.props.sumaTotalDineroIngresado.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0] != null) {
            this.setState({
                sumaTotalDineroIngresado: this.props.sumaTotalDineroIngresado.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0].suma
            })
        } else {
            this.setState({
                sumaTotalDineroIngresado: 0.00
            })
        }

        if (this.props.sumaTotalDevolucionesProveedores.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0] != null) {
            this.setState({
                sumaTotalDevolucionesProveedores: this.props.sumaTotalDevolucionesProveedores.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0].suma
            })
        } else {
            this.setState({
                sumaTotalDevolucionesProveedores: 0.00
            })
        }

        if (this.props.sumaTotalAjustesSalidas.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0] != null) {
            this.setState({
                sumaTotalAjustesSalidas: this.props.sumaTotalAjustesSalidas.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0].suma
            })
        } else {
            this.setState({
                sumaTotalAjustesSalidas: 0.00
            })
        }

        setTimeout(() => {
            this.setState({
                sumaTotalIngresos:
                    Number(this.state.saldoInicial) +
                    Number(this.state.sumaTotalVentas) +
                    Number(this.state.sumaTotalVentasCreditoAcreditado) +
                    Number(this.state.sumaTotalDineroIngresado) +
                    Number(this.state.sumaTotalCuentasPagadas) +
                    Number(this.state.sumaTotalDevolucionesProveedores) +
                    Number(this.state.sumaTotalAjustesSalidas)
            })
        }, 100)
    }

    sumaTotalEgresos = () => {

        if (this.props.sumaTotalVentasDevueltas.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0] != null) {
            this.setState({
                sumaTotalVentasDevueltas: this.props.sumaTotalVentasDevueltas.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0].sumaEfectivo
            })
        } else {
            this.setState({
                sumaTotalVentasDevueltas: 0.00
            })
        }

        if (this.props.sumaTotalDineroRetirado.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0] != null) {
            this.setState({
                sumaTotalDineroRetirado: this.props.sumaTotalDineroRetirado.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0].suma
            })
        } else {
            this.setState({
                sumaTotalDineroRetirado: 0.00
            })
        }

        if (this.props.sumaTotalDevolucionesClientes.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0] != null) {
            this.setState({
                sumaTotalDevolucionesClientes: this.props.sumaTotalDevolucionesClientes.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0].sumaEfectivo
            })
        } else {
            this.setState({
                sumaTotalDevolucionesClientes: 0.00
            })
        }

        if (this.props.sumaTotalComprasProductos.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0] != null) {
            this.setState({
                sumaTotalComprasProductos: this.props.sumaTotalComprasProductos.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0].suma
            })
        } else {
            this.setState({
                sumaTotalComprasProductos: 0.00
            })
        }

        if (this.props.sumaTotalAjustesEntradas.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0] != null) {
            this.setState({
                sumaTotalAjustesEntradas: this.props.sumaTotalAjustesEntradas.filter(it => it.codigo === this.props.cajaSelecionada.codigo)[0].suma
            })
        } else {
            this.setState({
                sumaTotalAjustesEntradas: 0.00
            })
        }

        setTimeout(() => {
            this.setState({
                sumaTotalEgresos:
                    Number(this.state.sumaTotalVentasDevueltas) +
                    Number(this.state.sumaTotalDineroRetirado) +
                    Number(this.state.sumaTotalDevolucionesClientes) +
                    Number(this.state.sumaTotalComprasProductos) +
                    Number(this.state.sumaTotalAjustesEntradas)
            })
        }, 100)
    }

    saldoFinal = () => {
        return Number(Number(this.state.sumaTotalIngresos) - Number(this.state.sumaTotalEgresos)).toFixed(2)
    }

    render() {
        console.log(this.state.sumaTotalDineroRetirado)
        return (
            <div style={{ maxHeight: 650 }}>
                <AppBar style={{
                    position: 'relative'
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
                <Grid container xs={12} spacing={16} style={{ marginTop: 10 }}>
                    <Grid item xs={6} style={{ paddingLeft: 20 }}>
                        <Typography variant="headline" gutterBottom style={{ textAlign: 'center' }}>
                            Ingresos
                        </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ paddingLeft: 10 }}>
                        <Typography variant="headline" gutterBottom style={{ textAlign: 'center' }}>
                            Egresos
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container style={{ display: 'flex', flexDirection: 'row', width: 600, }} spacing={16}>
                    <Grid item xs={6} style={{ paddingLeft: 20 }}>
                        <br />
                        <ContenedorItemDetalles>
                            <Typography style={{ fontSize: 16 }}>
                                Saldo inicial
                                        </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography style={{ fontSize: 16 }}>
                                {
                                    this.state.saldoInicial > 0 ?
                                        <strong>{this.state.saldoInicial}</strong>
                                        :
                                        <strong>0.00</strong>
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                        <br />
                        <ContenedorItemDetalles>
                            <Typography style={{ fontSize: 16 }}>
                                Ventas en efectivo
                                        </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography style={{ fontSize: 16 }}>
                                {
                                    this.state.sumaTotalVentas > 0 ?
                                        <strong>{this.state.sumaTotalVentas}</strong>
                                        :
                                        <strong>0.00</strong>
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                        <br />
                        <ContenedorItemDetalles>
                            <Typography style={{ fontSize: 16 }}>
                                Ventas a credito - dinero acreditado
                                        </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography style={{ fontSize: 16 }}>
                                {
                                    this.state.sumaTotalVentasCreditoAcreditado > 0 ?
                                        <strong>{this.state.sumaTotalVentasCreditoAcreditado}</strong>
                                        :
                                        <strong>0.00</strong>
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                        <br />
                        <ContenedorItemDetalles>
                            <Typography style={{ fontSize: 16 }}>
                                Cuentas por cobrar - cuentas pagadas
                                        </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography style={{ fontSize: 16 }}>
                                {
                                    this.state.sumaTotalCuentasPagadas > 0 ?
                                        <strong>{this.state.sumaTotalCuentasPagadas}</strong>
                                        :
                                        <strong>0.00</strong>
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                        <br />
                        <ContenedorItemDetalles>
                            <Typography style={{ fontSize: 16 }}>
                                Dinero ingresado directamente
                                        </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography style={{ fontSize: 16 }}>
                                {
                                    this.state.sumaTotalDineroIngresado > 0 ?
                                        <strong>{this.state.sumaTotalDineroIngresado}</strong>
                                        :
                                        <strong>0.00</strong>
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                        <br />
                        <ContenedorItemDetalles>
                            <Typography style={{ fontSize: 16 }}>
                                Stock - devoluciones a proveedor
                                        </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography style={{ fontSize: 16 }}>
                                {
                                    this.state.sumaTotalDevolucionesProveedores > 0 ?
                                        <strong>{this.state.sumaTotalDevolucionesProveedores}</strong>
                                        :
                                        <strong>0.00</strong>
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                        <br />
                        <ContenedorItemDetalles>
                            <Typography style={{ fontSize: 16 }}>
                                Stock - ajuste de salida
                                        </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography style={{ fontSize: 16 }}>
                                {
                                    this.state.sumaTotalAjustesSalidas > 0 ?
                                        <strong>{this.state.sumaTotalAjustesSalidas}</strong>
                                        :
                                        <strong>0.00</strong>
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                        <br />
                    </Grid>
                    <Grid item xs={6} style={{ paddingRight: 20 }}>
                        <br />
                        <ContenedorItemDetalles>
                            <Typography style={{ fontSize: 16 }}>
                                Ventas devueltas en efectivo
                                    </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography style={{ fontSize: 16 }}>
                                {
                                    this.state.sumaTotalVentasDevueltas > 0 ?
                                        <strong>{this.state.sumaTotalVentasDevueltas}</strong>
                                        :
                                        <strong>0.00</strong>
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                        <br />
                        <ContenedorItemDetalles>
                            <Typography style={{ fontSize: 16 }}>
                                Stock - dinero retirado
                                        </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography style={{ fontSize: 16 }}>
                                {
                                    this.state.sumaTotalDineroRetirado > 0 ?
                                        <strong>{this.state.sumaTotalDineroRetirado}</strong>
                                        :
                                        <strong>0.00</strong>
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                        <br />
                        <ContenedorItemDetalles>
                            <Typography style={{ fontSize: 16 }}>
                                Stock - devolucion del cliente
                                        </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography style={{ fontSize: 16 }}>
                                {
                                    this.state.sumaTotalDevolucionesClientes > 0 ?
                                        <strong>{this.state.sumaTotalDevolucionesClientesEfectivo}</strong>
                                        :
                                        <strong>0.00</strong>
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                        <br />
                        <ContenedorItemDetalles>
                            <Typography style={{ fontSize: 16 }}>
                                Stock - compra de productos
                                    </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography style={{ fontSize: 16 }}>
                                {
                                    this.state.sumaTotalComprasProductos > 0 ?
                                        <strong>{this.state.sumaTotalComprasProductos}</strong>
                                        :
                                        <strong>0.00</strong>
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                        <br />
                        <ContenedorItemDetalles>
                            <Typography style={{ fontSize: 16 }}>
                                Stock - Ajuste de entrada
                                    </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography style={{ fontSize: 16 }}>
                                {
                                    this.state.sumaTotalAjustesEntradas > 0 ?
                                        <strong>{this.state.sumaTotalAjustesEntradas}</strong>
                                        :
                                        <strong>0.00</strong>
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                        <br />
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={16} style={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid item xs={6} style={{ paddingLeft: 16 }}>
                        <ContenedorItemDetalles>
                            <Typography style={{ fontSize: 16 }}>
                                <strong>Total Ingresos</strong>
                            </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography style={{ fontSize: 16 }}>
                                {
                                    this.state.sumaTotalIngresos > 0 ?
                                        <strong>{Number(this.state.sumaTotalIngresos).toFixed(2)}</strong>
                                        :
                                        <strong>0.00</strong>
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                    </Grid>
                    <Grid item xs={6} style={{ paddingRight: 16 }}>
                        <ContenedorItemDetalles>
                            <Typography style={{ fontSize: 16 }}>
                                <strong>Total Egresos</strong>
                            </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography style={{ fontSize: 16 }}>
                                {
                                    this.state.sumaTotalEgresos > 0 ?
                                        <strong>{Number(this.state.sumaTotalEgresos).toFixed(2)}</strong>
                                        :
                                        <strong>0.00</strong>
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                    </Grid>
                </Grid>
                <br />
                <Divider />
                <br />
                <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={7} >
                        <ContenedorItemDetalles>
                            <Typography variant="title" gutterBottom>
                                <strong>Saldo Final</strong>
                            </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography variant="title" gutterBottom>
                                {
                                    this.saldoFinal()
                                }
                            </Typography>
                        </ContenedorItemDetalles>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default VerTotales;