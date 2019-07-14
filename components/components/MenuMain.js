import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MailFolderListItems, { mailFolderListItems, otherMailFolderListItems } from './tileData';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


// firebase
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import Caja from '../pages-content/caja';
import Clientes from '../pages-content/clientes';
import Inicio from '../pages-content/inicio';
import Productos from '../pages-content/productos';
import Stock from '../pages-content/stock';
import Proveedores from '../pages-content/proveedores';
import VentasFac from '../pages-content/ventasFac';
import Retencion from '../pages-content/retencion';
import DeudasCobrar from '../pages-content/cuentas_cobrar';
import Usuarios from '../pages-content/usuarios';
import ScrollBarMenuMain from './Components/ScrollBarMenuMain';


const drawerWidth = '20%';

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
    marginLeft: drawerWidth,/* 
    width: `calc(100% - ${drawerWidth})`, */
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
    whiteSpace: 'nowrap',
    width: drawerWidth,
    border: 0,
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



class MenuMain extends React.Component {

  state = {
    open: true,
    anchorEl: null,
    main_contenedor: 'inicio'
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

  cambiarPage = (item) => {
    this.setState({
      main_contenedor: item
    })
  }

  render() {
    const { anchorEl } = this.state;
    const { classes, theme, user } = this.props;

    return (
      <div className={classes.root}>
        <div style={{ position: 'fixed', top: 0 }}
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0)' }}>
            <div style={{
              marginTop: 8,
              marginLeft: 16,
              marginRight: this.state.open ? 8 : 28,
              marginBottom: 8,
              background:'white'
            }}>
              <IconButton
                color="primary"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                style={{ display: this.state.open ? 'none' : 'block' }}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="Close drawer"
                onClick={this.handleDrawerClose}
                style={{ display: this.state.open ? 'block' : 'none' }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </div>

          </div>
        </div>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <ScrollBarMenuMain
            open={this.state.open}
          >
            <div style={{
              background:  'white' ,
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 10
            }}>
              {
                this.state.open ?
                  <img style={{ width: 160, height: 89.844 }} src='/static/logo-bienvenida-administracion.png' />
                  :
                  <div style={{ height: 45.5 }} ></div>
              }
            </div>

            <List style={{
              backgroundColor:  'white' 
            }}>
              <MailFolderListItems
                open={this.state.open}
                main_contenedor={this.state.main_contenedor}
                nombreUsuario={user.nombre}
                closeSesion={this.props.closeSesion}
                click={(item) => {
                  this.controlClick(item)
                  this.cambiarPage(item)
                }} />
            </List>
          </ScrollBarMenuMain>

        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div style={{
            flexDirection: 'column',
            width: this.state.open ? '80%' : '95%',
            height: '100%',
            position: 'fixed',
            paddingLeft: this.state.open ? drawerWidth : '5%'
          }}>
            {this.state.main_contenedor === 'inicio' &&
              <div><Inicio user={this.props.user} open={this.state.open }></Inicio></div>
            }
            {this.state.main_contenedor === 'caja' &&
              <div><Caja user={this.props.user} open={this.state.open }></Caja></div>
            }
            {this.state.main_contenedor === 'clientes' &&
              <div><Clientes user={this.props.user} open={this.state.open }></Clientes></div>
            }
            {this.state.main_contenedor === 'productos' &&
              <div><Productos user={this.props.user} open={this.state.open }></Productos></div>
            }
            {this.state.main_contenedor === 'stock' &&
              <div><Stock user={this.props.user} open={this.state.open }></Stock></div>
            }
            {this.state.main_contenedor === 'proveedores' &&
              <div><Proveedores user={this.props.user} open={this.state.open }></Proveedores></div>
            }
            {this.state.main_contenedor === 'ventas' &&
              <div><VentasFac user={this.props.user} open={this.state.open }></VentasFac></div>
            }
            {this.state.main_contenedor === 'retenciones' &&
              <div><Retencion user={this.props.user} open={this.state.open }></Retencion></div>
            }
            {this.state.main_contenedor === 'cuentas_cobrar' &&
              <div><DeudasCobrar user={this.props.user} open={this.state.open }></DeudasCobrar></div>
            }
            {this.state.main_contenedor === 'usuarios' &&
              <div><Usuarios user={this.props.user} open={this.state.open }></Usuarios></div>
            }

          </div>
        </main>
      </div >
    )
  }
}

MenuMain.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MenuMain);
