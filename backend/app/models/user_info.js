// Module Imports
const mongoose = require("mongoose");

// UserInfo Schema
const userInfoSchema = new mongoose.Schema({
    key: String,
    username: String,
    xp: Number,
    taskCount: Number,
    folderCount: Number,
    taskCompletionPoints: Number
});

// Module Exports
module.exports = (coll_name) => { return mongoose.model("UserInfo", userInfoSchema, coll_name) };