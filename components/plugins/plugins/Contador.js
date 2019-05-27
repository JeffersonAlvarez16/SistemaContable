import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';

class Contador extends Component {

    state = {
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos:0
    }

    componentDidMount(){
        this.contador()
    }

    contador = () => {
        var fecha = this.props.fecha
        var hoy = new Date()
        var dias = 0
        var horas = 0
        var minutos = 0
        var segundos = 0
        if (fecha > hoy) {
            var diferencia = (fecha.getTime() - hoy.getTime()) / 1000
            dias = Math.floor(diferencia / 86400)
            diferencia = diferencia - (86400 * dias)
            horas = Math.floor(diferencia / 3600)
            diferencia = diferencia - (3600 * horas)
            minutos = Math.floor(diferencia / 60)
            diferencia = diferencia - (60 * minutos)
            segundos = Math.floor(diferencia)
            this.setState({
                dias: dias,
                horas: horas,
                minutos: minutos,
                segundos:segundos
            })
            if (dias > 0 || horas > 0 || minutos > 0 || segundos > 0) {
                setTimeout(() => {
                    this.contador()
                }, 1000)
            }
            else {
                //o dias
            }
        }
    }
    render() {
        return (
            <div style={{paddingTop:0,float:"right",display:'flex',flexDirection:'row',flex: .1,width:150 }}>
                <Paper elevation={1} style={{width:150,marginRight:15,textAlign:"center"}}>
                <Typography variant='subheading' style={{padding:5}}>
                Faltan {this.state.dias}  dias
                </Typography>              
                </Paper>
                
               
            </div>
        );


    }
}

export default Contador;