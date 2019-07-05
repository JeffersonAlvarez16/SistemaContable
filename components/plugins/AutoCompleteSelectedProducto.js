import 'firebase/database';
import 'firebase/auth'

import Checkbox from '@material-ui/core/Checkbox';
import { CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import RenderPropsMenu from './MenuFilter';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { async } from '@firebase/util';
import firebase from 'firebase/app';
import funtions from '../../utils/funtions';

//firebase 

class AutoCompleteSelectedProducto extends React.Component {
    state = {
        anchorEl: null,
        listaProductos: [],
        listaProductosTemporal: [],
        listaBuscada: [],

        //estado lista 
        estadoListaLoader: 'llena',
        //texto buscado
        textoBuscado: '',
        //selecciona automatica
        checkedSeleccionAutomatica: false,
        //estado para mostrar el loader
        textoBuscadoLoading: false,

    };


    componentDidMount() {
        if (this.props.puntoVenta === true) {
            
            this.setState({
                filtroBusqueda: '',
                checkedSeleccionAutomatica: true,
            })
        } else {
            this.setState({
                filtroBusqueda: '',
                checkedSeleccionAutomatica: false,
            })
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    uidUser: user.uid
                })

                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + "/productos").orderByChild('descripcion_producto');
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        
                        this.setState({
                            listaProductos: [],
                            estadoListaLoader: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        var listaFiltrada = lista.filter(item => item.estado === true)
                        listaFiltrada.sort()
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

    handleSearch = (nombre) => {
        this.setState({ listaProductosTemporal: [] })
        if (isNaN(nombre)) {
            if (nombre.length > 2) {
              
                this.setState({ textoBuscadoLoading: true })
                console.log(nombre)
                let array = funtions.filterObjectsNombre(this.state.listaProductos, nombre)
                console.log(Object.values(array))
                if (array.length > 0) {
                    this.setState({
                        listaProductosTemporal: array.sort(),
                        textoBuscadoLoading: false,
                    })
                } else {

                    this.setState({ estadoTabla: 'sin_resultados' })
                    this.setState({
                        listaProductosTemporal: [],
                        textoBuscadoLoading: false,
                        filtroBusqueda: 'NO EXISTEN COINCIDENCIAS'
                    })
                }

            } else {
                this.setState({
                    listaProductosTemporal: [],
                    textoBuscadoLoading: false,
                    filtroBusqueda: ''
                })
            }
        } else if (nombre.length === 13) {
            this.setState({
                checkedSeleccionAutomatica:true
            })
            let array = funtions.filterObjectsCodigoBarras(this.state.listaProductos, nombre)

            if (array.length > 0) {
                this.props.onChangue(array[0])               
            }
            this.setState({ textoBuscado: '' })
        } else if (nombre.length === 7) {
            let array = funtions.filterObjectsCodigoReferencia(this.state.listaProductos, nombre)

            if (array.length > 0) {
                this.setState({
                    listaProductosTemporal: array,
                    textoBuscadoLoading: false
                })
            }
        } else {
            this.setState({
                listaProductosTemporal: [],
                textoBuscadoLoading: false,
                filtroBusqueda: ''
            })
        }

        7785698423651
        7785698423652
        7785698423653



    }

    resivirListaDescripcion = (texto) => {
        var db = firebase.database()
        var productosRef = db.ref('users/' + this.state.uidUser + "/productos").orderByChild('descripcion_producto').startAt(texto)
        productosRef.once('value', snap => {
            if (snap.val()) {
                this.setState({
                    listaProductosTemporal: funtions.snapshotToArray(snap),
                    textoBuscadoLoading: false
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
                    listaProductosTemporal: funtions.snapshotToArray(snap),
                    textoBuscadoLoading: false
                })
            }
        })
    }

    resivirListaCodigoBarras = (texto) => {
        var db = firebase.database()
        var productosRef = db.ref('users/' + this.state.uidUser + "/productos").orderByChild('codigo_barras').equalTo(texto)
        productosRef.once('value', snap => {
            if (snap.val()) {
                this.setState({ textoBuscadoLoading: false })
                var listainterna = funtions.snapshotToArray(snap)
                if (listainterna.length > 0) {
                    this.props.onChangue(listainterna[0])
                    this.setState({
                        listaProductosTemporal: funtions.snapshotToArray(snap),
                        textoBuscado: ''
                    })
                }
            }
        })
    }

    handleSearchItems = (text) => {
        this.setState({ textoBuscado: text })



        this.handleSearch(text)

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
                        this.state.filtroBusqueda}
                    margin={margin ? 'dense' : 'normal'}
                    variant="outlined"

                    onFocus={(event) => this.setState({ anchorEl: event.currentTarget })}

                    autoComplete='off'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment variant="filled" position="end">
                                {
                                    this.state.textoBuscadoLoading === true &&

                                    <CircularProgress size={15} />
                                }
                                {
                                    this.state.textoBuscado.length > 0 &&
                                    <Tooltip title="Borrar busqueda" >
                                        <IconButton
                                            aria-label="Toggle clean text"
                                            onClick={() => this.setState({ textoBuscado: '', listaProductosTemporal: [], textoBuscadoLoading: false })}
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

                                {/*   <RenderPropsMenu
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
                                ></RenderPropsMenu> */}

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
            </div>
        );
    }
}

export default AutoCompleteSelectedProducto
