import React from 'react';
import { Typography, FormControlLabel, Switch, Button, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const ContenedorProductoVista = (props) => {

    const obtenerPorcentajePrecio = () => {
        var porcentaje = 0
        if (Boolean(props.seleccionarProductoPordefecto)) {
            props.precios.filter(it => {
                if (it.codigo === props.itemProductoCargado.precio_por_defecto) {
                    porcentaje = it.porcentaje
                }
            })
        } else {
            props.precios.filter(it => {
                if (it.codigo === props.precioSeleccionadoCargar) {
                    porcentaje = it.porcentaje
                }
            })
        }
        return porcentaje
    }

    const obtenerPorcentajePrecioPerzonalizado = () => {
        var porcentaje = 0
        if (Boolean(props.seleccionarProductoPordefecto)) {
            props.preciosPerzonalizadosProducto.filter(it => {
                if (it.codigo === props.itemProductoCargado.precio_por_defecto) {
                    porcentaje = it.porcentaje
                }
            })
        } else {
            props.preciosPerzonalizadosProducto.filter(it => {
                if (it.codigo === props.precioSeleccionadoCargar) {
                    porcentaje = it.porcentaje
                }
            })
        }
        return porcentaje
    }

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
                    {
                        props.itemProductoCargado ?
                        <>
                        {
                            Boolean(props.itemProductoCargado.tipo_precio_seleccionado)==false&&
                            '$ ' + ((Number(props.itemProductoCargado.precio_costo) * Number(obtenerPorcentajePrecio())) + Number(props.itemProductoCargado.precio_costo)).toFixed(2)
                        }
                        {
                            Boolean(props.itemProductoCargado.tipo_precio_seleccionado)&&
                            '$ ' + ((Number(props.itemProductoCargado.precio_costo) * Number(obtenerPorcentajePrecioPerzonalizado())) + Number(props.itemProductoCargado.precio_costo)).toFixed(2)
                        }
                        </>                            
                            : 'Precio'
                    }
                </Typography>
                <div style={{ flex: 1 }} />
                <Typography variant="subheading" gutterBottom>
                    {props.itemProductoCargado ? 'cantidad: ' + props.itemProductoCargado.stock_actual : 'Stock Actual'}
                </Typography>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                background: '#33ffa2',
                alignItems: 'center',
                height: 30,
                padding: 16
            }}>
                
                    <>
                        {
                            props.itemProductoCargado != null ?
                                <>
                                    {
                                        Boolean(props.itemProductoCargado.tipo_precio_seleccionado) == false &&
                                        <TextField
                                            id="filled-unidad-precio-defecto-asas"
                                            select
                                            label="Precio general"
                                            value={props.itemProductoCargado ? props.itemProductoCargado.precio_por_defecto : 'sa'}
                                            onChange={event => props.onChangePrecio(event.target.value)}
                                            margin="normal"
                                            variant="outlined"
                                            style={{ width: 300, height: 40, margin: 0 }}
                                            disabled={!props.itemProductoCargado}
                                        >
                                            {
                                                props.precios != null &&
                                                props.precios.map(item => {
                                                    return <MenuItem key={item.codigo} value={item.codigo}>{`${item.nombre}`}</MenuItem>
                                                })
                                            }
                                        </TextField>
                                    }
                                    {
                                        Boolean(props.itemProductoCargado.tipo_precio_seleccionado) &&
                                        <TextField
                                            id="filled-unidad-precio-defecto-asas"
                                            select
                                            label="Precio personalizado"
                                            value={props.itemProductoCargado ? props.itemProductoCargado.precio_por_defecto : 'sa'}
                                            onChange={event => props.onChangePrecio(event.target.value)}
                                            margin="normal"
                                            variant="outlined"
                                            style={{ width: 300, height: 40, margin: 0 }}
                                            disabled={!props.itemProductoCargado}
                                        >
                                            {
                                                props.preciosPerzonalizadosProducto != null &&
                                                props.preciosPerzonalizadosProducto.map(item => {
                                                    return <MenuItem key={item.codigo} value={item.codigo}>{`${item.nombre}`}</MenuItem>
                                                })
                                            }
                                        </TextField>
                                    }
                                </>
                                :
                                <TextField
                                    id="filled-unidad-precio-defecto-asas"
                                    select
                                    label="Cargar precio por defecto"
                                    value={props.itemProductoCargado ? props.itemProductoCargado.precio_por_defecto : 'sa'}
                                    onChange={event => props.onChangePrecio(event.target.value)}
                                    margin="normal"
                                    variant="outlined"
                                    style={{ width: 300, height: 40, margin: 0 }}
                                    disabled={!props.itemProductoCargado}
                                >
                                </TextField>
                        }
                    </>

                
               
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
                    if (Boolean(props.seleccionarProductoPordefecto)) {
                        props.agregarItemSeleccionadoVista(props.itemProductoCargado)
                    } else {
                        var item = props.itemProductoCargado
                        item.precio_por_defecto = props.precioSeleccionadoCargar
                        props.agregarItemSeleccionadoVista(item)
                    }

                }}>
                    Agregar
            </Button>
            </div>

        </div>
    );
}

export default ContenedorProductoVista;