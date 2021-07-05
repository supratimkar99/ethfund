import React, { Component } from "react";
import { Link } from "react-router-dom";
import ethpic from '../../Images/ethpic.png';
import "../../index.css"

export default class Navbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand">
                        <img src={ethpic} width="30" height="30" alt="Online Academic Tracker" />
                    </span>
                    <span className="navbar-brand">EthFund</span>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to={"/page/"+this.props.Redirect} className="nav-link">Home</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to={"/view/"+this.props.Redirect} className="nav-link">My Projects</Link>
                            </li>                                
                            <li className="navbar-item">
                                <Link to={"/onsale/"+this.props.Redirect} className="nav-link">On Sale</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/login" className="logout">LogOut</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
            </div>
        )
    }
}