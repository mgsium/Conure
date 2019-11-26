import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { cx } from "emotion";
import Styles from "./ConureNavbarStyles.js";

class ConureNavbar extends Component {
    constructor(props) {
        super(props);
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
                            <small className={ cx( Styles.LoginLinkStyle ) }>Login</small>
                        </a>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default ConureNavbar;