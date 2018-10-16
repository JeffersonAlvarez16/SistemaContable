import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import TablaVacia from '../plugins/table-vacia';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


class EnhancedTableHead extends React.Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, rows, actionsNot } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {
                        !actionsNot&&
                        <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    }
                    
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Ordenar Por"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}


let EnhancedTableToolbar = props => {
    const {
        numSelected,
        textoTitleP,
        textoTitleS,
        handleClickOpen,
        selected,
        handleDeleteItems,
        deleteSelectedItems,
        handleEditItem,
        actionsNot
    } = props;

    return (
        <div>
            <div style={{
                backgroundColor: '#E1F5FE'
            }}>

                <Toolbar>
                    <Typography variant="title" style={{ width: '70%' }} id="tableTitle" >
                        {numSelected === 0 ? `Lista de ${textoTitleP}` : numSelected > 1 ? `${numSelected}  ${textoTitleP} Seleccionados ` : `${numSelected}  ${textoTitleS} Seleccionado`}
                    </Typography>

                    <div style={{
                        flex: '1 1 100%',
                    }} />

                    {
                        !actionsNot &&
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
                    }
                </Toolbar>
            </div>
        </div>


    );
};

EnhancedTableToolbar = EnhancedTableToolbar

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'nombre',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 15
    };

    deleteSelectedItems = () => {
        this.setState({
            selected: []
        })
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    componentDidMount() {
        this.setState({
            data: this.props.data,
            estadoTabla: this.props.estadoTabla
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data,
            estadoTabla: props.estadoTabla
        })
    }

    render() {
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <div style={{
                width: '100%'
            }}>

                <EnhancedTableToolbar
                    numSelected={selected.length}
                    textoTitleP={this.props.textoTitleP}
                    textoTitleS={this.props.textoTitleS}
                    handleClickOpen={this.props.handleClickOpen}
                    selected={this.state.selected}
                    deleteSelectedItems={this.deleteSelectedItems}
                    handleDeleteItems={this.props.handleDeleteItems}
                    handleEditItem={this.props.handleEditItem}
                    actionsNot={this.props.actionsNot ? true : false}
                />

                {
                    this.state.estadoTabla === 'vacio' &&
                    <TablaVacia
                        title={`Aún no hay ${this.props.textoTitleP}`}
                        titleButton={`AGREGAR ${this.props.textoTitleS}`}
                        handleClickOpen={this.props.handleClickOpen}
                    />
                }

                {
                    this.state.estadoTabla === 'llena' &&
                    <div>
                        <div style={{
                            overflowX: 'auto'
                        }}>
                            <Table aria-labelledby="tableTitle">
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={data.length}
                                    rows={this.props.rows}
                                    actionsNot={this.props.actionsNot ? true : false}
                                />
                                <TableBody>
                                    {stableSort(data, getSorting(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(n => {
                                            const isSelected = this.isSelected(n.id);
                                            return (
                                                <TableRow
                                                    hover
                                                   // onClick={event => this.handleClick(event, n.id)}
                                                    role="checkbox"
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={n.id}
                                                    selected={isSelected}
                                                >
                                                    {
                                                        !this.props.actionsNot &&
                                                        <TableCell padding="checkbox">
                                                            <Tooltip title="Seleccionar">
                                                                <Checkbox checked={isSelected} />
                                                            </Tooltip>
                                                        </TableCell>
                                                    }

                                                    {
                                                        this.props.rows.map((item) => {
                                                            return <TableCell key={item.id} numeric>{this.props.handleGetData(n, item)}</TableCell>
                                                        })
                                                    }
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 49 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            labelRowsPerPage="Número de filas"
                            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </div>
                }
                {
                    this.state.estadoTabla === 'cargando' &&
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 30,
                        flexGrow: 1,
                    }}>
                        <CircularProgress size={40} />
                    </div>
                }
                {
                    this.state.estadoTabla === 'sin_resultados' &&
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 30,
                        flexGrow: 1,
                    }}>
                        <Typography variant="subheading" >
                            No existen Resultados
                            </Typography>
                    </div>
                }
            </div>
        );
    }
}

export default EnhancedTable
