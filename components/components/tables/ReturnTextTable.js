import React, { Component } from 'react';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

class ReturnTextTable extends Component {

    state = {
        texto: ''
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ usuarioUID: user.uid })
                if (typeof  this.props.codigo === 'object') {
                }else{
                    var db = firebase.database();
                    var productosRef = db.ref('users/' + user.uid + '/' + this.props.referencia + '/' + this.props.codigo + '/' + this.props.datoTraido);
                    productosRef.on('value', (snapshot) => {
                        if (snapshot.val()) {
                            this.setState({ texto: snapshot.val() })
                        } else {
                            this.setState({ texto: '' })
                        }
                    })
                }
            }
        })

    }

    render() {
        return (
            <div>
                {
                    this.props.estado === false ?
                        <div style={{ color: 'rgba(0,0,0,0.5)', width: 'max-content' }}>{this.state.texto}</div>
                        :
                        <div style={{ width: 'max-content' }}>{this.state.texto}</div>
                }
            </div>
        );
    }
}

export default ReturnTextTable;