// Module Imports
const mongoose = require("mongoose");

// Folder Schema
const folderSchema = mongoose.Schema({
    name: String,
    parentFolderId: String
})

// Module Exports
module.exports = (coll_name) => { return mongoose.model("Folder", folderSchema, coll_name) };