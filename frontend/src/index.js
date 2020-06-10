import React, { Component } from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";

import App from "./App";

WebFont.load({
    google: {
        families: ["Cabin Sketch", "Playfair Display", "Rubik", "Oxygen", "Jost"]
    }
})

ReactDOM.render(<App backendUrl="http://localhost:3501"/>, document.getElementById("app"));

// https://conure-backend.herokuapp.com

/*
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
    });
});
*/