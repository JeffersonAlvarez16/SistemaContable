import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, TextField, InputAdornment } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import funtions from '../../utils/funtions';
import setSnackBars from '../plugins/setSnackBars';
class ModalSettingsPrices extends Component {

    state = {
        precios: []
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/precios')
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            precios: funtions.snapshotToArray(snapshot)
                        })
                    }
                })
            }
        })
    }

    agregarNuevoPrecio = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var codigo = funtions.guidGenerator()
                var productosRef = db.ref('users/' + user.uid + '/precios/' + codigo)
                productosRef.set({
                    codigo,
                    nombre: 'Precio nuevo',
                    porcentaje: '0.10',
                    estado: true
                })
            }
        })
    }

    guardarListaPrecios = lista => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                lista.forEach(item => {
                    var productosRef = db.ref('users/' + user.uid + '/precios/' + item.codigo)
                    productosRef.update({ ...item }).then(() => {
                        this.props.handleClose()
                        setSnackBars.openSnack('success', 'rootSnackBar', 'Precios actualizados', 2000)
                    })
                })
            }
        })
    }

    activar = codigo => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/precios/' + codigo)
                productosRef.update({
                    estado: true
                })
            }
        })
    }

    desactivar = codigo => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/precios/' + codigo)
                productosRef.update({
                    estado: false
                })
            }
        })
    }

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
                            Configurar precios
                        </Typography>
                        <IconButton color="inherit" onClick={() => this.agregarNuevoPrecio()} aria-label="Add">
                            <AddIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={() => this.guardarListaPrecios(this.state.precios)} aria-label="Add">
                            <SaveIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <List style={{padding:0}}>
                    {
                        this.state.precios.map((item, i) => {
                            return (
                                <ListItem >
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Grid container spacing={16}>
                                            <Grid item xs={3}>
                                                <TextField
                                                    id={`${item.codigo}_porcentaje`}
                                                    value={item.porcentaje}
                                                    label='Porcentaje'
                                                    variant='filled' 
                                                    style={{ width: '100%' }}
                                                    onChange={(event => {
                                                        var array = this.state.precios
                                                        array.forEach((it, i) => {
                                                            if (it.codigo === item.codigo) {
                                                                array[i].porcentaje = event.target.value
                                                            }
                                                        })
                                                        this.setState({
                                                            precios: array
                                                        })
                                                    })}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <div style={{ marginTop: 17, width: 'max-content' }}> {`%`} </div>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <TextField
                                                    id={`${item.codigo}_nombre`}
                                                    value={item.nombre}
                                                    label='Nombre del precio'
                                                    variant='filled'
                                                    style={{ width: '100%' }}
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
                                                    })}
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                {
                                                    item.estado === true ?
                                                        <IconButton
                                                            color="primary"
                                                            onClick={() => this.desactivar(item.codigo)}
                                                            disabled={Number(i) === 0  ? true : false}
                                                            aria-label="Add">
                                                            <Visibility style={{color:Number(i) === 0 ?'gray':'#f44336'}}/>
                                                        </IconButton>
                                                        :
                                                        <IconButton
                                                            color="primary"
                                                            disabled={Number(i) === 0  ? true : false}
                                                            onClick={() => this.activar(item.codigo)}
                                                            aria-label="Add">
                                                            <VisibilityOff />
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

export default ModalSettingsPrices;