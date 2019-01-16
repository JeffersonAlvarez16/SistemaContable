import React from 'react';
import { Typography, FormControlLabel, Switch, Button } from '@material-ui/core';
import AutoCompleteCliente from '../AutoCompleteClientes-New';

const ContenedorNumeroFactura = (props) => {

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
            <Typography variant="body2" style={{ paddingTop: 16, paddingLeft: 16,marginBottom:-10}}>
                {props.codigoEstablecimiento ? props.codigoEstablecimiento : '000'}-
                {props.punto_emision ? props.punto_emision : '000'}
            </Typography>
            <Typography variant="subheading" style={{  paddingLeft: 16 }}>
                {`N° ${props.numero_factura ? props.numero_factura : 'Numero de Factura'}`}
            </Typography>
        </div>
    );
}

export default ContenedorNumeroFactura;