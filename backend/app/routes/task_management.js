// Module Imports
const random_b64 = require("random-base64-string");
const mongoose = require("mongoose");

// Mongo Model Imports
const GetTask = require("../models/task.js");
const GetUserInfo = require("../models/user_info.js");
const GetFolder = require("../models/folder.js");

// Utilities Imports
const quotes = require("../utils/quotes.js");
const Config = require("../utils/config.js");
const { MONGO_PASSWORD, DB_NAME } = require("../utils/config.js");
const e = require("express");

module.exports = function(app) {
     // MongoDB via Mongoose
    mongoose.connect(`mongodb+srv://conureAdmin:${Config.MONGO_PASSWORD}@conure-uoviv.azure.mongodb.net/${Config.DB_NAME}?retryWrites=true&w=majority`);

    // Generate base64 ID
    // ------------------------------------------------------------------------
    app.get("/generateID", ( req, res ) => {
        res.json({
            result: "success",
            info: `Account key generated.`,
            key: random_b64(3)
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
                xp: 0,
                taskCount: 0,
                folderCount: 0,
                taskCompletionPoints: 100
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
                res.json({ result: "error", info: error });
            })
                
        } catch (error) {
            res.json({ result: "error", info: error }); 
        }

    })
    // ------------------------------------------------------------------------

    // Get User Info & Tasks
    // ------------------------------------------------------------------------
    app.get("/importUserData", ( req, res ) => {
        try {
            if ( !req.query.id ) { throw new Error("A parameter may be missing. Please include: id") };

            // Collecting Query Values
            const id = req.query.id;
            const coll_name = `user_${id}`;

            const MONGO_PASSWORD = Config.MONGO_PASSWORD;
            const DB_NAME = Config.DB_NAME;

            // Getting the models
            const UserInfo = GetUserInfo(coll_name);
            const Task = GetTask(coll_name); 

            // Retrieving the documents from mongo
            UserInfo.find({}).lean().then( 
                ( docs ) => {
                    let userInfo = {};
                    let tasks = [];
                    let folders = [];

                    // Filtering Documents
                    docs.forEach( doc => {
                        if ( doc.key ) { 
                            userInfo = doc; 
                        } else if ( doc.indexBase64 ) { 
                            tasks.push(doc); 
                        } else { 
                            folders.push(doc); 
                        }
                    })

                    return { userInfo: userInfo, tasks: tasks, folders: folders };
                }
            )
            .then( doc => {
                // Return if user is valid
                if ( doc.userInfo ) {
                    res.json({
                        result: "success",
                        info: "The data was successfully retrieved.",
                        user_info: doc.userInfo,
                        tasks: doc.tasks,
                        folders: doc.folders
                    })
                } else {
                    res.json({ result: "error", info: "Invalid id."})
                }
            })
        } catch (error) {
            res.json({ result: "error", info: error.message });
        }
    })
    // ------------------------------------------------------------------------

    // Add a Task Entry to the User's Mongo Collection
    // ------------------------------------------------------------------------
    app.put("/createTask", (req, res) => {
        try {
            // Collecting Parameters
            const params = req.body;
            const coll_name = `user_${params.id}`;

            // Checking required parameters are present
            if ( !(params.target && params.id && params.description == "" && (params.body || params.body == "")) ) {
                throw new Error("Incorrect paramaters; provide: body, target, id.");
            }
             
             // Getting the models
             const Task = GetTask(coll_name); 
             const UserInfo = GetUserInfo(coll_name); 
             
             // Get Count
             UserInfo.find({key: params.id}).then( docs => { 
                let userInfo, count;

                // Locating UserInfo Document
                 docs.forEach( doc => {
                     if (doc.key) {
                         count = doc.taskCount;
                         userInfo = doc;
                     }
                 });
                
                count += 1;
                userInfo.taskCount = count; // Updating taskCount field
                delete userInfo["_id"];         // Strip old id

                // Update database with new document
                UserInfo.remove({ key : params.id }, () => {
                    userInfo = new UserInfo({
                        key: userInfo.key,
                        username: userInfo.username,
                        xp: userInfo.xp,
                        taskCount: userInfo.taskCount,
                        folderCount: userInfo.folderCount,
                        taskCompletionPoints: userInfo.taskCompletionPoints
                    });
                    userInfo.save(coll_name).catch();
                }).then(() => {
                    saveTasks(count, userInfo);
                })
    
             })

             const saveTasks = function(count, userInfo) {
                // Creating an Instance of the Task Model
                const task = new Task({
                    key: params.key,
                    body: params.body,
                    target: params.target,
                    description: params.description,
                    indexBase64: Buffer.from(`${count}`).toString("base64"),
                    parentFolderId: params.parentFolderId
                });

                // Saving the Task Record to MongoDB
                task.save(coll_name)
                .then(doc => {})
                .then(res.json({
                    result: "success",
                    info: `A new task "${params.body}" has been saved.`
                    }))
                .catch(error => {
                    res.json({ result: "error", info: error.message });                       
                })
            }

        } catch ( error ) {
            res.json({ result: "error", info: error.message });
        }
    })
    // ------------------------------------------------------------------------

    // Remove Task
    // ------------------------------------------------------------------------
    app.put("/removeTask", ( req, res ) => {
        // Collecting Parameters
        const params = req.body;
        const id = params.id;
        const taskId = mongoose.Types.ObjectId(params.taskId);
        const coll_name = `user_${id}`;

        // Checking required parameters are present
        if ( !(params.id && params.taskId) ) {
            throw new Error("Incorrect parameters, provide: id, taskId");
        }

        // Getting the models
        const Task = GetTask(coll_name);   

        // Removing the Task
        Task.remove({"_id": taskId})
        .then(() => {})
        .then(res.json({
            result: "success",
            info: "The task was successfully removed."
            }))
        .catch(error => {
            res.json({ result: "error", info: error});
        })

    })
    // ------------------------------------------------------------------------

    // Update User Info
    // ------------------------------------------------------------------------
    app.put("/updateUserInfo", ( req, res ) => {
        // Collecting params
        const params = req.body;
        let userInfo = params.user;
        let tasks = params.tasks;
        let folders = params.folders;
        const coll_name = `user_${userInfo.key}`;

        try {
            // Checking Required Params are present
            if ( !(params.user && params.tasks && params.folders)) {
                throw new Error("Incorrect parameters, provide: user, tasks., folders");
            } else if ( !(Array.isArray(params.tasks) && Array.isArray(params.folders)) ) {
                throw new Error("The tasks and folders paramaters must be arrays.");
            } 

            // Getting the Models
            const Task = GetTask(coll_name);
            const Folder = GetFolder(coll_name);
            const UserInfo = GetUserInfo(coll_name);

            // Replacing old Tasks
            tasks = tasks.forEach( task => {
                const targetID = mongoose.Types.ObjectId(task._id);   
                Task.remove({"_id": targetID}, () => {
                    task = new Task(task);
                    task.save(coll_name).catch();
                });
            });

            // Replacing old Folders
            folders = folders.forEach( folder => {
                const targetID = mongoose.Types.ObjectId(folder._id);
                Folder.remove({"_id": targetID}, () => {
                    folder = new Folder(folder);
                    folder.save(coll_name).catch();
                })
            })

            // Replacing old UserInfo document
            UserInfo.remove({ key : params.user.key }, () => {
                userInfo = new UserInfo(userInfo);
                userInfo.save(coll_name).catch();
            });

            res.json({
                result: "success",
                info: "Successully saved the updated user data."
            })
        } catch (error) {
            res.json({ result: "error", info: error.message });
        }

    })
    // ------------------------------------------------------------------------

    // Create Folder
    // ------------------------------------------------------------------------
    app.put("/createFolder", (req, res) => {
        try {
            // Collecting Parameters
            const params = req.body;
            const coll_name = `user_${params.id}`;

            // Check required parameters are present
            if ( !(params.name && params.id) ) {
                throw new Error("Incorrect parameters; provide: name, id, parentFolderId.")
            }

            // Getting the models
            const Folder = GetFolder(coll_name);
            const UserInfo = GetUserInfo(coll_name);

            // Get Count
            UserInfo.find({key: params.id}).then( docs => {
                let userInfo, count;

                // Updaing 
                docs.forEach( doc => {
                    if (doc.key) {
                        count = doc.folderCount;
                        userInfo = doc;
                    }
                })

                // Updating folderCount
                count += 1;
                userInfo.folderCount = count;
                
                // Reolacing UserInfo document
                UserInfo.remove({key: params.id}, () => {
                    userInfo = new UserInfo({
                        key: userInfo.key, 
                        username: userInfo.username,
                        xp: userInfo.xp,
                        taskCount: userInfo.taskCount,
                        folderCount: userInfo.folderCount,
                        taskCompletionPoints: userInfo.taskCompletionPoints
                    })
                    userInfo.save(coll_name).catch();
                }).then(() => {
                    saveFolders(count, userInfo);
                })
            })

            const saveFolders = function(count, userInfo) {
                // Creating a new instance of the folder model
                const folder = new Folder({
                    name: params.name,
                    parentFolderId: params.parentFolderId
                })

                // Saving the folder
                folder.save(coll_name)
                .then(doc => {})
                .then(res.json({
                    result: "success",
                    info: `A new folder "${params.name}" has been saved.`
                }))
                .catch(error => {
                    res.json({ result: "error", info: error.message });
                })
            }
        } catch ( error ) {
            res.json({ result: "error", info: error.message});
        }
    })
    // ------------------------------------------------------------------------

    // Remove Folder
    // ------------------------------------------------------------------------
    app.delete("/removeFolder", ( req, res ) => {
        // Collecting Parameters
        let params = req.body;
        coll_name = `user_${params.id}`;

        if ( !(params.id && params.folderId) ) {
            throw new Error ("Incorrect Parameters. Provide: id, folderId");
        }

        // Get Models
        const Folder = GetFolder(coll_name);

        // Removing the folder
        Folder.remove({"_id": mongoose.Types.ObjectId(params.folderId)})
        .then(() => {})
        .then(res.json({
            result: "success",
            info:  "The folder was successfully removed."
        }))
        .catch( err => res.json({
            result: "An Error Occurred",
            info: err
        }))
    })
    // ------------------------------------------------------------------------

    // Get Quotes
    // ------------------------------------------------------------------------
    app.get("/quotes", (req, res) => { res.json({quotes}) });
    // ------------------------------------------------------------------------

    // Check is a User Exists (/ A Key is Valid)
    app.get("/userExists", (req, res) => {
        try {
            // Collecting Parameters
            const coll_name = `user_${req.query.id}`;

            const UserInfo = GetUserInfo(coll_name);
            const count = UserInfo.find({}).lean().then(docs => docs.length > 0 ? true : false)
                                                .then(userExists => res.json({ userExists: userExists }));
        } catch ( error ) {
            console.log(error);
            res.json({ userExists: false });   
        }
    })
}