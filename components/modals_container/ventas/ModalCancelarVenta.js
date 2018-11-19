import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';


const ModalCancelarVenta = (props) => {
    return (
        <div>
            <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea devolver esta venta?"}</DialogTitle>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary" >
                    Cancelar
                </Button>
                <Button onClick={props.handleCancelarVenta} color="primary" >
                    Aceptar
                </Button>
            </DialogActions>
        </div>
    );
}

export default ModalCancelarVenta