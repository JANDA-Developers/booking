import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import './layout/main.scss';
import App from './App';

dotenv.config();

ReactDOM.render(<App />, document.getElementById('root'));
