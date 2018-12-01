import React from 'react';

const ContainerPlantillas = (props) => {
    return (
        <div style={{ display: 'none', position: 'fixed' }}>
            {props.children}
        </div>
    );
}

export default ContainerPlantillas