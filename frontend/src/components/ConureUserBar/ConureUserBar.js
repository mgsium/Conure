import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import ProgressBar from "react-bootstrap/ProgressBar";
import Modal from "react-bootstrap/Modal";

import { cx } from "emotion";
import GlobalStyles from "../GlobalStyles";
import Styles from "./ConureUserBarStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

import addTaskBtnImg from "../../../public/assets/img/png/add-task-btn.PNG";
import addFolderBtnImg from "../../../public/assets/img/png/add-folder-btn.PNG";

import $ from "jquery";

class ConureUserBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            helpModalIsVisible: false
        }

        // Method Bindings
        this.openHelpModal = this.openHelpModal.bind(this);
        this.closeHelpModal = this.closeHelpModal.bind(this);
    }

    openHelpModal(event) {
        this.setState({helpModalIsVisible: true});
    }

    closeHelpModal(event) {
        this.setState({helpModalIsVisible: false});
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

        const helpModal = (
            <Modal show={this.state.helpModalIsVisible} onHide={this.closeHelpModal} style={{"fontFamily": "'Jost', sans-serif"}}>
                <Modal.Header closeButton>
                    <Modal.Title className={ cx(GlobalStyles.ModalHeaderStyles) }>Help</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Using Conure</h5>
                    Conure is a minimalist todo app designed for ease of use and simple operation.
                    <br/><br/>
                    There are two main components which can be created in Conure:
                    <ul>
                        <li>Tasks</li>
                        <li>Directories</li>
                    </ul>
                    These can be created using button in the task window on the left hand side.
                    <br/><br/>
                    <img src={addTaskBtnImg} className={ cx( GlobalStyles.Center ) } style={{"width": "80%"}}></img>
                    <br/><br/>
                    Switch between tasks and folders using the toggle button on the right hand side.
                    <br/><br/>
                    <img src={addFolderBtnImg} className={ cx( GlobalStyles.Center ) } style={{"width": "80%"}}></img>
                </Modal.Body>
            </Modal>
        )

        return (
            <div id={this.props.id}>
                <Navbar className={ cx( Styles.UserBarStyle ) } fixed="bottom" expand="lg" bg="light">     
                    <Navbar.Text className={cx(Styles.NavbarTextStyles)}>
                        Signed in as: <span id="userNameField" data-target="#login" style={{"color": "black"}}>{this.props.userName ? (this.props.userName) : ("Guest")}</span>
                    </Navbar.Text>
                    <div className={ cx( Styles.HelpDiv ) } onClick={this.openHelpModal}>
                        <span className={ cx( Styles.HelpText) }>
                            <small>
                                Help
                            </small>
                        </span>
                        <FontAwesomeIcon className={ cx( Styles.HelpIcon ) } icon={faQuestion} size="1x"></FontAwesomeIcon>
                    </div>
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
                {helpModal}
            </div>
            
        )
    }
}

export default ConureUserBar;