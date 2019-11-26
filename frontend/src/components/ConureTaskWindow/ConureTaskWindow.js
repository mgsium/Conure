import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

import { cx } from "emotion";
import Styles from "./ConureTaskWindowStyles.js";

class ConureTaskWindow extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={this.props.id} className={ cx( Styles.TaskWindowWrapperStyle ) }>
                <Container className={ cx( Styles.TaskWindowContainerStyle ) } fluid>
                    {/* <h6>Task Window</h6> */}
                    <ListGroup className={ cx( Styles.TaskListStyle ) } variant="flush">
                        <ListGroup.Item className={ cx( Styles.TaskStyle ) }>Download the Simple Timer React Component.</ListGroup.Item>
                        <ListGroup.Item className={ cx( Styles.TaskStyle ) }>Set up MongoDB Backend</ListGroup.Item>
                        {
                            this.props.tasks.map( task => 
                            <div id={task._id} key={task._id} className={ cx(Styles.TaskWrapperStyle) }>
                                <ListGroup.Item key={task._id} id={task._id} className={ cx(Styles.TaskStyle) } onClick={this.props.showDetail}>
                                    {task.body}
                                    <i className={ cx("fas", "fa-times", "fa-lg", Styles.DeleteIconStyle) }></i>
                                </ListGroup.Item>
                            </div>
                            )
                        }
                        <ListGroup.Item className={ cx( Styles.AddTaskBtnStyle ) } onClick={this.props.addTask} variant="danger">
                            Add Task + 
                        </ListGroup.Item>
                    </ListGroup>
                </Container>
            </div>
        )
    }
}

export default ConureTaskWindow;