import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const variantColor = {
    success: {
        backgroundColor: "#43a047"
    },
    warning: {
        backgroundColor: "#ffa000"
    },
    error: {
        backgroundColor: "#d32f2f"
    },
    info: {
        backgroundColor: "#1976d2"
    },
    default: {
        backgroundColor: '#1976d2'
    }
};


class SimpleSnackbar extends React.Component {
    state = {
        open: false,
    };

    handleClick = () => {
        this.setState({ open: true });

    };

    componentDidMount() {
        this.setState({ open: this.props.openSnack });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={this.props.time}
                    onClose={this.handleClose}                    
                >
                    <MySnackbarContent
                        onClose={this.handleClose}
                        variant={`${this.props.variant}`}
                        message={`${this.props.message}`}
                        style={
                            this.props.variant === 'error' ? variantColor.error :
                                this.props.variant === 'info' ? variantColor.info :
                                    this.props.variant === 'success' ? variantColor.success :
                                        this.props.variant === 'warning' ? variantColor.warning :
                                            variantColor.default
                        }
                    />
                </Snackbar>
            </div>
        );
    }
}


function MySnackbarContent(props) {
    const { message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" style={{
                    display: 'flex',
                    alignItems: 'center',
                }} >
                    <Icon style={{
                        opacity: 0.9,
                        marginRight: 10,
                        fontSize: 20,
                    }} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
            {...other}
        />
    );
}


export default SimpleSnackbar
