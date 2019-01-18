import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const ModalPreguntarCaja = (props) => {

    return (
        <div style={{ width: 500 }}>
            <Typography variant="title" gutterBottom style={{ textAlign: 'center', margin: 16 }}>
                ¿Desea descontar en caja?
            </Typography>
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'row', margin: 16, justifyContent: 'center' }}>
                <Button color="primary" style={{ marginRight: 16 }} onClick={() => props.handleClose()}>
                    Cancelar
                </Button>
                <Button variant="contained" color="primary" style={{ marginRight: 16 }} onClick={(event) => {
                    event.preventDefault()
                    props.handleDescontarCaja()
                    props.handleClose()
                }}>
                    Descontar de caja
                </Button>
                <Button variant="contained" color="secondary" onClick={() => {
                    props.handleEvitarCaja()
                    props.handleClose()
                }}>
                    No descontar de caja
                </Button>
            </div>
        </div>
    );

}

export default ModalPreguntarCaja;