import React, { Component } from 'react';
//lista dependecias
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import { TextField, InputAdornment, IconButton, Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import funtions from '../../utils/funtions';

import ModalContainerNormal from '../modals_container/ModalContainerNormal';
import ModalSettingsPrices from '../modals_container/ModalSettingsPrices';

class ContainerSelectPrecios extends Component {
    state = {
        precios: [],
        //estado modales
        estadoModalSimple: false,
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/precios')
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            precios: funtions.snapshotToArray(snapshot)
                        })
                    }
                })
            }
        })
    }
    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}
                        style={{
                            marginLeft: 12,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <Typography variant="title" gutterBottom>
                            Precios
                        </Typography>
                        <div style={{ flex: 1 }}></div>
                        <Tooltip title="Configurar precios">
                            <IconButton
                                color="primary"
                                aria-label="Add to price"
                                onClick={() => {
                                    this.setState({
                                        estadoModalSimple: true
                                    })
                                }}
                            >
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>

                <ModalContainerNormal
                    open={this.state.estadoModalSimple}
                    handleClose={() => this.setState({ estadoModalSimple: false })}
                >
                    <ModalSettingsPrices
                        handleClose={() => this.setState({ estadoModalSimple: false })}
                    >

                    </ModalSettingsPrices>
                </ModalContainerNormal>

                <List style={{ padding: 0 }}>
                    {
                        this.state.precios.map(item => {
                            if (Boolean(item.estado)) {
                                return <ListItem style={{ padding: 0 }}>
                                    <TextField
                                        id={item.codigo}
                                        variant="filled"
                                        label={<div style={{ marginLeft: 80 }}>{item.nombre}</div>}
                                        value={((Number(this.props.precio_costo) * Number(item.porcentaje) + Number(this.props.precio_costo)).toFixed(2))}
                                        style={{ width: '100%' }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <div style={{ marginTop: 17, width: 'max-content', color: 'rgba(0,0,0,0.4)' }}> {`+ %${item.porcentaje}`} =</div>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </ListItem>
                            }
                        })
                    }

                </List>
            </div>
        );
    }
}

export default ContainerSelectPrecios;