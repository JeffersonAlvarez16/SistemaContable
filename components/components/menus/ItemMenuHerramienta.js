import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class ItemMenuHerramienta extends Component {
    render() {
        const { titleButton, color, visible, onClick, disabled } = this.props
        return (
            <Grid item >
                {
                    visible &&
                    <Button
                        variant="outlined"
                        color={color} onClick={onClick}
                        disabled={disabled}
                    >
                        {
                            titleButton
                        }
                    </Button>
                }

            </Grid>
        );
    }
}

export default ItemMenuHerramienta;