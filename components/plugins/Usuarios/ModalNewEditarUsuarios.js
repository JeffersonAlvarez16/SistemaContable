import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { AppBar, Toolbar, IconButton, TextField, Grid, MenuItem, Checkbox, FormControlLabel, Popover, Popper, Paper } from "@material-ui/core";
import funtions from "../../../utils/funtions";
import { styled } from '@material-ui/styles';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import ModalContainerNormal from "../../modals_container/ModalContainerNormal";
import ModalEliminarUsuario from "../../modals_container/usuarios/ModalEliminarUsuario";
import setSnackBars from "../setSnackBars";






class ModalUsuarios extends React.Component {
    state = {
        open: false,
        tipo_usuario: '',
        nombre: '',
        password: '',
        clientes: false,
        productos: false,
        stock: false,
        proveedores: false,
        ventas: false,
        retenciones: false,
        usuarios: false,
        generales: false,
        openTipo: null,
        anchorEl: null,
        title: ''
    };

    componentDidMount() {
        if (this.props.item === null) {
            this.setState({
                title: 'Agregar Usuario'
            })
        } else {
            this.setState({
                title: 'Editar Usuario',
                nombre: this.props.item.nombre,
                password: this.props.item.password,
                tipo_usuario: this.props.item.tipo_usuario,
                productos: this.props.item.privilegios.productos,
                stock: this.props.item.privilegios.stock,
                ventas: this.props.item.privilegios.ventas,
                retenciones: this.props.item.privilegios.retenciones,
                proveedores: this.props.item.privilegios.proveedores,
                clientes: this.props.item.privilegios.clientes,
                usuarios: this.props.item.privilegios.usuarios,
                generales: this.props.item.privilegiosGenerales.generales,

            })

        }
        this.setState({
            open: this.props.openModal
        })
    }
    componentWillReceiveProps(props) {
        this.setState({
            open: props.openModal
        })
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    }

