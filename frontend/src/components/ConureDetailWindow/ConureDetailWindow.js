import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";

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

        if (counting) {
            console.log("Starting")

            this.setState({
                counting: counting,
                toggleCoundownButtonVariant: "danger",
                toggleCoundownButtonContent: "Stop"
            });
        } else {
            console.log("Stopping")

            this.setState({
                counting: counting,
                toggleCoundownButtonVariant: "success",
                toggleCoundownButtonContent: "Start"
            });

        }

        this.props.toggleCountdown();
    }
    
    componentDidMount() {
        document.getElementById("taskBodyField").addEventListener("input", ( event ) => {
            this.props.updateTask(event);
        }, false)
    }
    render() {
        const body = this.props.currentTask.body;
        let time_target = 0

        try {
            time_target = new Date(this.props.currentTask.target);
        } catch(err) {
            time_target = new Date(0);
        }

        console.log(`Time Target Type: ${typeof time_target}`);


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
                    <Jumbotron className={ cx(Styles.ControlPanelStyles) } fluid>
                        <Container>
                            <small className={ cx("text-muted") }><i>Time Left</i></small>
                            <h4>{`${time_target.getHours()}h ${time_target.getMinutes()}m ${time_target.getSeconds()}s`}</h4>
                            <br/>
                            <Button className={ cx(Styles.ButtonStyles) } variant={this.state.toggleCoundownButtonVariant} onClick={this.toggleCountdown} size="sm">{this.state.toggleCoundownButtonContent}</Button>
                            <Button className={ cx(Styles.ButtonStyles) }variant="primary" onClick={(event) => {this.props.addXP(event, 20)}} size="sm">Mark as Done</Button>
                        </Container>
                    </Jumbotron>
                </Container>
            </div>
        )
    }
}

export default ConureDetailWindow;