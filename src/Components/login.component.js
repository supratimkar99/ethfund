import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./login.css"
import logo from "../ethpic.png";

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Username: '',
            Password: ''   
        }
    }

    onChangeUsername(e) {
        this.setState( {
            Username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            Password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Username: ${this.state.Username}`);
        console.log(`Password: ${this.state.Password}`);

        const user = {
            email: this.state.Username,
            password: this.state.Password
        };

        axios.post('http://localhost:4000/users/authenticate', user)
            .then(res => {
                console.log(res.data);
                if(res.data.status === "success") {
                    //alert("Login Successful !");
                    this.props.history.push("/page/"+res.data.userId);
                } else {
                    alert("Invalid Username or Password !")
                }
            });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row main-content bg-success text-center">
                    <div className="col-md-3 company__info">
                        <span className="company__logo"><h2><span className="fa fa-android"></span></h2></span>
                        <img src={logo} width="80" height="80" alt="Online Academic Tracker" />
                    </div>
                    <div className="col-md-9 col-xs-12 col-sm-12 login_form ">
                        <div className="container-fluid">
                            <div className="row tr">
                                <h2>Log In</h2>
                            </div>
                            <div className="row">
                                <form onSubmit={this.onSubmit} className="form-group">
                                    <div className="row">
                                        <input type="text" 
                                        value={this.state.Username}
                                        onChange={this.onChangeUsername} 
                                        className="form__input" placeholder="Username"/>
                                    </div>
                                    <div className="row">
                                        <input type="password" 
                                        value={this.state.Password}
                                        onChange={this.onChangePassword}
                                        className="form__input" placeholder="Password"/>
                                    </div>
                                    <div className="row">
                                        <input type="submit" value="Login" className="btn" />
                                    </div>
                                </form>
                            </div>
                            <div className="row">
                                <p>Don't have an account?  <Link to="/">Register Here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}