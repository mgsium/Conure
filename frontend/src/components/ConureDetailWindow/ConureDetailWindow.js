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
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";

import { cx } from "emotion";
import GlobalStyles from "../GlobalStyles";
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
            activeTab: "timer",
            taskFolderChange: false,
            saveUsernameIsDisabled: true,
            saveSpinnerIsHidden: true
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
        this.setState({showSettingsModal: true}, () => {
            $("#usernameInputField").keydown(() => {
                this.setState({saveUsernameIsDisabled: false});
            })
        });
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

        // console.log(`Time Target Type: ${typeof this.state.time}`);
        if(this.state.initialTime !== this.props.currentTask.target) {
            this.setState({
                time: this.props.currentTask.target,
                initialTime: this.props.currentTask.target
            });
            this.firstInitComplete = false;
        }
        // console.log(typeof this.props.currentTask.target);
        // console.log("Initial Target: " + this.props.currentTask.target);
        // console.log(this.props.editorHtml);

        const settingsModal = (
                <Modal show={this.state.showSettingsModal} onHide={this.closeSettingsModal} style={{"fontFamily": "'Jost', sans-serif"}}>
                    <Modal.Header closeButton>
                        <Modal.Title className={ cx(Styles.SettingsModalHeaderStyles) }>Settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Account Details</h5>
                        <h6 className="text-muted">Account Name</h6>
                        <div 
                            id="usernameInputField"
                            contentEditable={true}
                            className={ cx( Styles.AccountNameContentEditableStyles) }
                        >{this.props.userName}</div>
                        <br/>
                        <Button variant="outline-primary" size="sm" onClick={event => {
                            this.setState({saveUsernameIsDisabled: true, saveSpinnerIsHidden: false}, () => {
                                this.props.updateUsername(event, $("#usernameInputField").text());
                                this.setState({saveSpinnerIsHidden: true});
                            });
                        }} disabled={this.state.saveUsernameIsDisabled}>
                            Save
                        </Button>
                        <Spinner size="sm" animation="border" variant="primary" style={{"marginLeft": "10px"}} hidden={this.state.saveSpinnerIsHidden}></Spinner>
                        <hr />
                        <h5>Default Points Score</h5>
                        <div className="text-muted">
                            <small><em>
                                The default is 100 points.
                            </em></small><br/>
                            <small>Select Points Score</small>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-success">
                                    {this.props.taskCompletionPoints}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => {this.props.changeDefaultPointsScore(25)}}>25</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {this.props.changeDefaultPointsScore(50)}}>50</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {this.props.changeDefaultPointsScore(75)}}>75</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {this.props.changeDefaultPointsScore(100)}}>100</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {this.props.changeDefaultPointsScore(125)}}>125</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {this.props.changeDefaultPointsScore(150)}}>150</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        {/* Default Points Score Slider */}
                        <hr/>
                        <h5>Reset Points Score</h5>
                        <div style={{"color": "red", "marginBottom": "10px"}}>
                            <small>
                                Warning: This set your points score to 0. This cannot be reversed.
                            </small>
                        </div>
                        <Button className={ cx(Styles.ResetBtnStyles) } variant="outline-danger" size="sm" onClick={this.props.resetXP}>
                            Reset Points
                        </Button>
                    </Modal.Body>
                </Modal>
        )


        const taskPanel = (
            <div id={this.props.id} className={ cx( Styles.DetailWindowWrapperStyle, GlobalStyles.ShowOnFullScreen ) }>
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
                        onChange={event => {
                            this.props.updateTask(event);
                            this.disableEnter(event);
                        }}
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
                {settingsModal}
            </div>
        )
        

        const folderPanel = (
            <div id={this.props.id} className={ cx( Styles.DetailWindowWrapperStyle ) }>
                <Container fluid>
                    <p style={{"position": "relative", "top": "0.75vh"}}>Folder</p>
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
                        &nbsp;&nbsp;Delete Folder
                    </Button>
                    <hr/>
                    <div id={"folderBodyField"}
                        contentEditable={true} 
                        suppressContentEditableWarning={true}
                        spellCheck={false} 
                        className={ cx(Styles.TaskBodyStyle) } 
                        onChange={this.disableEnter}
                        placeholder={"Type Here..."}
                    >{this.props.currentFolder.name}</div>
                    <br/>
                    <hr/>
                    <h6>Tasks: </h6>
                    <br/>
                    <ol>
                    {
                        this.props.tasks.filter(task => task.parentFolderId == this.props.currentFolder._id).map( task => (
                            <li>{(task.body ? task.body : "(No Content)")}</li>
                        ))
                    }
                    </ol>
                </Container>
                {settingsModal}
            </div>
        )
    
        // return ((this.props.currentFolder._id !== "" && this.props.currentTask.target === 0) ? folderPanel : taskPanel);
        /*if (this.props.currentFolder._id !== "" && this.props.folderIsActive) {
            return folderPanel;
        }*/
        return taskPanel;
        
    }
}

export default ConureDetailWindow;