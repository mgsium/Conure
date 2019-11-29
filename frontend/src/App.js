import React, { Component } from "react";

import ConureNavbar from "./components/ConureNavbar/ConureNavbar";
import ConureTaskWindow from "./components/ConureTaskWindow/ConureTaskWindow";
import ConureDetailWindow from "./components/ConureDetailWindow/ConureDetailWindow";
import ConureUserBar from "./components/ConureUserBar/ConureUserBar";

import { cx } from "emotion";
import Styles from "./AppStyles";

import $ from "jquery";

class App extends Component {
    constructor(props) {
        super(props);

        // State
        this.state = {
            user: {},
            tasks: [],
            newPoints: 0,
            currentTask: {
                
            }
        };

        // Level Information
        this.levelImages = ["/png/pigeon.png", "/png/flamingo.png", "/png/pelican.png", "/png/bluebird.png", "/jpg/puffin.jpg", "/png/conure-light.png"];
        this.levelThresholds = [0, 150, 250, 450, 750, 900];

        // Method Bindings
        this.getUserData = this.getUserData.bind(this);
        this.showDetail = this.showDetail.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.autosetDetailWindow = this.autosetDetailWindow.bind(this);
        this.Login = this.Login.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.addXP = this.addXP.bind(this);
    }

    // Get User Data
    getUserData() {
        const params = new URLSearchParams(document.location.search);
        const id = params.get("id");

        if ( !id ) {
            console.log("Error: The id paramater is missing from the url.");
            return
        }

        console.log("Fetching data...")
        const URL = `http://localhost:3501/importUserData?id=${id}`;
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            //data = JSON.parse(data);
            console.log("Data fetched.")
            console.log(data.user_info);
            console.log(data.tasks);
            this.setState({user: data.user_info, tasks: data.tasks})
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
                target: ""
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

    // Update Task
    updateTask(event){
        // Getting the ID of the content editable field, the new body and the tasklist
        const targetID = this.state.currentTask._id;
        const newBody = $(event.target).text();
        const tasks = this.state.tasks;

        // Applying update to relevant task
        tasks.forEach( task => { if (task._id  == targetID)  task.body=newBody });

        // Set the updated task list in state.
        this.setState({ tasks: tasks }, () => {
            console.log("Saving...");

            // Update Task List & UserInfo Data
            const URL = "http://localhost:3501/updateUserInfo";
            const body = JSON.stringify({
                user: this.state.user,
                tasks: this.state.tasks
            })

            console.log(this.state.tasks);

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

        // Moving the Caret back to the end
        document.getElementById(targetID).focus();
        document.execCommand('selectAll', false, null);
        const selection = document.getSelection();
        selection.collapseToEnd();
    }

    // removeTask
    removeTask(event) {
        // Get the ID of the target Task Element
        let targetID = event.target.parentNode.parentNode.parentNode.id;
        if ( !targetID ) targetID = event.target.parentNode.parentNode.id;

        const URL = "http://localhost:3501/removeTask";
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
    }

    // addTask
    addTask(event) {
        const URL = "http://localhost:3501/createTask";
        const body = JSON.stringify({
            "id": this.state.user.key,
            "body": "Test Body",
            "target": Date.now()
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
        let URL = "http://localhost:3501/generateID"

        fetch(URL)
        .then( res => res.json() )
        .then( doc => {
            const key = doc.key;
            URL = `http://localhost:3501/createUserBucket?id=${key}&username=${username}`;

            fetch(URL)
            .then(() => {
                document.location = `${document.location.href.split("?")[0]}?id=${key}`;
            })
        })
    }

    // Add XP
    addXP(event, points) {
        let user = this.state.user;
        user.xp += points;
        this.setState({user: user});
        console.log(user);
        
        // Remove Task Below
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
            <>
                <div id="LoadingScreen" className={cx(Styles.LoadingScreen)}></div>

                <ConureNavbar 
                    id="ConureNavbar" 
                    showLoginModal={this.showLoginModal} 
                    loginHandler={this.Login}
                    createAccount={this.createAccount}
                />
                <ConureTaskWindow id="ConureTaskWindow" tasks={this.state.tasks} removeTask={this.removeTask} addTask={this.addTask} showDetail={this.showDetail}/>
                <ConureDetailWindow 
                    id="ConureDetailWindow"    
                    currentTask={this.state.currentTask} 
                    updateTask={this.updateTask}
                    addXP={this.addXP}
                />
                <ConureUserBar 
                    id="ConureUserBar" 
                    userName={this.state.user.username} 
                    levelThresholds={this.levelThresholds}
                    levelImages={this.levelImages}
                    basePoints={this.state.user.xp} 
                    newPoints={this.state.newPoints} 
                />
            </>
        )
    }
}

export default App;