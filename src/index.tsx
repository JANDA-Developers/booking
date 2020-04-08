import "core-js";
/* eslint-disable */
import React from "react";
import "whatwg-fetch";
import dotenv from "dotenv";
import ReactDOM from "react-dom";
import "./style_config/main.scss";
import App from "./App";
// @ts-ignore
import { registerObserver } from "react-perf-devtool";

dotenv.config({
  path: "../.env"
});

registerObserver();
ReactDOM.render(<App />, document.getElementById("root"));
