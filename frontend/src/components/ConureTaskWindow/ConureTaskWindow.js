import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";

import { cx } from "emotion";
import Styles from "./ConureTaskWindowStyles.js";

import $ from "jquery";

class ConureTaskWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addTaskBtnText: true
        }
    }

    updateTaskBtn(outerThis) {
        if (!outerThis.props.taskRenderComplete) {
            setTimeout(() => {this.updateTaskBtn(outerThis)}, 100);
        } else {
            this.setState({addTaskBtnText: true});
        }
    }

    render() {
        /*
        if (this.props.userIsLoggedIn) {
            if (this.state.addTaskBtnText) {
                console.log("Correct");
            }
            const addItemBtn = (
                <ListGroup.Item className={ cx( Styles.AddTaskBtnStyle ) } onClick={ () => {$("#toggleCountdownBtn").click();this.props.addTask();}} variant="danger" disabled={!this.state.addTaskBtnText}>
                {
                this.state.addTaskBtnText ? "Add Task +" :
                (
                    <Spinner animation="border" variant="danger"/>
                )   
                }
                </ListGroup.Item>
            )
        } else {
            const addItemBtn = (
                <ListGroup.Item className={ cx( Styles.AddTaskBtnStyle ) } variant="secondary" disabled={true}>
                    Add Task +
                </ListGroup.Item>
            )
        }
        */
       

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
                            this.props.tasks.map( (task, index) => 
                            <div id={task._id} key={task._id} className={ cx(Styles.TaskWrapperStyle) }>
                                <ListGroup.Item key={task._id} id={task._id} className={ cx((this.state.activeTaskId == task._id ? Styles.ActiveTaskStyle : Styles.TaskStyle)) } onClick={event => {
                                    this.props.showDetail(event);
                                    this.setState({activeTaskId: task._id});
                                }}>
                                    {task.body}
                                    <i className={ cx("fas", "fa-times", "fa-lg", Styles.DeleteIconStyle) }></i>
                                </ListGroup.Item>
                            </div>
                            )
                        }
                        {
                            this.props.userIsLoggedIn  ?  (
                                    <ListGroup.Item className={ cx( Styles.AddTaskBtnStyle) } onClick={ () => {this.setState({
                                        addTaskBtnText: false}); this.props.addTask(); setTimeout(() => {this.updateTaskBtn(this);}, 100)}} variant="danger" disabled={!this.state.addTaskBtnText}>
                                        {this.state.addTaskBtnText ? "Add Task +" : <Spinner animation="border" variant="danger" size="sm"/>} 
                                    </ListGroup.Item>
                                )
                            :   (
                                    <ListGroup.Item className={ cx( Styles.AddTaskBtnDisabledStyle ) } variant="dark">
                                        Add Task +
                                    </ListGroup.Item>
                                )
                        }
                    </ListGroup>
                </Container>
            </div>
        )
    }
}

export default ConureTaskWindow;