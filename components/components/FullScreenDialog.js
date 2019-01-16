import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.setState({
      open: this.props.openModal
    })
  }

  componentWillReceiveProps(props) {
    this.setState({
      open: props.openModal
    })
  }

  render() {
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <div>
            {
              this.props.children
            }
          </div>
        </Dialog>
      </div>
    );
  }
}


export default FullScreenDialog
