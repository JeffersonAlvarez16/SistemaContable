import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';




class ImpuestoRetencion extends Component {

    state = {
        tipo_porcentaje: '',
        tipo_documento: '01',
    }

    componentDidMount() {
        setTimeout(() => { this.props.changueData(this.state) }, 100)
        if (Number(this.props.impuesto) === 1) {
            this.setState({
                tipo_porcentaje: "312"
            })
        } else {
            this.setState({
                tipo_porcentaje: "9"
            })
        }
    }

    render() {
        const { impuesto } = this.props

        const style = {
            styleText: {
                width: '100%'
            }
        }


        return (
            <div>
                <div style={{ display: 'flex', flexDiretion: 'row' }}>
                    {
                        impuesto === 2 &&
                        <>
                            <Typography variant="title" gutterBottom>
                                Retención al IVA
                        </Typography>
                        </>
                    }
                    {
                        impuesto === 1 &&
                        <>
                            <Typography variant="title" gutterBottom>
                                Retención a la Renta
                        </Typography>
                        </>
                    }
                </div>

                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        {
                            impuesto === 2 &&
                            <TextField
                                id="standard-tipo-porcentaje"
                                select
                                label="Tipo Porcentaje"
                                error={this.state.tipo_porcentaje.length > 0 ? false : true}
                                value={this.state.tipo_porcentaje}
                                onChange={event => {
                                    this.setState({ tipo_porcentaje: event.target.value })
                                    setTimeout(() => { this.props.changueData(this.state) }, 100)
                                }}
                                margin="normal"
                                variant="filled"
                                style={style.styleText}
                            >
                                <MenuItem value={'9'}>10%</MenuItem>
                                <MenuItem value={'10'}>20%</MenuItem>
                                <MenuItem value={'1'}>30%</MenuItem>
                                <MenuItem value={'2'}>70%</MenuItem>
                                <MenuItem value={'3'}>100%</MenuItem>
                            </TextField>
                        }
                        {
                            impuesto === 1 &&
                            <TextField
                                id="standard-tipo-porcentaje-renta"
                                select
                                label="Tipo Porcentaje"
                                disabled
                                error={this.state.tipo_porcentaje.length > 0 ? false : true}
                                value={this.state.tipo_porcentaje}
                                onChange={event => {
                                    this.setState({ tipo_porcentaje: event.target.value })
                                    setTimeout(() => { this.props.changueData(this.state) }, 100)
                                }}
                                margin="normal"
                                variant="filled"
                                style={style.styleText}
                            >
                                <MenuItem value={'312'}>0.1%</MenuItem>
                                <MenuItem value={'327'}>0.2%</MenuItem>
                                <MenuItem value={'304'}>0.8%</MenuItem>
                                <MenuItem value={'308'}>0.10%</MenuItem>
                            </TextField>
                        }

                    </Grid>                   
                    <Grid item xs={4}>
                        <TextField
                            id="filled-tipo-documento"
                            select
                            label="Tipo de documento"
                            error={this.state.tipo_documento.length > 0 ? false : true}
                            value={this.state.tipo_documento}
                            onChange={event => {
                                this.setState({ tipo_documento: event.target.value })
                                setTimeout(() => { this.props.changueData(this.state) }, 100)
                            }}
                            margin="normal"
                            variant="filled"
                            style={style.styleText}
                        >
                            <MenuItem value={'01'}>Factura</MenuItem>
                            <MenuItem value={'04'}>Nota de credito</MenuItem>
                            <MenuItem value={'05'}>Nota de debito</MenuItem>
                            <MenuItem value={'06'}>Guia de retención</MenuItem>
                            <MenuItem value={'07'}>Comprobante de retención</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-valor"
                            label="Valor"
                            value={this.props.valor}
                            margin="normal"
                            variant="filled"
                            style={style.styleText}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ImpuestoRetencion;