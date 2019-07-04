import React from "react";
import { Link } from "react-router-dom";
import "./second.css";

export default function Second() {
  return (
    <div>
      Hello Second
      <Link to={"/"}>Click to go to page 2</Link>
    </div>
  );
}
