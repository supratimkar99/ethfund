import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from './NavBars/NavBar.InApp';

export default class Page extends Component {

    constructor(props) {
        super(props);
        this.state = { username: "", account: "" };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/users/'+this.props.match.params.id)
            .then(response => {
                this.setState({ username: response.data.name});
                this.setState({ account: response.data.address});
            })
            .catch(function (error){
                console.log(error);
            })
    }


    render() {
        return (
            <div>
                <Navbar Redirect={this.props.match.params.id}/>
                <div className="container">
                    <p>Hello {this.state.username}</p>
                    <p>Your Account Address is {this.state.account}</p>
                    <Link className="start-b" to={"/start/"+this.props.match.params.id} ><button className="start-btn">Start A Project</button></Link>
                </div>
            </div>
        )
    }
}