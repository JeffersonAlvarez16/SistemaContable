import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ItemUser from './ItemUser'
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import setSnackBars from '../../plugins/setSnackBars';

// firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import funtions from '../../../utils/funtions';


class LoginUsuarios extends Component {
    state = {
        stateUsers: 'vacia',
        users: [],

        opendialog: false,
        userSelecionado: {},
        userSelecionadoPassword: ''
    }

    componentDidMount() {
        this.setState({
            stateUsers: this.props.stateUsers,
            users: this.props.users
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            stateUsers: props.stateUsers,
            users: props.users
        })
    }

    handleClickOpen = (item) => {
        this.setState({ opendialog: true, userSelecionado: item, userSelecionadoPassword: '' });
    };

    handleClose = () => {
        this.setState({ opendialog: false });
    };

    handleLoginUser = () => {
        if (this.state.userSelecionado.password === this.state.userSelecionadoPassword) {
            sessionStorage.setItem("code-status-ser-section", this.state.userSelecionado.code);
            setSnackBars.openSnack('success', 'rootSnackBar', `Bienvenido ${this.state.userSelecionado.nombre}`, 2000)
            this.handleClose()
            funtions.setTime(500, () => {
                this.props.onChangueStatusSession(this.state.userSelecionado.code)
            })
        } else {
            setSnackBars.openSnack('error', 'rootSnackBar', 'Contraseña incorrecta', 2000)
        }
    }

    render() {
        const { opendialog, stateUsers, users } = this.state;

        return (
            <div>

                <Dialog
                    open={opendialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.userSelecionado.nombre}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Input
                                placeholder="Contraseña"
                                type='password'
                                inputProps={{
                                    'aria-label': 'password user',
                                }}
                                value={this.state.userSelecionadoPassword}
                                onChange={(text) => this.setState({ userSelecionadoPassword: text.target.value })}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={this.handleLoginUser} color="primary" autoFocus>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>

                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{flex:1}}></div>
                    <Button onClick={() => firebase.auth().signOut()} color="primary" autoFocus>
                        Cerrar Sesion
                    </Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <div>
                        <Typography component="h1" variant="display2" gutterBottom>
                            Usuarios del sistema
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            {
                                stateUsers === 'cargando' &&
                                <CircularProgress />
                            }
                            {
                                stateUsers === 'vacia' &&
                                <Typography component="title" variant="headline" gutterBottom>
                                    Lista de usuarios vacía
                                </Typography>
                            }
                            {
                                stateUsers === 'llena' &&
                                <div>
                                    {
                                        users.map((item) => <ItemUser key={item.id} onClick={() => this.handleClickOpen(item)} title={item.nombre} />)
                                    }
                                </div>
                            }

                        </div>

                    </div>
                </div>


                <style jsx global>{`
                    .paperstyle { 
                        cursor: pointer;
                    }
                    .paperstyle:hover { 
                        border: 4px solid #334;
                    }
                `}</style>
            </div>
        );
    }
}

export default LoginUsuarios;