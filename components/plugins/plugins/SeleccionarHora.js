import React from 'react';
/* eslint-disable */
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
// pick utils
import DateFnsUtils from '@date-io/date-fns';
import { InlineTimePicker } from 'material-ui-pickers';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import colors from '../../../utils/colors';

const SeleccionarHora = props => {
    return (
        <div style={{ height: 56, width: props.width }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>

                    <WatchLaterIcon style={{
                        position: "absolute",
                        right: 16,
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 16,
                        color: colors.getColorPrymaryDarkGrey500()
                    }} />
                    <InlineTimePicker
                        label={props.label}
                        value={props.value}
                        onChange={props.onChange}
                        style={{
                            width: '100%',
                            position: 'absolute'
                        }}
                    />
                </div>
            </MuiPickersUtilsProvider>
        </div>
    )
}

export default SeleccionarHora;