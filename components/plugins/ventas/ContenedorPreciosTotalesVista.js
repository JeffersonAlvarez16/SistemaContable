import React from 'react';
import { Typography, FormControlLabel, Switch, Button, TextField, Grid } from '@material-ui/core';

const ContenedorPreciosTotalesVista = (props) => {
    const styles = {
        textFields: {
            marginRight: 16,
            marginLeft: 16,
            width: '90%'
        },
        styleClientes: {
            width: '100%',
        }
    }
    console.log(props);
    return (
        <div>
            {
                props.puntoVenta === true ?
                    <></>
                    :
                    <TextField
                        id="outlined-multiline-static-comentario"
                        label="Descuento"
                        variant="outlined"
                        margin="dense"
                        style={styles.textFields}
                        value={props.descuento}
                        onChange={e => {
                            props.handleDescontar(e.target.value)
                        }}
                        autoComplete='off'
                    />
            }

            {
                props.puntoVenta === true ?
                    <>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Typography variant="body2" style={{ paddingTop: 5, paddingLeft: 16,fontSize:20 }}>
                                SubTotal
                    </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography variant="body2" style={{ paddingTop: 5, paddingRight: 16,fontSize:20  }}>
                                {Number(props.sumaSubTotal).toFixed(2)}
                            </Typography>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Typography variant="body2" style={{ paddingTop: 5, paddingLeft: 16,fontSize:20  }}>
                                Iva
                    </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography variant="body2" style={{ paddingTop: 5, paddingRight: 16,fontSize:20  }}>
                                {Number(props.sumaIva).toFixed(2)}
                            </Typography>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Typography variant="body2" style={{ paddingTop: 5, paddingLeft: 16 ,fontSize:20 }}>
                                Total
                    </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography variant="body2" style={{ paddingTop: 5, paddingRight: 16,fontSize:20  }}>
                                {(Number(props.sumaTotal)).toFixed(2)}
                            </Typography>
                        </div>
                    </>
                    :
                    <>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Typography variant="body2" style={{ paddingTop: 5, paddingLeft: 16 }}>
                                SubTotal
                    </Typography>
                            <div style={{ flex: 1 }}></div>
                            <Typography variant="body2" style={{ paddingTop: 5, paddingRight: 16 }}>
                                {Number(props.sumaSubTotal).toFixed(2)}
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
                                {Number(props.sumaIva).toFixed(2)}
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
                                {(Number(props.sumaTotal)).toFixed(2)}
                            </Typography>
                        </div>
                    </>
            }

            <TextField
                id="outlined-multiline-static-comentario"
                label="Comentario"
                multiline
                rows="2"
                variant="outlined"
                margin="dense"
                style={{ display: 'none' }}
                value={props.observacion}
                onChange={e => {
                    props.handleObservacion(e.target.value)
                }}
                autoComplete='off'
            />

            {
                props.puntoVenta === true ?
                    <></>
                    :
                    <>
                        {
                            props.tipo_pago === 'efectivo' &&
                            <Grid container variant="permanent" spacing={20} style={{ width: '95%' }}>
                                <Grid item xs={6} >
                                    <TextField
                                        id="outlined-name"
                                        label="Dinero resivido"
                                        margin="dense"
                                        variant="outlined"
                                        style={styles.textFields}
                                        value={props.dinero_resibido}
                                        error={props.dinero_resibido.length > 0 ? false : true}
                                        onChange={e => {
                                            props.handleDineroResibido(e.target.value)
                                        }}
                                        autoComplete='off'
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <TextField
                                        id="outlined-vuelto"
                                        label="Cambio"
                                        margin="dense"
                                        variant="outlined"
                                        style={styles.textFields}
                                        autoComplete='off'
                                        value={props.cambio}
                                    />
                                </Grid>
                            </Grid>
                        }
                    </>
            }
            {
                props.puntoVenta === true ?
                    <></>
                    :
                    <Grid container variant="permanent" spacing={20} style={{ width: '95%', paddingLeft: 16 }}>
                        <div style={{ display: props.tipo_venta === 'final' ? 'none' : 'block' }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={props.facturaElectronica}
                                        onChange={() => props.handleFacturaElectronica()}
                                    />}
                                label="Factura Electrónica"
                            />
                        </div>
                    </Grid>
            }
        </div>
    );
}

export default ContenedorPreciosTotalesVista;