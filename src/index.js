import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.register();
/*

Common   
          -Navigation
          -Welcome message with login out option
Visitor   
          -Home Page
          -Login (check database)
          -Register (into the database)
User      
          -reservation
          -check in 
          -attendee 

*/
