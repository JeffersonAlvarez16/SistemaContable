import React, { Component } from 'react'
import Layout from '../../components/containers/Layout';
import Dashboard from '../../components/Dashboard/containers/Dashboard';
import ChartistGraph from "react-chartist";
import { Grid, Chip, Card, IconButton, Icon } from '@material-ui/core';
import funtions from '../../utils/funtions';

// firebase
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import Contador from '../../components/plugins/plugins/Contador';
import ReactGA from 'react-ga';
import ToolbarContainer from './components/tollbars/ToolbarContainer';
class Inicio extends Component {

    state = {
        initialState: false,
        fecha: "",
        usuario: {
            nombre: ''
        },
        ventasDiarias: {
            labels: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
            series: [[0, 0, 0, 0, 0, 0, 0]]
        },
        ventasMensauales: {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
        },
        gastosDiarios: {
            labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
            series: [[0, 0, 0, 0, 0, 0, 0]]
        },
        gastosMensuales: {
            labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
            series: [[0, 0, 0, 0, 0, 0, 0]]
        },

        options: {
            low: 0,
            showArea: true,
        },
        type: 'Bar',
        typeMensuales: 'Line',
        total_ventas_diarias: 0,
        total_ventas_mensuales: 0,
        total_gastos_diarios: 0,
        total_gastos_mensuales: 0,
        diaActual: '',
        lunes: 0,
        martes: 1,
        miercoles: 2,
        jueves: 3,
        viernes: 4,
        sabado: 5,
        domingo: 6,
        idex_of: null,
        idex_of_mes: '',
        listaVentasPorDia: [],
        listaVentasMensuales: []
    }

