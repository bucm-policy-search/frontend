import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './index.css';
import Home from './Home'
import Search from './Search'

import { createBrowserHistory } from "history";

const history = createBrowserHistory();


ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Home} />

        <Route path='/search' component={Search} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
