import React, { Component } from 'react'
import Layout from '../components/containers/Layout';

class Main extends Component {

    state = {
        initialState: false,
        usuario: {
            nombre: ''
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                initialState: true
            })
        }, 0);
    }

    render() {

        return (
            <div>
                {
                    this.state.initialState ?
                        <Layout title="Bienvenido" onChangueUserState={usuario => this.setState({ usuario: usuario })}>
                            <div style={{
                                display:'flex',
                                textAlign:'center',
                                width: '100%',
                                height:'80vh',
                                paddingTop:'20px',
                                alignItems:'center',
                                justifyContent:'center',
                                fontSize:36,
                                fontFamily: "Lucida Sans Typewriter"

                            }}>{`${this.state.usuario.nombre}`} <br/> RapiFac te da la bievenida</div>
                        </Layout>
                        :
                        <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src="/static/spinner.gif"></img>
                        </div>
                }
            </div>
        )
    }
}

export default Main