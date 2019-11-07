/* eslint-disable */
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "babel-polyfill";
import "whatwg-fetch";
import dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import "./layout/main.scss";
import App from "./App";
import moment from "moment-timezone";
dotenv.config({path: "../.env"});

// 모먼트 기본 시간대를 UTC로 설정함
moment.tz.setDefault("UTC");

ReactDOM.render(<App />, document.getElementById("root"));
