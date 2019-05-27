import React, { Component } from 'react';
import { Grid, CircularProgress, Input, FormControl, InputLabel, InputAdornment } from '@material-ui/core';
import Search from '../../components/Search';
import AutoCompleteRetenciones from '../AutoCompleteRetenciones'
import AutoCompleteSelectedProducto from '../AutoCompleteSelectedProducto';
import ImpuestoRetencion from './ImpuestoRetencion';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';


import ReactGA from 'react-ga';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import setSnackBars from '../setSnackBars';
import funtions from '../../../utils/funtions';
import ModalContainerNormal from '../../modals_container/ModalContainerNormal';
import MaskedInput from "react-text-mask";
import NumberFormat from 'react-number-format';


import SeleccionarFecha from '../plugins/SeleccionarFecha';
import SeleccionarHora from '../plugins/SeleccionarHora';


class NuevaRetencion extends Component {
    state = {
        estado_contabilidad: null,
        retencionIva: {},
        retencionRenta: {},
        proveedor: null,
        fecha_emision_mes: '01',
        fecha_emision_year: '2018',
        fecha_emision_documento_sustento: '',
        numero_documento: '',
        base_disponible: '',
        valorIVA: '',
        valorRenta: '',
        //modals
        estadoModalEmitirRetencion: false,
        //ambientes
        ambienteFacturacion: 0,
        numero_retencion: ''
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);

