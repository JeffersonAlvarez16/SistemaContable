import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';


const ModalEliminarUsuario = (props) => {
    return (
        <div>
            
            {
                props.tipo_accion==='activar'&&
                <DialogTitle id="alert-dialog-title">{`¿Está seguro que desea activar el usuario`}</DialogTitle>
            }
            {
                 props.tipo_accion==='desactivar'&&
                 <DialogTitle id="alert-dialog-title">{`¿Está seguro que desea desactivar el usuario`}</DialogTitle>
            }

           
            <DialogActions>
                <Button onClick={props.handleClose} color="primary" >
                    Cancelar
                </Button>               
                {
                    props.tipo_accion === 'activar' &&
                    <Button onClick={props.handleActivarUsuario} color="primary" >
                        Activar
                    </Button>
                }
                {
                    props.tipo_accion === 'desactivar' &&
                    <Button onClick={props.handleActivarUsuario} color="primary" >
                        Desactivar
                    </Button>
                }               
            </DialogActions>
            
        </div>
    );
}

export default ModalEliminarUsuario