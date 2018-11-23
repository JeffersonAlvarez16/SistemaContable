import React, { Component } from 'react';
import Layout from '../components/containers/Layout';
import MenuHerramientas from '../components/components/menus/MenuHerramientas';
import ItemMenuHerramienta from '../components/components/menus/ItemMenuHerramienta';
import Search from '../components/components/Search';
import { Divider, IconButton, TextField } from '@material-ui/core';
import TablaNormal from '../components/components/tables/TableNormal';
import FullScreenDialog from '../components/components/FullScreenDialog';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import InputIcon from '@material-ui/icons/Input';

import DoneAllIcon from '@material-ui/icons/DoneAll';
import LoopIcon from '@material-ui/icons/Loop';
import CircularProgress from '@material-ui/core/CircularProgress';

import ReturnTextTable from '../components/components/tables/ReturnTextTable';


//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import NuevaRetencion from '../components/plugins/retenciones/nueva_retencion';
import funtions from '../utils/funtions';
import setSnackBars from '../components/plugins/setSnackBars';

class Retenciones extends Component {


    state = {
        usuario: {},
        itemsSeleccionados: [],
        listaRetenciones: [],
        estadoTabla: 'cargando',
        listaVentasTemporal: [],

        rowslistaRetenciones: [
            { id: 'accions', numeric: false, disablePadding: true, label: 'Resivo' },
            { id: 'factura', numeric: false, disablePadding: true, label: 'Numero de fatura' },
            { id: 'estado', numeric: false, disablePadding: true, label: 'Estado Retencion' },
            { id: 'razon_social', numeric: true, disablePadding: false, label: 'Sujeto - Razon Social' },
            { id: 'valor', numeric: true, disablePadding: false, label: 'Valor de Retención' },
            { id: 'tipo_retencion', numeric: true, disablePadding: false, label: 'Tipo de Retención' },
            { id: 'telefono', numeric: true, disablePadding: false, label: 'Sujeto - Telefono' },
            { id: 'identificacion', numeric: true, disablePadding: false, label: 'Sujeto - Identificación' },
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'fecha', numeric: true, disablePadding: false, label: 'Fecha' },
            { id: 'hora', numeric: true, disablePadding: false, label: 'Hora' },
            { id: 'empleado', numeric: true, disablePadding: false, label: 'Empleado' },
        ],
        //usuario
        usuario: '',
        // modals
        openModalNewRetencion: false,
        estadoModalSimpleCompraProductos: false,
        estadoModalEmitirFactura: false,
        estadoModalCancelarVenta: false,
        estadoModalEditarVenta: false,
        //item para editar
        itemEditar: null,
        //fecha actual
        fechaActual: `${new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()}`,
    }

    obtenerFechFormateada = () => {
        const { fechaActual } = this.state
        var fecha = fechaActual.split('-')
        var nueva = fecha[2] + '-' + fecha[1] + '-' + fecha[0]
        return nueva
    }
    componentDidMount() {
        this.obtenerDataBaseDatos()
    }

    obtenerDataBaseDatos = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var retencionesRef = db.ref('users/' + user.uid + '/retenciones/').orderByChild('fecha_registro').equalTo(this.obtenerFechFormateada())
                retencionesRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaRetenciones: [],
                            listaRetencionesTemporal: [],
                            estadoTabla: 'cargando'
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        var filterList = lista.sort((a, b) => {
                            a = new Date(a.order);
                            b = new Date(b.order);
                            return a > b ? -1 : a < b ? 1 : 0;
                        })
                        this.setState({
                            listaRetenciones: filterList,
                            listaRetencionesTemporal: filterList,
                            estadoTabla: 'llena'
                        })
                    } else {
                        this.setState({
                            listaRetenciones: [],
                            listaRetencionesTemporal: [],
                            estadoTabla: 'vacio'
                        })
                    }
                });
            }
        });
    }

    cambiarListaPorFecha = fecha => {
        this.setState({ fechaActual: fecha })
        setTimeout(() => { this.obtenerDataBaseDatos() }, 100)
    }

    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }
        if (item.id === 'accions') {
            return <>
                <IconButton >
                    <LocalPrintshopIcon />
                </IconButton>
            </>
        }
        if (item.id === 'estado') {
            return <div style={{ width: 'max-content' }}>

                {
                    n.estado === 'emitido' &&
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <IconButton disabled>
                            <DoneAllIcon style={{ color: '#00c853' }} />
                        </IconButton>
                        <div style={{ color: '#00c853', display: 'flex', alignItems: 'center' }}>Emitida</div>
                    </div>
                }
                {
                    n.estado === 'error' &&
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <IconButton disabled onClick={()=>{

                        }}>
                            <CloseIcon style={{ color: 'red' }} />
                        </IconButton>
                        <div style={{ display: 'flex', flexDirection: 'column',  justifyContent:'center' }}>
                            <div style={{ color: 'red', display: 'flex', alignItems: 'center' }}>Error al emitir</div>
                            <div style={{ color: 'red', display: 'flex', alignItems: 'center', fontSize:10, fontStyle:'italic' }}>{n.error_emision}</div>
                        </div>
                    </div>
                }
                {
                    n.estado === 'pendiente' &&
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <IconButton disabled>
                            <CircularProgress size={20} thickness={5} style={{ color: '#42A5F5' }} />
                        </IconButton>
                        <div style={{ color: '#42A5F5', display: 'flex', alignItems: 'center' }}>Pendiente</div>
                    </div>
                }
            </div >
        }
        if (item.id === 'cliente') {
            return n.cliente === 'Persona' ? n.cliente : <>
                <ReturnTextTable
                    referencia="clientes"
                    codigo={n.cliente}
                    datoTraido="nombre"
                    estado={true}
                />
            </>
        }
        if (item.id === 'razon_social') {
            return <div style={{ width: 'max-content' }}>{n.retencion.sujeto.razon_social}</div>
        }
        if (item.id === 'factura') {
            return <div style={{ width: 'max-content' }}>{n.retencion.items[0].numero_documento_sustento}</div>
        }
        if (item.id === 'telefono') {
            return <div style={{ width: 'max-content' }}>{n.retencion.sujeto.telefono}</div>
        }
        if (item.id === 'identificacion') {
            return <div style={{ width: 'max-content' }}>{n.retencion.sujeto.identificacion}</div>
        }
        if (item.id === 'fecha') {
            return <div style={{ width: 'max-content' }}>{n.fecha_registro}</div>
        }
        if (item.id === 'hora') {
            return <div style={{ width: 'max-content' }}>{n.hora_registro}</div>
        }
        if (item.id === 'valor') {
            return n.retencion.items.length === 1 ?
                <div>
                    {
                        Number(n.retencion.items[0].codigo) === 1 &&
                        <div style={{ width: 'max-content' }}>
                            {`Retencion Renta: $${n.retencion.items[0].valor_retenido}`}
                        </div>
                    }
                </div>
                :
                <div>
                    {
                        Number(n.retencion.items[1].codigo) === 1 &&
                        <div style={{ width: 'max-content' }}>
                            {`Retencion Renta: $${n.retencion.items[0].valor_retenido}`}
                        </div>
                    }
                    {
                        Number(n.retencion.items[0].codigo) === 2 &&
                        <div style={{ width: 'max-content' }}>
                            {`Retencion Iva: $${n.retencion.items[1].valor_retenido}`}
                        </div>
                    }
                </div>
        }
        if (item.id === 'tipo_retencion') {
            return n.retencion.items.length === 1 ?
                <>
                    Obligado a llevar contabilidad
                </>
                :
                <>
                    No obligado a llevar contabilidad
                </>
        }
        if (item.id === 'empleado') {
            return <ReturnTextTable
                referencia="usuarios"
                codigo={n.empleado}
                datoTraido="nombre"
                estado={true}
            />
        }
    }
    render() {
        return (
            <Layout title="Retenciones" onChangueUserState={usuario => this.setState({ usuario: usuario })}>

                <MenuHerramientas>
                    <ItemMenuHerramienta
                        titleButton="Nueva Retencion"
                        color="primary"
                        visible={true}
                        onClick={() => {
                            this.setState({ itemEditar: null })
                            this.setState({ openModalNewRetencion: true })
                        }}
                    />

                    <TextField
                        id="datetime-local"
                        type="date"
                        defaultValue={this.state.fechaActual}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => this.cambiarListaPorFecha(e.target.value)}
                    />

                    <div style={{ flex: 0.9 }}></div>

                    <Search
                        id='buscar-retencion'
                        textoSearch="Buscar..."
                        textoTooltip="Buscar Retencion"
                        handleSearch={this.handleSearch}
                    />
                </MenuHerramientas>

                <Divider />

                <TablaNormal
                    textoTitleP="Retenciones"
                    textoTitleS="Retenciones"
                    selectedItems={true}
                    toolbar={false}
                    notTab={true}
                    data={this.state.listaRetenciones}
                    rows={this.state.rowslistaRetenciones}
                    handleGetData={this.handleGetData}
                    estadoTabla={this.state.estadoTabla}
                    itemsSeleccionados={items => {
                        this.setState({ itemsSeleccionados: items })
                    }}
                />

                <FullScreenDialog openModal={this.state.openModalNewRetencion}>
                    <NuevaRetencion
                        usuario={this.state.usuario}
                        handleClose={() => this.setState({ openModalNewRetencion: false })}
                        item={this.state.itemEditar}
                    >
                    </NuevaRetencion>
                </FullScreenDialog>

            </Layout>
        );
    }
}

export default Retenciones;