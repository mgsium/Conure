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
        let newPoints = this.props.newPoints;
        const levelMinPoints = this.props.levelThresholds.reverse().find(elem => elem <= (basePoints + newPoints));
        this.props.levelThresholds.reverse();
        let levelNumber = this.props.levelThresholds.indexOf(levelMinPoints);
        basePoints -= levelMinPoints;
        let percentage = basePoints/(this.props.levelThresholds[levelNumber+1] - levelMinPoints) * 100;
        let newPercentage = newPoints/(this.props.levelThresholds[levelNumber+1] - levelMinPoints) * 100;
        
        if(!percentage && percentage != 0) { percentage = 100 }

        const levelImageLink = this.props.levelImages[levelNumber];

        if (levelNumber > 0 && levelNumber < this.props.levelImages.length) {
            const levelImageLink = this.props.levelImages[levelNumber];
        } else {
            levelNumber = 0;
        }

        const levelImage = <img className={ cx( Styles.LevelImage ) } src={levelImageLink}></img>

        console.log("New Points: " + this.props.newPoints);

        return (
            <div id={this.props.id}>
                <Navbar className={ cx( Styles.UserBarStyle ) } fixed="bottom" expand="lg" bg="light">     
                    <Navbar.Text className={cx(Styles.NavbarTextStyles)}>
                        Signed in as: <span id="userNameField" data-target="#login" style={{"color": "black"}}>{this.props.userName ? (this.props.userName) : ("Guest")}</span>
                    </Navbar.Text>
                    <div className={ cx( Styles.ProgressBarWrapperStyle ) }>
                        <div className={ cx( Styles.LevelData ) }>
                            <Navbar.Brand className={ cx( Styles.levelImage ) }>{levelImage}</Navbar.Brand>
                            <Navbar.Text>Level {levelNumber}</Navbar.Text>
                        </div>
                        <ProgressBar className={ cx( Styles.ProgressBarStyle) }>
                            <ProgressBar animated variant="primary" now={percentage}></ProgressBar>
                            <ProgressBar animated variant="danger" now={newPercentage} label={this.props.progressBarLabel}></ProgressBar>
                        </ProgressBar>
                    </div>
                    
                </Navbar>
            </div>
            
        )
    }
}

export default ConureUserBar;