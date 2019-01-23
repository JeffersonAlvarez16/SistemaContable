import React from 'react';

import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check'; 
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';


import ModalContainerNormal from '../modals_container/ModalContainerNormal'
import ModalNewCategoria from '../modals_container/ModalNewCategoria'



//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import funtions from '../../utils/funtions';
import setSnackBars from './setSnackBars';


class AutoCompleteAdmin extends React.Component {
    state = {
        anchorEl: null,
        dataAuto: [],
        dataAutoTemporal: [],
        open: false,

        checkedKey: null,
        // estado del modal
        estadoModalSimple: false,
        //item seleccionado
        itemSelected: null,
        //tipo modal estado
        estadoModal: null,
        //Valor del texto del modal
        valorTextoNuevoEditar: '',
        //texto text field
        textoNombreProveedor: ''
    };

    handleClick = event => {
        const { currentTarget } = event;
        this.setState({
            anchorEl: currentTarget,
            open: true
        });
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
                            dataAutoTemporal: [],
                            estadoTabla: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        this.setState({
                            dataAuto: lista,
                            dataAutoTemporal: lista,
                            estadoTabla: 'llena'
                        })
                    } else {
                        this.setState({
                            dataAuto: [],
                            dataAutoTemporal: [],
                            estadoTabla: 'vacio'
                        })
                    }
                });
            }
        });
    }

    componentWillReceiveProps(props){
        this.getNombreDataBase(props.itemCategoria)
        this.setState({checkedKey:props.itemCategoria})
    }

    getNombreDataBase = (codigo) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + "/" + this.props.dataRef + "/" + codigo);
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            textoNombreProveedor: snapshot.val().nombre
                        })
                    } else {
                        this.setState({
                            textoNombreProveedor: ''
                        })
                    }
                })
            }
        })
    }

    getResult = (array, text) => {
        var arrayL = array.filter((obj) => obj.nombre.toLowerCase().includes(text))
        if (arrayL.length > 0) {
            this.setState({
                dataAuto: [arrayL]
            })
        } else {
            this.setState({
                dataAuto: [{ nombre: 'No existe', key: 0 }]
            })
        }

    }

    handleSetTextCategori = () => {
        this.setState({
            open: false
        })
    }

    handleToggle = value => () => {
        const { checkedKey } = this.state
        if (checkedKey === value) {
            this.setState({
                checkedKey: null,
            });
        } else {
            this.setState({
                checkedKey: value,
            });
        }
    };

    handleNuevoItem = (nuevoItem) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + "/" + this.props.dataRef + "/" + funtions.guidGenerator());
                productosRef.set({
                    nombre: nuevoItem
                })
            }
        });
    }

    handleActualizarItem = (nuevoItem, id) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + "/" + this.props.dataRef + "/" + id);
                productosRef.update({
                    nombre: nuevoItem
                })
            }
        });
    }


    handleEliminarItem = async (id) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + "/" + this.props.dataRef + "/" + id);
                var collections = db.ref('users/' + user.uid + "/" + "productos");

                collections.orderByChild(this.props.dataRefObject + '/id').equalTo(id).once('value').then((snap) => {
                    if (snap.val()) {
                        setSnackBars.openSnack('error', 'rootSnackBar', "Esta categoria está ocupada", 2000)
                    } else {
                        productosRef.remove()
                    }
                })


            }
        });
    }


    render() {
        const {
            anchorEl,
            open,
            checkedKey,
            estadoModalSimple,
            itemSelected,
            dataAuto,
            estadoModal,
            valorTextoNuevoEditar,
            textoNombreProveedor
        } = this.state;

        const {
            itemCategoria,
            id,
            styleText,
            nameTextFiel,
            margin,
            textItemVacio
        } = this.props

        return (

            <div  >
                <TextField
                    id={id}
                    variant="contained"
                    error={textoNombreProveedor ? textoNombreProveedor.length > 0 ? false : true : true}
                    value={`${textoNombreProveedor}`}
                    onChange={(event) => {
                        //this.handleClick(event)
                        //this.setState({ anchorEl: event.currentTarget})
                        //this.getResult(this.state.dataAutoTemporal, event.target.value)
                        //this.props.changueText(event.target.value)
                    }}
                    style={styleText}
                    required
                    label={nameTextFiel}
                    margin={margin ? 'dense' : 'normal'}
                    variant="outlined"
                    onFocus={(event) => this.handleClick(event)}
                />

                <ModalContainerNormal
                    open={estadoModalSimple}
                    handleClose={() => this.setState({ estadoModalSimple: false })}
                >
                    <ModalNewCategoria
                        item={itemSelected}
                        estadoModal={estadoModal}
                        title={nameTextFiel}
                        handleClose={() => this.setState({ estadoModalSimple: false })}
                        valorTexto={valorTextoNuevoEditar}
                        handleSetValorTexto={text => this.setState({ valorTextoNuevoEditar: text })}
                        handleNuevoItem={text => this.handleNuevoItem(text)}
                        handleActualizarItem={(text, id) => this.handleActualizarItem(text, id)}
                        handleEliminarItem={id => this.handleEliminarItem(id)}
                    />
                </ModalContainerNormal>

                <Popper open={open} anchorEl={anchorEl} transition style={{ zIndex: 1300, minWidth: 350 }} >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper elevation={6}>
                                <AppBar position="static" color="default">
                                    <Toolbar>
                                        <Tooltip title="Seleccionar" placement="top">
                                            <IconButton color="primary" onClick={() => {
                                                this.props.changueText(checkedKey)
                                                this.setState({ open: false })
                                                this.getNombreDataBase(checkedKey)
                                            }}>
                                                <CheckIcon fontSize="small" />
                                            </IconButton >
                                        </Tooltip>
                                       {/*  <Tooltip title="Cancelar" placement="top">
                                            <IconButton color="secondary" onClick={() => {
                                                this.setState({ open: false })
                                            }}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton >
                                        </Tooltip> */}
                                        <div style={{ display: 'flex', flex: 1 }}></div>
                                        <Tooltip title="Agregar" placement="top">
                                            <IconButton color="secondary" onClick={() => {
                                                this.setState({
                                                    itemSelected: null,
                                                    estadoModalSimple: true,
                                                    estadoModal: 'nuevo',
                                                    valorTextoNuevoEditar: ''
                                                })
                                            }}>
                                                <AddIcon fontSize="small" />
                                            </IconButton >
                                        </Tooltip>
                                        <Tooltip title="Editar" placement="top">
                                            <IconButton color="secondary" onClick={() => {
                                                if (checkedKey != null) {
                                                    this.setState({
                                                        itemSelected: dataAuto.filter(item => item.id === checkedKey)[0],
                                                        estadoModalSimple: true,
                                                        estadoModal: 'editar',
                                                        valorTextoNuevoEditar: dataAuto.filter(item => item.id === checkedKey)[0].nombre
                                                    })
                                                }
                                            }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton >
                                        </Tooltip>
                                        <Tooltip title="Eliminar" placement="top">
                                            <IconButton color="secondary" onClick={() => {
                                                if (checkedKey != null) {
                                                    this.setState({
                                                        itemSelected: dataAuto.filter(item => item.id === checkedKey)[0],
                                                        estadoModalSimple: true,
                                                        estadoModal: 'eliminar'
                                                    })
                                                }
                                            }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton >
                                        </Tooltip>
                                    </Toolbar>
                                </AppBar>
                                {
                                    dataAuto.length > 0 ?
                                        <List style={{ maxHeight: 200, overflow: 'auto' }}>
                                            {
                                                this.state.dataAuto.map((item) => {
                                                    return (
                                                        <ListItem key={item.id} button onClick={
                                                            this.handleToggle(item.id)
                                                            //this.props.changueText(item.nombre)
                                                            //this.handleSetTextCategori()
                                                        }
                                                        >
                                                            <Checkbox
                                                                style={{ padding: 0 }}
                                                                onChange={this.handleToggle(item.id)}
                                                                checked={checkedKey === item.id}
                                                            />
                                                            <ListItemText primary={`${item.nombre}`} />
                                                        </ListItem>
                                                    )
                                                }
                                                )
                                            }
                                        </List>
                                        :
                                        <div style={{ margin: 16, paddingBottom: 16 }}>
                                            <Typography variant="subheading" gutterBottom>
                                                {textItemVacio}
                                            </Typography>
                                        </div>
                                }

                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div >
        );
    }
}

export default AutoCompleteAdmin
