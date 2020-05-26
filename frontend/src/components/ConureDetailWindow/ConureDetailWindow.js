import React, { Component } from "react";
import ReactDOM from "react-dom";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Modal from "react-bootstrap/Modal";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";

import { cx } from "emotion";
import Styles from "./ConureDetailWindowStyles.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumpster, faCheck, faPlus, faMinus, faTools, faBackward } from "@fortawesome/free-solid-svg-icons";

import $ from "jquery";

class ConureDetailWindow extends Component {
    constructor(props) {
        super(props);

        console.log("Props" + this.props);

        this.state = {
            counting: false,
            toggleCountdownButtonVariant: "info",
            toggleCountdownButtonContent: "Start",
            time: this.props.currentTask.target,
            initialTime: this.props.currentTask.target,
            showSettingsModal: false,
            activeTab: "timer"
        };

        // const [counter, setCounter] = React.useState(60);
        this.firstInitComplete = true;

        // Method Bindings
        this.toggleCountdown = this.toggleCountdown.bind(this);
        this.openSettingsModal = this.openSettingsModal.bind(this);
        this.closeSettingsModal = this.closeSettingsModal.bind(this);

    }

    toggleCountdown( event ) {
        // Toggle Countdown
        console.log("Toggling Countdown...")

        if (!this.state.counting) {
            console.log("Starting")

            this.setState({
                toggleCountdownButtonVariant: "danger",
                toggleCountdownButtonContent: "Stop"
            });

            this.timer = setInterval(() => this.setState({
                time: this.state.time - 1
            }, () => {console.log(this.state.time);}), 1000);

        } else {
            console.log("Stopping")

            this.setState({
                toggleCountdownButtonVariant: "info",
                toggleCountdownButtonContent: "Start"
            });

            clearInterval(this.timer);
            this.props.updateTime(this.state.time);
        }

        this.setState({
            counting: !this.state.counting
        })
    }
    
    componentDidMount() {
        document.getElementById("taskBodyField").addEventListener("input", ( event ) => {
            this.props.updateTask(event);
        }, false)

        $("#taskBodyField").keydown(this.disableEnter);
    }

    disableEnter(event) {
        // console.log(event.keyCode);
        if (event.keyCode == 13) {
            event.preventDefault();
            return;
        }
    }

    openSettingsModal() {
        this.setState({showSettingsModal: true});
    }

    closeSettingsModal() {
        this.setState({showSettingsModal: false});
    }

    changeTab(event) {
        this.setState({ activeTab: event.target.href.split("/").pop() });
    }

