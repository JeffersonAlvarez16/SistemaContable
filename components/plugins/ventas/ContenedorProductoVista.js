import React from 'react';
import { Typography, FormControlLabel, Switch, Button } from '@material-ui/core';

const ContenedorProductoVista = (props) => {

    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 16,
                marginLeft: 16,
                marginRight: 16
            }}>
                <Typography variant="title" gutterBottom>
                    {props.itemProductoCargado ? props.itemProductoCargado.descripcion_producto : 'Nombre de producto'}
                </Typography>
                <div style={{ flex: 1 }} />
                <Typography variant="subheading" gutterBottom >
                    {props.itemProductoCargado ? props.itemProductoCargado.codigo : 'Codigo'}
                </Typography>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 16,
                marginLeft: 16,
                marginRight: 16,
            }}>
                <Typography variant="subheading" gutterBottom>
                    {props.itemProductoCargado ? '$ ' + ((Number(props.itemProductoCargado.precio_costo) * Number(props.precioSeleccionado.porcentaje)) + Number(props.itemProductoCargado.precio_costo)).toFixed(2) : 'Precio'}
                </Typography>
                <div style={{ flex: 1 }} />
                <Typography variant="subheading" gutterBottom>
                    {props.itemProductoCargado ? 'cantidad: ' + props.itemProductoCargado.stock_actual : 'Stock Actual'}
                </Typography>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                paddingBottom: 16,
                paddingTop: 16,
                paddingLeft: 16,
                paddingRight: 16,
                background: '#33ffa2',
                height: 30
            }}>
                <div style={{ flex: 1 }} />
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.cargaAutomatica}
                            onChange={props.cargaAutomaticaCambiar}
                        />}
                    label="Carga Automática"
                />
                <Button variant="contained" size="small" color="default" onClick={() => {
                    props.agregarItemSeleccionadoVista(props.itemProductoCargado)
                }}>
                    Agregar
            </Button>
            </div>

        </div>
    );
}

export default ContenedorProductoVista;