import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';


const ModalContainerNormal = (props) => {
    return (
        <Dialog
            onClose={props.handleClose}
            aria-labelledby="simple-dialog"
            open={props.open}
            style={{ zIndex: 99980 }}
        >
            {props.children}
        </Dialog>
    );
}

export default ModalContainerNormal;