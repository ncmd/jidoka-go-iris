import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
import { blue } from 'material-ui/colors';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
const primary = blue[500]; // #F44336

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Header extends Component {

    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    renderContent() {
        let content = '';

        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <div key="0">
                        <Dialog
                            fullScreen
                            open={this.state.open}
                            onClose={this.handleClose}
                            transition={Transition}
                        >
                            <AppBar style={{ position: 'relative', height: 0}}>
                                <Toolbar style={{ background: 'white' }}>
                                    <Typography variant="title" color="inherit" style={{flex:1}}>
                                        {''}
                                    </Typography>
                                    <IconButton
                                        style={{color:primary}}
                                        onClick={this.handleClose}
                                        aria-label="Close"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Toolbar>
                            </AppBar>

                        </Dialog>
                    </div>
                );
            default:
                if (this.props.auth.credits === 0) {
                    content = (
                        <li key="1">
                            <Payments />
                        </li>
                    );
                } else {
                    content = (
                        <li key="3">
                            <Button dense style={{ color: 'white' }}>
                                Credits: {this.props.auth.credits}
                            </Button>
                        </li>
                    );
                }
                return [
                    content,
                    <li key="2">
                        <Button dense style={{ color: 'white' }} href="/api/logout">
                            Logout
                        </Button>
                    </li>,
                ];
        }
    }
    render() {
        return (
            <div style={{width:'100%'}}>
                <AppBar position="static" style={{background:primary, color:'white'}}>
                    <Toolbar>
                        <Link
                            to={this.props.auth ? '/' : '/'}
                        >
                            <Typography
                                style={{ color: 'white', flex:1}}
                                type="title"
                            >
                                Jidoka
                            </Typography>
                        </Link>
                        <Typography variant="title" color="inherit"  style={{ color: 'white', flex:1}}>
                            {
                                ''
                            }
                        </Typography>
                        <Button style={{ color: 'white' ,background:'#2196f3' }} onClick={this.handleClickOpen}>
                            Login | Signup
                        </Button>
                        {this.renderContent()}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);
