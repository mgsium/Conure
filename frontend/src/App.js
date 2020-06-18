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
            folders: [],
            newPoints: 0,
            currentTask: {
                target: 0
            },
            counting: false,
            taskRenderComplete: true,
            defaultXP: 100,
            currentFolder: {
                _id: ""
            },
            folderIsActive: true
        };

        this.userIsLoggedIn = true;

        // Loading Screen Messages
        const loadingScreenMessages = [
            "640K ought to be enough for anybody",
            "The architects are still drafting...",
            "The bits are breeding...",
            "Would you prefer chicken, steak, or tofu?",
            "A few bits tried to escape, but we caught them...",
            "Checking the gravitational constant in your locale...",
            "At least you're not on hold...",
            "Hum something loud while others stare...",
            "You're not in Kansas any more...",
            "The server is powered by a lemon and two electrodes...",
            "While a larger software vendor in Seattle takes over the world...",
            "We're testing your patience...",
            "Don't think of purple hippos...",
            "While the satellite moves into position...",
            "The bits are flowing slowly today...",
            "Warming up the Large Hadron Collider..."
        ];

        this.loadingScreenMessage = loadingScreenMessages[Math.floor(Math.random() * loadingScreenMessages.length)];

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
        this.addFolder = this.addFolder.bind(this);
        this.renameFolder = this.renameFolder.bind(this);
        this.removeFolder = this.removeFolder.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.openFolder = this.openFolder.bind(this);
        this.setCurrentFolder = this.setCurrentFolder.bind(this);
        this.updateTaskDescription = this.updateTaskDescription.bind(this);
        this.autosetDetailWindow = this.autosetDetailWindow.bind(this);
        this.Login = this.Login.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.markAsDone = this.markAsDone.bind(this);
        this.addXP = this.addXP.bind(this);
        this.resetXP = this.resetXP.bind(this);
        this.changeDefaultPointsScore = this.changeDefaultPointsScore.bind(this);
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
            console.log(data.folders);
            data.tasks.sort(function(a,b) {return (Buffer.from(a.indexBase64, "base64").toString("utf8") > Buffer.from(b.indexBase64, "base64").toString("utf8")) ? 1 : ((Buffer.from(b.indexBase64, "base64").toString("utf8") > Buffer.from(a.indexBase64, "base64").toString("utf8")) ? -1 : 0);});
            this.setState({user: data.user_info, tasks: data.tasks, folders: data.folders}, () => {
                this.setState({taskRenderComplete: true});
            });
        })
        .then(() => {
            this.autosetDetailWindow();
        })
        .then(() => {
            // Turning off the loading screen
            console.log($("#LoadingScreen"));
            $("#LoadingScreen").fadeOut();
        })
        .catch(error => {
            console.log(`Error retrieving user data: ${error}`);
        })

    }

    autosetDetailWindow() {
        try {
            console.log(this.state.currentFolder);
            console.log(this.state.tasks.filter(task => typeof task.parentFolderId != "undefined" ? true : false));
            const targetID = this.state.tasks.filter(task => typeof task.parentFolderId != "undefined" ? (task.parentFolderId == this.state.currentFolder._id ? true :  false) : false )[0]._id;
            console.log(targetID);
            document.getElementById(targetID).childNodes[0].click();
        } catch ( error ) {
            this.setState({ currentTask: {
                body: "",
                target: 0,
                description: "",
                parentFolderId: {_id: this.state.currentFolder._id}
            }})
        }
    }

    // Show Detail
    showDetail(event) {
        try {
            // Get the ID of the Target Task Element & Task List
            let targetID = event.target.parentNode.id ? event.target.parentNode.id : event.target.parentNode.parentNode.id;
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
            this.setState({ currentTask: currentTask, folderIsActive: false });
        } catch (error) {
            console.log(error);
        }
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
                tasks: this.state.tasks,
                folders: this.state.folders
            })

            console.log(body);

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

    // Update Username
    updateUsername(event, username) {
        // Return if username is invalid
        if (!username) {
            return;
        }

        // Modify the user object
        let user = this.state.user;
        user.username = username;

        // Save new object to state
        this.setState({user: user}, () => {
            const URL = `${this.props.backendUrl}/updateUserInfo`;
            const body = JSON.stringify({
                user: this.state.user,
                tasks: this.state.tasks,
                folders: this.state.folders
            })

            fetch(URL, {
                headers: {"Content-Type": "application/json"},
                method: "PUT",
                body: body
            })
            // .then(res => res.json())
            // .then(data => console.log(data))
            .catch(err => {
                console.log(`An Error Occured: ${err.message}`);
            })
        });
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
            tasks: this.state.tasks,
            folders: this.state.folders
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

            // Make Request
            fetch(URL, {
                headers: {"Content-type": "application/json"},
                method: "PUT",
                body: body
            })

            // Get Current Task List
            let tasks = this.state.tasks;

            // Filter out the target task
            tasks = tasks.filter(task => task._id != targetID );

            // Set the task list to the remaining tasks
            this.setState({tasks: tasks}, () => {
                this.autosetDetailWindow();
            });
        } catch (TypeError) {};
    }

    // Remove Folder
    removeFolder(event, ID) {
        // Set request URL
        const URL = `${this.props.backendUrl}/removeFolder`;

        // Set request body
        const body = JSON.stringify({
            "id": this.state.user.key,
            "folderId": ID
        });

        // Make Request
        fetch(URL, {
            headers: {"Content-type": "application/json"},
            method: "DELETE",
            body: body
        })

        // Get Current Folder & Task Lists
        let folders = this.state.folders;
        let tasks = this.state.tasks;

        // Filter out the target folder & tasks
        folders = folders.filter(folder => folder._id != ID);
        tasks = tasks.filter(task => task.parentFolderId != ID);

        // Set new filtered lists to state;
        this.setState({folders: folders, task: tasks});
    }

    // addTask
    addTask(event, text) {
        this.setState({taskRenderComplete: false});

        const URL = `${this.props.backendUrl}/createTask`;

        const body = JSON.stringify({
            "id": this.state.user.key,
            "body": text,
            "target": 3600,
            "description": "",
            "parentFolderId": this.state.currentFolder._id
        })

        console.log(body);
        console.log(text);

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

    // addFolder
    addFolder(event, folderName) {
        this.setState({taskRenderComplete: false});

        // Specify request info
        const URL =`${this.props.backendUrl}/createFolder`;
        const body = JSON.stringify({
            "id": this.state.user.key,
            "name": folderName,
            "parentFolderId": this.state.currentFolder._id
        })

        // Make request
        fetch(URL, {
            headers: { "Content-type": "application/json"},
            method: "PUT",
            body: body
        })
        .then( response => {
            console.log("Created New Folder.");
            this.getUserData();
        })
        .catch( err => {
            console.log("An Error Occured.");
        })
    }

    // Rename Folder
    renameFolder(event, folderName) {
        // Ammending folder object
        let folders = this.state.folders;
        let currentFolder = this.state.folders.find(folder => folder._id == this.state.currentFolder._id);
        const index = folders.indexOf(currentFolder);
        currentFolder.name = folderName;
        folders[index] = currentFolder;

        // Saving new object to state
        this.setState({currentFolder: currentFolder, folders: folders}, () => {
            this.updateUserInfo();
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

    // Open Folder
    openFolder(event) {
        this.setState({
            currentFolder: this.state.folders.filter(folder => folder._id === event.target.parentNode.id)[0],
            folderIsActive: true
        });
    }

    // Set Current Folder
    setCurrentFolder(currentFolderId) {
        const newFolder = this.state.folders.filter(folder => folder._id == currentFolderId._id)[0];
        this.setState({currentFolder: (newFolder ? newFolder : {_id: ""})});
    }

    // Mark as Done
    markAsDone(event, taskInfo) {
        this.addXP(event, this.state.defaultXP);

        // Remove Task Below
        const ID = taskInfo.currentTask._id;
        this.removeTask(event, ID);
    }

    // Complete Task
    completeTask(taskId) {
        this.addXP(null, this.state.user.taskCompletionPoints);

        // Remove Task Below
        let tasks = this.state.tasks;
        tasks = tasks.filter( task => task._id != taskId );
        this.setState({tasks: tasks}, () => {
            const URL = `${this.props.backendUrl}/removeTask`;
            // console.log(this.state.user.key, targetID);
            const body = JSON.stringify({
                "id": this.state.user.key,
                "taskId": taskId
            });

            // Make Request
            fetch(URL, {
                headers: {"Content-type": "application/json"},
                method: "PUT",
                body: body
            })

            this.autosetDetailWindow();
            
        })
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

    // Change Default Points Score
    changeDefaultPointsScore(newTaskCompletionPoints) {
        let user = this.state.user;
        user.taskCompletionPoints = newTaskCompletionPoints;
        this.setState({user: user}, () => {
            this.updateUserInfo();
        });
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
                        <em>{this.loadingScreenMessage}</em>
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
                    folders={this.state.folders}
                    removeTask={this.removeTask}
                    completeTask={this.completeTask} 
                    addTask={this.addTask} 
                    addFolder={this.addFolder}
                    renameFolder={this.renameFolder}
                    removeFolder={this.removeFolder}
                    setCurrentFolder={this.setCurrentFolder}
                    currentFolder={this.state.currentFolder}
                    showDetail={this.showDetail}
                    openFolder={this.openFolder}
                    userIsLoggedIn={this.userIsLoggedIn}
                    taskRenderComplete={this.state.taskRenderComplete}
                />
                <ConureDetailWindow 
                    id="ConureDetailWindow"  
                    userName={this.state.user.username}  
                    currentTask={this.state.currentTask} 
                    tasks={this.state.tasks}
                    updateTask={this.updateTask}
                    updateUsername={this.updateUsername}
                    updateTaskDescription={this.updateTaskDescription}
                    currentFolder={this.state.currentFolder}
                    folderIsActive={this.state.folderIsActive}
                    markAsDone={this.markAsDone}
                    removeTask={this.removeTask}
                    updateTime={this.updateTime}
                    userIsLoggedIn={this.userIsLoggedIn}
                    resetXP={this.resetXP}
                    taskCompletionPoints={this.state.user.taskCompletionPoints}
                    changeDefaultPointsScore={this.changeDefaultPointsScore}
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