import React from 'react';

const Dolar = props => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {`$ ${ props.children }`}
        </div>
    )
}

export default Dolar;