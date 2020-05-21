import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { cx } from "emotion";
import Styles from "./ConureNavbarStyles.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons"

import $ from "jquery";

class ConureNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: !this.props.userIsLoggedIn,
            IdCopied: false
        }
        this.userKey = (new URLSearchParams(window.location.search)).get("id");

        // Method Bindings
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.copyIdToClipboard = this.copyIdToClipboard.bind(this);
    }

    open() {
        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }

    copyIdToClipboard() {
        var tempElem = document.createElement("input");
        document.body.appendChild(tempElem);
        tempElem.setAttribute("id", "tempElem");
        document.getElementById("tempElem").value = this.props.currentUser.key;
        tempElem.select();
        document.execCommand("copy");
        document.body.removeChild(tempElem);

        this.setState({IdCopied: true}, () => {
            setTimeout(() => {this.setState({IdCopied: false})}, 1500);
        })
    }

    render() {
        const popover = (
            <Popover id="idInfo">
                <Popover.Title as="h5">
                    Key
                </Popover.Title>
                <Popover.Content>
                    You can use this base64 key to log into your account. {this.state.IdCopied ? <span style={{"fontWeight": "bold"}}>Copied!</span> : "(Click to copy)"}
                </Popover.Content>
            </Popover>
        )

        return (
            <div id={this.props.id}>
                <Navbar className={ cx( Styles.NavbarStyle, "shadow-sm" ) } bg="light" expand="lg">
                    <Navbar.Brand className={ cx(Styles.PageTitleStyle) } data-target="#">
                        <img className={ cx( Styles.LogoStyle ) }  src={this.props.logoLink}/>
                        Conure
                    </Navbar.Brand>
                    <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
                        <span className={ cx( Styles.userKeyStyle ) } id="userKey">
                            <a href="#" className={ cx( Styles.CopyToClipboardStyles ) } onClick={this.copyIdToClipboard}>
                                {this.userKey}
                            </a>
                        </span>
                    </OverlayTrigger>
                    <Nav className="ml-auto">
                        <a data-target="#" id="LoginAnchor" className={ cx( Styles.LoginLinkWrapperStyle ) }>
                            <small className={ cx( Styles.LoginLinkStyle ) } onClick={this.open}>Login</small>
                        </a>
                    </Nav>
                    {/*
                    <Navbar.Brand data-target="#" onClick={this.openSettingsModal}>
                        <i className={ cx("fas", "fa-cog", Styles.SettingsIconStyle) }></i>
                    </Navbar.Brand>
                    */}
                </Navbar>

                <Modal className={Styles.ModalStyles} show={this.state.showModal} onHide={this.close}>
                    <Modal.Header className={Styles.ModalHeaderStyles} closeButton>
                        <Modal.Title className={ cx(Styles.ModalHeaderStyles) }>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form onSubmit={ e => {e.preventDefault();(() => this.props.loginHandler($("#loginKey").val()))();}}>
                                <Form.Group controlId="LoginForm">
                                    <Form.Label>Key</Form.Label>
                                    <Form.Control id="loginKey" size="sm" type="text" placeholder="Enter base64 key"/>
                                    <Form.Text className="text-muted">
                                        Don't have an key? Use the form below to create an account.
                                    </Form.Text>
                                </Form.Group>
                                <Button type="button" variant="outline-danger" size="sm" onClick={() => this.props.loginHandler($("#loginKey").val())}>
                                    Login
                                </Button>
                            </Form>
                            <hr/>
                            <Form onSubmit={ e => {e.preventDefault(); (() => this.props.createAccount($("#newAccountUsername").val()))()}}>
                                <Form.Group controlId="SignupForm">
                                    <Form.Label>Create Account</Form.Label>
                                    <Form.Control id="newAccountUsername" size="sm" type="text" placeholder="Enter a username"/>
                                    <Form.Text className="text-muted">
                                        This will generate a unique base 64 key which you can use to login. The key can be found in the Navigation bar.
                                    </Form.Text>
                                    <br/>
                                    <Button variant="outline-primary" type="submit" size="sm">
                                        Sign Up
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Container>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default ConureNavbar;