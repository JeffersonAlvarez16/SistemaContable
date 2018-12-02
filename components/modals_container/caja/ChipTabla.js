import React, { Component } from 'react';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Chip, Avatar } from '@material-ui/core';
import colors from '../../../utils/colors';

const ChipTabla = (props) => {

    return (
        <Chip
            avatar={<Avatar style={{ width: 'max-content', paddingLeft: 15, paddingRight: 15, paddingTop: 3, paddingBottom: 3, background: props.backgroundDark }}>
                {
                    props.cantidad
                }
            </Avatar>}
            label={props.label}
            clickable
            color="primary"
            style={{
                background: props.background
            }}
            onDelete={() => this.setState({})}
            deleteIcon={<div style={{ width: 'max-content', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <AttachMoneyIcon style={{ padding: 20, color: 'white' }} />
                <div style={{ marginLeft: -20, marginRight: 20 }}>
                    {`Total: ${props.total}`}
                </div>
            </div>}
        />
    );

}

export default ChipTabla;