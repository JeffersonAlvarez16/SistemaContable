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
import Checkbox from '@material-ui/core/Checkbox';

import Tooltip from '@material-ui/core/Tooltip';


//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import funtions from '../../utils/funtions';
import Divider from '@material-ui/core/Divider';
import FullScreenDialog from '../components/FullScreenDialog';
import ModalNewEditProveedor from '../modals_container/ModalNewEditProveedor';
import { Button } from '@material-ui/core';


class AutoCompleteProveedores extends React.Component {
    state = {
        anchorEl: null,
        listaProvedores: [],
        listaProvedoresTemporal: [],

        //estado lista 
        estadoListaLoader: 'vacia',
        //texto buscado
        textoBuscado: '',
        //selecciona automatica
        //texto label
        textLabel: '',
        //estado modals
        openModalFullScreen: false,
    };
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/proveedores');
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaProvedores: [],
                            estadoListaLoader: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        var listaFiltrada = lista.filter(item => item.estado === true)
                        this.setState({
                            listaProvedores: listaFiltrada,
                            estadoListaLoader: 'llena'
                        })
                    } else {
                        this.setState({
                            listaProvedores: [],
                            estadoListaLoader: 'vacio'
                        })
                    }
                });
            }
        });        
    }

    componentWillReceiveProps(props){
        if (props.codigoProveedor.length>0) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var db = firebase.database();
                    var productosRef = db.ref('users/' + user.uid + '/proveedores/'+props.codigoProveedor);
                    productosRef.on('value', (snapshot) => {
                        if (snapshot.val()) {
                            this.setState({textLabel:snapshot.val().nombre})
                        }
                    })
                }
            })
        }
    }

    handleSearchItems = (text) => {
        this.setState({ textoBuscado: text })

        if (text.length > 0) {
            let array = funtions.filterObjectsCedulas(this.state.listaProvedores, text)
            this.setState({
                listaProvedoresTemporal: array
            })

        } else {
            this.setState({
                listaProvedoresTemporal: []
            })
        }
    }


    handleToggle = (item) => {
        this.props.onChangue(item)
        this.setState({
            listaProvedoresTemporal: [],
            textoBuscado: '',
            textLabel: item.nombre
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
                    id="handle-id-proveedores-selected"
                    variant="contained"
                    value={this.state.textoBuscado}
                    onChange={event => {
                        this.handleSearchItems(event.target.value)
                    }}
                    style={styleText}
                    label={this.state.textLabel.length > 0 ? this.state.textLabel : 'Seleccionar proveedor'}
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
                                            onClick={() => this.setState({ textoBuscado: '', listaProvedoresTemporal: [] })}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                }

                            </InputAdornment>
                        ),
                    }}
                />

                <FullScreenDialog openModal={this.state.openModalFullScreen}>
                    <ModalNewEditProveedor
                        item={null}
                        handleClose={() => this.setState({ openModalFullScreen: false })}
                        usuario={this.props.usuario}
                    />
                </FullScreenDialog>

                <Popper open={this.state.listaProvedoresTemporal.length > 0} anchorEl={anchorEl} transition style={{ zIndex: 1300, maxWidth: 800 }} >
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
                                    <div style={{ width: '40%', paddingRight: 32 }}>
                                        <Typography variant="subheading" gutterBottom>
                                            Tipo Proveedor
                                        </Typography>
                                    </div>
                                    <div style={{ width: '50%', paddingRight: 32, display: 'flex', flexDirection: 'row' }}>
                                        <Typography variant="subheading" gutterBottom>
                                            Email
                                        </Typography>
                                        <div style={{ flex: 1 }}></div>
                                        <Tooltip title="Agregar" placement="top">
                                            <Button variant="raised" size='small' color="secondary" onClick={() => {
                                                this.setState({
                                                    openModalFullScreen: true,
                                                    estadoModal: 'nuevo'
                                                })
                                            }}>
                                                Nuevo Proveedor
                                            </Button >
                                        </Tooltip>
                                    </div>
                                </div>
                                <Divider />
                                {
                                    <List style={{ maxHeight: 200, overflow: 'auto' }}>
                                        {
                                            this.state.listaProvedoresTemporal.map((item) => {
                                                return (
                                                    <ListItem key={item.id} button onClick={() =>
                                                        this.handleToggle(item)
                                                    }
                                                    >
                                                        <ListItemText style={{ width: '25vw' }} primary={`${item.nombre}`} />
                                                        <ListItemText style={{ width: '15vw' }} primary={`${item.tipo}`} />
                                                        <ListItemText style={{ width: '40vw' }} primary={`${item.email}`} />
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

export default AutoCompleteProveedores
