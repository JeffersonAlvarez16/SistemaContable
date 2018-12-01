import React from 'react';
import { Typography, FormControlLabel, Switch, Button, TextField, MenuItem } from '@material-ui/core';
import AutoCompleteCliente from '../AutoCompleteClientes-New';

const ContenedorSeleccionarTipoPrecio = (props) => {
    return (
        <div style={{ flex: 1 }}>
            {
                props.precioSeleccionado != null &&
                <TextField
                    id="standard-select-price-tipe"
                    select
                    label="Precio de venta"
                    value={props.precioSeleccionado.codigo}
                    onChange={(e) => props.handleChangeSeleccion(e.target.value)}
                    margin="normal"
                    variant='filled'
                    style={{ width: '100%' }}
                >
                    {props.precios.map(precio => {
                        if (precio.estado) {
                            return <MenuItem key={precio.codigo} value={precio.codigo}>
                                {/* `%${precio.porcentaje} - ${precio.nombre} ` */}
                                {`${precio.nombre} `}
                            </MenuItem>
                        }
                    })}
                </TextField>
            }
        </div>
    );
}

export default ContenedorSeleccionarTipoPrecio;