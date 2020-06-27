import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { cx } from "emotion";
import GlobalStyles from "../GlobalStyles.js";
import Styles from "./ConureTaskWindowStyles.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { faExchangeAlt, faArrowLeft, faTimes, faCheck, faBullseye } from "@fortawesome/free-solid-svg-icons";

import $ from "jquery";

import SimpleScrollbar from 'simple-scrollbar';

class ConureTaskWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addTaskBtnText: true,
            addTaskBtnIsOn: true,
            showCreateFolderModal: false,
            showRenameFolderModal: false,
            showCreateTaskModal: false
        }

        // Method Bindings
        this.openCreateFolderModal = this.openCreateFolderModal.bind(this);
        this.closeCreateFolderModal = this.closeCreateFolderModal.bind(this);
        this.openRenameFolderModal = this.openRenameFolderModal.bind(this);
        this.closeRenameFolderModal = this.closeRenameFolderModal.bind(this);
        this.openCreateTaskModal = this.openCreateTaskModal.bind(this);
        this.closeCreateTaskModal = this.closeCreateTaskModal.bind(this);
    }

    updateTaskBtn(outerThis) {
        if (!outerThis.props.taskRenderComplete) {
            setTimeout(() => {this.updateTaskBtn(outerThis)}, 100);
        } else {
            this.setState({addTaskBtnText: true});
        }
    }

    // On Task Addition
    onTaskAddition() {
        try {
            $(`#${this.props.tasks[this.props.tasks.length-1]._id} > div`).click();
        } catch {}
    }

    onFolderModalEnter(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#folderNameSubmitBtn").click();
        }
    }

    onTaskModalEnter(event) {
        if(event.keyCode === 13) {
            event.preventDefault();
            $("#taskBodySubmitBtn").click();
        }
    }

    openCreateFolderModal() {
        this.setState({showCreateFolderModal: true}, () => {
            $("#folderNameField").keydown(this.onFolderModalEnter);
            document.getElementById("folderNameField").focus();
        });
    }

    closeCreateFolderModal() {
        this.setState({showCreateFolderModal: false});
    }

    openCreateTaskModal() {
        this.setState({showCreateTaskModal: true}, () => {
            $("#taskBodyModalField").keydown(this.onTaskModalEnter);
            document.getElementById("taskBodyModalField").focus();
        })
    }

    closeCreateTaskModal() {
        this.setState({showCreateTaskModal: false});
    }

    openRenameFolderModal() {
        this.setState({showRenameFolderModal: true}, () => {
            $("#folderNameField").keydown(this.onFolderModalEnter);
        });
    }

    closeRenameFolderModal() {
        this.setState({showRenameFolderModal: false});
    }

    render() {
        const createFolderModal = (
            <Modal show={this.state.showCreateFolderModal} onHide={this.closeCreateFolderModal}>
                <Modal.Header closeButton>
                    <Modal.Title className={ cx(GlobalStyles.ModalHeaderStyles) }>
                        Create a Folder
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id={"folderNameField"}
                        contentEditable={true} 
                        suppressContentEditableWarning={true}
                        spellCheck={false} 
                        className={ cx( GlobalStyles.LargeInputStyles, GlobalStyles.Center ) } 
                        style={{"width": "100%"}}
                        placeholder="Name your folder..."
                    ></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="folderNameSubmitBtn" variant="warning" className={ cx( Styles.ModalSubmitBtnStyles ) } onClick={event => {
                        this.props.addFolder(event, $("#folderNameField").text());
                        this.closeCreateFolderModal();
                    }}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );

        const createTaskModal = (
            <Modal show={this.state.showCreateTaskModal} onHide={this.closeCreateTaskModal}>
                <Modal.Header closeButton>
                    <Modal.Title className={ cx(GlobalStyles.ModalHeaderStyles) }>
                        Create a Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id={"taskBodyModalField"}
                        contentEditable={true} 
                        suppressContentEditableWarning={true}
                        spellCheck={false} 
                        className={ cx( GlobalStyles.LargeInputStyles, GlobalStyles.Center ) } 
                        style={{"width": "100%"}}
                        placeholder="Crack Some Eggs..."
                    ></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="taskBodySubmitBtn" variant="warning" className={ cx( Styles.ModalSubmitBtnStyles ) } onClick={event => {
                        this.props.addTask(event, $("#taskBodyModalField").text());
                        this.closeCreateTaskModal();
                    }}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );

        const renameFolderModal = (
            <Modal show={this.state.showRenameFolderModal} onHide={this.closeRenameFolderModal}>
                <Modal.Header closeButton>
                    <Modal.Title className={ cx(GlobalStyles.ModalHeaderStyles) }>
                        Rename Folder
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id={"folderNameField"}
                        contentEditable={true} 
                        suppressContentEditableWarning={true}
                        spellCheck={false} 
                        className={ cx( GlobalStyles.LargeInputStyles, GlobalStyles.Center ) } 
                        style={{"width": "100%"}}
                        placeholder="Rename this folder..."
                    >{this.props.currentFolder.name}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="folderNameSubmitBtn" variant="warning" className={ cx( Styles.ModalSubmitBtnStyles ) } onClick={event => {
                        this.props.renameFolder(event, $("#folderNameField").text());
                        this.closeRenameFolderModal();
                    }}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );

        return (
            <div id={this.props.id} className={ cx( Styles.TaskWindowWrapperStyle ) }>
                <Container className={ cx( Styles.TaskWindowContainerStyle ) } fluid>
                    {/* <h6>Task Window</h6> */}
                    <ListGroup className={ cx( Styles.TaskListStyle ) } variant="flush">
                        {/*
                        <ListGroup.Item className={ cx( Styles.TaskStyle ) }>Download the Simple Timer React Component.</ListGroup.Item>
                        <ListGroup.Item className={ cx( Styles.TaskStyle ) }>Set up MongoDB Backend</ListGroup.Item>
                        */}
                        {
                            !(this.props.currentFolder._id == "") ? 
                            (
                            <div id="folder-banner-wrapper">
                                <ListGroup.Item id="folder-banner" className={ cx( Styles.FolderBannerStyle ) } onClick={event => {
                                    if (
                                        (event.target.id && event.target.id != "folder-return-icon")
                                        || (event.target.parentNode.id && event.target.parentNode.id != "folder-return-icon")
                                    ) {
                                        this.openRenameFolderModal();
                                    } else {
                                        this.props.setCurrentFolder({_id: (this.props.currentFolder.parentFolderId ? this.props.currentFolder.parentFolderId : "")});
                                    }
                                }}>
                                    Folder: {this.props.currentFolder.name}
                                    <Button id="folder-return-icon" className={ cx(Styles.FolderReturnBtnStyles) } variant="success">
                                        <FontAwesomeIcon className={ cx( Styles.FolderReturnIconStyle ) } icon={ faArrowLeft } size="lg"></FontAwesomeIcon>
                                    </Button>
                                </ListGroup.Item>
                                <div className={ cx( Styles.NavDividerStyles ) }></div>
                            </div>
                            ) : null
                        }              
                        {
                            this.props.folders.filter(folder => folder.parentFolderId == this.props.currentFolder._id).map( (folder, index) =>
                                <div id={folder._id} key={folder._id} className={ cx( Styles.FolderWrapperStyles) }>
                                    <ListGroup.Item key={folder._id} id={folder._id} className={ cx(Styles.FolderStyle) } onClick={ event => {
                                        if (
                                            (event.target.id && event.target.id != "delete-folder-btn-icon") 
                                            || (event.target.parentNode.id && event.target.parentNode.id != "delete-folder-btn-icon")
                                        ) {
                                            this.props.openFolder(event);
                                        } else {
                                            let ID;
                                            if (event.target.parentNode.parentNode.id && event.target.parentNode.parentNodeid != "delete-folder-btn-icon") {
                                                ID = event.target.parentNode.parentNode.id;
                                            } else if (event.target.parentNode.parentNode.parentNode.id) {
                                                ID = event.target.parentNode.parentNode.parentNode.id;
                                            } else {
                                                ID = event.target.parentNode.parentNode.parentNode.parentNode.id;
                                            }
                                            this.props.removeFolder(event, ID);
                                        }
                                    }}>
                                        <FontAwesomeIcon className={ cx( Styles.FolderIconStyles ) } icon={faFolder} size="lg"></FontAwesomeIcon>
                                        {folder.name}
                                        <Button id="delete-folder-btn-icon" className={ cx( Styles.DeleteFolderButtonIconStyles ) } variant="warning">
                                            <FontAwesomeIcon icon={ faTimes } size="lg"></FontAwesomeIcon>
                                        </Button>
                                    </ListGroup.Item>
                                </div>
                            )
                        }
                        {
                            this.props.tasks.filter(task => task.parentFolderId == this.props.currentFolder._id).map( (task, index) => 
                            <div id={task._id} key={task._id} className={ cx(Styles.TaskWrapperStyle) }>
                                <ListGroup.Item key={task._id} id={task._id} className={ cx((this.state.activeTaskId == task._id ? Styles.ActiveTaskStyle : Styles.TaskStyle)) } onClick={event => {
                                    if (
                                        (event.target.id && event.target.id != "task-check-btn-icon")
                                        || (event.target.parentNode.id && event.target.parentNode.id != "task-check-btn-icon")
                                    ) {
                                        this.props.showDetail(event);
                                        this.setState({activeTaskId: task._id});
                                    } else {
                                        this.props.completeTask(task._id);
                                    }
                                }}>
                                    {task.body}
                                    <Button id="task-check-btn-icon" className={ cx( Styles.TaskCheckButtonIconStyles ) } variant={ "primary" }>
                                        <FontAwesomeIcon icon={faCheck} size="lg"></FontAwesomeIcon>
                                    </Button>
                                </ListGroup.Item>
                            </div>
                            )
                        }
                        {
                            this.props.userIsLoggedIn  ?  (
                                    <div id="newItemBtn">
                                        <ListGroup.Item className={ cx( this.state.addTaskBtnIsOn ? Styles.AddTaskBtnStyle : Styles.AddFolderBtnStyle) } onClick={ event => {
                                            if(
                                                (event.target.id && event.target.id != "switch-btn-icon")
                                                || (event.target.parentNode.id && event.target.parentNode.id != "switch-btn-icon")
                                            ) {
                                                this.setState({addTaskBtnText: false}); 
                                                this.state.addTaskBtnIsOn ? this.openCreateTaskModal() : this.openCreateFolderModal();
                                                setTimeout(() => {this.updateTaskBtn(this);}, 100);
                                            } else {
                                                this.setState({addTaskBtnIsOn: !this.state.addTaskBtnIsOn});
                                            }
                                            /*if (!(event.target.id == "switch-btn-icon" || event.target.viewBox || event.target.fill)) {
                                                this.setState({addTaskBtnText: false}); 
                                                this.state.addTaskBtnIsOn ? this.props.addTask() : this.openCreateFolderModal();
                                                setTimeout(() => {this.updateTaskBtn(this);}, 100);
                                            } else {
                                                this.setState({addTaskBtnIsOn: !this.state.addTaskBtnIsOn});
                                            }*/
                                        }} variant="danger" disabled={!this.state.addTaskBtnText}>
                                            {
                                                this.state.addTaskBtnText ? (
                                                    <>
                                                        <div id="add-item-btn-text" className={ cx( Styles.AddItemText ) }>
                                                            { this.state.addTaskBtnIsOn ? "Add Task +" : "New Folder +" }
                                                        </div>
                                                        <Button id="switch-btn-icon" className={ cx( Styles.SwitchButtonIconStyles ) } variant={ this.state.addTaskBtnIsOn ? "danger" : "info" }>
                                                            <FontAwesomeIcon icon={faExchangeAlt} size="lg"></FontAwesomeIcon>
                                                        </Button>
                                                    </>
                                                )
                                                : <Spinner animation="border" variant="danger" size="sm"/>
                                            } 
                                        </ListGroup.Item>
                                    </div>
                                )
                            :   (
                                    <ListGroup.Item className={ cx( Styles.AddTaskBtnDisabledStyle ) } variant="dark">
                                        Add Task +
                                    </ListGroup.Item>
                                )
                        }
                    </ListGroup>
                </Container>
                {createFolderModal}
                {renameFolderModal}
                {createTaskModal}
            </div>
        )
    }
}

export default ConureTaskWindow;