import React, { Component } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';


const ModalEliminarRetencion = (props) => {
    return (
        <div>
            <DialogTitle id="alert-dialog-title">{"¿Desea eliminar?"}</DialogTitle>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary" >
                    Cancelar
                </Button>
                <Button onClick={props.handleEliminar} color="primary" >
                    Eliminar
                    </Button>
            </DialogActions>
        </div>
    );
}

export default ModalEliminarRetencion;