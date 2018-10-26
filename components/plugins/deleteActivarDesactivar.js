import React, { Component } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';


const DeleteActivarDesactivar = (props) => {
    return (
        <div>
            {
                props.tipo === 'eliminar' &&
                <DialogTitle id="alert-dialog-title">{"Está seguro que desea eliminar"}</DialogTitle>
            }
            {
                props.tipo === 'activar' &&
                <DialogTitle id="alert-dialog-title">{"Está seguro que desea activar"}</DialogTitle>
            }
            {
                props.tipo === 'desactivar' &&
                <DialogTitle id="alert-dialog-title">{"Está seguro que desea desactivar"}</DialogTitle>
            }

            <DialogActions>
                <Button onClick={props.handleClose} color="primary" >
                    Cancelar
                </Button>
                {
                    props.tipo === 'eliminar' &&
                    <Button onClick={props.handleEliminarItems} color="primary" >
                        Eliminar
                    </Button>
                }
                {
                    props.tipo === 'activar' &&
                    <Button onClick={props.handleActivarItems} color="primary" >
                        Activar
                    </Button>
                }
                {
                    props.tipo === 'desactivar' &&
                    <Button onClick={props.handleDesactivarItems} color="primary" >
                        Desactivar
                    </Button>
                }
            </DialogActions>
        </div>
    );
}

export default DeleteActivarDesactivar;