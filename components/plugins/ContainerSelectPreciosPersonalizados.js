import React, { Component } from 'react';
//lista dependecias
import SettingsIcon from '@material-ui/icons/Settings';
import { TextField, InputAdornment, IconButton, Tooltip } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//firebase 
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import funtions from '../../utils/funtions';

import ModalSettingsPricesPersonalizados from '../modals_container/ModalSettingsPricesPersonalizados';
import setSnackBars from './setSnackBars';

class ContainerSelectPreciosPersonalizados extends Component {
    state = {
        precios: [],
        //estado modales
        estadoModalSimple: false,
    }
    componentDidMount() {
       
    }

    render() {
        return (
            <div>
                <ModalSettingsPricesPersonalizados
                    handleClose={() => this.setState({ estadoModalSimple: false })}
                    codigoProducto={this.props.codigoProducto}
                    precio_costo={this.props.precio_costo}
                >

                </ModalSettingsPricesPersonalizados>
            
            </div>
        );
    }
}

export default ContainerSelectPreciosPersonalizados;