import React, { Component } from "react";

import ConureNavbar from "./components/ConureNavbar/ConureNavbar";
import ConureTaskWindow from "./components/ConureTaskWindow/ConureTaskWindow";
import ConureDetailWindow from "./components/ConureDetailWindow/ConureDetailWindow";
import ConureQuoteWindow from "./components/ConureQuoteWindow/ConureQuoteWindow";
import ConureUserBar from "./components/ConureUserBar/ConureUserBar";

import { cx } from "emotion";
import Styles from "./AppStyles";
import { JellyfishSpinner } from "react-spinners-kit";

import $ from "jquery";
// import caret from "jquery-caret-plugin";

import eggs from "../public/assets/img/png/eggs.png";
import chicklet from "../public/assets/img/png/chicklet.png";
import pigeon from "../public/assets/img/png/pigeon.png";
import flamingo from "../public/assets/img/png/flamingo.png";
import pelican from "../public/assets/img/png/pelican.png";
import bluebird from "../public/assets/img/png/bluebird.png";
import puffin from "../public/assets/img/png/puffin.png";
import conure_light from "../public/assets/img/png/conure-light.png";
// import favicon from "../public/assets/img/ico/conure-light.ico";

class App extends Component {
    constructor(props) {
        super(props);

        // State
        this.state = {
            user: {},
            tasks: [],
            newPoints: 0,
            currentTask: {
                target: 0
            },
            counting: false,
            taskRenderComplete: true
        };

        this.userIsLoggedIn = true;

        // Level Information
        this.levelImages = [eggs, chicklet, pigeon, flamingo, pelican, bluebird, puffin, conure_light];
        this.levelThresholds = [0, 150, 250, 450, 750, 900, 1300, 1750];

        // Method Bindings
        this.getUserData = this.getUserData.bind(this);
        this.showDetail = this.showDetail.bind(this);
        // this.toggleCountdown = this.toggleCountdown.bind(this);
        // this.countdown = this.countdown.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.updateTaskDescription = this.updateTaskDescription.bind(this);
        this.autosetDetailWindow = this.autosetDetailWindow.bind(this);
        this.Login = this.Login.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.markAsDone = this.markAsDone.bind(this);
        this.addXP = this.addXP.bind(this);
        this.resetXP = this.resetXP.bind(this);
    }

