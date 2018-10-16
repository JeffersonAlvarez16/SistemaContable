import React, { Component } from 'react';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AutoCompleteTextField from '../plugins/AutoCompleteTextField';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const clientes = [
    {
        key: 'sasa1',
        nombre: '19006775 darwin Alvarez'
    },
    {
        key: 'sasa2',
        nombre: '19006775 darwin Alvarez'
    },
    {
        key: 'sasa3',
        nombre: '19006775 darwin Alvarez'
    },
    {
        key: 'sasa4',
        nombre: '19006775 darwin Alvarez'
    },
]


class SectionFactura extends Component {

    state = {
        cliente: ''
    }

    changueTextCliente = (event) => {
        this.setState({
            cliente: event
        })
    }

    render() {

        const styles = {
            textFields: {
                marginRight: 16,
                marginLeft: 16,
                width: '90%'
            }
        }

        return (
            <Paper style={{ height: '90%', position:'fixed' }}>
                <Typography variant="title" style={{ paddingTop: 16, paddingLeft: 16 }}>
                    Nombre de cliente
                </Typography>
                <Typography variant="subheading" style={{ paddingTop: 5, paddingLeft: 16 }}>
                    1900000000
                </Typography>
                <Typography variant="caption" style={{ paddingTop: 15, paddingLeft: 16 }}>
                    darwin@gmail.com
                </Typography>
                <Typography variant="caption" style={{ paddingTop: 2, paddingLeft: 16 }}>
                    0985056954
                </Typography>

                <AutoCompleteTextField
                    styleText={styles.textFields}
                    id='autoClientes'
                    nameTextFiel="Cliente"
                    dataAutoComplete={clientes}
                    value={this.state.cliente}
                    changueText={this.changueTextCliente}
                    margin="dense"
                    textItemVacio='Esta categoria no existe, pero será creada'
                />

                <Divider style={{ marginTop: 15, marginBottom: 15 }} />

                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Typography variant="body2" style={{ paddingTop: 5, paddingLeft: 16 }}>
                        SubTotal
                                    </Typography>
                    <div style={{ flex: 1 }}></div>
                    <Typography variant="body2" style={{ paddingTop: 5, paddingRight: 16 }}>
                        00000
                                    </Typography>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Typography variant="body2" style={{ paddingTop: 5, paddingLeft: 16 }}>
                        Iva
                                    </Typography>
                    <div style={{ flex: 1 }}></div>
                    <Typography variant="body2" style={{ paddingTop: 5, paddingRight: 16 }}>
                        00000
                                    </Typography>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Typography variant="body2" style={{ paddingTop: 5, paddingLeft: 16 }}>
                        Total
                                    </Typography>
                    <div style={{ flex: 1 }}></div>
                    <Typography variant="body2" style={{ paddingTop: 5, paddingRight: 16 }}>
                        00000
                                    </Typography>
                </div>

                <TextField
                    id="outlined-multiline-static"
                    label="Comentario"
                    multiline
                    rows="3"
                    variant="outlined"
                    margin="dense"
                    style={styles.textFields}
                />

                <Divider style={{ marginTop: 15, marginBottom: 15 }} />

                <TextField
                    id="outlined-name"
                    label="Dinero resivido"
                    //onChange={this.handleChange('name')}
                    margin="dense"
                    variant="outlined"
                    style={styles.textFields}
                />

                <TextField
                    id="outlined-vuelto"
                    label="Cambio"
                    margin="dense"
                    //onChange={this.handleChange('name')}
                    variant="outlined"
                    style={styles.textFields}
                />

                <Grid container
                    variant="permanent" spacing={20} style={styles.textFields}>
                    <Grid item xs={4} style={{ padding: 5 }}>
                        <Button variant="contained" size="small" color="primary" style={{ width: '100%' }}>
                            Aceptar
                                        </Button>
                    </Grid>
                    <Grid item xs={4} style={{ padding: 5 }}>
                        <Button variant="contained" size="small" color="secondary" style={{ width: '100%' }}>
                            Suspender
                                        </Button>
                    </Grid>
                    <Grid item xs={4} style={{ padding: 5 }}>
                        <Button variant="contained" size="small" color="secondary" style={{ width: '100%' }}>
                            Cancelar
                                        </Button>
                    </Grid>
                </Grid>

            </Paper>
        );
    }
}

export default SectionFactura;