import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import funtions from '../../utils/funtions';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';


import NumberFormat from 'react-number-format';
import setSnackBars from '../plugins/setSnackBars';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'


class ModalNewEditProveedor extends Component {

    state = {
        codigo: '',
        nombre: '',
        tipo_proveedor: '',
        telefono: '',
        celular: '',
        direccion: '',
        ciudad: '',
        barrio: '',
        email: '',
        observacion: '',
        fecha_registro: '',
        hora_registro: '',
        usuario: '',
        estado:true,
        order:'',
    }

    componentDidMount() {
        if (this.props.item) {
            this.setState({
                codigo: this.props.item.codigo,
                nombre: this.props.item.nombre,
                tipo_proveedor: this.props.item.tipo,
                telefono: this.props.item.telefono,
                celular: this.props.item.celular,
                direccion: this.props.item.direccion,
                ciudad: this.props.item.ciudad,
                barrio: this.props.item.barrio,
                email: this.props.item.email,
                observacion: this.props.item.observacion,
                fecha_registro: this.props.item.fecha,
                hora_registro: this.props.item.hora,
                estado: this.props.item.estado,
                usuario: this.props.item.usuario,
                order: this.props.item.order
            })
        } else {
            this.setState({
                codigo: funtions.guidGenerator(),
                usuario: this.props.usuario.code,
            })
        }
    }

    setNewProveedor = (proveedor) => {
        var db = firebase.database();
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/proveedores/' + proveedor.codigo);
        productosRef.set({
            ...proveedor
        });
    }

    setUpdateProducto=(proveedor)=>{
        var db = firebase.database();
        var productosRef = db.ref('users/' + firebase.auth().currentUser.uid + '/proveedores/' + proveedor.codigo);
        productosRef.update({
            ...proveedor
        });
    }


    checkFormProduc = () => {
        if (
            this.state.codigo.length > 0 &&
            this.state.nombre.length > 0 &&
            this.state.celular.length > 0 &&
            this.state.direccion.length > 0 &&
            this.state.tipo_proveedor.length > 0
        ) {
            var order = new Date()
            const item = {
                codigo: this.state.codigo,
                nombre: this.state.nombre,
                tipo: this.state.tipo_proveedor,
                telefono: this.state.telefono,
                celular: this.state.celular,
                direccion: this.state.direccion,
                ciudad: this.state.ciudad,
                barrio: this.state.barrio,
                email: this.state.email,
                observacion: this.state.observacion,
                fecha: this.props.item?this.state.fecha_registro:`${new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear()}`,
                hora: this.props.item?this.state.hora_registro:`${new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds()}`,
                usuario: this.state.usuario,
                estado: this.state.estado,
                order: this.props.item? this.state.order : order + "",
            }
            if (this.props.item) {
                this.setUpdateProducto(item)
                setSnackBars.openSnack('success', 'rootSnackBar', 'Proveedor actualizado correctamente', 2000)
                this.props.handleClose()

            } else {
                this.setNewProveedor(item)
                setSnackBars.openSnack('success', 'rootSnackBar', 'Proveedor creado correctamente', 2000)
                this.props.handleClose()

            }
        } else {
            setSnackBars.openSnack('error', 'rootSnackBarERROR', 'Ingrese el proveedor correctamente', 2000)
        }
    }