    componentDidMount() {
        ReactGA.pageview(location.pathname)
        setTimeout(() => {
            this.setState({
                initialState: true
            })
            this.setState({ usuario: this.props.user })
        }, 100);
        var db = firebase.database()
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var ref = db.ref(`users/${user.uid}/ventas`)
                var refGastos = db.ref(`users/${user.uid}/gastos`)
                ref.on('value', snapshot => {
                    if (snapshot.val()) {
                        var listaVentas = funtions.snapshotToArray(snapshot)
                        this.setState({
                            total_ventas_diarias: 0,
                            total_ventas_mensuales: 0
                        })
                        this.devolverMesActual(funtions.mesActual())
                        this.devolverDiaActual(funtions.diaActual())
                        listaVentas.map(item => {
                            if (item.fecha_venta === funtions.obtenerFechaActual()) {
                                if (item.tipo_pago != 'credito') {
                                    this.setState({
                                        total_ventas_diarias: Number(this.state.total_ventas_diarias) + Number(item.total),
                                    })
                                }


                            }
                        })
                        listaVentas.map(item => {
                            console.log(item);
                            /*      if (item.fecha_venta.substr(5, 2) === this.state.idex_of_mes) {
                                     if (item.tipo_pago != 'credito') {
                                         this.setState({
                                             total_ventas_mensuales: Number(this.state.total_ventas_mensuales) + Number(item.total),
                                         })
                                     }
     
                                 } */
                        })

                        setTimeout(() => {
                            var refVentasDiariasVa = db.ref(`users/${user.uid}/ventas_diarias`)
                            refVentasDiariasVa.once('value', snapshot => {
                                if (snapshot.val()) {
                                    var refVentasDiarias = db.ref(`users/${user.uid}/ventas_diarias/${this.state.idex_of}`)
                                    refVentasDiarias.update({
                                        valor: this.state.total_ventas_diarias
                                    })
                                } else {
                                    for (let i = 0; i < 7; i++) {
                                        if (i === this.state.idex_of) {
                                            var refVentasDiarias = db.ref(`users/${user.uid}/ventas_diarias/${this.state.idex_of}`)
                                            refVentasDiarias.update({
                                                valor: this.state.total_ventas_diarias
                                            })
                                        } else {
                                            var refVentasDiarias = db.ref(`users/${user.uid}/ventas_diarias/${i}`)
                                            refVentasDiarias.update({
                                                valor: 0
                                            })
                                        }
                                    }
                                }
                            })


                            for (var i = 0; i < this.state.ventasDiarias.series[0].length; i++) {
                                if (i === this.state.idex_of) {
                                    var refVentasDiariasTotal = db.ref(`users/${user.uid}/ventas_diarias`)
                                    refVentasDiariasTotal.on('value', snapshot => {
                                        if (snapshot.val()) {
                                            var listaVentasPorDia = funtions.snapshotToArray(snapshot)
                                            this.setState({
                                                listaVentasPorDia: listaVentasPorDia
                                            })
                                            listaVentasPorDia.forEach((item, j) => {
                                                if (Number(item.id) === i) {
                                                    this.state.ventasDiarias.series[0][i] = item.valor
                                                } else {
                                                    this.state.ventasDiarias.series[0][j] = item.valor
                                                }
                                            })
                                        }
                                    })
                                }
                            }


                            var refVentasMensualesVa = db.ref(`users/${user.uid}/ventas_mensuales`)
                            refVentasMensualesVa.once('value', snapshot => {
                                if (snapshot.val()) {
                                    var refVentasMensuales = db.ref(`users/${user.uid}/ventas_mensuales/${this.state.index_des}`)
                                    refVentasMensuales.update({
                                        valor: this.state.total_ventas_mensuales
                                    })
                                } else {
                                    for (let j = 0; j < 12; j++) {

                                        if (j === this.state.index_des) {
                                            var refVentasMensuales = db.ref(`users/${user.uid}/ventas_mensuales/${this.state.index_des}`)
                                            refVentasMensuales.update({
                                                valor: this.state.total_ventas_mensuales
                                            })
                                        } else {

                                            var refVentasMensuales = db.ref(`users/${user.uid}/ventas_mensuales/${j}`)
                                            refVentasMensuales.update({
                                                valor: 0
                                            })
                                        }

                                    }
                                }
                            })

                            for (var i = 0; i < this.state.ventasMensauales.series[0].length; i++) {
                                if (i === this.state.index_des) {
                                    var refVentasMensualesTotal = db.ref(`users/${user.uid}/ventas_mensuales`)
                                    refVentasMensualesTotal.on('value', snapshot => {
                                        if (snapshot.val()) {
                                            var listaVentasMensuales = funtions.snapshotToArray(snapshot)

                                            this.setState({
                                                listaVentasMensuales: listaVentasMensuales
                                            })
                                            listaVentasMensuales.forEach((item, j) => {
                                                if (j === i) {
                                                    this.state.ventasMensauales.series[0][i] = item.valor
                                                } else {
                                                    this.state.ventasMensauales.series[0][j] = item.valor
                                                }
                                            })
                                        }
                                    })
                                    //  this.state.ventasMensauales.series[0][i] = this.state.total_ventas_mensuales
                                }
                            }
                        }, 50);


                    }

                })
                refGastos.on('value', snapshot => {
                    if (snapshot.val()) {
                        var listaGastos = funtions.snapshotToArray(snapshot)
                        this.setState({
                            total_gastos_diarios: 0,
                            total_gastos_mensuales: 0
                        })
                        listaGastos.map(item => {
                            if (item.fecha === funtions.obtenerFechaActual()) {
                                this.setState({
                                    total_gastos_diarios: Number(this.state.total_gastos_diarios) + Number(item.total_final),
                                })

                            }
                        })

                        listaGastos.map(item => {
                            if (item.fecha.substr(5, 2) === this.state.idex_of_mes) {
                                this.setState({
                                    total_gastos_mensuales: Number(this.state.total_gastos_mensuales) + Number(item.total_final),
                                })
                            }
                        })

                    }
                })


            } else {
                this.setState({ sesionState: 'cerrada' })
            }
        })

    }



    refrescar = () => {
        var db = firebase.database()
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var ref = db.ref(`users/${user.uid}/ventas`)
                var refGastos = db.ref(`users/${user.uid}/gastos`)
                ref.on('value', snapshot => {
                    if (snapshot.val()) {
                        var listaVentas = funtions.snapshotToArray(snapshot)
                        this.setState({
                            total_ventas_diarias: 0,
                            total_ventas_mensuales: 0
                        })
                        this.devolverMesActual(funtions.mesActual())
                        listaVentas.map(item => {
                            if (item.fecha_venta === funtions.obtenerFechaActual()) {
                                if (item.tipo_pago != 'credito') {
                                    this.setState({
                                        total_ventas_diarias: Number(this.state.total_ventas_diarias) + Number(item.total),
                                    })
                                }


                            }
                        })
                        listaVentas.map(item => {
                            if (item.fecha_venta.substr(5, 2) === this.state.idex_of_mes) {
                                if (item.tipo_pago != 'credito') {
                                    this.setState({
                                        total_ventas_mensuales: Number(this.state.total_ventas_mensuales) + Number(item.total),
                                    })
                                }

                            }
                        })

                        setTimeout(() => {
                            this.devolverDiaActual(funtions.diaActual())
                            var refVentasDiariasVa = db.ref(`users/${user.uid}/ventas_diarias`)
                            refVentasDiariasVa.once('value', snapshot => {
                                if (snapshot.val()) {
                                    var refVentasDiarias = db.ref(`users/${user.uid}/ventas_diarias/${this.state.idex_of}`)
                                    refVentasDiarias.update({
                                        valor: this.state.total_ventas_diarias
                                    })
                                } else {
                                    for (let i = 0; i < 7; i++) {
                                        if (i === this.state.idex_of) {
                                            var refVentasDiarias = db.ref(`users/${user.uid}/ventas_diarias/${this.state.idex_of}`)
                                            refVentasDiarias.update({
                                                valor: this.state.total_ventas_diarias
                                            })
                                        } else {
                                            var refVentasDiarias = db.ref(`users/${user.uid}/ventas_diarias/${i}`)
                                            refVentasDiarias.update({
                                                valor: 0
                                            })
                                        }

                                    }
                                }
                            })


                            for (var i = 0; i < this.state.ventasDiarias.series[0].length; i++) {
                                if (i === this.state.idex_of) {
                                    var refVentasDiariasTotal = db.ref(`users/${user.uid}/ventas_diarias`)
                                    refVentasDiariasTotal.on('value', snapshot => {
                                        if (snapshot.val()) {
                                            var listaVentasPorDia = funtions.snapshotToArray(snapshot)
                                            this.setState({
                                                listaVentasPorDia: listaVentasPorDia
                                            })
                                            listaVentasPorDia.forEach((item, j) => {
                                                if (Number(item.id) === i) {
                                                    this.state.ventasDiarias.series[0][i] = item.valor
                                                } else {
                                                    this.state.ventasDiarias.series[0][j] = item.valor
                                                }
                                            })
                                        }
                                    })
                                }
                            }


                            var refVentasMensualesVa = db.ref(`users/${user.uid}/ventas_mensuales`)
                            refVentasMensualesVa.once('value', snapshot => {
                                if (snapshot.val()) {
                                    var refVentasMensuales = db.ref(`users/${user.uid}/ventas_mensuales/${this.state.index_des}`)
                                    refVentasMensuales.update({
                                        valor: this.state.total_ventas_mensuales
                                    })
                                } else {
                                    for (let j = 0; j < 12; j++) {

                                        if (j === this.state.index_des) {
                                            var refVentasMensuales = db.ref(`users/${user.uid}/ventas_mensuales/${this.state.index_des}`)
                                            refVentasMensuales.update({
                                                valor: this.state.total_ventas_mensuales
                                            })
                                        } else {

                                            var refVentasMensuales = db.ref(`users/${user.uid}/ventas_mensuales/${j}`)
                                            refVentasMensuales.update({
                                                valor: 0
                                            })
                                        }

                                    }
                                }
                            })

                            for (var i = 0; i < this.state.ventasMensauales.series[0].length; i++) {
                                if (i === this.state.index_des) {
                                    var refVentasMensualesTotal = db.ref(`users/${user.uid}/ventas_mensuales`)
                                    refVentasMensualesTotal.on('value', snapshot => {
                                        if (snapshot.val()) {
                                            var listaVentasMensuales = funtions.snapshotToArray(snapshot)

                                            this.setState({
                                                listaVentasMensuales: listaVentasMensuales
                                            })
                                            listaVentasMensuales.forEach((item, j) => {
                                                if (j === i) {
                                                    this.state.ventasMensauales.series[0][i] = item.valor
                                                } else {
                                                    this.state.ventasMensauales.series[0][j] = item.valor
                                                }
                                            })
                                        }
                                    })
                                    //  this.state.ventasMensauales.series[0][i] = this.state.total_ventas_mensuales
                                }
                            }
                        }, 50);


                    }

                })
                refGastos.on('value', snapshot => {
                    if (snapshot.val()) {
                        var listaGastos = funtions.snapshotToArray(snapshot)
                        this.setState({
                            total_gastos_diarios: 0,
                            total_gastos_mensuales: 0
                        })
                        listaGastos.map(item => {
                            if (item.fecha === funtions.obtenerFechaActual()) {
                                this.setState({
                                    total_gastos_diarios: Number(this.state.total_gastos_diarios) + Number(item.total_final),
                                })

                            }
                        })

                        listaGastos.map(item => {
                            if (item.fecha.substr(5, 2) === this.state.idex_of_mes) {
                                this.setState({
                                    total_gastos_mensuales: Number(this.state.total_gastos_mensuales) + Number(item.total_final),
                                })
                            }
                        })

                    }
                })


            } else {
                this.setState({ sesionState: 'cerrada' })
            }
        })
    }

    componentWillReceiveProps(props) {

    }

    devolverDiaActual = (valor) => {
        switch (valor) {
            case 'Lunes':
                this.setState({
                    idex_of: 1,
                    data: {
                        labels: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado",],
                        series: [[0, 0, 0, 0, 0, 0, 0]]
                    },
                })
                break;
            case 'Martes':
                this.setState({
                    idex_of: 2
                })
                break;
            case 'Miercoles':
                this.setState({
                    idex_of: 3
                })
                break;
            case 'Jueves':
                this.setState({
                    idex_of: 4,
                })
                break;
            case 'Viernes':
                this.setState({
                    idex_of: 5
                })
                break;
            case 'Sabado':
                this.setState({
                    idex_of: 6
                })
                break;
            case 'Domingo':
                this.setState({
                    idex_of: 0
                })
                break;
        }

    }
    devolverMesActual = (valor) => {
        switch (valor) {
            case 'Enero':
                this.setState({
                    idex_of_mes: '01',
                    index_des: 0,
                    data: {
                        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                        series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
                    },
                })
                break;
            case 'Febrero':
                this.setState({
                    idex_of_mes: '01',
                    index_des: 1,
                })
                break;
            case 'Marzo':
                this.setState({
                    idex_of_mes: '02',
                    index_des: 2,
                })
                break;
            case 'Abril':
                this.setState({
                    idex_of_mes: '03',
                    index_des: 3,
                })
                break;
            case 'Mayo':
                this.setState({
                    idex_of_mes: '04',
                    index_des: 4,
                })
                break;
            case 'Junio':
                this.setState({
                    idex_of_mes: '05',
                    index_des: 5,
                })
                break;
            case 'Julio':
                this.setState({
                    idex_of_mes: '06',
                    index_des: 6,
                })
                break;
            case 'Agosto':
                this.setState({
                    idex_of_mes: '07',
                    index_des: 7,
                })
                break;
            case 'Septiembre':
                this.setState({
                    idex_of_mes: '08',
                    index_des: 8,
                })
                break;
            case 'Octubre':
                this.setState({
                    idex_of_mes: '09',
                    index_des: 9,
                })
                break;
            case 'Noviembre':
                this.setState({
                    idex_of_mes: '10',
                    index_des: 10,
                })
                break;
            case 'Diciembre':
                this.setState({
                    idex_of_mes: '11',
                    index_des: 11,
                })
                break;
        }
    }

    onFinish = (event) => {
        var marquee = event.target ? event.target : event.srcElement;
        var info = marquee.parentNode.getElementsById("marque")[0];
        info.innerHTML += event.type + ", ";
    }

    render() {
        return (
            <div >
                <ToolbarContainer title={'Inicio'} open={this.props.open}>
                    
                </ToolbarContainer>
                {
                    this.state.initialState ?
                        <div>
                            <div style={{ marginTop: -15, marginLeft: 75, fontFamily: "cursive", display: 'flex', flexDirection: 'row', width: "100%" }}>
                                <h6 style={{ fontSize: 14, fontWeight: 100 }}> {funtions.fecha()}</h6>
                                <div style={{ flex: .8 }}></div>

                            </div>
                            <Dashboard
                                ventaDiaria={this.state.total_ventas_diarias}
                                total_ventas_mensuales={this.state.total_ventas_mensuales}
                                gostosDiarios={this.state.total_gastos_diarios}
                                gastosMensuales={this.state.total_gastos_mensuales} />
                            <br />
                            <br />
                            <br />
                            <br />
                            <div style={{ margin: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                {/* <Grid container style={{ width: '93%', display: 'flex', justifyContent: 'space-between' }}>
                                    <Grid item xs={5} style={{ margin: 0 }}>
                                        <Card style={{ backgroundColor: '#eee', }}>

                                            <div style={{ marginTop: -15, marginLeft: 50, fontFamily: "cursive", display: 'flex' }}>
                                                <h6 style={{ fontSize: 14 }}>Grafico de ventas semanales</h6>
                                                <div style={{ flex: .9 }}></div>
                                                <IconButton
                                                    onClick={() => {
                                                        this.refrescar()
                                                    }}>
                                                    <Icon style={{ color: 'black' }}>refresh</Icon>
                                                </IconButton>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '85%', marginLeft: 50 }}>
                                                {

                                                    this.state.listaVentasPorDia.map((items) => {
                                                        if (this.state.idex_of === Number(items.id)) {
                                                            return <Chip style={{ fontSize: 11, fontFamily: "cursive", backgroundColor: '#009688', color: 'white' }} label={'$ ' + Number(items.valor).toFixed(2)} />
                                                        } else {
                                                            return <Chip style={{ fontSize: 11, fontFamily: "cursive", backgroundColor: '#52c7b8', color: 'black' }} label={'$ ' + Number(items.valor).toFixed(2)} />
                                                        }
                                                    })
                                                }



                                            </div>
                                            <ChartistGraph data={this.state.ventasDiarias} options={this.state.options} type={this.state.type} style={{ fill: 'blue' }} />
                                        </Card>
                                    </Grid> */}

                                {/*   <Grid item xs={7} style={{ margin: 0 }}>
                                        <Card style={{ backgroundColor: '#eee', }}>
                                            <div style={{ marginTop: -15, marginLeft: 50, fontFamily: "cursive", display: 'flex', }}>
                                                <h6 style={{ fontSize: 14 }}>Grafico de ventas musuales</h6>
                                                <div style={{ flex: .9 }}></div>
                                                <IconButton
                                                    onClick={() => {
                                                        this.refrescar()
                                                    }}>
                                                    <Icon style={{ color: 'black' }}>refresh</Icon>
                                                </IconButton>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', marginLeft: 50 }}>
                                                {
                                                    this.state.listaVentasMensuales.map((item) => {
                                                        if (Number(item.id) === this.state.index_des) {
                                                            return <Chip style={{ fontSize: 9, fontFamily: "cursive", backgroundColor: '#009688', color: 'white' }} label={'$ ' + Number(item.valor).toFixed(2)} />
                                                        } else {
                                                            return <Chip style={{ fontSize: 9, fontFamily: "cursive", backgroundColor: '#52c7b8', color: 'black' }} label={'$ ' + Number(item.valor).toFixed(2)} />
                                                        }
                                                    })
                                                }
                                            </div>
                                            <ChartistGraph data={this.state.ventasMensauales} options={this.state.options} type={this.state.typeMensuales} />
                                        </Card>
                                    </Grid> 

                                </Grid>
                                    */}
                            </div>



                            <div
                                id='marque'
                                style={{
                                    width: '100%',
                                    fontSize: 30,
                                    fontFamily: "cursive",
                                    fontWeight: '600'
                                }}>
                                <marquee behavior="scroll" loop={1} onfinish={(event) => this.onFinish(event)} style={{ position: 'absolute', bottom: 75 }}>{`${this.state.usuario.nombre}`} ServiFac te da la bienvenida</marquee>

                            </div>
                        </div>
                        :
                        <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src="/static/spinner.gif"></img>
                        </div>
                }
            </div>
        )
    }
}

export default Inicio