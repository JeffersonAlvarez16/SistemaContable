import React from 'react';

import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import Tooltip from '@material-ui/core/Tooltip';


//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import funtions from '../../utils/funtions';
import Divider from '@material-ui/core/Divider';
import FullScreenDialog from '../components/FullScreenDialog';
import ModalNewCliente from '../modals_container/ModalNewCliente';
import { Button } from '@material-ui/core';


class AutoCompleteCliente extends React.Component {
    state = {
        anchorEl: null,
        listaClientes: [],
        listaClientesTemporal: [],
        
        //estado lista 
        estadoListaLoader: 'vacia',
        //texto buscado
        textoBuscado: '',
        //selecciona automatica
        //estado modal
        estadoModalSimple:false,
        //texto label
        textLabel:''
    };
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/clientes');
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaClientes: [],
                            estadoListaLoader: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        var listaFiltrada = lista.filter(item => item.estado === true)
                        this.setState({
                            listaClientes: listaFiltrada,
                            estadoListaLoader: 'llena'
                        })
                    } else {
                        this.setState({
                            listaClientes: [],
                            estadoListaLoader: 'vacio'
                        })
                    }
                });
            }
        });
    }

    handleSearchItems = (text) => {
        this.setState({ textoBuscado: text })

            if (text.length > 0) {
                let array = funtions.filterObjectsCedulas(this.state.listaClientes, text)
                this.setState({
                    listaClientesTemporal: array
                })

            } else {
                this.setState({
                    listaClientesTemporal: []
                })
            }
        }
    

    handleToggle = (item) => {
        this.props.onChangue(item)
        this.setState({
            listaClientesTemporal: [],
            textoBuscado: '',
            textLabel:item.nombre
        })
    }


    render() {
        const {
            anchorEl,
        } = this.state;

        const {
            styleText,
            margin,
        } = this.props

        return (
            <div  >
                <TextField
                    id="handle-id-clientes-selected"
                    variant="contained"
                    value={this.state.textoBuscado}
                    onChange={event => {
                        this.handleSearchItems(event.target.value)
                    }}
                    style={styleText}
                    label={this.state.textLabel.length>0?this.state.textLabel:'Ingresar cedula o Ruc'}
                    margin={margin ? 'dense' : 'normal'}
                    variant="outlined"
                    onFocus={(event) => this.setState({ anchorEl: event.currentTarget })}
                    error={this.props.error}
                    autoComplete='off'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment variant="filled" position="end">
                                {
                                    this.state.textoBuscado.length > 0 &&
                                    <Tooltip title="Borrar busqueda" >
                                        <IconButton
                                            aria-label="Toggle clean text"
                                            onClick={() => this.setState({  listaClientesTemporal: [],textoBuscado: '' })}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                }

                            </InputAdornment>
                        ),
                    }}
                />

                <FullScreenDialog openModal={this.state.estadoModalSimple}>
                    <ModalNewCliente
                        item={null}
                        handleClose={() => this.setState({ estadoModalSimple: false })}
                        usuario={this.props.usuario}
                    />
                </FullScreenDialog>

                <Popper open={this.state.listaClientesTemporal.length > 0} anchorEl={anchorEl} transition style={{ zIndex: 1300, maxWidth: 640 }} >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper elevation={15}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    paddingLeft: 24,
                                    paddingRight: 24,
                                    paddingTop: 16,
                                    width: '100%'
                                }}
                                >
                                    <div style={{ width: '40%', paddingRight: 32 }}>
                                        <Typography variant="subheading" gutterBottom>
                                            Nombre
                                        </Typography>
                                    </div>
                                    <div style={{ width: '20%', paddingRight: 32 }}>
                                        <Typography variant="subheading" gutterBottom>
                                            Identificación
                                        </Typography>
                                    </div>
                                    <div style={{ width: '70%', paddingRight: 32, display:'flex', flexDirection:'row' }}>
                                        <Typography variant="subheading" gutterBottom>
                                            Email
                                        </Typography>
                                        <div style={{flex:1}}></div>
                                        <Tooltip title="Agregar" placement="top">
                                            <Button variant="raised" size='small' color="secondary" onClick={() => {
                                                this.setState({
                                                    estadoModalSimple: true,
                                                    estadoModal: 'nuevo'
                                                })
                                            }}>
                                               Nuevo Cliente
                                            </Button >
                                        </Tooltip>
                                    </div>
                                </div>
                                <Divider />
                                {
                                    <List style={{ maxHeight: 200, overflow: 'auto' }}>
                                        {
                                            this.state.listaClientesTemporal.map((item) => {
                                                return (
                                                    <ListItem key={item.id} button onClick={() =>
                                                        this.handleToggle(item)
                                                    }
                                                    >
                                                        <ListItemText style={{ width:'25vw' }} primary={`${item.nombre}`} />
                                                        <ListItemText style={{ width:'15vw'  }} primary={`${item.numero_identificacion}`} />
                                                        <ListItemText style={{ width: '40vw'  }} primary={`${item.email}`} />
                                                    </ListItem>
                                                )
                                            }
                                            )
                                        }
                                    </List>
                                }

                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div >
        );
    }
}

export default AutoCompleteCliente
