import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';

let TableNormalToolbar = props => {
    const {
        numSelected,
        textoTitleP,
        textoTitleS,
        handleClickOpen,
        selected,
        handleDeleteItems,
        deleteSelectedItems,
        handleEditItem,
        selectedItems
    } = props;

    return (
        <div>
            <div style={{
                backgroundColor: '#E1F5FE'
            }}>
                <Toolbar >
                    <Typography variant="title" style={{ width: '70%' }} id="tableTitle" >
                        {numSelected === 0 ? `Lista de ${textoTitleP}` : numSelected > 1 ? `${numSelected}  ${textoTitleP} Seleccionados ` : `${numSelected}  ${textoTitleS} Seleccionado`}
                    </Typography>

                    {/* <div style={{
                        flex: '1 1 100%',
                    }} />

                    {
                        !selectedItems &&
                        <div style={
                            {
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'row'
                            }
                        }>

                            <Tooltip title={`Nuevo ${textoTitleS}`}>
                                <IconButton
                                    disabled={numSelected === 0 ? false : true}
                                    aria-label="Nuevo"
                                    color="secondary"
                                    onClick={handleClickOpen}
                                >
                                    <Add />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Editar  Producto">
                                <IconButton
                                    disabled={numSelected === 1 ? false : true}
                                    color="secondary"
                                    aria-label="Editar"
                                    onClick={() => {
                                        handleEditItem(selected[0])
                                    }}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Eliminar Producto">
                                <IconButton
                                    disabled={numSelected > 0 ? false : true}
                                    aria-label="Eliminar"
                                    color="secondary"
                                    onClick={() => {
                                        deleteSelectedItems()
                                        handleDeleteItems(selected)
                                    }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>

                        </div>
                    } */}
                </Toolbar>
            </div>
        </div>


    );
};


export default TableNormalToolbar