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


class AutoCompleteSelectedProducto extends React.Component {
    state = {
        anchorEl: null,
        listaProductos: [],
        listaProductosTemporal: [],

        //estado lista 
        estadoListaLoader: 'vacia',
        //texto buscado
        textoBuscado: '',
        //selecciona automatica
        checkedSeleccionAutomatica: false
    };


    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
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



    handleSearchItems = (text) => {
        this.setState({ textoBuscado: text })
        if (this.state.checkedSeleccionAutomatica) {
            let array = funtions.filterObjectsCodigo(this.state.listaProductos, text)
            if(array.length===1){
                this.props.onChangue(array[0])
                this.setState({
                    listaProductosTemporal: [],
                    textoBuscado: ''
                })
            }
        } else {
            if (text.length > 0) {
                let array = funtions.filterObjectsCodigo(this.state.listaProductos, text)
                this.setState({
                    listaProductosTemporal: array
                })

            } else {
                this.setState({
                    listaProductosTemporal: []
                })
            }
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
                    margin={margin ? 'dense' : 'normal'}
                    variant="outlined"
                    onFocus={(event) => this.setState({ anchorEl: event.currentTarget })}

                    autoComplete='off'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment variant="filled" position="end">
                                {
                                    this.state.textoBuscado.length > 0 &&
                                    <Tooltip title="Borrar busqueda" >
                                        <IconButton
                                            aria-label="Toggle clean text"
                                            onClick={() => this.setState({ textoBuscado: '', listaProductosTemporal:[] })}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                }

                                <Tooltip title="Seleccion Automática" >
                                    <Checkbox
                                        checked={this.state.checkedSeleccionAutomatica}
                                        onChange={() => this.setState({ checkedSeleccionAutomatica: !this.state.checkedSeleccionAutomatica })}
                                    />
                                </Tooltip>

                            </InputAdornment>
                        ),
                    }}
                />

                <Popper open={this.state.listaProductosTemporal.length > 0} anchorEl={anchorEl} transition style={{ zIndex: 1300, minWidth:450 }} >
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
