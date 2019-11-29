import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import ProgressBar from "react-bootstrap/ProgressBar";

import { cx } from "emotion";
import Styles from "./ConureUserBarStyles.js";

import $ from "jquery";

class ConureUserBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        let basePoints = this.props.basePoints;
        const levelMinPoints = this.props.levelThresholds.reverse().find(elem => elem <= basePoints);
        this.props.levelThresholds.reverse();
        const levelNumber = this.props.levelThresholds.indexOf(levelMinPoints);
        basePoints -= levelMinPoints;
        let percentage = basePoints/(this.props.levelThresholds[levelNumber+1] - levelMinPoints) * 100;
        
        if(!percentage && percentage != 0) {
            percentage = 100;
        }

        const levelImageLink = this.props.levelImages[levelNumber];
        const levelImage = <img className={ cx( Styles.LevelImage ) } src={`../../../public/assets/img${levelImageLink}`}></img>

        return (
            <div id={this.props.id}>
                <Navbar className={ cx( Styles.UserBarStyle ) } fixed="bottom" expand="lg" bg="light">     
                    <Navbar.Text>
                        Signed in as: <span id="userNameField" href="#login" style={{"color": "black"}}>{this.props.userName}</span>
                    </Navbar.Text>
                    <div className={ cx( Styles.ProgressBarWrapperStyle ) }>
                        <Navbar.Brand>{levelImage}</Navbar.Brand>
                        <Navbar.Text>Level {levelNumber}</Navbar.Text>
                        <ProgressBar className={ cx( Styles.ProgressBarStyle) }>
                            <ProgressBar animated variant="info" now={percentage}></ProgressBar>
                            <ProgressBar animated variant="danger" now={this.props.newPoints}></ProgressBar>
                        </ProgressBar>
                    </div>
                    
                </Navbar>
            </div>
            
        )
    }
}

export default ConureUserBar;