// This file is shared across the demos.

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import DraftsIcon from '@material-ui/icons/Drafts';
import Assignment from '@material-ui/icons/Assignment';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MarkunreadMailbox from '@material-ui/icons/MarkunreadMailbox';
import Tooltip from '@material-ui/core/Tooltip';


import Link from 'next/link'


export const mailFolderListItems = (
    <div>
        <Link prefetch href="/inicio">
            <ListItem button>
                <Tooltip title="Inicio" placement="right">
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Inicio" />
            </ListItem>
        </Link>
        <Link prefetch href="/productos">
            <ListItem button>
                <Tooltip title="Productos" placement="right">
                    <ListItemIcon>
                        <Assignment />
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Inventario" />
            </ListItem>
        </Link>
        <Link prefetch href="/clientes">
            <ListItem button>
                <Tooltip title="Clientes" placement="right">
                    <ListItemIcon>
                        <SupervisedUserCircle />
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Contactos" />
            </ListItem>
        </Link>
        <Link prefetch href="/ventas">
            <ListItem button>
                <Tooltip title="Ventas" placement="right">
                    <ListItemIcon>
                        <ShoppingCart />
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Ventas" />
            </ListItem>
        </Link>
        <Link prefetch href="/usuarios">
            <ListItem button>
                <Tooltip title="Usuarios" placement="right">
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Usuarios" />
            </ListItem>
        </Link>
        <Link prefetch href="/factura_electronica">
            <ListItem button>
                <Tooltip title="Factura electrónica" placement="right">
                    <ListItemIcon>
                        <MarkunreadMailbox />
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Factura electrónica" />
            </ListItem>
        </Link>
    </div>
);

export const otherMailFolderListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary="All mail" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Spam" />
        </ListItem>
    </div>
);