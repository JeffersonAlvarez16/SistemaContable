import React, { Component } from 'react';
import Layout from '../../components/containers/Layout';
import MenuHerramientas from '../../components/components/menus/MenuHerramientas';
import ItemMenuHerramienta from '../../components/components/menus/ItemMenuHerramienta';
import Search from '../../components/components/Search';
import { Divider, IconButton, TextField, Button, Chip } from '@material-ui/core';
import TablaNormal from '../../components/components/tables/TableNormal';
import FullScreenDialog from '../../components/components/FullScreenDialog';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import LoopIcon from '@material-ui/icons/Loop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReturnTextTable from '../../components/components/tables/ReturnTextTable';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import NuevaRetencion from '../../components/plugins/retenciones/nueva_retencion';
import funtions from '../../utils/funtions';
import setSnackBars from '../../components/plugins/setSnackBars';

import ReactToPrint from "react-to-print";
import ResivoVenta from '../../components/plugins/plantillas/resivo_venta';
import ContainerPlantillas from '../../components/plugins/plantillas/container_plantillas';
import ModalContainerNormal from '../../components/modals_container/ModalContainerNormal';
import ModalEliminarRetencion from '../../components/modals_container/retenciones/ModalEliminarRetencion';
import colors from '../../utils/colors';
import ReactGA from 'react-ga';



class Retencion extends Component {


    state = {
        usuario: {},
        itemsSeleccionados: [],
        listaRetenciones: [],
        estadoTabla: 'cargando',
        listaVentasTemporal: [],

        rowslistaRetenciones: [
            { id: 'accions', numeric: false, disablePadding: true, label: '' },
            { id: 'factura', numeric: false, disablePadding: true, label: 'Numero de fatura' },
            { id: 'estado', numeric: false, disablePadding: true, label: 'Estado Retencion' },
            { id: 'razon_social', numeric: true, disablePadding: false, label: 'Sujeto - Razon Social' },
            { id: 'identificacion', numeric: true, disablePadding: false, label: 'Sujeto - Identificación' },
            { id: 'valor', numeric: true, disablePadding: false, label: 'Valor de Retención' },
            { id: 'telefono', numeric: true, disablePadding: false, label: 'Sujeto - Telefono' },
            { id: 'tipo_retencion', numeric: true, disablePadding: false, label: 'Tipo de Retención' },
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
        estadoModalSimple: false,
        //item para editar
        itemEditar: null,
        //fecha actual
        fechaActual: '',
        estadoPermisos: null,
        itemFormateadoImprimir: {}
    }


    componentDidMount() {
        ReactGA.pageview(location.pathname)

        this.setState({ usuario: this.props.user })
        setTimeout(() => {
            this.obtenerPermisosusuarios()
            this.obtenerDataBaseDatos(funtions.obtenerFechaActual())
        }, 100)

        this.setState({
            fechaActual: funtions.obtenerFechaActual()
        })
    }

    obtenerDataBaseDatos = (fecha) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var retencionesRef = db.ref('users/' + user.uid + '/retenciones/').orderByChild('fecha_registro').equalTo(fecha)
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
        this.setState({ fechaActual: fecha, estadoTabla: 'cargando' })
        setTimeout(() => { this.obtenerDataBaseDatos(fecha) }, 200)
    }

