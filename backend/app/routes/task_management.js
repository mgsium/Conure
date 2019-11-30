// Module Imports
const random_b64 = require("random-base64-string");
const mongoose = require("mongoose");

// Mongo Model Imports
const GetTask = require("../models/task.js");
const GetUserInfo = require("../models/user_info.js");

module.exports = function(app) {
     // MongoDB via Mongoose
     const MONGO_PASSWORD = "rm6MQS0QV6dJ";
     const DB_NAME = "taskBucket";
     mongoose.connect(`mongodb+srv://conureAdmin:${MONGO_PASSWORD}@conure-uoviv.azure.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);

    // Get User Data
    // ------------------------------------------------------------------------
    app.get("/getUserData", ( req, res ) => {
        res.json({
            result: "success",
            info: `Data for account ${req.query.b64ID} has been retrieved.`,
            data: {
                foo: "bar"
            }
        })
    })
    // ------------------------------------------------------------------------

    // Generate base64 ID
    // ------------------------------------------------------------------------
    app.get("/generateID", ( req, res ) => {
        // Generate url-friendly Key
        const key = random_b64(6);

        // Make a response
        res.json({
            result: "success",
            info: `Account key generated.`,
            key: key
        });
    })
    // ------------------------------------------------------------------------

    // Set up a Mongo Collection for a new user
    // ------------------------------------------------------------------------
    app.get("/createUserBucket", ( req, res ) => {
        try {
            // Collecting Query Values
            const id= req.query.id;
            const coll_name = `user_${id}`;
            const username = req.query.username;
            

            // Creating an instance of the UserInfo model.
            const UserInfo = GetUserInfo(coll_name);
            const user = new UserInfo({
                key: id, 
                username: username,
                xp: 0
            })

            // Saving the UserInfo record to MongoDB
            user.save(coll_name)
            .then(doc => {
                res.json({
                    result: "success",
                    info: `A new MongoDB collection has been set up for ${coll_name}, ${username}.`
                })
            })
            .catch(error => {
                res.json({
                    result: "error",
                    info: error
                })

            })
                
        } catch (error) {
            console.log(error);

            res.json({
                result: "error",
                info: error
            }) 
        }

    })
    // ------------------------------------------------------------------------

    // Get User Info & Tasks
    // ------------------------------------------------------------------------
    app.get("/importUserData", ( req, res ) => {
        try {
            if ( !req.query.id ) {
                throw new Error("A parameter may be missing. Please include: id")
            }

            // Collecting Query Values
            const id = req.query.id;
            const coll_name = `user_${id}`;

        
            // Getting the models
            const UserInfo = GetUserInfo(coll_name);
            const Task = GetTask(coll_name);

            console.log(coll_name); 

            // Retrieving the documents from mongo
            UserInfo.find({}).lean().then( 
                ( docs ) => {
                    let userInfo = {};
                    let tasks = [];

                    docs.forEach( doc => {
                        if ( doc.key ) {
                            userInfo = doc; 
                        } else {
                            tasks.push(doc);
                        }
                    })
                    console.log(userInfo, tasks);

                    return { userInfo: userInfo, tasks: tasks};
                }
            )
            .then( (doc)  => {
                console.log(doc.userInfo, doc.tasks);

                if ( doc.userInfo ) {
                    res.json({
                        result: "success",
                        info: "The data was successfully retrieved.",
                        user_info: doc.userInfo,
                        tasks: doc.tasks
                    })
                } else {
                    res.json({
                        result: "error",
                        info: "Invalid id."
                    })

                }
                
            })

        } catch (error) {
            console.log(error.message);

            res.json({
                result: "error",
                info: error.message
            })
        }
    })
    // ------------------------------------------------------------------------

    // Add a Task Entry to the User's Mongo Collection
    // ------------------------------------------------------------------------
    app.put("/createTask", (req, res) => {
        try {
            const params = req.body;
            const coll_name = `user_${params.id}`;

            console.log(params);

            if ( !(params.body && params.target && params.id) ) {
                throw new Error("Incorrect paramaters, provide: body, target, id.");
            }

             // MongoDB via Mongoose
             const MONGO_PASSWORD = "rm6MQS0QV6dJ";
             const DB_NAME = "taskBucket";
             
             // Getting the models
             const Task = GetTask(coll_name);     

             // Creating an Instance of the Task Model
             const task = new Task({
                 key: params.key,
                 body: params.body,
                 target: params.target
             })

             // Saving the Task Record to MongoDB
            task.save(coll_name)
            .then(doc => {
    
            })
            .then(
                res.json({
                    result: "success",
                    info: `A new task "${params.body}" has been saved.`
                })
            )
            .catch(error => {
                res.json({
                    result: "error",
                    info: error
                })
                                          
            })

        } catch ( error ) {
            console.log(error);

            res.json({
                result: "error",
                info: error.message
            });
        }
    })
    // ------------------------------------------------------------------------

    // Remove Task
    // ------------------------------------------------------------------------
    app.put("/removeTask", ( req, res ) => {
        // Collecting params
        const params = req.body;
        const id = params.id;
        const taskId = mongoose.Types.ObjectId(params.taskId);
        const coll_name = `user_${id}`;

        if ( !(params.id && params.taskId) ) {
            throw new Error("Incorrect parameters, provide: id, taskId");
        }

        // MongoDB via Mongoose
        const MONGO_PASSWORD = "rm6MQS0QV6dJ";
        const DB_NAME = "taskBucket";

        // Getting the models
        const Task = GetTask(coll_name);   
        
        console.log(coll_name, taskId);

        // Removing the Task
        Task.remove({"_id": taskId})
        .then(() => {

        })
        .then(
            res.json({
                result: "success",
                info: `The task has been successfully removed.`
            })
        )
        .catch(error => {
            res.json({
                result: "error",
                info: error
            })
        })

    })
    // ------------------------------------------------------------------------

    // Update User Info
    // ------------------------------------------------------------------------
    app.put("/updateUserInfo", ( req, res ) => {
        // Collecting params
        console.log(req.body);

        const params = req.body;
        let userInfo = params.user;
        let tasks = params.tasks;
        const coll_name = `user_${userInfo.key}`;

        console.log(params);
        
        try {
            if ( !(params.user && params.tasks)) {
                throw new Error("Incorrect parameters, provide: user, tasks.");
            } else if ( !(Array.isArray(params.tasks)) ) {
                throw new Error("The tasks paramater must be an array.");
            } 

            // MongoDB via Mongoose
            const MONGO_PASSWORD = "rm6MQS0QV6dJ";
            const DB_NAME = "taskBucket";        

            // Getting the Models
            const Task = GetTask(coll_name);
            const UserInfo = GetUserInfo(coll_name);

            // Making Mongo Models from Objects
            userInfo = new UserInfo(userInfo);
            tasks = tasks.forEach( task => {
                const targetID = mongoose.Types.ObjectId(task._id);   
                Task.remove({"_id": targetID}, () => {
                    task = new Task(task);
                    task.save(coll_name).catch();
                });
            });

            // Saving New Models
    
            userInfo.save({}, () => {
                console.log("Done.");
            })

            res.json({
                result: "success",
                info: "Successully saved the updated user data."
            })
        } catch (error) {
            console.log(error);

            res.json({
                result: "error",
                info: error.message
            })

        }

    })
    // ------------------------------------------------------------------------
}