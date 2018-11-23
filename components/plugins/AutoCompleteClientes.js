import React from 'react';

import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';


//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import funtions from '../../utils/funtions';
import FullScreenDialog from '../components/FullScreenDialog';
import ModalNewCliente from '../modals_container/ModalNewCliente';


class AutoComplete_GetItems extends React.Component {
    state = {
        anchorEl: null,
        dataAuto: [],
        dataAutoTemporal: [],
        open: false,

        checkedKey: 'null',
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
                        var listaFiltrada = lista.filter(item => item.estado === true)
                        this.setState({
                            dataAuto: listaFiltrada,
                            dataAutoTemporal: listaFiltrada,
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


    componentWillReceiveProps(props) {
        this.getNombreDataBase(props.itemCategoria)
        this.setState({ checkedKey: props.itemCategoria })
    }

    getNombreDataBase = (codigo) => {
        if (codigo) {
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
    }

    handleToggle = value => () => {
        const { checkedKey } = this.state
        if (checkedKey === value) {
            this.setState({
                checkedKey: 'null',
            });
        } else {
            this.setState({
                checkedKey: value,
            });
        }
    };


    render() {
        const {
            anchorEl,
            open,
            checkedKey,
            estadoModalSimple,
            itemSelected,
            dataAuto,
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
                    style={styleText}
                    required
                    label={nameTextFiel}
                    margin={margin ? 'dense' : 'normal'}
                    variant="outlined"
                    onFocus={(event) => this.handleClick(event)}
                    autoComplete="off"
                />


                <FullScreenDialog openModal={estadoModalSimple}>
                    <ModalNewCliente
                        item={itemSelected}
                        handleClose={() => this.setState({ estadoModalSimple: false })}
                        usuario={this.props.usuario}
                    />
                </FullScreenDialog>

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

export default AutoComplete_GetItems
