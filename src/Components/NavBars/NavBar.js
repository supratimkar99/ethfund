import React from "react";
import ethpic from "../../Images/ethpic.png";
import {Link} from "react-router-dom";

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light static-top header-a">
            <span className="navbar-brand">
                    <img src={ethpic} width="45" height="45" />
                </span>
            <h1>EthFund</h1> 
                <div className="collapse navbar-collapse alink" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <Link to={"/login/"}><a className="btn btn-outline-dark">Login</a></Link>
                    <Link to={"/signup/"}><a className="btn btn-outline-dark">Sign Up</a></Link>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;