    agregarNuevoUsuario = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                if (this.props.item === null) {
                    var codigo = funtions.guidGenerator()
                    var productosRef = db.ref('users/' + user.uid + '/usuarios/' + codigo)
                    productosRef.set({
                        code: codigo,
                        nombre: this.state.nombre,
                        password: this.state.password,
                        tipo_usuario: this.state.tipo_usuario,
                        estado: true,
                        privilegios:{
                            productos: this.state.productos,
                        stock: this.state.stock,
                        proveedores: this.state.proveedores,
                        clientes: this.state.clientes,
                        ventas: this.state.ventas,
                        retenciones: this.state.retenciones,
                        usuarios: this.state.usuarios,
                        },
                        privilegiosGenerales:{
                            generales: this.state.generales
                        }
                    })
                    setTimeout(() => {
                        this.props.handleClose()
                        setSnackBars.openSnack('success', 'rootSnackBar', 'Usuario registrado con exito', 2000)
                    }, 100)
                } else {
                    var productosRef = db.ref('users/' + user.uid + '/usuarios/' + this.props.item.code)
                   
                    productosRef.update({                      
                        nombre: this.state.nombre,
                        password: this.state.password,
                        tipo_usuario: this.state.tipo_usuario,                      
                        estado: this.props.item.estado,
                        privilegios:{
                            productos: this.state.productos,
                        stock: this.state.stock,
                        proveedores: this.state.proveedores,
                        clientes: this.state.clientes,
                        ventas: this.state.ventas,
                        retenciones: this.state.retenciones,
                        usuarios: this.state.usuarios,
                        },
                        privilegiosGenerales:{
                            generales: this.state.generales
                        }
                    }) 
                    setTimeout(() => {
                        this.props.handleClose()
                        setSnackBars.openSnack('success', 'rootSnackBar', 'Usuario registrado con exito', 2000)
                    }, 100)
                }


            }
        })
        
    }
    //programar es como vivir toda una vida de hacer tarea pero amar hacer tarea
    render() {

        const { classes } = this.props;
        const { anchorEl, openTipo, nombre, tipo_usuario, password, generales, ventas, productos, stock, proveedores, clientes, retenciones, usuarios } = this.state

        return (
            <div style={{ width: 500, maxHeight: 650 }}>
                <AppBar style={{
                    position: 'relative',
                }}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" style={{ flex: 1, marginLeft: 30 }}>
                            {this.state.title}
                        </Typography>
                        <IconButton color="inherit" onClick={() => this.agregarNuevoUsuario()} aria-label="Add">
                            <SaveIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Grid item xs="12" style={{ margin: 15, columnSpan: 10 }}>
                    <div style={{ display: 'flex' }}>

                        <Grid item xs="6" style={{ margin: 2 }}>
                            <TextField
                                style={{ width: '100%' }}
                                id="standard-nombre-usuario"
                                label="Nombre"
                                required
                                onChange={(event) => this.setState({ nombre: event.target.value })}
                                value={this.state.nombre}
                                margin="normal"
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs="6" style={{ margin: 2 }}>
                            <TextField
                                style={{ width: '100%' }}
                                id="standard-contrasena-usuario"
                                label="Contraseña"
                                required
                                onChange={(event) => this.setState({ password: event.target.value })}
                                value={this.state.password}
                                margin="normal"
                                variant="filled"
                            />
                        </Grid>
                    </div>
                    <Grid item xs="12" style={{ margin: 2 }}>



                        <TextField
                            style={{ width: '100%' }}
                            id="standard-tipo-usuario"
                            label="Tipo Usuario"
                            required
                            value={this.state.tipo_usuario}
                            onChange={(event) => this.setState({ tipo_usuario: event.target.value })}
                            margin="normal"
                            variant="filled"
                        />


                    </Grid>
                    <Grid item xs="12" style={{ margin: 2 }}>
                        <Typography variant="title" gutterBottom>
                            Privilegios
                        </Typography>
                        <div style={{ display: 'flex' }}>
                            <Grid item xs="6">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                            checked={productos}
                                            onChange={() => {
                                                this.setState({
                                                    productos: !this.state.productos
                                                })
                                            }}

                                        />
                                    }
                                    label="Productos"
                                />
                                {
                                    // 
                                }
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                            checked={stock}
                                            onChange={() => {
                                                this.setState({
                                                    stock: !this.state.stock
                                                })

                                            }}
                                        />
                                    }
                                    label="Stock"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                            checked={proveedores}
                                            onChange={() => {
                                                this.setState({
                                                    proveedores: !this.state.proveedores
                                                })

                                            }}
                                        />
                                    }
                                    label="Proveedores"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                            checked={clientes}
                                            onChange={() => {
                                                this.setState({
                                                    clientes: !this.state.clientes
                                                })

                                            }}

                                        />
                                    }
                                    label="Clientes"
                                />

                            </Grid>
                            <Grid item xs="6">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                            checked={ventas}
                                            onChange={() => {
                                                this.setState({
                                                    ventas: !this.state.ventas
                                                })

                                            }}

                                        />
                                    }
                                    label="Ventas"
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                            checked={retenciones}
                                            onChange={() => {
                                                this.setState({
                                                    retenciones: !this.state.retenciones
                                                })

                                            }}
                                        />
                                    }
                                    label="Retenciones"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                            checked={usuarios}
                                            onChange={() => {
                                                this.setState({
                                                    usuarios: !this.state.usuarios
                                                })
                                            }}
                                        />
                                    }
                                    label="Usuarios"
                                />
                            </Grid>
                        </div>


                    </Grid>

                    <Grid item xs="12" style={{ margin: 2 }}>
                        <Typography variant="title" gutterBottom>
                            Privilegios Generales
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                    checked={generales}
                                    onChange={() => {
                                        this.setState({
                                            generales: !this.state.generales
                                        })

                                    }}
                                />
                            }
                            label="Configuracion de Precios"
                        />


                    </Grid>
                </Grid>

            </div>
        );
    }
}


export default ModalUsuarios;
