import React from "react";
import ethpic from "../../Images/ethpic.png";


function Nav2() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light static-top header-a">
            <span className="navbar-brand">
                <img src={ethpic} width="45" height="45" />
            </span>
            <h1>EthFund</h1>  
        </nav>
    );
}

export default Nav2;