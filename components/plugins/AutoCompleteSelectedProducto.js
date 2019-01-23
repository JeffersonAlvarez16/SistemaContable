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
import { async } from '@firebase/util';
import RenderPropsMenu from './MenuFilter';
import { CircularProgress } from '@material-ui/core';


class AutoCompleteSelectedProducto extends React.Component {
    state = {
        anchorEl: null,
        listaProductos: [],
        listaProductosTemporal: [],
        listaBuscada: [],

        //estado lista 
        estadoListaLoader: 'vacia',
        //texto buscado
        textoBuscado: '',
        //selecciona automatica
        checkedSeleccionAutomatica: false,
        //estado para mostrar el loader
        textoBuscadoLoading : false,

    };


    componentDidMount() {
        this.setState({
            filtroBusqueda: 'nombreProducto',
            checkedSeleccionAutomatica: false,
        })
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    uidUser: user.uid
                })

                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + "/productos");
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaProductos: [],
                            estadoListaLoader: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        var listaFiltrada = lista.filter(item => item.estado === true)
                        this.setState({
                            listaProductos: listaFiltrada,
                            estadoListaLoader: 'llena'
                        })
                    } else {
                        this.setState({
                            listaProductos: [],
                            estadoListaLoader: 'vacio'
                        })
                    }
                });
            }
        });
    }

    resivirListaDescripcion = (texto) => {
        var db = firebase.database()
        var productosRef = db.ref('users/' + this.state.uidUser + "/productos").orderByChild('descripcion_producto').startAt(texto)
        productosRef.once('value', snap => {
            if (snap.val()) {
                this.setState({
                    listaBuscada: funtions.snapshotToArray(snap),
                    textoBuscadoLoading : false
                })
            }
        })
    }

    resivirListaCodigoReferencia = (texto) => {
        var db = firebase.database()
        var productosRef = db.ref('users/' + this.state.uidUser + "/productos").orderByChild('codigo_referencia').equalTo(texto)
        productosRef.once('value', snap => {
            if (snap.val()) {
                this.setState({
                    listaBuscada: funtions.snapshotToArray(snap),
                    textoBuscadoLoading : false
                })
            }
        })
    }

    resivirListaCodigoBarras = (texto) => {
        var db = firebase.database()
        var productosRef = db.ref('users/' + this.state.uidUser + "/productos").orderByChild('codigo_barras').equalTo(texto)
        productosRef.once('value', snap => {
            if (snap.val()) {
                this.setState({textoBuscadoLoading : false})
                var listainterna = funtions.snapshotToArray(snap)
                if (listainterna.length > 0) {
                    this.props.onChangue(listainterna[0])
                    this.setState({
                        listaProductosTemporal: [],
                        textoBuscado: ''
                    })
                    this.setState({
                        listaBuscada: funtions.snapshotToArray(snap)
                    })
                }
            }
        })
    }

    handleSearchItems = (text) => {
        this.setState({ textoBuscado: text })
        if (this.state.checkedSeleccionAutomatica) {
            this.setState({textoBuscadoLoading : true})
            this.resivirListaCodigoBarras(text)
        } else {
            this.setState({textoBuscadoLoading : true})
            if (this.state.filtroBusqueda === 'nombreProducto') {
                this.resivirListaDescripcion(text)
            }
            if (this.state.filtroBusqueda === 'codigoReferencia') {
                this.resivirListaCodigoReferencia(text)
            }
            this.setState({
                listaProductosTemporal: this.state.listaBuscada
            })

        }
    }

    handleToggle = (item) => {
        this.props.onChangue(item)
        this.setState({
            listaProductosTemporal: [],
            textoBuscado: ''
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
                    id="handle-id-producto"
                    variant="contained"
                    value={this.state.textoBuscado}
                    onChange={event => {
                        this.handleSearchItems(event.target.value)
                    }}
                    style={styleText}
                    label='Buscar producto...'
                    helperText={
                        this.state.filtroBusqueda === 'nombreProducto' ?
                            'Buscando por nombre del producto'
                            :
                            this.state.filtroBusqueda === 'codigobarras' ?
                                'Buscando por codigo de barras'
                                :
                                this.state.filtroBusqueda === 'codigoReferencia' ?
                                    'Buscando por codigo de referencia'
                                    :
                                    ''}
                    margin={margin ? 'dense' : 'normal'}
                    variant="outlined"
                    onFocus={(event) => this.setState({ anchorEl: event.currentTarget })}

                    autoComplete='off'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment variant="filled" position="end">
                                {
                                    this.state.textoBuscadoLoading === true &&
                                    
                                        <CircularProgress size={15}/>
                                }
                                {
                                    this.state.textoBuscado.length > 0 &&
                                    <Tooltip title="Borrar busqueda" >
                                        <IconButton
                                            aria-label="Toggle clean text"
                                            onClick={() => this.setState({ textoBuscado: '', listaProductosTemporal: [], textoBuscadoLoading : false })}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                }

                                {/* <Tooltip title="Seleccion Automática" >
                                    <Checkbox
                                        checked={this.state.checkedSeleccionAutomatica}
                                        onChange={() => this.setState({ checkedSeleccionAutomatica: !this.state.checkedSeleccionAutomatica })}
                                    />
                                </Tooltip> */}

                                <RenderPropsMenu
                                    handleNombreProducto={() =>
                                        this.setState({
                                            filtroBusqueda: 'nombreProducto',
                                            checkedSeleccionAutomatica: false,
                                        })
                                    }
                                    handleCodigoBarras={() =>
                                        this.setState({
                                            checkedSeleccionAutomatica: true,
                                            filtroBusqueda: 'codigobarras'
                                        })
                                    }
                                    handleCodigoreferencia={() =>
                                        this.setState({
                                            filtroBusqueda: 'codigoReferencia',
                                            checkedSeleccionAutomatica: false,
                                        })
                                    }
                                ></RenderPropsMenu>

                            </InputAdornment>
                        ),
                    }}
                />

                <Popper open={this.state.listaProductosTemporal.length > 0} anchorEl={anchorEl} transition style={{ zIndex: 1300, minWidth: 450 }} >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper elevation={6}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    paddingLeft: 24,
                                    paddingRight: 24,
                                    paddingTop: 16
                                }}
                                >
                                    <div style={{ width: 300, paddingRight: 32 }}>
                                        <Typography variant="subheading" gutterBottom>
                                            Descripción
                                        </Typography>
                                    </div>
                                    <div style={{ width: 110 }}>
                                        <Typography variant="subheading" gutterBottom>
                                            Stock Actual
                                        </Typography>
                                    </div>
                                </div>
                                <Divider />
                                {
                                    <List style={{ maxHeight: 200, overflow: 'auto' }}>
                                        {
                                            this.state.listaProductosTemporal.map((item) => {
                                                return (
                                                    <ListItem key={item.id} button onClick={() =>
                                                        this.handleToggle(item)
                                                    }
                                                    >
                                                        <ListItemText style={{ width: 300 }} primary={`${item.descripcion_producto}`} />
                                                        <ListItemText style={{ width: 110 }} primary={`${item.stock_actual}`} />
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

export default AutoCompleteSelectedProducto