        const fecha = new Date().toISOString().toString().split(':')
        var fechas = fecha[0] + ':' + fecha[1]
        var hora = new Date()
        this.setState({
            fecha_emision_documento_sustento: fechas,
            hora_emision_documento_sustento: hora
        })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var empresaRef = db.ref('auth_admins/' + user.uid + "/ambiente")
                empresaRef.on('value', (snap) => {
                    if (snap.val()) {
                        this.setState({ ambienteFacturacion: snap.val() })
                    }
                })
            }
        })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var empresaRef = db.ref('users/' + user.uid + "/configuracion")
                empresaRef.on('value', (snap) => {
                    if (snap.val()) {
                        const numero_factura = snap.val().numero_retencion
                        const suma = Number(numero_factura) + 1
                        const tamaño = String(suma).length
                        const restaTamaño = 9 - Number(tamaño)
                        var cadenaFinal = ''
                        for (var i = 0; i < restaTamaño; i++) {
                            cadenaFinal = cadenaFinal + '0'
                        }
                        const sumaFinal = `${cadenaFinal}${suma}`
                        this.setState({
                            numero_retencion: sumaFinal,
                        })
                    }
                })
            }
        })

    }

    sumarNumeroFactura = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var numeroRetencion = db.ref('users/' + user.uid + "/configuracion")
                numeroRetencion.once('value', (snap) => {
                    if (snap.val()) {
                        const numero_factura = snap.val().numero_retencion
                        const suma = Number(numero_factura) + 1
                        const tamaño = String(suma).length
                        const restaTamaño = 9 - Number(tamaño)
                        var cadenaFinal = ''
                        for (var i = 0; i < restaTamaño; i++) {
                            cadenaFinal = cadenaFinal + '0'
                        }
                        numeroRetencion.update({
                            numero_retencion: `${cadenaFinal}${suma}`
                        })
                    }
                })
            }
        })
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.props.handleClose()
        }
    }

    onChangueSelectedProveedor = (item) => {
        if (Boolean(item.tipo_persona)) {
            this.setState({
                estado_contabilidad: true
            })
        } else {
            this.setState({
                estado_contabilidad: false
            })
        }
        this.setState({ proveedor: item })
    }

    emitirRetencionIvaRenta = () => {
        ReactGA.event({
            category: 'retencion',
            action: 'nuevaRetencionGuardada'
        })
        this.setState({ estadoModalEmitirRetencion: true })
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var codigo = funtions.guidGenerator()
                var retencion = this.generarRetencionIvaRenta()
                this.postSet(user.uid, retencion, codigo)
                this.guardarRetencionBaseDatos(retencion, codigo)

                this.setState({ estadoModalEmitirRetencion: false })
                this.props.handleClose()
            }
        })
        this.sumarNumeroFactura()
    }

    emitirRetencionRenta = () => {
        ReactGA.event({
            category: 'retencion',
            action: 'nuevaRetencionGuardada'
        })
        this.setState({ estadoModalEmitirRetencion: true })
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var codigo = funtions.guidGenerator()
                var retencion = this.generarRetencionRenta()
                this.postSet(user.uid, retencion, codigo)
                this.guardarRetencionBaseDatos(retencion, codigo)

                this.setState({ estadoModalEmitirRetencion: false })
                this.props.handleClose()
            }
        })
        this.sumarNumeroFactura()
    }

    guardarRetencionBaseDatos = (retencion, codigo) => {
        //console.log(codigo)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var retencionesRef = db.ref('users/' + user.uid + '/retenciones/' + codigo)
                var date = new Date()
                retencionesRef.set({
                    codigo: codigo,
                    retencion: retencion,
                    fecha_registro: funtions.obtenerFechaActual(),
                    hora_registro: `${new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}`,
                    estado: 'pendiente',
                    error_emision: '',
                    empleado: this.props.usuario.code,
                    order: '' + date,
                    urlpdf: 'genererando'
                })
            }
        })
    }


    postSet = async (uidUser, jsonData, codigo) => {
        //const rawResponse = await fetch('https://stormy-bayou-19844.herokuapp.com/retensincontabilidad', {
        // const rawResponse = await fetch('https://stormy-bayou-19844.herokuapp.com/retensincontabilidad', {
        const rawResponse = await fetch('https://stormy-bayou-19844.herokuapp.com/retensincontabilidad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'id': uidUser,
                'codigo': codigo,
            },
            body: JSON.stringify(jsonData)
        })
    }



    getPorcentajeCodigo = codigo => {
        var numero = 0.0
        switch (Number(codigo)) {
            case 9: {
                numero = 10.0
                break
            }
            case 10: {
                numero = 20.0
                break
            }
            case 1: {
                numero = 30.0
                break
            }
            case 2: {
                numero = 70.0
                break
            }
            case 3: {
                numero = 100.0
                break
            }
            default:
                break
        }
        return numero
    }

    getPorcentajeCodigoRenta = codigo => {
        var numero = 0
        switch (Number(codigo)) {
            case 312: {
                numero = 1
                break
            }
            case 327: {
                numero = 2
                break
            }
            case 328: {
                numero = 3
                break
            }
            default:
                break
        }
        return numero
    }

    generarRetencionRenta = () => {
        var fecha = this.state.fecha_emision_documento_sustento.split('T')
        var fechaSola = fecha[0]
        var hora = String(this.state.hora_emision_documento_sustento).split(' ')
        var horaForma = hora[4].split(':')
        var horaLista = horaForma[0] + ':' + horaForma[1]

        var numero_documento = this.state.numero_documento
        var numeroRecorrido = numero_documento.toString().length
        var numeroFinal = ''
        for (var i = 0; i < Number(numeroRecorrido); i++) {
            numeroFinal = numeroFinal + numero_documento.charAt(i)
            if (i === 2 || i == 5) {
                numeroFinal = numeroFinal + '-'
            }
        }

        var retencionIvaRenta = {
            "ambiente": this.state.ambienteFacturacion,
            "secuencial": this.state.numero_retencion,
            "tipo_emision": 1,
            "fecha_emision": new Date().toISOString(),
            "periodo_fiscal": this.state.fecha_emision_mes + "/" + this.state.fecha_emision_year,
            "emisor": {
                "ruc": "",
                "obligado_contabilidad": false,
                "contribuyente_especial": "",
                "nombre_comercial": "",
                "razon_social": "",
                "direccion": "",
                "establecimiento": {
                    "punto_emision": "",
                    "codigo": "",
                    "direccion": ""
                }
            },
            "informacion_adicional": {
                "Envíada al correo electónico": ""
            },
            "items": [
                {
                    "base_imponible": Number(this.state.base_disponible),
                    "codigo": "1",
                    "codigo_porcentaje": this.state.retencionRenta.tipo_porcentaje,
                    "fecha_emision_documento_sustento": fechaSola + 'T' + horaLista + ":56.782Z",
                    "numero_documento_sustento": `${numeroFinal}`,
                    "porcentaje": this.getPorcentajeCodigoRenta(this.state.retencionRenta.tipo_porcentaje),
                    "tipo_documento_sustento": this.state.retencionRenta.tipo_documento,
                    "valor_retenido": Number(this.state.valorRenta)
                }
            ],
            "sujeto": {
                "email": this.state.proveedor.email,
                "identificacion": this.state.proveedor.identificacion,
                "tipo_identificacion": this.state.proveedor.tipo_identificacion,
                "razon_social": this.state.proveedor.nombre,
                "direccion": this.state.proveedor.direccion,
                "telefono": this.state.proveedor.celular
            }
        }
        return retencionIvaRenta
    }

    generarRetencionIvaRenta = () => {
        var fecha = this.state.fecha_emision_documento_sustento.split('T')
        var fechaSola = fecha[0]
        var hora = String(this.state.hora_emision_documento_sustento).split(' ')
        var horaForma = hora[4].split(':')
        var horaLista = horaForma[0] + ':' + horaForma[1]

        var retencionIvaRenta = {
            "ambiente": 1,
            "secuencial": this.state.numero_retencion,
            "tipo_emision": 1,
            "fecha_emision": new Date().toISOString(),
            "periodo_fiscal": this.state.fecha_emision_mes + "/" + this.state.fecha_emision_year,
            "emisor": {
                "ruc": "",
                "obligado_contabilidad": false,
                "contribuyente_especial": "",
                "nombre_comercial": "",
                "razon_social": "",
                "direccion": "",
                "establecimiento": {
                    "punto_emision": "",
                    "codigo": "",
                    "direccion": ""
                }
            },
            "informacion_adicional": {
                "Envíada al correo electónico": ""
            },
            "items": [
                {
                    "base_imponible": Number(this.state.base_disponible),
                    "codigo": "2",
                    "codigo_porcentaje": this.state.retencionIva.tipo_porcentaje,
                    "fecha_emision_documento_sustento": fechaSola + 'T' + horaLista + ":56.782Z",
                    "numero_documento_sustento": `${numeroFinal}`,
                    "porcentaje": this.getPorcentajeCodigo(this.state.retencionIva.tipo_porcentaje),
                    "tipo_documento_sustento": this.state.retencionIva.tipo_documento,
                    "valor_retenido": Number(this.state.valorIVA)
                },
                {
                    "base_imponible": Number(this.state.base_disponible),
                    "codigo": "1",
                    "codigo_porcentaje": this.state.retencionRenta.tipo_porcentaje,
                    "fecha_emision_documento_sustento": fechaSola + 'T' + horaLista + ":56.782Z",
                    "numero_documento_sustento": `${numeroFinal}`,
                    "porcentaje": this.getPorcentajeCodigoRenta(this.state.retencionRenta.tipo_porcentaje),
                    "tipo_documento_sustento": this.state.retencionRenta.tipo_documento,
                    "valor_retenido": Number(this.state.valorRenta)
                }
            ],
            "sujeto": {
                "email": this.state.proveedor.email,
                "identificacion": this.state.proveedor.identificacion,
                "tipo_identificacion": this.state.proveedor.tipo_identificacion,
                "razon_social": this.state.proveedor.nombre,
                "direccion": this.state.proveedor.direccion,
                "telefono": this.state.proveedor.celular
            }
        }
        return retencionIvaRenta
    }

    setValor = () => {
        var multiplia = 0
        switch (Number(this.state.retencionIva.tipo_porcentaje)) {
            case 9: {
                multiplia = Number(this.state.base_disponible) * 0.10
                break
            }
            case 10: {
                multiplia = Number(this.state.base_disponible) * 0.20
                break
            }
            case 1: {
                multiplia = Number(this.state.base_disponible) * 0.30
                break
            }
            case 2: {
                multiplia = Number(this.state.base_disponible) * 0.70
                break
            }
            case 3: {
                multiplia = Number(this.state.base_disponible) * 1
                break
            }

            default:
                break
        }
        this.setState({ valorIVA: '' + multiplia.toFixed(2) })
    }

    setValorRenta = () => {
        var multiplia = 0
        switch (Number(this.state.retencionRenta.tipo_porcentaje)) {
            case 312: {
                multiplia = Number(this.state.base_disponible) * 0.01
                break
            }
            case 327: {
                multiplia = Number(this.state.base_disponible) * 0.02
                break
            }
            case 328: {
                multiplia = Number(this.state.base_disponible) * 0.03
                break
            }

            default:
                break
        }
        this.setState({ valorRenta: '' + multiplia.toFixed(2) })
    }


    render() {
        const styles = {
            styleText: {
                width: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                textAlign: 'center'

            },
            styleClientes: {
                width: '100%',
            }
        }


        return (
            <div style={{
                zIndex: 30,
                background: 'white',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh'
            }}>

                <AppBar style={{
                    position: 'relative',
                }}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" style={{ flex: 1, marginLeft: 30 }}>
                            Nueva Retención
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Grid container
                    variant="permanent"
                >
                    <div style={{ paddingLeft: 16, paddingRight: 16, width: '99vw', height: '70px' }}>
                        <AutoCompleteRetenciones
                            styleText={styles.styleText}
                            dataRef="proveedores"
                            dataRefObject="proveedor"
                            onChangue={(item) => this.onChangueSelectedProveedor(item)}
                            usuario={this.props.usuario}
                            codigoProveedor=''
                        >
                        </AutoCompleteRetenciones>

                    </div>

                    {
                        this.state.estado_contabilidad != null &&
                        <>
                            <Grid container spacing={24} style={{ marginLeft: 16, marginRight: 16, marginTop: 16 }}>
                                <Grid item xs={2}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography variant="body2" gutterBottom style={{ paddingRight: 6 }}>
                                            Email:
                                        </Typography>
                                        <Typography variant="caption" gutterBottom align="center">
                                            {this.state.proveedor.email}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography variant="body2" gutterBottom style={{ paddingRight: 6 }}>
                                            Identificación:
                                        </Typography>
                                        <Typography variant="caption" gutterBottom align="center">
                                            {this.state.proveedor.identificacion}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography variant="body2" gutterBottom style={{ paddingRight: 6 }}>
                                            Tipo Identificación:
                                        </Typography>
                                        <Typography variant="caption" gutterBottom align="center">
                                            {this.state.proveedor.tipo_identificacion}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography variant="body2" gutterBottom style={{ paddingRight: 6 }}>
                                            Razon Social:
                                        </Typography>
                                        <Typography variant="caption" gutterBottom align="center">
                                            {this.state.proveedor.nombre}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography variant="body2" gutterBottom style={{ paddingRight: 6 }}>
                                            Dirección:
                                        </Typography>
                                        <Typography variant="caption" gutterBottom align="center">
                                            {this.state.proveedor.direccion}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography variant="body2" gutterBottom style={{ paddingRight: 6 }}>
                                            Celular:
                                        </Typography>
                                        <Typography variant="caption" gutterBottom align="center">
                                            {this.state.proveedor.celular}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container style={{ paddingLeft: 16 }}>
                                <Grid container xs={6} spacing={8} style={{ paddingRight: 7 }}>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="filled-fehca-mes"
                                            select
                                            label="Periodo Fiscal - Mes"
                                            error={this.state.fecha_emision_mes.length > 0 ? false : true}
                                            value={this.state.fecha_emision_mes}
                                            onChange={event => {
                                                this.setState({ fecha_emision_mes: event.target.value })
                                            }}
                                            margin="normal"
                                            variant="filled"
                                            style={{ width: '100%' }}
                                        >
                                            <MenuItem value={'01'}>Enero</MenuItem>
                                            <MenuItem value={'02'}>Febrero</MenuItem>
                                            <MenuItem value={'03'}>Marzo</MenuItem>
                                            <MenuItem value={'04'}>Abril</MenuItem>
                                            <MenuItem value={'05'}>Mayo</MenuItem>
                                            <MenuItem value={'06'}>Junio</MenuItem>
                                            <MenuItem value={'07'}>Julio</MenuItem>
                                            <MenuItem value={'08'}>Agosto</MenuItem>
                                            <MenuItem value={'09'}>Septiembre</MenuItem>
                                            <MenuItem value={'10'}>Octubre</MenuItem>
                                            <MenuItem value={'11'}>Noviembre</MenuItem>
                                            <MenuItem value={'12'}>Diciembre</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="filled-fehca-year"
                                            select
                                            label="Periodo Fiscal - Año"
                                            error={this.state.fecha_emision_year.length > 0 ? false : true}
                                            value={this.state.fecha_emision_year}
                                            onChange={event => {
                                                this.setState({ fecha_emision_year: event.target.value })
                                            }}
                                            margin="normal"
                                            variant="filled"
                                            style={{ width: '100%' }}
                                        >
                                            <MenuItem value={'2018'}>2018</MenuItem>
                                            <MenuItem value={'2019'}>2019</MenuItem>
                                            <MenuItem value={'2020'}>2020</MenuItem>
                                            <MenuItem value={'2021'}>2021</MenuItem>
                                            <MenuItem value={'2022'}>2022</MenuItem>
                                            <MenuItem value={'2023'}>2023</MenuItem>
                                            <MenuItem value={'2024'}>2024</MenuItem>
                                            <MenuItem value={'2025'}>2025</MenuItem>
                                            <MenuItem value={'2026'}>2026</MenuItem>
                                            <MenuItem value={'2027'}>2027</MenuItem>
                                            <MenuItem value={'2028'}>2028</MenuItem>
                                            <MenuItem value={'2029'}>2029</MenuItem>
                                            <MenuItem value={'2030'}>2030</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div style={{ marginTop: 24 }}></div>
                                        <SeleccionarFecha
                                            label="Fecha de emisión del documento en sustento"
                                            value={this.state.fecha_emision_documento_sustento}
                                            onChange={event => {
                                                const fecha = new Date(event).toISOString().toString().split(':')
                                                var fechas = fecha[0] + ':' + fecha[1]
                                                this.setState({ fecha_emision_documento_sustento: fechas })
                                            }}
                                            width='100%'
                                        />
                                        <SeleccionarHora
                                            label={"Hora"}
                                            value={this.state.hora_emision_documento_sustento}
                                            onChange={event => {
                                                var hora = new Date(event)
                                                this.setState({ hora_emision_documento_sustento: hora })
                                            }}
                                            width='100%'
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container xs={6} spacing={8}>
                                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }} >
                                        <TextField
                                            id="formatted-text-mask-input"
                                            label="Numero de documento"
                                            error={this.state.numero_documento.length < 15 ? true : false}
                                            value={this.state.numero_documento}
                                            onChange={event => {
                                                this.setState({
                                                    numero_documento: event.target.value
                                                })
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            style={{ width: '100%' }}
                                            autoComplete='off'
                                            InputProps={{
                                                inputComponent: NumberFormatCustomNumeroFactura,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <TextField
                                            id="standard-base-disponible"
                                            label="Base Disponible"
                                            value={this.state.base_disponible}
                                            error={this.state.base_disponible.length > 0 ? false : true}
                                            onChange={e => {
                                                this.setState({ base_disponible: e.target.value })
                                                setTimeout(() => { this.setValor() }, 100)
                                                setTimeout(() => { this.setValorRenta() }, 100)
                                            }}
                                            margin="normal"
                                            variant="filled"
                                            style={{ width: '100%' }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    }

                    <Grid container spacing={24}>
                        {
                            this.state.estado_contabilidad === true &&
                            <>
                                <Grid item xs={6} >
                                    <div style={{ padding: 16 }}>
                                        <ImpuestoRetencion
                                            impuesto={2}
                                            changueData={data => {
                                                this.setState({ retencionIva: data })
                                                setTimeout(() => { this.setValor() }, 100)
                                            }}
                                            base_disponible={this.state.base_disponible}
                                            valor={this.state.valorIVA}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6} style={{ padding: 16 }}>
                                    <div style={{ padding: 16 }}>
                                        <ImpuestoRetencion
                                            impuesto={1}
                                            changueData={data => {
                                                this.setState({ retencionRenta: data })
                                                setTimeout(() => { this.setValorRenta() }, 100)
                                            }}
                                            base_disponible={this.state.base_disponible}
                                            valor={this.state.valorRenta}
                                        />
                                    </div>
                                </Grid>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={this.state.base_disponible.length > 0 ? !this.state.numero_documento.length > 0 : true}
                                        onClick={() => this.emitirRetencionIvaRenta()}
                                    >
                                        Emitir Retención
                                    </Button>
                                </div>
                            </>
                        }

                        {
                            this.state.estado_contabilidad === false &&
                            <Grid item xs={12}>
                                <div style={{ padding: 16 }}>
                                
                                    <ImpuestoRetencion
                                        impuesto={1}
                                        changueData={data => {
                                            this.setState({ retencionRenta: data })
                                            setTimeout(() => { this.setValorRenta() }, 100)
                                        }}
                                        base_disponible={this.state.base_disponible}
                                        valor={this.state.valorRenta}
                                    />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={this.state.base_disponible.length > 0 ? !this.state.numero_documento.length > 0 : true}

                                        onClick={() => this.emitirRetencionRenta()}
                                    >
                                        Emitir Retención
                                    </Button>
                                </div>
                            </Grid>
                        }
                        {
                            this.state.estado_contabilidad === null &&
                            <Grid item xs={6}>
                            </Grid>
                        }
                    </Grid>
                </Grid>

                <ModalContainerNormal
                    open={this.state.estadoModalEmitirRetencion}
                    handleClose={() => this.setState({ estadoModalEmitirRetencion: true })}
                >
                    <div style={{
                        width: 100,
                        height: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <CircularProgress />
                    </div>
                </ModalContainerNormal>
            </div>
        )
    }
}

const NumberFormatCustomNumeroFactura = (props) => {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            format="###-###-#########"
            mask="_"
        />

    );
}

const cardExpiry = (val) => {
    let month = limit(val.substring(0, 2), '12');
    let date = limit(val.substring(2, 4), '31');

    return month + (date.length ? '/' + date : '');
}



export default NuevaRetencion;