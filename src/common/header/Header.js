import React, { Component } from "react";

class Header extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    openModal = () => {
        this.setState({

        });
    }

    closeModal = () => {
        this.setState({

        });
    }

    tabChangeHandler = (event, value) => {

    }

    loginClickHandler = () => {

    }

    registerClickHandler = () => {

    }

    logoutHandler = (error) => {

    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="Movies App Logo" />
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.openModalHandler}>
                            Login
                        </Button>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;