import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Page from "./Components/Homepage";
import StartProject from "./Components/StartProject";
import ProjectList from "./Components/MyProjects";
import Onsale from "./Components/ProjectsOnSale";

import Index from "./Components/LandingPage/Index";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={Index} /> 
          <Route path="/page/:id" component={Page} />
          <Route path="/signup" component={Signup} /> 
          <Route path="/login" component={Login} />
          <Route path="/start/:id" component={StartProject} />
          <Route path="/view/:id" component={ProjectList} />
          <Route path="/onsale/:id" component={Onsale} />        
        </Router>
      </div>
    );
  }  
}

export default App;
