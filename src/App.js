import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./logout.css"

import "bootstrap/dist/css/bootstrap.min.css";

// import Signup from "./Components/signup.component";
import Login from "./Components/login.component";
import Page from "./Components/landing-page.component";
import StartProject from "./Components/start-project.component";
import ProjectList from "./Components/project-list.component";
import Index from "./views/Index";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
            <Route path="/" exact component={Index} /> 
            <Route path="/page/:id" component={Page} />
            {/* <Route path="/" exact component={Signup} /> */}
            <Route path="/login" component={Login} />
            <Route path="/start/:id" component={StartProject} />
            <Route path="/view/:id" component={ProjectList} />
                     
        </Router>
      </div>
    );
  }  
}

export default App;
