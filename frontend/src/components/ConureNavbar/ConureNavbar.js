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

import $ from "jquery";

class ConureNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
        this.userKey = (new URLSearchParams(window.location.search)).get("id");

        // Method Bindings
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }
    open() {
        this.setState({showModal: true});
    }
    close() {
        this.setState({showModal: false});
    }
    render() {
        const popover = (
            <Popover id="idInfo">
                <Popover.Title as="h5">Key</Popover.Title>
                <Popover.Content>
                    You can use this base64 key to log into your account.
                </Popover.Content>
            </Popover>
        )

        return (
            <div id={this.props.id}>
                <Navbar className={ cx( Styles.NavbarStyle ) } bg="light" expand="lg">
                    <Navbar.Brand href="#">
                        <img className={ cx( Styles.LogoStyle ) }  src="../../../public/assets/img/ico/conure-light.ico"/>
                        Conure
                    </Navbar.Brand>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <span className={ cx( Styles.userKeyStyle ) } id="userKey">{this.userKey}</span>
                    </OverlayTrigger>
                    <Nav className="ml-auto">
                        <a href="#" className={ cx( Styles.LoginLinkWrapperStyle ) }>
                            <small className={ cx( Styles.LoginLinkStyle ) } onClick={this.open}>Login</small>
                        </a>
                    </Nav>
                </Navbar>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <i className="fas fa-dove" size="2xl"></i>
                        <Modal.Title className={ cx(Styles.ModalHeaderStyles) }>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Form.Group controlId="LoginForm">
                                    <Form.Label>Key</Form.Label>
                                    <Form.Control id="loginKey" size="sm" type="text" placeholder="Enter base64 key"/>
                                    <Form.Text className="text-muted">
                                        Don't have an key? Use the form below to create an account.
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="outline-danger" size="sm" onClick={() => this.props.loginHandler($("#loginKey").val())}>
                                    Login
                                </Button>
                            </Form>
                            <hr/>
                            <Form>
                                <Form.Group controlId="SignupForm">
                                    <Form.Label>Create Account</Form.Label>
                                    <Form.Control id="newAccountUsername" size="sm" type="text" placeholder="Enter a username"/>
                                    <Form.Text className="text-muted">
                                        This will generate a unique base 64 key which you can use to login. The key can be found in the Navigation bar.
                                    </Form.Text>
                                    <br/>
                                    <Button variant="outline-primary" size="sm" onClick={() => {this.props.createAccount($("#newAccountUsername").val())}}>
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