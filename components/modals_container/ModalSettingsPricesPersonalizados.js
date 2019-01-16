import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, TextField, InputAdornment } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import funtions from '../../utils/funtions';
import setSnackBars from '../plugins/setSnackBars';

import NumberFormat from 'react-number-format';

class ModalSettingsPricesPersonalizados extends Component {

    state = {
        precios: []
    }

    componentWillReceiveProps(props) {
        this.setState({
            precios: props.preciosPerzonalizados,
            precio_costo: props.precio_costo
        })
    }

    agregarNuevoPrecio = () => {
        var codigo = funtions.guidGenerator()
        var precio = {
            codigo: codigo,
            codigoProducto: this.props.codigoProducto,
            estado: true,
            id: codigo,
            nombre: "Nuevo Precio",
            nuevo_precio: "0.00",
            porcentaje: 0.0
        }
        var lista = this.state.precios
        lista.push(precio)
        this.setState({
            precios: lista
        })
        this.props.setPreciosPerzonalizados(lista)
    }

    quitarPrecio = (i) => {
        var lista = this.state.precios
        lista.splice(i, 1)
        this.setState({
            precios: lista
        })
        this.props.setPreciosPerzonalizados(lista)
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 30 }}>
                    <Typography variant="title" color="inherit" style={{ flex: 1, marginLeft: 25 }}>
                        Precios
                        </Typography>
                    <IconButton color="inherit" onClick={() => this.agregarNuevoPrecio()} aria-label="Add" style={{ marginRight: 25 }}>
                        <AddIcon />
                    </IconButton>
                </div>

                <List style={{ padding: 0 }}>
                    {
                        this.state.precios != null &&
                        this.state.precios.map((item, i) => {
                            return (
                                <ListItem >
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: '100%'
                                    }}>
                                        <Grid container spacing={16} >
                                            <Grid item xs={4} >
                                                <TextField
                                                    id={`${item.codigo}_porcentaje`}
                                                    value={item.nuevo_precio}
                                                    variant='outlined'
                                                    margin='dense'
                                                    label='Precio'
                                                    onChange={(event => {
                                                        var array = this.state.precios
                                                        array.forEach((it, i) => {
                                                            if (it.codigo === item.codigo) {
                                                                array[i].nuevo_precio = event.target.value
                                                                var restaPrecio = Number(event.target.value) - Number(this.state.precio_costo)
                                                                array[i].porcentaje = Number(Number(Number(restaPrecio) * 1) / Number(this.state.precio_costo))
                                                            }
                                                        })
                                                        this.setState({
                                                            precios: array
                                                        })
                                                        this.props.setPreciosPerzonalizados(array)
                                                    })}
                                                    InputProps={{
                                                        inputComponent: NumberFormatCustom,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={8} style={{ display: 'flex', flexDirection: 'row' }}>
                                                <TextField
                                                    id={`${item.codigo}_nombre`}
                                                    value={item.nombre}
                                                    variant='outlined'
                                                    label='Nombre'
                                                    margin='dense'
                                                    onChange={(event => {
                                                        var array = this.state.precios
                                                        array.forEach((it, i) => {
                                                            if (it.codigo === item.codigo) {
                                                                array[i].nombre = event.target.value
                                                            }
                                                        })
                                                        this.setState({
                                                            precios: array
                                                        })
                                                        this.props.setPreciosPerzonalizados(array)
                                                    })}
                                                />
                                                {
                                                    this.state.precios.length != 1 &&
                                                    <IconButton color="inherit" onClick={() => this.quitarPrecio(i)} aria-label="Quitar">
                                                        <RemoveIcon />
                                                    </IconButton>
                                                }
                                            </Grid>
                                        </Grid>
                                    </div>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        );
    }
}

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator
        prefix=""
      />
    );
  }

export default ModalSettingsPricesPersonalizados