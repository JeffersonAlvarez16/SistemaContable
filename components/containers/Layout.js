import React, { Component } from 'react';
import Head from 'next/head'

//theme
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from '../../components/theme/theme'

// firebase
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


//Login
import Login from '../components/session/Login';
import LoginContenedor from '../components/session/LoginContenedor';

const themeCont = createMuiTheme({ ...theme });

// Initialize Firebase
if (!firebase.apps.length) {
    var config = {
        apiKey: "AIzaSyDRr4xJB6BxM5Uu-xHEe7lo_6hVZ_hC8DU",
        authDomain: "facbtaapps-2bd69.firebaseapp.com",
        databaseURL: "https://facbtaapps-2bd69.firebaseio.com",
        projectId: "facbtaapps-2bd69",
        storageBucket: "facbtaapps-2bd69.appspot.com",
        messagingSenderId: "182776326473"
    };

    const firebaseApp = firebase.initializeApp(config, {
        timestampsInSnapshots: true
    });

    const api = firebaseApp.firestore()

    const settings = { timestampsInSnapshots: true };
    api.settings(settings)
    /* api.enablePersistence().then(function() {
        // Initialize Cloud Firestore through firebase
        var db = firebase.firestore();
    })
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    }); */

}


class Layout extends Component {

    state = {
        sesionState: 'cargando',
        online: true,
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    sesionState: 'iniciada'
                })

            } else {
                this.setState({ sesionState: 'cerrada' })
            }
        });
        if (navigator.onLine) {
            this.setState({
                online: true
            })
        } else {
            this.setState({
                online: false
            })
        }
        window.addEventListener('offline', () => this.setState({
            online: false
        }));
        window.addEventListener('online', () => this.setState({
            online: true
        }));
    }

    render() {
        const { children, title } = this.props
        return (
            <div>
                <Head>
                    <title>{title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <html lang="es" />

                    {/* Material Ui */}
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                </Head>
                {
                    this.state.online === true ?
                        <MuiThemeProvider theme={themeCont}>
                            <div id='rootSnackBar'></div>

                            {
                                this.state.sesionState === 'iniciada' &&
                                <LoginContenedor title={title} onChangueUserState={usuario => this.props.onChangueUserState(usuario)}>
                                    {
                                        children
                                    }
                                </LoginContenedor>
                            }

                            {
                                this.state.sesionState === 'cerrada' &&
                                <Login />
                            }
                        </MuiThemeProvider>
                        :
                        <div style={{
                            display: 'flex',
                            width: '100vw',
                            height: '100vh',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <div style={{
                                background: 'red',
                                padding: 20,
                                color: 'white',
                                borderRadius: 50
                            }}>
                                Por favor revise su conexión a internet!
                            </div>
                        </div>
                }
                <style jsx global>{`
                    body { 
                        margin:0
                    }
                `}</style>

            </div>
        );
    }
}



export default Layout;