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
import { ListItem, Tooltip, ListItemIcon, Hidden } from '@material-ui/core';
import Scrollbar from 'react-scrollbars-custom';


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
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth})`,
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



class ClippedDrawer extends React.Component {

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
          <div style={{ display: 'flex', alignItems: 'center', background: 'white' }}>
            <div style={{
              marginTop: 8,
              marginLeft: 16,
              marginRight: this.state.open ? 8 : 28,
              marginBottom: 8,
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


            <Typography variant="title" color="inherit" noWrap style={{ flex: 1 }}>
              {this.props.title}
            </Typography>
            {
              this.props.fecha != undefined ?
                <Contador fecha={this.props.fecha} />
                :
                <></>
            }
            <div style={{ flex: 1 }}></div>

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
          </div>
        </div>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <Scrollbar
            maximalThumbYSize={200}
            scrollbarWidth={20}
            disableTracksWidthCompensation={true}
            thumbYProps={{
              renderer: props => {
                const { elementRef, ...restProps } = props;
                return <div
                  {...restProps}
                  ref={elementRef}
                  style={{
                    background: this.state.open ? '#009688' : 'white',
                    borderRadius: 50
                  }}
                />
              }
            }}
            trackYProps={{
              renderer: props => {
                const { elementRef, ...restProps } = props
                return < div
                  {...restProps}
                  ref={elementRef}
                  style={{
                    width: this.state.open ? 5 : 3,
                    height: '80vh',
                    background: this.state.open ? '#dcd8d8' : '#009688',
                    position:'absolute',
                    right: this.state.open ? '0' : 'auto',
                    left: this.state.open ? 'auto' : '0',
                    marginTop: '15vh',
                    marginBottom: '5vh',
                    borderRadius: 50
                  }}
                />
              }
            }}
            noScrollX={true}>
            <div style={{
              background: this.state.open ? 'white' : '#009688',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 10
            }}>
              {
                this.state.open ?
                  <img style={{ width: 160 }} src='/static/logo-bienvenida-administracion.png' />
                  :
                  <div style={{ height: 54 }} ></div>
              }
            </div>

            <List style={{
              backgroundColor: this.state.open ? 'white' : '#009688'
            }}>
              <MailFolderListItems
                open={this.state.open}
                main_contenedor={this.state.main_contenedor}
                nombreUsuario={user.nombre}
                click={(item) => {
                  this.controlClick(item)
                  this.cambiarPage(item)
                }} />
            </List>
          </Scrollbar>

        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: this.state.open ? '80%' : '95%',
            height: '100%',
            position: 'fixed',
            paddingLeft: this.state.open ? drawerWidth : '5%'
          }}>
            {this.state.main_contenedor === 'inicio' &&
              <div><Inicio user={this.props.user}></Inicio></div>
            }
            {this.state.main_contenedor === 'caja' &&
              <div><Caja user={this.props.user}></Caja></div>
            }
            {this.state.main_contenedor === 'clientes' &&
              <div><Clientes user={this.props.user}></Clientes></div>
            }
            {this.state.main_contenedor === 'productos' &&
              <div><Productos user={this.props.user}></Productos></div>
            }
            {this.state.main_contenedor === 'stock' &&
              <div><Stock user={this.props.user}></Stock></div>
            }
            {this.state.main_contenedor === 'proveedores' &&
              <div><Proveedores user={this.props.user}></Proveedores></div>
            }
            {this.state.main_contenedor === 'ventas' &&
              <div><VentasFac user={this.props.user}></VentasFac></div>
            }
            {this.state.main_contenedor === 'retenciones' &&
              <div><Retencion user={this.props.user}></Retencion></div>
            }
            {this.state.main_contenedor === 'cuentas_cobrar' &&
              <div><DeudasCobrar user={this.props.user}></DeudasCobrar></div>
            }
            {this.state.main_contenedor === 'usuarios' &&
              <div><Usuarios user={this.props.user}></Usuarios></div>
            }

          </div>
        </main>
      </div >
    )
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ClippedDrawer);
