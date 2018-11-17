import React, { Component } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';


const EmitirFacturaModal = (props) => {
    return (
        <div>
            <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea emitir esta factura?"}</DialogTitle>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary" >
                    Cancelar
                </Button>
                <Button onClick={props.handleEmitir} color="primary" >
                    Emitir
                </Button>
            </DialogActions>
        </div>
    );
}

export default EmitirFacturaModal;