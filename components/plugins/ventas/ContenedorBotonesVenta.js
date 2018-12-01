import React from 'react';
import { Typography, FormControlLabel, Switch, Button, Grid } from '@material-ui/core';
import AutoCompleteCliente from '../AutoCompleteClientes-New';

const ContenedorBotonesVenta = (props) => {

    return (
        <div>
            <Grid container
                variant="permanent"
                spacing={20}
                style={{ marginTop:10}}
            >
                <Grid item xs={6} style={{ padding: 5 }}>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        style={{ width: '100%' }}
                        onClick={props.handleFinalizarVenta}
                    >
                        Aceptar
                    </Button>
                </Grid>
                <Grid item xs={6} style={{ padding: 5 }}>
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        style={{ width: '100%' }}
                        onClick={props.handleClose}>
                        Cancelar
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default ContenedorBotonesVenta;