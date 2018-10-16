import React from 'react';

import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';


class AutoCompleteTextField extends React.Component {
    state = {
        anchorEl: null,
        dataAuto: [],
        dataAutoTemporal: [],
        open: false
    };

    handleClick = event => {
        const { currentTarget } = event;
        if (event.target.value.length === 0) {
            this.setState(state => ({
                anchorEl: currentTarget,
                open: false
            }));
        } else {
            this.setState(state => ({
                anchorEl: currentTarget,
                open: true
            }));
        }
    };

    componentDidMount() {
        this.setState({
            dataAuto: this.props.dataAutoComplete,
            dataAutoTemporal: this.props.dataAutoComplete
        })
    }


    getResult = (array, text) => {
        var arrayL = array.filter((obj) => obj.nombre.toLowerCase().includes(text))
        if (arrayL.length > 0) {
            this.setState({
                dataAuto: arrayL
            })
        } else {
            this.setState({
                dataAuto: [{ nombre: 'No existe', key: 0 }]
            })
        }

    }

    handleSetTextCategori = () => {
        this.setState({
            open: false
        })
    }

    render() {
        const { anchorEl, open } = this.state;


        return (

            <div  >
                <TextField
                    id={this.props.id}
                    variant="contained"
                    aria-describedby='simple-popper'
                    error={this.props.value.length > 0 ? false : true}
                    value={`${this.props.value}`}
                    onChange={(event) => {
                        this.handleClick(event)
                        this.getResult(this.state.dataAutoTemporal, event.target.value)
                        this.props.changueText(event.target.value)
                    }}
                    style={this.props.styleText}
                    required
                    label={this.props.nameTextFiel}
                    margin={this.props.margin?'dense':'normal'}
                    variant="outlined"
                    onFocus={() => this.setState({ open: true })}
                    onBlur={() => this.setState({ open: false })}
                />
                <Popper id='simple-popper' open={open} anchorEl={anchorEl} transition style={{ zIndex: 99999, minWidth: 350 }} >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <List style={{ maxHeight: 200, overflow: 'auto' }}>
                                    {
                                        this.state.dataAuto &&
                                        this.state.dataAuto.map((item) => {
                                            if (item.nombre === 'No existe') {
                                                return (
                                                    <ListItem key={item.key} button>
                                                        <ListItemText primary={this.props.textItemVacio} onClick={() => this.setState({ open: false })} />
                                                    </ListItem>
                                                )
                                            } else {
                                                return (
                                                    <ListItem key={item.key} button onClick={() => {
                                                        this.props.changueText(item.nombre)
                                                        this.handleSetTextCategori()
                                                    }}
                                                    >
                                                        <ListItemText primary={`${item.nombre}`} />
                                                    </ListItem>
                                                )
                                            }
                                        })
                                    }

                                </List>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>
        );
    }
}

export default AutoCompleteTextField
