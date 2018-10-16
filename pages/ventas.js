import React, { Component } from 'react';
import Layout from '../components/containers/Layout';
import Grid from '@material-ui/core/Grid';
import SectionFactura from '../components/components/SectionFactura';
import SectionContentFactura from '../components/components/SectionContentFactura';





class Ventas extends Component {

    

    render() {

        

        return (
            <Layout title="Ventas">
                <div>
                    <Grid container
                        variant="permanent"
                        style={{
                            minHeight: '100vh'
                        }}
                    >
                        <Grid item xs={9}>
                            <SectionContentFactura/>
                        </Grid>
                        <Grid item xs={3}>
                            <SectionFactura />
                        </Grid>

                    </Grid>
                </div>
            </Layout>
        );
    }
}

export default Ventas