import React from "react";
import ethpic from "../Nav/ethpic.png";
import {Link} from "react-router-dom";

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light static-top header-a">
            <div className="container nav-container">
                <span className="navbar-brand">
                        <img src={ethpic} width="45" height="45" />
                    </span>
                <h1>EthFund</h1> 
                 <div className="collapse navbar-collapse alink" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-itm active">
                            <a className="nav-link" href="#">Contact Us</a>
                        </li>
                        <Link to={"/login/"}><a className="btn btn-outline-dark start" id="btn">Login</a></Link>
                        <Link to={"/signup/"}><a className="btn btn-outline-dark start" id="btn" href="#">Sign Up</a></Link>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;