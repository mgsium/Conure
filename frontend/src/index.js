import React, { Component } from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";

WebFont.load({
    google: {
        families: ["Goudy Bookletter 1911", "Playfair Display", "Rubik", "Oxygen"]
    }
})

import App from "./App";

ReactDOM.render(
    <App/>, 
    document.getElementById("app")
    );

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
    });
});