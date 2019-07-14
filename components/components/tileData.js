// This file is shared across the demos.

import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import History from '@material-ui/icons/History';
import Usuarios from '@material-ui/icons/Group';
import DriveEta from '@material-ui/icons/DriveEta';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import DonutSmall from '@material-ui/icons/DonutSmall';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Trending from '@material-ui/icons/TrendingUp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Style from '@material-ui/icons/Style';
import MarkunreadMailbox from '@material-ui/icons/MarkunreadMailbox';
import Tooltip from '@material-ui/core/Tooltip';

import { withStyles } from '@material-ui/core/styles';


import Link from 'next/link'
import setSnackBars from '../plugins/setSnackBars';
import { Divider, Typography, ButtonBase, Avatar } from '@material-ui/core';



class MailFolderListItems extends Component {

    state = {
        inicio: 'red',
        caja: 'trasparent',
        productos: 'trasparent'
    }
    render() {

        const { main_contenedor, nombreUsuario } = this.props

        return (
            <div>
                <Divider />
                <div style={{ height:  20}} />
                <Typography variant="subheading" color="inherit" noWrap style={{ marginLeft: 16, color: '#545454' }}>
                    MI CUENTA
                </Typography>
                <div style={{ height: 5 }} />
                <ButtonBase style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                    <Avatar style={{ width: 40, height: 40, fontSize: 20, marginRight: 24 }}>{nombreUsuario ? nombreUsuario.toString().charAt(0) : 'none'}</Avatar>
                    <Typography variant="subheading" color="inherit" noWrap style={{ marginRight: 10 }}>
                        {nombreUsuario}
                    </Typography>
                </ButtonBase>
                <div style={{ height:  20}} />
                <Divider />
                <div style={{ height:  20}} />
                <Typography variant="subheading" color="inherit" noWrap style={{ marginLeft: 16, color: '#545454' }}>
                    MENÚ
                </Typography>
                <div style={{ height: 5 }} />
                <ListItem selected={main_contenedor === 'inicio'} button onClick={() => {
                    this.props.click('inicio')
                }}>
                    <Tooltip title="Inicio" placement="right">
                        <ListItemIcon>
                            <Trending style={{ color:  '#545454'  }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Inicio" />
                </ListItem>

                {/*     <Divider style={{backgroundColor:'#fff'}} /> */}

                <ListItem selected={main_contenedor === 'caja'} button onClick={() => {
                    this.props.click('caja')
                }}>
                    <Tooltip title="Caja" placement="right">
                        <ListItemIcon>
                            <MonetizationOn style={{ color:  '#545454'  }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Caja" />
                </ListItem>

                <ListItem selected={main_contenedor === 'productos'} button onClick={() => {
                    this.props.click('productos')
                }}>
                    <Tooltip title="Productos" placement="right">
                        <ListItemIcon>
                            <ShoppingBasket style={{ color:  '#545454'  }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Productos" />
                </ListItem>


                <ListItem selected={main_contenedor === 'stock'} button onClick={() => {
                    this.props.click('stock')
                }}>
                    <Tooltip title="Inventario" placement="right">
                        <ListItemIcon>
                            <History style={{ color:  '#545454'  }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Inventario" />
                </ListItem>

                <ListItem selected={main_contenedor === 'proveedores'} button onClick={() => {
                    this.props.click('proveedores')
                }}>
                    <Tooltip title="Proveedores" placement="right">
                        <ListItemIcon>
                            <DriveEta style={{ color:  '#545454'  }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Proveedores" />
                </ListItem>


                <ListItem selected={main_contenedor === 'clientes'} button onClick={() => {
                    this.props.click('clientes')
                }}>
                    <Tooltip title="Clientes" placement="right">
                        <ListItemIcon>
                            <SupervisedUserCircle style={{ color:  '#545454'  }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Clientes" />
                </ListItem>


                <ListItem selected={main_contenedor === 'ventas'} button onClick={() => {
                    this.props.click('ventas')
                }}>
                    <Tooltip title="Ventas" placement="right">
                        <ListItemIcon>
                            <ShoppingCart style={{ color:  '#545454'  }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Ventas" />
                </ListItem>


                <ListItem selected={main_contenedor === 'retenciones'} button onClick={() => {
                    this.props.click('retenciones')
                }}>
                    <Tooltip title="Retenciones" placement="right">
                        <ListItemIcon>
                            <DonutSmall style={{ color:  '#545454'  }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Retenciones" />
                </ListItem>



                <ListItem selected={main_contenedor === 'cuentas_cobrar'} button onClick={() => {
                    this.props.click('cuentas_cobrar')
                }}>
                    <Tooltip title="Cuentas por Cobrar" placement="right">
                        <ListItemIcon>
                            <Style style={{ color:  '#545454'  }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Cuentas por Cobrar" />
                </ListItem>



                <ListItem selected={main_contenedor === 'usuarios'} button onClick={() => {
                    this.props.click('usuarios')
                }}>
                    <Tooltip style={{ fontSize: 25 }} title="Usuarios" placement="right">
                        <ListItemIcon>
                            <Usuarios style={{ color:  '#545454'  }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Usuarios" />
                </ListItem>
                <div style={{ height:  20}} />
                <Divider />
                <div style={{ height:  20}} />
                <Typography variant="subheading" color="inherit" noWrap style={{ marginLeft: 16, color: '#545454' }}>
                    MÁS APLICACIONES
                </Typography>
                <div style={{ height: 5 }} />
                <ListItem button onClick={() => {
                    window.open('https://puntoventa.facbtaapps.now.sh/', '_blank');
                }}>
                    <Tooltip title="Punto de Venta" placement="right">
                        <ListItemIcon>
                            <LocalAtmIcon style={{ color:  '#545454'  }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Punto de Venta" />
                </ListItem>
                <div style={{ height:  20}} />
                <Divider />
                <div style={{ height:  20}} />
                <Typography variant="subheading" color="inherit" noWrap style={{ marginLeft: 16, color: '#545454' }}>
                    CONFIGURACIÓN
                </Typography>
                <div style={{ height: 5 }} />
                <ListItem button onClick={() => {
                    this.props.closeSesion()
                }}>
                    <Tooltip title="Salir" placement="right">
                        <ListItemIcon>
                            <ExitToAppIcon style={{ color:  '#545454'  }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Salir" />
                </ListItem>

            </div>
        )
    }
};

export default MailFolderListItems