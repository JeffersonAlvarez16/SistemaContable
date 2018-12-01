import React from 'react';
import { Typography, FormControlLabel, Switch, Button } from '@material-ui/core';
import AutoCompleteCliente from '../AutoCompleteClientes-New';

const ContenedorClienteVista = (props) => {

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
            <Typography variant="title" style={{ paddingTop: 16, paddingLeft: 16 }}>
                {props.clienteSeleccionado ? props.clienteSeleccionado.nombre : 'Nombre del cliente'}
            </Typography>
            <Typography variant="subheading" style={{ paddingTop: 5, paddingLeft: 16 }}>
                {props.clienteSeleccionado ? props.clienteSeleccionado.numero_identificacion : 'Identificación'}
            </Typography>
            <Typography variant="caption" style={{ paddingTop: 15, paddingLeft: 16 }}>
                {props.clienteSeleccionado ? props.clienteSeleccionado.email : 'Email'}
            </Typography>
            <Typography variant="caption" style={{ paddingTop: 2, paddingLeft: 16 }}>
                {props.clienteSeleccionado ? `${props.clienteSeleccionado.telefono} / ${props.clienteSeleccionado.celular}` : 'Teléfono/Celular'}
            </Typography>

            <div style={{ paddingLeft: 16, paddingRight: 16 }}>
                <AutoCompleteCliente
                    styleText={styles.styleClientes}
                    dataRef="clientes"
                    dataRefObject="cliente"
                    error={props.errorCliente}
                    onChangue={(item) => props.seleccionarCliente(item)}
                    usuario={props.usuario}
                />
            </div>
        </div>
    );
}

export default ContenedorClienteVista;