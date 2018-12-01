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
import TablaVacia from '../../plugins/table-vacia';

import TableNormalToolbar from './TableNomalToolbar'
import TableNormalHead from './TableNormalHead'

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

class TablaNormal extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'nombre',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 15
    };

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
            this.props.itemsSeleccionados(this.getElementosData(this.state.data, this.state.data.map(n => n.id)))        
            return;
        }
        this.props.itemsSeleccionados([])
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
        this.props.itemsSeleccionados(this.getElementosData(this.state.data, newSelected))        
        this.setState({ selected: newSelected });
    };

    getElementosData=(data, newSelected)=>{
        var array=[]
        newSelected.forEach(element => {
            array.push(...data.filter(item=>item.codigo===element))
        });
        return array
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    componentDidMount() {
        console.log(this.props.data)
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
        //variables de props
        const {
            selectedItems,
            textoTitleP,
            textoTitleS,
            handleGetData,
            rows,
            toolbar,
            notTab
        } = this.props
        //variables comprovadas de props con valor por defecto
        this.selectedItems = this.selectedItems != null ? this.selectedItems : true
        this.toolbar = this.toolbar != null ? this.toolbar : true
        this.textoTitleP = this.textoTitleP != null ? this.textoTitleP : 'Plural'
        this.textoTitleS = this.textoTitleS != null ? this.textoTitleS : 'Singular'
        this.notTab = this.notTab != null ? this.notTab : false

        return (
            <div>
                {
                    toolbar &&
                    <TableNormalToolbar
                        numSelected={selected.length}
                        textoTitleP={textoTitleP}
                        textoTitleS={textoTitleS}
                        selected={this.state.selected}
                        selectedItems={selectedItems}
                    />
                }

                {
                    this.state.estadoTabla === 'vacio' &&
                    <TablaVacia
                        title={`Aún no hay ${textoTitleP}`}
                        titleButton={`AGREGAR ${textoTitleS}`}
                    />
                }

                {
                    this.state.estadoTabla === 'llena' &&
                    <div style={{ width: '100%' }}>
                        <div style={{
                            overflowX: 'auto',
                            overflowY: 'auto',
                            height: notTab===true? '73vh':'66vh'
                        }}>
                            <Table aria-labelledby="tableTitle" style={{ minWidth: 300 }}>
                                <TableNormalHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={data.length}
                                    rows={rows}
                                    selectedItems={selectedItems}
                                />
                                <TableBody>
                                    {stableSort(data, getSorting(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(n => {
                                            const isSelected = this.isSelected(n.id);
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={event => {
                                                        !selectedItems &&
                                                            this.handleClick(event, n.id)
                                                    }}
                                                    role="checkbox"
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={n.id}
                                                    selected={isSelected}
                                                >
                                                    {
                                                        !selectedItems &&
                                                        <TableCell padding="checkbox">
                                                            <Tooltip title="Seleccionar">
                                                                <Checkbox checked={isSelected} />
                                                            </Tooltip>
                                                        </TableCell>
                                                    }

                                                    {
                                                        rows.map((item) => {
                                                            return <TableCell key={item.id} body>{handleGetData(n, item)}</TableCell>
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

                            style={{
                                position: 'fixed',
                                bottom: 0,
                            }}
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

export default TablaNormal
