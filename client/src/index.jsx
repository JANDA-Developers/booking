import 'whatwg-fetch';
import 'babel-polyfill';
import 'react-app-polyfill/ie11';
/* eslint-disable */
// prettier-ignore
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import React from 'react';
import ReactDOM from 'react-dom';
import './layout/main.scss';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
