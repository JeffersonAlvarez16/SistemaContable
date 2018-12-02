import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';

const ItemUser = (props) => {
    
    return (      
        <ButtonBase style={{margin:10}} onClick={props.onClick}>
            <Paper elevation={4} >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    margin: 20
                }}>
                    <Avatar style={{ width: 80, height: 80, fontSize: 40, marginBottom: 10 }}>{props.title?props.title.toString().charAt(0):'none'}</Avatar>
                    <Typography variant="subheading" gutterBottom>
                        {props.title?props.title:'none'}
                    </Typography>
                </div>
            </Paper>
        </ButtonBase>
    );
}

export default ItemUser