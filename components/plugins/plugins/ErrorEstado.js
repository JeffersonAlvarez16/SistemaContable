import React from 'react';
import colors from '../../../utils/colors';

const ErrorEstado = props => {
    return (
        <div style={{
            fontSize: 10,
            color: colors.getColorPrymaryRed300(),
            fontStyle: 'italic',
            width: '100%',
            textAlign:'center'
        }}
        >
            {props.children}
        </div>
    )
}

export default ErrorEstado;