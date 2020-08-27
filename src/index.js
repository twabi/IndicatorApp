import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Api from './api';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import BoxComponent from "./components/BoxComponent";
import TransferList from "./components/TransferList";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'

const developmentServer = 'https://www.namis.org/namis1';
const rootElement = document.getElementById('root');

const withBaseUrl = baseUrl => {
    Api.setConfig({
        baseUrl: `${baseUrl}/api/29`,
    });

    const routing = (
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/customReports" component={BoxComponent} />
                <Route exact path='/displayname' component={() => <TransferList />}/>
            </div>
        </Router>
    )

    ReactDOM.render(<App/>, rootElement);
};


withBaseUrl(developmentServer);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