    // Get User Data
    getUserData() {
        const params = new URLSearchParams(document.location.search);
        const id = params.get("id");

        if ( !id ) {
            // console.log("Error: The id paramater is missing from the url.");
            this.userIsLoggedIn = false;
            // document.loacation = "www.conureapp.co.uk/id=signup";
        } 

        console.log("Fetching data...")
        const URL = `${this.props.backendUrl}/importUserData?id=${id}`;
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            //data = JSON.parse(data);
            console.log("Data fetched.")
            console.log(data.user_info);
            console.log(data.tasks);
            this.setState({user: data.user_info, tasks: data.tasks}, () => {
                this.setState({taskRenderComplete: true});
            });
        })
        .then(() => {
            this.autosetDetailWindow();
        })
        .then(() => {
            // Turning off the loading screen
            console.log($("#LoadingScreen"))
            $("#LoadingScreen").fadeOut();
        })
        .catch(error => {
            console.log(`Error retrieving user data: ${error}`);
        })

    }

    autosetDetailWindow() {
        try {
            const targetID = this.state.tasks[0]._id;
            document.getElementById(targetID).childNodes[0].click();
        } catch ( error ) {
            this.setState({ currentTask: {
                body: "",
                target: 0,
                description: ""
            }})
        }
    }

    // Show Detail
    showDetail(event) {
        // Get the ID of the Target Task Element & Task List
        let targetID = event.target.parentNode.id;
        const tasks = this.state.tasks;

        // Call removeTask if the cross has been selected
        if ( !targetID ) {
            this.removeTask(event);
            return;
        }

        // Extract the Target task from the task list
        let currentTask = {};
        tasks.forEach( task => { if ( task._id == targetID ) currentTask = task });

        // Set the new current task in state.
        this.setState({ currentTask: currentTask });
    }

    /*
    // Toggle Countdown
    toggleCountdown() {
        this.setState({counting: !this.state.counting}, () => {
            console.log(`Counting: ${this.state.counting}`);
            if (this.state.counting) {
                this.countdown();
            }
        });
    }    

    // Countdown
    countdown() {
        const outerThis = this;
        let currentTask = {};
        let tempKey = 0;

        const URL = `${this.props.backendUrl}/updateUserInfo`;
        let body = {}

        const interval = setInterval(() => {
            currentTask = this.state.currentTask;
            currentTask.target -= 1000
            outerThis.setState({currentTask: currentTask}, () => {
                if(outerThis.state.counting == false) {
                    clearInterval(interval);  
                    
                    // Save to MongoDB
                    body = JSON.stringify({
                        "user": outerThis.state.user,
                        "tasks": outerThis.state.tasks,
                    })
                    console.log(body);

                    fetch(URL, {
                        headers: {
                            "Content-type": "application/json"
                        },
                        method: "PUT",
                        body: body,
                    })
                    .then( res => res.json )
                    .then( res => {
                        console.log(res);    
                    })
                }
            });
        }, 1000)
    }
    */

    updateTime(newTime) {
        let currentTask = this.state.currentTask;
        currentTask.target = newTime;
        this.setState({currentTask: currentTask}, () => {
            this.updateUserInfo();
        });
    }

    // Update Task
    updateTask(event){
        // Getting the ID of the content editable field, the new body and the tasklist
        const targetID = this.state.currentTask._id;
        const newBody = $(event.target).text();
        const tasks = this.state.tasks;

        // Applying update to relevant task
        if(event) {tasks.forEach( task => { if (task._id  == targetID)  task.body=newBody })};

        let selection = window.getSelection();
        let caretPosition = selection.getRangeAt(0).startOffset;

        // Set the updated task list in state.
        this.setState({ tasks: tasks }, () => {
            // console.log("Saving...");

            // Update Task List & UserInfo Data
            const URL = `${this.props.backendUrl}/updateUserInfo`;
            const body = JSON.stringify({
                user: this.state.user,
                tasks: this.state.tasks
            })

            // console.log(this.state.tasks);

            fetch(URL, {
                headers: {
                    "Content-type": "application/json"
                },
                method: "PUT",
                body: body
            })
            .then( res => res.json())
            .then( data => console.log(data))
            .catch( (error) => {
                console.log(error);
            })

            try {
                var elem = document.getElementById("taskBodyField");
                // console.log(elem);
                var range = document.createRange();
                range.setStart(elem.childNodes[0], caretPosition);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
                elem.focus();
            } catch {} // Do nothing is field is empty
        })

        // ->> Move back to previous position
        // Moving the Caret back to the end
        /* document.getElementById(targetID).focus();
        document.execCommand('selectAll', false, null);
        const selection = document.getSelection();
        selection.collapseToEnd(); */
    }

    updateTaskDescription(event, description) {
        // Getting the ID of the content editable field, the new body and the tasklist
        const targetID = this.state.currentTask._id;
        // const newDesc = $(event.target).text();
        const tasks = this.state.tasks;

        // Applying update to relevant task
        if(event) {tasks.forEach( task => { if (task._id  == targetID)  task.description=description })};

        // Set the updated task list in state.
        this.setState({ tasks: tasks }, () => {
            // console.log("Saving...");

            // Update Task List & UserInfo Data
            const URL = `${this.props.backendUrl}/updateUserInfo`;
            const body = JSON.stringify({
                user: this.state.user,
                tasks: this.state.tasks
            })

            // console.log(this.state.tasks);

            fetch(URL, {
                headers: {
                    "Content-type": "application/json"
                },
                method: "PUT",
                body: body
            })
            .then( res => res.json())
            .then( data => console.log(data))
            .catch( (error) => {
                console.log(error);
            })

        })
    }

    updateUserInfo() {
        // Update Task List & UserInfo Data
        const URL = `${this.props.backendUrl}/updateUserInfo`;
        const body = JSON.stringify({
            user: this.state.user,
            tasks: this.state.tasks
        })

        fetch(URL, {
            headers: {
                "Content-type": "application/json"
            },
            method: "PUT",
            body: body
        })
        .then( res => res.json())
        .then( data => console.log(data))
        .catch( (error) => {
            console.log(error);
        })
    }

    // removeTask
    removeTask(event, targetID = false) {
        try {
            if (!targetID) {
                // Get the ID of the target Task Element
                targetID = event.target.parentNode.parentNode.parentNode.id;
                if ( !targetID ) targetID = event.target.parentNode.parentNode.id;
            }

            const URL = `${this.props.backendUrl}/removeTask`;
            // console.log(this.state.user.key, targetID);
            const body = JSON.stringify({
                "id": this.state.user.key,
                "taskId": targetID
            });
            fetch(URL, {
                headers: {
                    "Content-type": "application/json"
                },
                method: "PUT",
                body: body
            })

            // Get Current Task List
            let tasks = this.state.tasks;

            // Filter out the target task
            tasks = tasks.filter(task => { return task._id != targetID });

            // Set the task list to the remaining tasks
            this.setState({tasks: tasks}, () => {
                this.autosetDetailWindow();
            });
        } catch (TypeError) {};
    }

    // addTask
    addTask(event) {
        this.setState({taskRenderComplete: false});

        const URL = `${this.props.backendUrl}/createTask`;
        const body = JSON.stringify({
            "id": this.state.user.key,
            "body": "",
            "target": 3600,
            "description": ""
        })

        console.log(body);

        fetch(URL, {
            headers: {
                "Content-type": "application/json"
            },
            method: "PUT",
            body: body
        })
        .then( response => {
            console.log("Created New Task.");
            this.getUserData();
        })

    }

    // Login
    Login(b64key) {
        // Check if account exists (backend request)
        document.location = `${document.location.href.split("?")[0]}?id=${b64key}`;
    }

    // createAccount
    createAccount(username) {
        let URL = `${this.props.backendUrl}/generateID`;

        fetch(URL)
        .then( res => res.json() )
        .then( doc => {
            const key = doc.key;
            URL = `${this.props.backendUrl}/createUserBucket?id=${key}&username=${username}`;

            fetch(URL)
            .then(() => {
                document.location = `https://www.conureapp.co.uk/?id=${key}`;
            })
        })
    }

    // Mark as Done
    markAsDone(event, taskInfo) {
        this.addXP(event, 100);

        // Remove Task Below
        const ID = taskInfo.currentTask._id;
        this.removeTask(event, ID);

    }

    // Add XP
    addXP(event, points) {
        this.setState({newPoints: points, progressBarLabel: `+${points}`});
        setTimeout(() => {
            let user = this.state.user;
            user.xp += points;
            this.setState({user: user, newPoints: 0, progressBarLabel: ""}, () => {
                this.updateUserInfo();
                // console.log(this.state);
            });
        }, 750);
    }

    // Reset XP
    resetXP(event) {
        let user = this.state.user;
        user.xp = 0;
        this.setState({user: user}, () => {
            this.updateUserInfo();
        })
    }

    // Component Will Mount
    componentWillMount() {
        this.getUserData();
    }

    // Component Did Unmount
    componentWillUnmount() {

    }

    // Render
    render() {
        {/* Retrieve Mongo Entries via API */}
        return (
            <div className={ cx( Styles.AppWrapperStyles ) }>
                <div id="LoadingScreen" className={cx(Styles.LoadingScreen)}>
                    <div className={cx(Styles.CenterScreen)}>
                        <JellyfishSpinner
                            size = {150}
                            color = "#686769"
                            loading = {true}
                        />
                        <em>Changing the world...</em>
                    </div>
                </div>

                <ConureNavbar 
                    id="ConureNavbar" 
                    showLoginModal={this.showLoginModal} 
                    loginHandler={this.Login}
                    createAccount={this.createAccount}
                    logoLink={conure_light}
                    currentUser={this.state.user}
                    userIsLoggedIn={this.userIsLoggedIn}
                />
                <ConureTaskWindow 
                    id="ConureTaskWindow" 
                    tasks={this.state.tasks} 
                    removeTask={this.removeTask} 
                    addTask={this.addTask} 
                    showDetail={this.showDetail}
                    userIsLoggedIn={this.userIsLoggedIn}
                    taskRenderComplete={this.state.taskRenderComplete}
                />
                <ConureDetailWindow 
                    id="ConureDetailWindow"    
                    currentTask={this.state.currentTask} 
                    updateTask={this.updateTask}
                    updateTaskDescription={this.updateTaskDescription}
                    markAsDone={this.markAsDone}
                    removeTask={this.removeTask}
                    updateTime={this.updateTime}
                    userIsLoggedIn={this.userIsLoggedIn}
                    resetXP={this.resetXP}
                />
                <ConureQuoteWindow
                    id="ConureQuoteWindow"
                />
                <ConureUserBar 
                    id="ConureUserBar" 
                    userName={this.state.user.username} 
                    levelThresholds={this.levelThresholds}
                    levelImages={this.levelImages}
                    basePoints={this.state.user.xp} 
                    newPoints={this.state.newPoints} 
                    progressBarLabel={this.state.progressBarLabel}
                />
            </div>
        )
    }
}

export default App;