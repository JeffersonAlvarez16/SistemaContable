import React from 'react';
/* eslint-disable */
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
// pick utils
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';
import { InlineDatePicker } from 'material-ui-pickers';
import { InlineTimePicker } from 'material-ui-pickers';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import colors from '../../../utils/colors';

const SeleccionarFecha = props => {
    return (
        <div style={{ height: 56, width: props.width }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>

                    <CalendarTodayIcon style={{
                        position: "absolute",
                        right: 16,
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 16,
                        color: colors.getColorPrymaryDarkGrey500()
                    }} />
                    <InlineDatePicker
                        onlyCalendar
                        label={props.label}
                        value={props.value}
                        onChange={props.onChange}
                        format="dd/MM/yyyy"
                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
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

export default SeleccionarFecha;