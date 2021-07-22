import React, { Component } from "react";
import { Link } from "react-router-dom";
import ethpic from '../../Images/ethpic.png';
import "../../index.css"
export default class Navbar extends Component {

    handleLogout() {
        localStorage.clear();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <span className="navbar-brand">
                        <img src={ethpic} width="50" height="50" alt="Ethfund" />
                    </span>
                    <span className="navbar-brand">EthFund</span>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to={"/page/"} className="nav-link" style={this.props.Active === "Home" ? {fontSize: "30px", marginTop:"-5px"} : null }>Home</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to={"/view/"} className="nav-link" style={this.props.Active === "MyProjects" ? {fontSize: "30px", marginTop:"-5px"} : null }>My Projects</Link>
                            </li>                                
                            <li className="navbar-item">
                                <Link to={"/onsale/"} className="nav-link" style={this.props.Active === "OnSale" ? {fontSize: "30px", marginTop:"-5px"} : null }>On Sale</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/login" className="logout"><span onClick={() => { this.handleLogout(); }}>LogOut</span></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
            </div>
        )
    }
}