import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import { cx } from "emotion";
import Styles from "./ConureDetailWindowStyles.js";

class ConureDetailWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counting: false,
            toggleCoundownButtonVariant: "success",
            toggleCoundownButtonContent: "Start"
        }

        // Method Bindings
        this.toggleCountdown = this.toggleCountdown.bind(this);
    }
    toggleCountdown( event ) {
        // Toggle Countdown
        console.log("Toggling Countdown...")
        let counting = !this.state.counting;

        if (!counting) {
            console.log("Stopping")

            this.setState({
                counting: counting,
                toggleCoundownButtonVariant: "danger",
                toggleCoundownButtonContent: "Stop"
            });
        } else {
            console.log("Starting")

            this.setState({
                counting: counting,
                toggleCoundownButtonVariant: "success",
                toggleCoundownButtonContent: "Start"
            });
        }
    }
    componentDidMount() {
        document.getElementById("taskBodyField").addEventListener("input", ( event ) => {
            this.props.updateTask(event);
        }, false)
    }
    render() {
        const body = this.props.currentTask.body;
        const time_target = this.props.currentTask.target;


        return (
            <div id={this.props.id} className={ cx( Styles.DetailWindowWrapperStyle ) }>
                <Container fluid>
                    <p>In Detail</p>
                    <hr/>
                    <div id={"taskBodyField"}
                        contentEditable={true} 
                        suppressContentEditableWarning={true}
                        spellCheck={false} 
                        className={ cx(Styles.TaskBodyStyle) } 
                    >{body}</div>
                    <br/>
                    <hr/>
                    <h4>{time_target}</h4>
                    <ButtonGroup>
                        <Button variant={this.state.toggleCoundownButtonVariant} onClick={this.toggleCountdown}>{this.state.toggleCoundownButtonContent}</Button>
                        <Button variant="primary" onClick={() => {this.props.addXP(20)}}>Mark as Done</Button>
                    </ButtonGroup>
                </Container>
            </div>
        )
    }
}

export default ConureDetailWindow;