/* Route Imports */
const TaskManagement = require("./task_management");

module.exports = function(app) {
    /* Route Function Calls */
    TaskManagement(app);
}
