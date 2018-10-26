import React, { Component } from 'react';
import ClippedDrawer from '../ClippedDrawer';
import LoginUsuarios from './LoginUsuarios'

//firebase
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

import funtions from '../../../utils/funtions';

class LoginContenedor extends Component {
    state = {
        idUser: null,
        userSelected: null,
        users: [],
    }

    componentDidMount() {
        this.setState({
            stateUsers: 'cargando',
        })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/usuarios');
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        let array = funtions.snapshotToArray(snapshot)
                        this.setState({
                            stateUsers: 'llena',
                            users: array
                        })
                        this.checkStatusSession(array)
                    }
                })
            }
        })
    }

    checkStatusSession = (array) => {
        const idSessionUser = sessionStorage.getItem("code-status-ser-section");
        if (idSessionUser) {
            const itemUser = array.filter(item => {
                return item.code === idSessionUser
            })
            itemUser[0] ?
                this.changueStatusSesionUserLocal(idSessionUser, itemUser)
                :
                this.setState({
                    idUser: null,
                    userSelected: null
                })
        } else {
            this.setState({
                idUser: null,
                userSelected: null
            })
        }
    }

    changueStatusSesionUserLocal = (idSessionUser, itemUser) => {
        this.setState({
            idUser: idSessionUser,
            userSelected: itemUser[0]
        })
        this.props.onChangueUserState(this.state.users.filter(user => user.code === idSessionUser)[0])
    }

    changueStatusSesionUser = (id) => {
        this.setState({
            idUser: id,
            userSelected: this.state.users.filter(user => user.code === id)[0]
        })
        this.props.onChangueUserState(this.state.users.filter(user => user.code === id)[0])
    }

    closeStatusSesionUser = () => {
        this.setState({
            idUser: null,
            userSelected: null
        })
    }

    render() {
        const { title, children } = this.props
        const { idUser, stateUsers, users } = this.state

        return (
            <div>
                {
                    idUser ?
                        <ClippedDrawer
                            title={title}
                            user={this.state.userSelected}
                            closeSesion={this.closeStatusSesionUser}
                        >
                            {
                                children
                            }
                        </ClippedDrawer>
                        :
                        <LoginUsuarios
                            stateUsers={stateUsers}
                            users={users}
                            onChangueStatusSession={this.changueStatusSesionUser}
                        />
                }
            </div>
        );
    }
}

export default LoginContenedor;