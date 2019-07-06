// This file is shared across the demos.

import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import DraftsIcon from '@material-ui/icons/Drafts';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import History from '@material-ui/icons/History';
import Usuarios from '@material-ui/icons/Group';
import DriveEta from '@material-ui/icons/DriveEta';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import MailIcon from '@material-ui/icons/Mail';
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
import { Divider } from '@material-ui/core';



class MailFolderListItems extends Component {

    state = {
        inicio: 'red',
        caja: 'trasparent',
        productos: 'trasparent'
    }
    render() {
        return (
            <div>
                
                    <ListItem button onClick={() => {
                        this.props.click('inicio')
                    }}>
                        <Tooltip title="Inicio" placement="right">
                            <ListItemIcon>
                                <Trending style={{ color: '#fff' }} />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                    
                {/*     <Divider style={{backgroundColor:'#fff'}} /> */}

                <ListItem button onClick={() => {
                    this.props.click('caja')
                }}>
                    <Tooltip title="Caja" placement="right">
                        <ListItemIcon>
                            <MonetizationOn style={{ color: '#fff' }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Caja" />
                </ListItem>

                <ListItem button onClick={() => {
                    this.props.click('productos')
                }}>
                    <Tooltip title="Productos" placement="right">
                        <ListItemIcon>
                            <ShoppingBasket style={{ color: '#fff' }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Productos" />
                </ListItem>


                <ListItem button onClick={() => {
                    this.props.click('stock')
                }}>
                    <Tooltip title="Stock" placement="right">
                        <ListItemIcon>
                            <History style={{ color: '#fff' }} />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Stock" />
                </ListItem>

                    <ListItem button onClick={() => {
                        this.props.click('proveedores')
                    }}>
                        <Tooltip title="Proveedores" placement="right">
                            <ListItemIcon>
                                <DriveEta style={{ color: '#fff' }} />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Proveedores" />
                    </ListItem>
                    
                
                    <ListItem button onClick={() => {
                        this.props.click('clientes')
                    }}>
                        <Tooltip title="Clientes" placement="right">
                            <ListItemIcon>
                                <SupervisedUserCircle style={{ color: '#fff' }} />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Clientes" />
                    </ListItem>
                    
                
                    <ListItem button onClick={() => {
                        this.props.click('ventas')
                    }}>
                        <Tooltip title="Ventas" placement="right">
                            <ListItemIcon>
                                <ShoppingCart style={{ color: '#fff' }} />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Ventas" />
                    </ListItem>
                    
                
                    <ListItem button onClick={() => {
                        this.props.click('retenciones')
                    }}>
                        <Tooltip title="Retenciones" placement="right">
                            <ListItemIcon>
                                <DonutSmall style={{ color: '#fff' }} />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Retenciones" />
                    </ListItem>
                
                
                
                    <ListItem button onClick={() => {
                        this.props.click('cuentas_cobrar')
                    }}>
                        <Tooltip title="Cuentas Cobrar" placement="right">
                            <ListItemIcon>
                                <Style style={{ color: '#fff' }} />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Cuentas Cobrar" />
                    </ListItem>
                    
               
               
                    <ListItem button onClick={() => {
                        this.props.click('usuarios')
                    }}>
                        <Tooltip style={{ fontSize: 25 }} title="Usuarios" placement="right">
                            <ListItemIcon>
                                <Usuarios style={{ color: '#fff' }} />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Usuarios" />
                    </ListItem>
                    
            </div>
        )
    }
};

export default MailFolderListItems