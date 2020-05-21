import React, { Component } from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";

import App from "./App";

WebFont.load({
    google: {
        families: ["Cabin Sketch", "Playfair Display", "Rubik", "Oxygen", "Jost"]
    }
})

ReactDOM.render(<App backendUrl="https://conure-backend.herokuapp.com"/>, document.getElementById("app"));

/*
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
    });
});
*/