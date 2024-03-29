import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchI from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';


class Search extends Component {

    state = {
        amount: '',
        buscar: '',
        weight: '',
        weightRange: '',
        showPassword: false,

        loading: 'llena',
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
        this.props.handleSearch(event.target.value)
    };

    _onKeyPress = (event) => {
        if (event.charCode === 13) { // enter key pressed
            event.preventDefault();
            this.props.handleSearch(this.state.buscar)
        }
    }

    componentDidMount() {
        this.setState({
            loading: this.props.loading ? this.props.loading : 'llena'
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            loading: this.props.loading ? this.props.loading : 'llena'
        })
    }

    render() {


        return (
            <div>

                {
                    this.state.loading === 'cargando' &&
                    <CircularProgress size={25} style={{ marginLeft: '40%', position: 'absolute' }} />
                }


                <Tooltip title={`${this.props.textoTooltip}`} >
                    <TextField
                        id={this.props.id}
                        style={{
                            width: '100%',
                        }}
                        disabled={this.state.loading === 'cargando' ? true : false}
                        variant="standard"
                        type='text'
                        label={`${this.props.textoSearch}`}
                        value={this.state.buscar}
                        onChange={this.handleChange('buscar')}
                        onKeyPress={this._onKeyPress}
                        margin='none'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment variant="filled" position="end">
                                    {
                                        this.state.buscar.length > 0 &&
                                        <Tooltip title={`Click para borrar`}>
                                            <IconButton
                                                aria-label="Toggle clean"
                                                onClick={() => {
                                                    this.setState({
                                                        buscar: ''
                                                    })
                                                    this.props.handleSearch('')
                                                }}
                                            >
                                                <Clear />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                    <Tooltip title={`Click para buscar`}>
                                        <IconButton
                                            aria-label="Toggle Search"
                                            onClick={() => this.props.handleSearch(this.state.buscar)}
                                        >
                                            <SearchI />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Tooltip>



            </div>
        )
    }
}


export default Search;