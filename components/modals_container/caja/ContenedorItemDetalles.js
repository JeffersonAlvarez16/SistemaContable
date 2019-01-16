import React from 'react';

const ContenedorItemDetalles = (props) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row'
        }}>

            {
                props.children
            }

        </div>
    );
}

export default ContenedorItemDetalles;