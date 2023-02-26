import React, { Component } from "react";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            value: 0,
            usernamePresent: "dispNone",
            username: "",
            loginPasswordPresent: "dispNone",
            loginPassword: "",
            firstnamePresent: "dispNone",
            firstname: "",
            lastnamePresent: "dispNone",
            lastname: "",
            emailPresent: "dispNone",
            email: "",
            registerPasswordPresent: "dispNone",
            registerPassword: "",
            contactPresent: "dispNone",
            contact: "",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true

        }
    }

    openModal = () => {
        this.setState({
            isModalOpen: true,
            value: 0,
            usernamePresent: "dispNone",
            username: "",
            loginPasswordPresent: "dispNone",
            loginPassword: "",
            firstnamePresent: "dispNone",
            firstname: "",
            lastnamePresent: "dispNone",
            lastname: "",
            emailPresent: "dispNone",
            email: "",
            registerPasswordPresent: "dispNone",
            registerPassword: "",
            contactPresent: "dispNone",
            contact: "",
        });
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false
        });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernamePresent: "dispBlock" }) : this.setState({ usernamePresent: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordPresent: "dispBlock" }) : this.setState({ loginPasswordPresent: "dispNone" });

        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true
                });

                that.closeModal();
            }
        });

        xhrLogin.open("POST", this.props.baseUrl + "auth/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);
    }

    registerClickHandler = () => {
        this.state.firstname === "" ? this.setState({ firstnamePresent: "dispBlock" }) : this.setState({ firstnamePresent: "dispNone" });
        this.state.lastname === "" ? this.setState({ lastnamePresent: "dispBlock" }) : this.setState({ lastnamePresent: "dispNone" });
        this.state.email === "" ? this.setState({ emailPresent: "dispBlock" }) : this.setState({ emailPresent: "dispNone" });
        this.state.registerPassword === "" ? this.setState({ registerPasswordPresent: "dispBlock" }) : this.setState({ registerPasswordPresent: "dispNone" });
        this.state.contact === "" ? this.setState({ contactPresent: "dispBlock" }) : this.setState({ contactPresent: "dispNone" });

        let dataSignup = JSON.stringify({
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "mobile_number": this.state.contact,
            "password": this.state.registerPassword
        });

        let xhrSignup = new XMLHttpRequest();
        let that = this;
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    registrationSuccess: true
                });
            }
        });

        xhrSignup.open("POST", this.props.baseUrl + "signup");
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(dataSignup);
    }

    logoutHandler = (error) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");

        this.setState({
            loggedIn: false
        });
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="Movies App Logo" />
                    {!this.state.loggedIn ?
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={this.openModal}>
                                Login
                            </Button>
                        </div>
                        :
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={this.logoutHandler}>
                                Logout
                            </Button>
                        </div>
                    }
                    {this.props.showBookShowButton === "true" && !this.state.loggedIn
                        ? <div className="bookshow-button">
                            <Button variant="contained" color="primary" onClick={this.openModal}>
                                Book Show
                            </Button>
                        </div>
                        : ""
                    }

                    {this.props.showBookShowButton === "true" && this.state.loggedIn
                        ? <div className="bookshow-button">
                            <Link to={"/bookshow/" + this.props.id}>
                                <Button variant="contained" color="primary">
                                    Book Show
                                </Button>
                            </Link>
                        </div>
                        : ""
                    }
                </header>
            </div>
        )
    }
}

export default Header;