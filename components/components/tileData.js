// This file is shared across the demos.

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import DraftsIcon from '@material-ui/icons/Drafts';
import Assignment from '@material-ui/icons/Assignment';
import History from '@material-ui/icons/History';
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
import MarkunreadMailbox from '@material-ui/icons/MarkunreadMailbox';
import Tooltip from '@material-ui/core/Tooltip';


import Link from 'next/link'


export const mailFolderListItems = (
    <div>
        <Link prefetch href="/inicio">
            <ListItem button>
                <Tooltip title="Inicio" placement="right">
                    <ListItemIcon>
                        <Trending />
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Inicio" />
            </ListItem>
        </Link>
        <Link prefetch href="/productos">
            <ListItem button>
                <Tooltip title="Productos" placement="right">
                    <ListItemIcon>
                        <ShoppingBasket />
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Productos" />
            </ListItem>
        </Link>
        <Link prefetch href="/stock">
            <ListItem button>
                <Tooltip title="Stock" placement="right">
                    <ListItemIcon>
                        <History />
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Stock" />
            </ListItem>
        </Link>
        <Link prefetch href="/proveedores">
            <ListItem button>
                <Tooltip title="Proveedores" placement="right">
                    <ListItemIcon>
                        <DriveEta />
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Proveedores" />
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
        <Link prefetch href="/retenciones">
            <ListItem button>
                <Tooltip title="Retenciones" placement="right">
                    <ListItemIcon>
                        <DonutSmall/>
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Ventas" />
            </ListItem>
        </Link>
    </div>
);

export const otherMailFolderListItems = (
    <div>
        
    </div>
);