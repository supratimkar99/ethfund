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
          <Route path="/page" component={Page} />
          <Route path="/signup" component={Signup} /> 
          <Route path="/login" component={Login} />
          <Route path="/start" component={StartProject} />
          <Route path="/view" component={ProjectList} />
          <Route path="/onsale" component={Onsale} />        
        </Router>
      </div>
    );
  }  
}

export default App;