    eliminarRetencionDB = codigo => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                db.ref('users/' + user.uid + '/retenciones/' + codigo).remove()
            }
        })
    }

    enviarToPlantillaData = (n) => {
        this.refEventoImprimir.handlePrint()
    }
    imprimirRetencion = () => {

    }

    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }
        if (item.id === 'accions') {
            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                <ReactToPrint
                    ref={el => (this.refEventoImprimir = el)}
                    trigger={() => <></>}
                    content={() => this.refImprimirResivo}
                />
                <IconButton onClick={() => {
                    //this.enviarToPlantillaData(n)
                }}
                >
                    <LocalPrintshopIcon />
                </IconButton>

                {

                    n.urlpdf != 'genererando' &&
                    <Tooltip title="Descargar pdf">
                        <IconButton onClick={() => {
                            window.open(
                                n.urlpdf,
                                '_blank'
                            );
                        }}
                        >
                            <PictureAsPdfIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                }
                {
                    n.urlpdf === 'genererando' &&
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <IconButton disabled>
                            <CircularProgress size={20} thickness={5} style={{ color: colors.getColorPrymaryBlue300() }} />
                        </IconButton>
                        <div style={{ color: '#42A5F5', display: 'flex', alignItems: 'center' }}>Pdf...</div>
                    </div>
                }
            </div>
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
                        <IconButton onClick={() => {
                            this.setState({
                                itemEliminar: n.codigo,
                                estadoModalSimple: true,
                            })
                        }}>
                            <CloseIcon style={{ color: 'red' }} />
                        </IconButton>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ color: 'red', display: 'flex', alignItems: 'center' }}>Error al emitir</div>
                            <div style={{ color: 'red', display: 'flex', alignItems: 'center', fontSize: 10, fontStyle: 'italic' }}>{n.error_emision}</div>
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
            return <div style={{ width: 'max-content' }}>
                <Chip
                    label={<div style={{ color: colors.getColorWhite() }}>{n.retencion.sujeto.razon_social}</div>}
                    clickable
                    style={{ background: colors.getColorPrymaryDarkBlue300() }}
                />
            </div>
        }
        if (item.id === 'factura') {
            return <div style={{ width: 'max-content' }}>
                <Chip
                    label={<div>{n.retencion.items[0].numero_documento_sustento}</div>}
                    clickable
                    style={{ background: colors.getColorPrymaryGrey200() }}
                />
            </div>
        }
        if (item.id === 'telefono') {
            return <div style={{ width: 'max-content' }}>
                <Chip
                    label={<div>{n.retencion.sujeto.telefono}</div>}
                    clickable
                    style={{ background: colors.getColorPrymaryGrey200() }}
                />
            </div>
        }
        if (item.id === 'identificacion') {
            return <div style={{ width: 'max-content' }}>
                <Chip
                    label={<div>{n.retencion.sujeto.identificacion}</div>}
                    clickable
                    style={{ background: colors.getColorPrymaryGrey200() }}
                />
            </div>
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
                            {`Retencion Renta: $ ${n.retencion.items[0].valor_retenido}`}
                        </div>
                    }
                </div>
                :
                <div>
                    {
                        Number(n.retencion.items[1].codigo) === 1 &&
                        <div style={{ width: 'max-content' }}>
                            {`Retencion Renta: $ ${n.retencion.items[0].valor_retenido}`}
                        </div>
                    }
                    {
                        Number(n.retencion.items[0].codigo) === 2 &&
                        <div style={{ width: 'max-content' }}>
                            {`Retencion Iva: $ ${n.retencion.items[1].valor_retenido}`}
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

    obtenerPermisosusuarios = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var usuariosRef = db.ref(`users/${user.uid}/usuarios/${this.state.usuario.code}`)
                usuariosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        if (snapshot.val().privilegios.retenciones === true) {
                            this.setState({
                                estadoPermisos: true
                            })
                        } else {
                            this.setState({
                                estadoPermisos: false
                            })
                        }
                    }
                });
            }
        });
    }

    nuevaRetencion = () => {

        ReactGA.event({
            category: 'retencion',
            action: 'nuevaRetencion'
        })
        this.setState({ itemEditar: null })
        this.setState({ openModalNewRetencion: true })
    }

    render() {
        return (
            <>
                {
                    this.state.estadoPermisos === true &&
                    <div>
                        <MenuHerramientas>
                            <ItemMenuHerramienta
                                titleButton="Nueva Retencion"
                                color="primary"
                                visible={true}
                                onClick={() => {
                                    this.nuevaRetencion()
                                }}
                            >
                                <AddIcon />
                            </ItemMenuHerramienta>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    id="datetime-local"
                                    type="date"
                                    defaultValue={this.state.fechaActual}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={e => this.cambiarListaPorFecha(e.target.value)}
                                />
                            </div>


                            <div style={{ flex: 0.93 }}></div>

                            <Search
                                id='buscar-retencion'
                                textoSearch="Buscar..."
                                textoTooltip="Buscar retencion"
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

                        <ModalContainerNormal
                            open={this.state.estadoModalSimple}
                            handleClose={() => this.setState({ estadoModalSimple: false })}
                        >
                            <ModalEliminarRetencion
                                handleClose={() => this.setState({ estadoModalSimple: false })}
                                handleEliminar={() => {
                                    this.eliminarRetencionDB(this.state.itemEliminar)
                                    this.setState({ estadoModalSimple: false })
                                }}
                            />
                        </ModalContainerNormal>
                    </div>
                }
                {
                    this.state.estadoPermisos === false &&
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '80vh' }}>
                        <h3><strong>Usted no tiene permisos para <br />
                            esta seccion comuniquese con el administrador</strong></h3>
                    </div>
                }
                {
                    this.state.estadoPermisos === null &&
                    <CircularProgress />
                }
            </>

        );
    }
}

export default Retencion;