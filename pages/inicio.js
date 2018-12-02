import React, { Component } from 'react';
import Layout from '../components/containers/Layout';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import funtions from '../utils/funtions';
import ReturnTextTable from '../components/components/tables/ReturnTextTable';


class Inicio extends Component {

    state = {
        usuario: {},
        listaStock: [],
        listaStockTemporal: [],
        estadoTabla: '',

        fecha: funtions.obtenerFechaActual(),
        productosVendidos: [],

        sumaProdcutosCompra: 0,
        sumaProdcutosCompraPrecio: 0,

        sumaProdcutosSalida: 0,
        sumaProdcutosSalidaPrecio: 0,
    }

    componentDidMount() {
        this.cargarData()
    }

    cargarData = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.database();
                var productosRef = db.ref('users/' + user.uid + '/operaciones_stock');
                productosRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({
                            listaStock: [],
                            listaStockTemporal: [],
                            estadoTabla: 'cargando',
                            productosVendidos: [],
                        })
                        var lista = funtions.snapshotToArray(snapshot)
                        /* var filterList = lista.sort((a, b) => {
                            a = new Date(a.order);
                            b = new Date(b.order);
                            return a > b ? -1 : a < b ? 1 : 0;
                        }) */
                        var filterList = lista.filter(item => item.fecha === this.state.fecha)
                        filterList.forEach(item => {
                            item.productos.forEach(pro => {
                                var objecto = pro
                                objecto.tipo = item.tipo_operacion
                                this.state.productosVendidos.push(objecto)
                            })
                        })
                        this.setState({
                            listaStock: filterList,
                            listaStockTemporal: filterList,
                            estadoTabla: 'llena'
                        })
                        this.sumarProductosVendidos()
                    } else {
                        this.setState({
                            listaStock: [],
                            listaStockTemporal: [],
                            estadoTabla: 'vacio',
                            productosVendidos: [],
                        })
                    }
                });
            }
        });
    }

    sumarProductosVendidos = () => {
        this.setState({
            sumaProdcutosCompra: 0,
            sumaProdcutosCompraPrecio: 0,
            sumaProdcutosSalida: 0,
            sumaProdcutosSalidaPrecio: 0,
        })
        var arrayCompra = this.state.productosVendidos.filter(item => item.tipo === 'compra_producto')
        var arraySalida = this.state.productosVendidos.filter(item => item.tipo === 'ajuste-stock-salida')
        arrayCompra.forEach(item => {
            this.setState({
                sumaProdcutosCompra: this.state.sumaProdcutosCompra + Number(item.cantidad),
                sumaProdcutosCompraPrecio: this.state.sumaProdcutosCompraPrecio + (Number(item.precio_costo) * Number(item.cantidad))
            })
        })
        arraySalida.forEach(item => {
            this.setState({
                sumaProdcutosSalida: this.state.sumaProdcutosSalida + Number(item.cantidad),
                sumaProdcutosSalidaPrecio: this.state.sumaProdcutosSalidaPrecio + (Number(item.precio_costo) * Number(item.cantidad))
            })
        })
    }

    render() {
        return (
            <Layout title="Inicio" onChangueUserState={usuario => this.setState({ usuario: usuario })}>
                <div style={{ margin: 30 }}>
                    {/*  {
                        this.state.listaStock.map(item => {
                            return <div key={item.codigo}>{item.codigo}</div>
                        })
                    } */}
                    {
                        this.state.productosVendidos.map(item => {
                            return <div key={item.codigo} style={{ display: 'flex', flexDirection: 'row' }}>
                                {item.cantidad}
                                <div style={{ width: 10 }} />
                                <ReturnTextTable
                                    referencia="productos"
                                    codigo={item.codigo}
                                    datoTraido="descripcion_producto"
                                    estado={true}
                                />
                            </div>
                        })
                    }

                    <div style={{ display: 'flex', flexDirection: 'column' , margin:16}}>
                        <div>{`${this.state.sumaProdcutosCompra} productos Comprados`}</div>
                        <div>{`${this.state.sumaProdcutosCompraPrecio} precio total productos Comprados`}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' , margin:16}}>
                        <div>{`${this.state.sumaProdcutosSalida} productos en salida`}</div>
                        <div>{`${this.state.sumaProdcutosSalidaPrecio} precio total productos en salida`}</div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Inicio