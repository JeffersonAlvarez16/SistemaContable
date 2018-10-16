import React, { Component } from 'react';
import funtions from '../../utils/funtions';
import SimpleSnackbar from '../plugins/SnackBars';
import {render} from 'react-dom'

class SetSnackBars {

    openSnack = (variant, contenedor, message, time) => {
        render(this.getSnack(variant, message, time), document.getElementById(contenedor));
        funtions.setTime(time + 200, () => {
            render(<div />, document.getElementById(contenedor));
        })
    }

    getSnack = (variant, message, time) => {
        switch (variant) {
            case 'success':
                return <SimpleSnackbar variant="success" message={message} time={time} openSnack={true} />
            case 'error':
                return <SimpleSnackbar variant="error" message={message} time={time} openSnack={true} />
            case 'warning':
                return <SimpleSnackbar variant="warning" message={message} time={time} openSnack={true} />
            case 'info':
                return <SimpleSnackbar variant="info" message={message} time={time} openSnack={true} />
            default:
                return <div />
        }
    }
}

export default new SetSnackBars()