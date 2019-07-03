import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function(props) {
    return (
        <div id="test">
            Hello React
            <Link to={"/second"}>Click to go to page 2</Link>
        </div>
    );
}
