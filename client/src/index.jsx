import "whatwg-fetch";
import "babel-polyfill";
import "react-app-polyfill/ie11";
import "isomorphic-unfetch";
/* eslint-disable */
// prettier-ignore
import dotenv from 'dotenv';
dotenv.config({path: "../.env"});
import React from "react";
import ReactDOM from "react-dom";
import "./layout/main.scss";
import App from "./App";
// in the file where you call your first ReactDOM.render()
import moment from "moment-timezone";

// get timezone and locale from some config
moment.tz.setDefault("UTC");

ReactDOM.render(<App />, document.getElementById("root"));
