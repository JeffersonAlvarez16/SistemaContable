import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const TablaVacia = (props) => {
    return (
        <div style={{
            width: '100%',
            marginTop: 60,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <Typography variant="title" gutterBottom>
                {props.title}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={props.handleClickOpen}
            >
                {props.titleButton}
            </Button>
        </div>
    );
}

export default TablaVacia