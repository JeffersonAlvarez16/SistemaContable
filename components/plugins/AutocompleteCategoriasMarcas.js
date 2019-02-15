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
import setSnackBars from './setSnackBars';


class AutoCompleteCategoriaMarcas extends React.Component {
    state = {
        anchorEl: null,
        dataAuto: [],
        dataAutoTemporal: [],

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
                var productosRef = db.ref('users/' + user.uid + "/" + this.props.dataRef);
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            dataAuto: [],
                            estadoListaLoader: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        this.setState({
                            dataAuto: lista,
                            estadoListaLoader: 'llena'
                        })
                    } else {
                        this.setState({
                            dataAuto: [],
                            estadoListaLoader: 'vacio'
                        })
                    }
                });
            }
        });
    }

    componentWillReceiveProps(props) {

        if (props.codigomarca != undefined) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var db = firebase.database();
                    var marcasRef = db.ref('users/' + user.uid + '/marcas/' + props.codigomarca);
                    marcasRef.on('value', (snapshot) => {
                        if (snapshot.val()) {
                            this.setState({ textLabel: snapshot.val().nombre })
                        }
                    })
                }
            })
        }
    }

    handleSearchItems = (text) => {
        this.setState({ textoBuscado: text })
        if (text.length > 0) {
            let array = funtions.filterObjectsnombre(this.state.dataAuto, text)
            this.setState({
                dataAutoTemporal: array
            })
            console.log(array)
        } else {
            this.setState({
                dataAutoTemporal: []
            })
        }
    }


    handleToggle = (item) => {
        this.props.onChangue(item)
        this.setState({
            dataAutoTemporal: [],
            textoBuscado: '',
            textLabel: item.nombre
        })
    }

    guardar = () => {
        if (this.state.dataAutoTemporal.length === 0 && this.state.textoBuscado.length > 0) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    var codigo = funtions.guidGenerator()
                    var db = firebase.database();
                    var productosRef = db.ref('users/' + user.uid + "/" + this.props.dataRef + "/" + codigo);
                    productosRef.set({
                        nombre: this.state.textoBuscado
                    })
                    var item = {
                        id: codigo,
                        nombre: this.state.textoBuscado
                    }
                    this.handleToggle(item)
                }
                setSnackBars.openSnack('success', 'rootSnackBar', `${this.props.dataRefObject.toUpperCase()} creada`, 2000)

            })
        }


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
                    label={this.state.textLabel != null  ? this.state.textLabel : this.props.dataRefObject}
                    margin={margin ? 'dense' : 'normal'}
                    variant="outlined"
                    onFocus={(event) => this.setState({ anchorEl: event.currentTarget })}
                    error={this.props.error}
                    autoComplete='off'
                    onBlur={() => {
                        this.guardar()
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment variant="filled" position="end">
                                {
                                    this.state.textoBuscado.length > 0 &&
                                    <Tooltip title="Borrar busqueda" >
                                        <IconButton
                                            aria-label="Toggle clean text"
                                            onClick={() => this.setState({ textoBuscado: '', dataAutoTemporal: [] })}
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

                <Popper open={this.state.dataAutoTemporal.length > 0} anchorEl={anchorEl} transition style={{ zIndex: 1300, maxWidth: 500 }} >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper elevation={15}>
                                {
                                    <List style={{ maxHeight: 100, overflow: 'auto' }}>
                                        {
                                            this.state.dataAutoTemporal.map((item) => {
                                                return (
                                                    <ListItem key={item.id} button onClick={() =>
                                                        this.handleToggle(item)
                                                    }
                                                    >
                                                        <ListItemText style={{ width: '15vw' }} primary={`${item.nombre}`} />

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

export default AutoCompleteCategoriaMarcas
