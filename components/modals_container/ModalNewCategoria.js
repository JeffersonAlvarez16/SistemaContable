import React, { Component } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ModalNewCategoria extends Component {
    render() {

        const { 
            item, 
            estadoModal, 
            title, 
            handleClose, 
            valorTexto, 
            handleSetValorTexto, 
            handleNuevoItem,
            handleActualizarItem,
            handleEliminarItem
        } = this.props

        return (
            <div>
                <DialogTitle id="form-dialog-title">
                    {
                        estadoModal === 'nuevo' &&
                        `Nueva ${title}`
                    }
                    {
                        estadoModal === 'editar' &&
                        `Editar ${item.nombre}`
                    }
                    {
                        estadoModal === 'eliminar' &&
                        `Esta seguro de eliminar "${item.nombre}"?`
                    }
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send
                        updates occasionally.
                    </DialogContentText> */}
                    {
                        estadoModal === 'nuevo' || estadoModal === 'editar' ?
                            <TextField
                                autoFocus
                                margin="dense"
                                id="new-category"
                                label={title}
                                type="text"
                                fullWidth
                                value={valorTexto}
                                onChange={event => handleSetValorTexto(event.target.value)}
                            />
                            :
                            <div></div>
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>

                    {
                        estadoModal === 'nuevo' &&
                        <Button onClick={()=>{
                            handleNuevoItem(valorTexto)
                            handleClose()
                        }} color="primary">
                            Guardar
                        </Button>
                    }
                    {
                        estadoModal === 'editar' &&
                        <Button onClick={()=>{
                            handleActualizarItem(valorTexto,item.id)
                            handleClose()
                        }} color="primary">
                            Actualizar
                        </Button>
                    }
                    {
                        estadoModal === 'eliminar' &&
                        <Button onClick={()=>{
                            handleEliminarItem(item.id)
                            handleClose()
                        }} color="primary">
                            Eliminar
                        </Button>
                    }

                </DialogActions>
            </div>
        );
    }
}

export default ModalNewCategoria;