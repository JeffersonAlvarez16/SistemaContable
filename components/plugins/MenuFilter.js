import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import { IconButton } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

function RenderPropsMenu(props) {
    return (
        <WithState>
            {({ anchorEl, updateAnchorEl }) => {
                const open = Boolean(anchorEl);
                const handleClose = () => {
                    updateAnchorEl(null);
                };

                return (
                    <React.Fragment>
                        <IconButton aria-owns={open ? 'render-props-menu' : undefined}
                            aria-haspopup="true"
                            onClick={event => {
                                updateAnchorEl(event.currentTarget);
                            }} >
                            <FilterListIcon fontSize="small" />
                        </IconButton>

                        <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={() => {
                                props.handleNombreProducto()
                                handleClose()
                            }}>Buscar por nombre de producto</MenuItem>
                            <MenuItem onClick={() => {
                                props.handleCodigoBarras()
                                handleClose()
                            }}>Buscar por codigo de barras</MenuItem>
                            <MenuItem onClick={() => {
                                props.handleCodigoreferencia()
                                handleClose()
                            }}>Buscar por codigo de referencia</MenuItem>
                        </Menu>
                    </React.Fragment>
                );
            }}
        </WithState>
    );
}

export default RenderPropsMenu;