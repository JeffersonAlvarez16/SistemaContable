import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MailFolderListItems, { mailFolderListItems, otherMailFolderListItems } from './tileData';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


// firebase
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import Contador from '../plugins/plugins/Contador';
import Caja from '../../components/pages-content/caja';
import Clientes from '../../components/pages-content/clientes';
import Inicio from '../pages-content/inicio';
import Productos from '../pages-content/productos';
import Stock from '../pages-content/stock';
import Proveedores from '../pages-content/proveedores';
import VentasFac from '../pages-content/ventasFac';
import Retencion from '../pages-content/retencion';
import DeudasCobrar from '../pages-content/cuentas_cobrar';
import Usuarios from '../pages-content/usuarios';


const drawerWidth = 260;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'fixed',
    height: '100vh',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    position: 'relative'
  },
});



class ClippedDrawer extends React.Component {

  state = {
    open: false,
    anchorEl: null,
    main_contenedor:'inicio'
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  controlClick = (item) => {
    event.preventDefault()
    var db = firebase.database()
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var ref = db.ref(`users/${user.uid}/control_interaccion/${item}`)
        ref.once('value', snap => {
          if (snap.val()) {
            ref.update({
              contador: snap.val().contador + 1
            })
          } else {
            ref.update({
              contador: 1
            })
          }
        })
      }
    })
  }

  cambiarPage=(item)=>{
    this.setState({
      main_contenedor: item
    })
  }

  render() {
    const { anchorEl } = this.state;
    const { classes, theme, user } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar disableGutters={!this.state.open}>

            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="title" color="inherit" noWrap style={{ flex: 1 }}>
              {this.props.title}
            </Typography>
            {
              this.props.fecha != undefined ?
                <Contador fecha={this.props.fecha} />
                :
                <></>
            }

            <ButtonBase onClick={this.handleClick} style={{ marginRight: 20 }}>
              <Typography variant="subheading" color="inherit" noWrap style={{ marginRight: 10 }}>
                {user.nombre}
              </Typography>
              <Avatar style={{ width: 40, height: 40, fontSize: 20 }}>{user ? user.nombre.toString().charAt(0) : 'none'}</Avatar>
            </ButtonBase>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {/* <MenuItem onClick={this.handleClose}>Perfil</MenuItem>
              <MenuItem onClick={this.handleClose}>Configuración</MenuItem> */}
              <MenuItem onClick={() => {
                sessionStorage.removeItem("code-status-ser-section");
                this.props.closeSesion()
              }}>Cerrar Sesión</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          style={{ backgroundColor: '#009688' }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          {/* 
          <div style={{
            marginTop: 64,
            width: drawerWidth
          }} /> */}

          <List style={{ backgroundColor: '#009688', height: '100vh', opacity: '.9' }}>
            <MailFolderListItems click={(item) => {
            this.controlClick(item)
            this.cambiarPage(item)
          }} /></List>

        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div style={{
            display: 'flex',
            flexDirection: 'row'
          }}>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              width: '95%',
              height: '100%',
              position: 'fixed',
              paddingLeft: '5%',
            }}>
              {this.state.main_contenedor==='inicio'&&
                <div><Inicio user={this.props.user}></Inicio></div>
              }
              {this.state.main_contenedor==='caja'&&
                <div><Caja user={this.props.user}></Caja></div>
              }
              {this.state.main_contenedor==='clientes'&&
                <div><Clientes user={this.props.user}></Clientes></div>
              }
              {this.state.main_contenedor==='productos'&&
                <div><Productos user={this.props.user}></Productos></div>
              }
              {this.state.main_contenedor==='stock'&&
                <div><Stock user={this.props.user}></Stock></div>
              }
              {this.state.main_contenedor==='proveedores'&&
                <div><Proveedores user={this.props.user}></Proveedores></div>
              }
              {this.state.main_contenedor==='ventas'&&
                <div><VentasFac user={this.props.user}></VentasFac></div>
              }
              {this.state.main_contenedor==='retenciones'&&
                <div><Retencion user={this.props.user}></Retencion></div>
              }
              {this.state.main_contenedor==='cuentas_cobrar'&&
                <div><DeudasCobrar user={this.props.user}></DeudasCobrar></div>
              }
              {this.state.main_contenedor==='usuarios'&&
                <div><Usuarios user={this.props.user}></Usuarios></div>
              }
              
            </div>
          </div>
        </main>
      </div>
    )
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ClippedDrawer);
