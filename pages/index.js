import React, { Component } from 'react'
import Layout from '../components/containers/Layout';

class Main extends Component {

    state = {
        initialState: false
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
                            <Layout title="FastBtaApps">
                                <div>hola</div>
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