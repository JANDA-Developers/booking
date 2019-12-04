/* eslint-disable */
import React from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "babel-polyfill";
import "whatwg-fetch";
import dotenv from "dotenv";
import ReactDOM from "react-dom";
import "./style_config/main.scss";
import App from "./App";
// @ts-ignore
import { registerObserver } from "react-perf-devtool";
dotenv.config({ path: "../.env" });

registerObserver();
ReactDOM.render(<App />, document.getElementById("root"));
