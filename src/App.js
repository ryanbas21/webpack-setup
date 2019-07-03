import React from "react";
import { Link } from "react-router-dom";
import * as R from "ramda";
import "./App.css";
import "./App.less";

export default function(props) {
  const obj = { css: "css", less: "less" };
  return (
    <>
      <div id="test">This is {R.prop("css", obj)}</div>
      <div className="test">This is {R.prop("less", obj)}</div>
      <Link to={"/second"}>Click to go to page 2</Link>
    </>
  );
}