    render() {
        const body = this.props.currentTask.body;
        const description = this.props.currentTask.description;
        let time_target = this.state.time;

        console.log(`Time Target Type: ${typeof this.state.time}`);
        if(this.state.initialTime !== this.props.currentTask.target) {
            this.setState({
                time: this.props.currentTask.target,
                initialTime: this.props.currentTask.target
            });
            this.firstInitComplete = false;
        }
        console.log(typeof this.props.currentTask.target);
        console.log("Initial Target: " + this.props.currentTask.target);
        // console.log(this.props.editorHtml);


        return (
            <div id={this.props.id} className={ cx( Styles.DetailWindowWrapperStyle ) }>
                <Container fluid>
                    <p style={{"position": "relative", "top": "0.75vh"}}>In Detail</p>
                    <Button className={ cx( Styles.ToolbarButtonStyles, Styles.SettingsButtonStyles ) } variant="outline-secondary" onClick={this.openSettingsModal} size="sm">
                        <FontAwesomeIcon icon={faTools}></FontAwesomeIcon>
                        &nbsp;&nbsp;Settings
                    </Button>
                    <Button type="button" variant="outline-danger" size="sm" className={ cx( Styles.ToolbarButtonStyles, Styles.DeleteButtonStyles ) } onClick={(event) => {
                                                    if (this.props.currentTask._id) {
                                                        this.setState({counting: false}, () => {
                                                            this.props.removeTask(event, this.props.currentTask._id);
                                                        });
                                                    }
                                                }}>
                        <FontAwesomeIcon icon={faDumpster}></FontAwesomeIcon>
                        &nbsp;&nbsp;Delete Task
                    </Button>
                    <Button className={ cx( Styles.ToolbarButtonStyles, Styles.DoneButtonStyles ) } variant="outline-success" size="sm" onClick={(event) => {
                                                    if (this.props.currentTask._id) {
                                                        this.setState({counting: false}, () => {
                                                            this.props.markAsDone(event, this.props);
                                                        });
                                                    }
                                                }}>
                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                        &nbsp;&nbsp;Done
                    </Button>
                    <hr/>
                    <div id={"taskBodyField"}
                        contentEditable={this.props.currentTask._id ? true : false} 
                        suppressContentEditableWarning={true}
                        spellCheck={false} 
                        className={ cx(Styles.TaskBodyStyle) } 
                        onChange={this.disableEnter}
                        placeholder={this.props.currentTask._id ? "Type Here..." : (this.props.userIsLoggedIn ? "Add a Task" : "Create an Account")}
                    >{body}</div>
                    <br/>
                    <hr/>
                    <Nav className={ cx(Styles.DetailWindowNavStyles) } activeKey="timer" onClick={ event => { event.preventDefault(); this.changeTab(event); }}>
                        <Nav.Item>
                            <Nav.Link href="timer">Timer</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="editor">Details</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Jumbotron className={ cx(Styles.ControlPanelStyles) } hidden={!(this.state.activeTab === "timer")} fluid>
                        <Container>
                            {(() => {

                                if (this.props.currentTask._id) {
                                    // console.log(this.props.currentTask);
                                    return (
                                        <>
                                            <small className={ cx("text-muted") }><i>Time Left</i></small>
                                            {/* <h4>{`${time_target.getHours()}h ${time_target.getMinutes()}m ${time_target.getSeconds()}s`}</h4> */}
                                            <h4>{(`${Math.floor(this.state.time/3600)}h ${Math.floor((this.state.time%3600)/60)}m ${this.state.time%60}s`)}</h4>
                                            <br/>
                                            <ButtonGroup>
                                                <Button className={ cx( ) } variant="primary" style={{ "width" : "6vw" }} size="lg" onClick={() => {
                                                    if (this.state.time - 300 > 0) {
                                                        this.setState({time: this.state.time - 300, initialTime: this.state.time - 300}, () => {this.props.updateTime(this.state.time)});
                                                    }
                                                }}>
                                                    <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                                                </Button>
                                                <Button 
                                                    
                                                    className={ cx( Styles.ButtonStyles ) }
                                                    style={{"marginRight": "0px", "width": "15vw"}} 
                                                    variant={this.state.toggleCountdownButtonVariant} 
                                                    onClick={this.toggleCountdown} 
                                                    size="lg">
                                                        {this.state.toggleCountdownButtonContent}
                                                </Button>
                                                <Button className={ cx( ) } variant="primary" style={{ "width" : "6vw" }} size="lg" onClick={() => {
                                                    if(this.state.time + 300 < 10800) {
                                                        this.setState({time: this.state.time + 300, initialTime: this.state.time + 300}, () => {this.props.updateTime(this.state.time)});
                                                    }
                                                }}>
                                                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                                </Button>
                                            </ButtonGroup>
                                        </>
                                    )
                                } else if (this.props.userIsLoggedIn) {
                                    return (
                                        <h4 className={ cx("text-muted") }>
                                            <i><div style={{"paddingTop": "7vh"}}>Click the red button to add a task!</div></i>
                                        </h4>
                                    )
                                } else {
                                    return (
                                        <h4 className={ cx("text-muted") }>
                                            <i><div style={{"paddingTop": "7vh"}}>Login to start adding tasks!</div></i>
                                        </h4>
                                    )
                                }
                                })() }
                        </Container>
                    </Jumbotron>
                </Container>
                {/*
                <div 
                    id="taskDescriptionField#"
                    className={ cx(Styles.EditorStyles) } 
                    contentEditable={true} 
                    placeholder="Crack some eggs..." 
                    hidden={!(this.state.activeTab === "editor")}>
                {description}
                </div>
                */}
                <div id="taskDescriptionField" className={ cx(Styles.EditorStyles) } hidden={!(this.state.activeTab === "editor")}>
                    <Container>
                        <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                this.props.updateTaskDescription(event, data);
                                console.log(data);
                            }}
                            disabled={this.props.currentTask._id ? false : true}
                        />
                    </Container>
                </div>
                <Modal show={this.state.showSettingsModal} onHide={this.closeSettingsModal}>
                    <Modal.Header closeButton>
                        <Modal.Title className={ cx(Styles.SettingsModalHeaderStyles) }>Settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button className={ cx(Styles.ResetBtnStyles, "shadow") } variant="danger" size="sm" onClick={this.props.resetXP}>
                            <FontAwesomeIcon icon={faBackward} size="sm"/>
                            &nbsp;&nbsp;Reset XP
                        </Button>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default ConureDetailWindow;