import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';


const ModalEditarVenta = (props) => {
    return (
        <div>
            <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea editar esta venta?"}</DialogTitle>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary" >
                    Cancelar
                </Button>
                <Button onClick={props.handleEditarVenta} color="primary" >
                    Editar
                </Button>
            </DialogActions>
        </div>
    );
}

export default ModalEditarVenta