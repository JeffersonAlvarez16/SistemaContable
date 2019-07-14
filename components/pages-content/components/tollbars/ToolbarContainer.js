import React from 'react'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from '@material-ui/core';


function ToolbarContainer(props) {
    return (
        <Grid container style={{
            background: 'white',
            position: 'fixed',
            top: 0,
            width: props.open ? '80%' : '95%',
        }}>
            <Grid item xs={12} style={{
                flexDirection: 'row',
                display: 'flex',
                height: '10vh',
                display: 'flex',
                paddingLeft: props.open ? '8%' : '5%',
                alignItems: 'center',
                width: props.open ? '80%' : '95%',
            }}>
                <Typography variant="title" color="inherit" noWrap>
                    {props.title}
                </Typography>
                <div style={{
                    marginRight: 24,
                    display:'flex',
                    position:"absolute",
                    alignItems:'center',
                    right:0
                }}>
                    {props.children}
                </div>
            </Grid>

        </Grid>
    )
}

export default ToolbarContainer