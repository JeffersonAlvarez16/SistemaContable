import React, { Component } from 'react';
import { Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import TablaNormal from '../../components/tables/TableNormal';

class VerTotales extends Component {

    state = {

        listaVentasCaja: [],
        estadoTabla: 'cargando',
        listaVentasCajaTemporal: [],
        rowsVentasCaja: [
            { id: 'cantidad', numeric: false, disablePadding: true, label: 'Cantidad' },
            { id: 'descripcion', numeric: true, disablePadding: false, label: 'Descripcion' },
            { id: 'valor_total', numeric: true, disablePadding: false, label: 'Valor Total' },
        ],
        itemsSeleccionados: [],
        //usuario
        usuario: '',

        //sumaTotalVentas array
        sumaTotalVentas: [],

    }

    componentDidMount(){
        console.log(this.props.cajaSelecionada)
    }

   /*  handleGetData = (n, item) => {
        if (item.id === 'cantidad') {
            return n.
        }
        if (item.id === 'codigo') {
            return n.codigo
        }
    } */
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
               {/*  <TablaNormal
                    textoTitleP="Ventas Totales"
                    textoTitleS="Ventas Totales"
                    selectedItems={true}
                    toolbar={false}
                    notTab={true}
                    data={this.state.listaVentasCaja}
                    rows={this.state.rowsVentasCaja}
                    handleGetData={this.handleGetData}
                    estadoTabla={this.state.estadoTabla}
                    itemsSeleccionados={items => this.setState({ itemsSeleccionados: items })}
                /> */}
            </div>
        );
    }
}

export default VerTotales;