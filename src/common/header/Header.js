import React, { Component } from "react";
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';


const TabsContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabsContainer.propTypes = {
    children: PropTypes.node.isRequired
}

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

    inputFirstNameHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }

    inputLastNameHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    inputEmailHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    inputRegisterPasswordHandler = (e) => {
        this.setState({ registerPassword: e.target.value });
    }

    inputContactHandler = (e) => {
        this.setState({ contact: e.target.value });
    }

    inputUsernameHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputLoginPasswordHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
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
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.isModalOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                    {this.state.value === 0 &&
                        <TabsContainer>
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameHandler} />
                                <FormHelperText className={this.state.usernamePresent}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordHandler} />
                                <FormHelperText className={this.state.loginPasswordPresent}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            {this.state.loggedIn === true &&
                                <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabsContainer>
                    }

                    {this.state.value === 1 &&
                        <TabsContainer>
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstNameHandler} />
                                <FormHelperText className={this.state.firstnamePresent}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastNameHandler} />
                                <FormHelperText className={this.state.lastnamePresent}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="text" email={this.state.email} onChange={this.inputEmailHandler} />
                                <FormHelperText className={this.state.emailPresent}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword} onChange={this.inputRegisterPasswordHandler} />
                                <FormHelperText className={this.state.registerPasswordPresent}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                <Input id="contact" type="text" contact={this.state.contact} onChange={this.inputContactHandler} />
                                <FormHelperText className={this.state.contactPresent}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            {this.state.registrationSuccess === true &&
                                <FormControl>
                                    <span className="successText">
                                        Registration Successful. Please Login!
                                      </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>REGISTER</Button>
                        </TabsContainer>
                    }
                </Modal>
            </div>
        )
    }
}

export default Header;