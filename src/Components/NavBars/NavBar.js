import React from "react";
import ethpic from "../../Images/ethpic.png";
import {Link} from "react-router-dom";
import "../../index.css"

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light static-top header-a">
            <span className="navbar-brand">
                    <img src={ethpic} width="50" height="50" />
                </span>
            <h1>EthFund</h1> 
                <div className="collapse navbar-collapse alink" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <Link to={"/login/"}><a className="btn btn-outline-dark" id="Main-btn">Login</a></Link>
                    <Link to={"/signup/"}><a className="btn btn-outline-dark" id="Main-btn">Sign Up</a></Link>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;