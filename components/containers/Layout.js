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
        sesionState: 'cargando'
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                //var displayName = user.displayName;
                var email = user.email;
                //var emailVerified = user.emailVerified;
                //var photoURL = user.photoURL;
                //var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                //var providerData = user.providerData;  
                //setSnackBars.openSnack('success', 'rootSnackBar', 'Bienvenido a FactBtaApps', 2000)
                /*setTimeout(() => { */
                this.setState({
                    sesionState: 'iniciada'
                })
                /*  }, 1000); */

            } else {
                // User is signed out.
                this.setState({ sesionState: 'cerrada' })
            }
        });

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
                <MuiThemeProvider theme={themeCont}>
                    <div id='rootSnackBar'></div>

                    {
                        this.state.sesionState === 'iniciada' &&
                        <LoginContenedor title={title} onChangueUserState={this.props.onChangueUserState}>
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