    render() {

        const styles = {
            styleText: {
                margin: 10,
                width: '100%'
            },
            styleAutoComplete: {
                margin: 10,
                width: '96%'
            }
        }


        return (
            <div>
                <div id='rootSnackBarERROR'></div>
                <AppBar style={{
                    position: 'relative',
                }}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" style={{ flex: 1, marginLeft: 30 }}>
                            {this.props.item ? 'Editar Proveedor' : 'Nuevo Proveedor'}
                        </Typography>
                        {
                            this.props.item ?
                                <Button color="inherit"
                                    onClick={this.checkFormProduc}
                                >
                                    Actualizar
                                </Button>
                                :
                                <Button color="inherit"
                                    onClick={this.checkFormProduc}
                                >
                                    Guardar
                                </Button>
                        }

                    </Toolbar>
                </AppBar>


                <form autoComplete="off">
                    <Grid container spacing={24} style={{ width: '100vw' }}>
                        <Grid container xs={6} spacing={24} style={{ padding: 24 }}>
                            <Grid item xs={6}>


                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    style={styles.styleText}
                                    id="standard-codigo-automatico"
                                    label="Codigo automático"
                                    //error={this.state.codigo.length > 0 ? false : true}
                                    required
                                    disabled
                                    //onChange={(event) => this.setState({ codigo: event.target.value })}
                                    value={this.state.codigo}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    style={styles.styleText}
                                    id="standard-nombre"
                                    label="Nombre"
                                    error={this.state.nombre.length > 0 ? false : true}
                                    required
                                    onChange={(event) => this.setState({ nombre: event.target.value })}
                                    value={this.state.nombre}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    style={styles.styleText}
                                    id="standard-email"
                                    label="Correo electrónico"
                                    //error={this.state.email.length > 0 ? false : true}
                                    required
                                    onChange={(event) => this.setState({ email: event.target.value })}
                                    value={this.state.email}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    style={styles.styleText}
                                    id="standard-observacion"
                                    label="Observación"
                                    //error={this.state.observacion.length > 0 ? false : true}
                                    required
                                    onChange={(event) => this.setState({ observacion: event.target.value })}
                                    value={this.state.observacion}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    id="filled-tipo-proveedor"
                                    select
                                    label="Tipo de proveedor"
                                    error={this.state.tipo_proveedor.length > 0 ? false : true}
                                    value={this.state.tipo_proveedor}
                                    onChange={event => this.setState({ tipo_proveedor: event.target.value })}
                                    margin="normal"
                                    variant="filled"
                                    style={styles.styleText}
                                >
                                    <MenuItem value={'persona'}>Persona</MenuItem>
                                    <MenuItem value={'empresa'}>Empresa</MenuItem>
                                </TextField>


                            </Grid>

                        </Grid>
                        <Grid container xs={6} spacing={24} style={{ padding: 24 }}>
                            <Grid item xs={6}>

                                <TextField
                                    style={styles.styleText}
                                    id="standard-telefono"
                                    label="Telefono"
                                    //error={this.state.telefono.length > 0 ? false : true}
                                    required
                                    onChange={(event) => this.setState({ telefono: event.target.value })}
                                    value={this.state.telefono}
                                    margin="normal"
                                    variant="filled"
                                />
                                <TextField
                                    style={styles.styleText}
                                    id="standard-celular"
                                    label="Celular"
                                    error={this.state.celular.length > 0 ? false : true}
                                    required
                                    onChange={(event) => this.setState({ celular: event.target.value })}
                                    value={this.state.celular}
                                    margin="normal"
                                    variant="filled"
                                />

                                <TextField
                                    style={styles.styleText}
                                    id="standard-direccion"
                                    label="Dirección"
                                    error={this.state.direccion.length > 0 ? false : true}
                                    required
                                    onChange={(event) => this.setState({ direccion: event.target.value })}
                                    value={this.state.direccion}
                                    margin="normal"
                                    variant="filled"
                                />

                                <Grid container spacing={24}>
                                    <Grid item xs={6}>
                                        <TextField
                                            style={styles.styleText}
                                            id="standard-ciudad"
                                            label="Ciudad"
                                            //error={this.state.ciudad.length > 0 ? false : true}
                                            required
                                            onChange={(event) => this.setState({ ciudad: event.target.value })}
                                            value={this.state.ciudad}
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            style={styles.styleText}
                                            id="standard-barrio"
                                            label="Barrio"
                                            //error={this.state.barrio.length > 0 ? false : true}
                                            required
                                            onChange={(event) => this.setState({ barrio: event.target.value })}
                                            value={this.state.barrio}
                                            margin="normal"
                                            variant="filled" />
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={6}>

                            </Grid>

                        </Grid>
                    </Grid>


                </form>

            </div>
        );
    }
}

function NumberFormatCustom(props) {
    const { onChange } = props;

    return (
        <NumberFormat
            {...props}
            decimalSeparator={','}
            thousandSeparator={'.'}
            prefix="$ "
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                })
            }}
        />
    );
}

function NumberFormatIva(props) {
    const { onChange } = props;
    return (
        <NumberFormat
            {...props}
            mask="_"
            format="% ##"
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                })
            }}
        />
    )
}

function NumberFormatCantidad(props) {
    const { onChange } = props;
    return (
        <NumberFormat
            {...props}
            format="###### productos"
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                })
            }}
        />
    )
}

export default ModalNewEditProveedor;