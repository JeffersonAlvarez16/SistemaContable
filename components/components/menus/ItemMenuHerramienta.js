import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class ItemMenuHerramienta extends Component {
    render() {
        const { titleButton, color, visible, onClick, disabled } = this.props
        return (
            <div item >
                {
                    visible &&
                    <Button
                        /* variant="outlined" */
                        color={color} onClick={onClick}
                        disabled={disabled}
                    >
                        {
                            this.props.children &&
                            <div style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}>
                                {
                                    this.props.children
                                }
                            </div>
                        }

                        <div>
                            {
                                titleButton
                            }
                        </div>
                    </Button>
                }

            </div>
        );
    }
}

export default ItemMenuHerramienta;