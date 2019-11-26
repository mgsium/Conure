// Module Imports
const mongoose = require("mongoose");

// Task Schema
const taskSchema = mongoose.Schema({
    body: String,
    target: Number
})

// Module Exports
module.exports = (coll_name) => { return mongoose.model("Task", taskSchema, coll_name) };