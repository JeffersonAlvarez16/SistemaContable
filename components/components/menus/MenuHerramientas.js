import React, { Component, Children } from 'react';
import Grid from '@material-ui/core/Grid';

class MenuHerramientas extends Component {
    render() {
        const { children } = this.props
        return (
            <Grid container spacing={16} style={{ marginLeft: 16, marginRight: 16, marginTop: 5, marginBottom: 5 }}>
                {
                    children
                }
            </Grid>
        );
    }
}

export default MenuHerramientas;