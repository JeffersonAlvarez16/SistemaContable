import React from 'react';
import { Typography, FormControlLabel, Switch, Button, TextField, MenuItem } from '@material-ui/core';
import AutoCompleteCliente from '../AutoCompleteClientes-New';

const ContenedorSeleccionarTipoPago = (props) => {

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
        <div>
            <TextField
                id="standard-select-page-tipe"
                select
                label="Tipo de pago"
                disabled={props.tipo_venta==='final'?true:false}
                value={props.tipo_pago}
                onChange={(e) => props.handleChangeSeleccionTipoPago(e.target.value)}
                margin="normal"
                variant='filled'
                style={{ width: '100%' }}
            >
                    <MenuItem value='efectivo'>
                        Efectivo
                    </MenuItem>
                    <MenuItem value='credito'>
                        A Credito
                    </MenuItem>
                    <MenuItem  value='tarjeta-credito'>
                        Tarjeta de crédito
                    </MenuItem>
                    <MenuItem  value='tarjeta-debito'>
                        Tarjeta de débito
                    </MenuItem>
                    <MenuItem value='cheque'>
                        Cheque
                    </MenuItem>
                    <MenuItem value='transferencia'>
                        Transferencia Bancaria
                    </MenuItem>
            </TextField>
        </div>
    );
}

export default ContenedorSeleccionarTipoPago;