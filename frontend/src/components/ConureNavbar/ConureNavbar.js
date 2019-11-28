import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { cx } from "emotion";
import Styles from "./ConureNavbarStyles.js";

class ConureNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }

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
        return (
            <div id={this.props.id}>
                <Navbar className={ cx( Styles.NavbarStyle ) } bg="light" expand="lg">
                    <Navbar.Brand href="#">
                        <img className={ cx( Styles.LogoStyle ) }  src="../../../public/assets/img/ico/conure-light.ico"/>
                        Conure
                    </Navbar.Brand>
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
                                    <Form.Control size="sm" type="text" placeholder="Enter base64 key"/>
                                    <Form.Text className="text-muted">
                                        Don't have an key? Use the form below to create an account.
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="outline-danger" size="sm" type="submit">
                                    Login
                                </Button>
                            </Form>
                            <hr/>
                            <Form>
                                <Form.Group controlId="SignupForm">
                                    <Form.Label>Create Account</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Enter a username"/>
                                    <Form.Text className="text-muted">
                                        This will generate a unique base 64 key which you can use to login. The key can be found in the bottom Navigation bar.
                                    </Form.Text>
                                    <br/>
                                    <Button variant="outline-primary" size="sm" type="sumbit">
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