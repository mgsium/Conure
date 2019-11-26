const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Initializing the express app.
const app = express();
app.use(cors());
app.options("*", cors({
    origin: "*",
}))

const PORT = 3501

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./app/routes")(app, {})

app.listen(PORT, () => {
    console.log(`We are live on port ${PORT}.`)
})

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    });
  });