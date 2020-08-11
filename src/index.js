import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Api from './api';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

const developmentServer = 'https://www.namis.org/namis1';
const rootElement = document.getElementById('root');

const withBaseUrl = baseUrl => {
    Api.setConfig({
        baseUrl: `${baseUrl}/api/29`,
    });

    ReactDOM.render(<App />, rootElement);
};


withBaseUrl(developmentServer);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
