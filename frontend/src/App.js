import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LogInPage from '../src/components/LogInPage';
import RegisterPage from '../src/components/RegisterPage';
import ListEmployeeComponent from './components/ListEmployeeComponent.js';
import CreateEmployeeComponent from './components/CreateEmployeeComponent.js';
import ViewEmployeeComponent from './components/ViewEmployeeComponent.js';

function App() {
  return (
    <div>
        <Router>
            <div>
            </div>
                <div className="container">
                    <Switch> 
                          <Route path="/register" component={RegisterPage}></Route>
                          <Route path = "/employees" component = {ListEmployeeComponent}></Route>
                          <Route path = "/add/:id" component = {CreateEmployeeComponent}></Route>
                          <Route path = "/view/:id" component = {ViewEmployeeComponent}></Route>
                          <Route path="/" exact component={LogInPage}></Route>
                    </Switch>
                </div>
                <div>
                <footer className = "footer">
                    <span>Full Stack development (Assignment 2) - by Rutik Patel</span>
                </footer>
            </div>
        </Router>
    </div>
    
  );
}

export default App;
