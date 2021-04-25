import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Modal from './components/Modal';
import Search from './components/Search'
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path='/search'>
          <h1>Search Page</h1>
        </Route>

        <Route path='/'>
          <Modal />
          <Search />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
