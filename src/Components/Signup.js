import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/signup.css';
import Nav2 from "./NavBars/NavBar.blank";
import web3 from '../migrations/web3';
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
  
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
    
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });
  
  return valid;
};

export default class Signup extends Component {

  constructor(props) {
    super(props);

    this.loadBlockchainData = this.loadBlockchainData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      account: '',
      Name: null,
      email: null,
      password: null,
      formErrors: {
        Name: " ",
        email: " ",
        password: " "
      }
    }
  }

  async loadBlockchainData() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    this.setState({
      account: accounts[0]
    })
  }
    
  async onSubmit(e) {
    e.preventDefault();

    await this.loadBlockchainData();
    
    if(formValid(this.state)){
      console.log(`--SUBMITTING--`);

      const newUser = {
        name: this.state.Name,
        email: this.state.email,
        password: this.state.password,
        address: this.state.account
      };

      axios.post('http://localhost:4000/users/register', newUser)
      .then(res => {
        if(res.data.status === "success") {
          alert("Signup Successful!");
          this.props.history.push("/login");
        }
        else {
          alert(res.data.message);
        }
      });
    } 
    else {
      alert("Invalid Details!")
    }
  }; 

  handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
          case "Name":
            formErrors.Name =
              value.length < 3 ? "Minimum 3 characaters required" : "";
            break;
    
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "Invalid email address";
            break;

          case "password":
            formErrors.password = 
              value.length < 6 ? "Minimum 6 characaters required " : "";
            break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value }, () => {});
  };


  render() {
        const{formErrors}  =this.state;
    const handleKeyDown = e => {
      if (e.key === " "){
          e.preventDefault();
      }
      };
        return (
          <div className="signupbackground"><Nav2></Nav2>
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1 className="signup-h1"> Create Account</h1>
                    <br />
                        <form onSubmit={this.onSubmit} className="signup-form">
                            <div className="Name">
                                <input className={formErrors.Name.length > 0 ? "error signup-input" : "norm signup-input"} 
                                    placeholder="Name" type="text" name="Name"  
                                    noValidate
                                    onChange={this.handleChange} />
                                {formErrors.Name.length > 0 && (<span className="errorMessage">{formErrors.Name}</span>)}
                            </div>  
                            <div className="email">
                                <input 
                                    className={formErrors.email.length>0?"error signup-input":"norm signup-input"}
                                    placeholder="Email" 
                                    type="email" 
                                    name="email"    
                                    noValidate
                                    onChange={this.handleChange}/>
                                {formErrors.email.length > 0 && (
                                    <span className="errorMessage">{formErrors.email}</span>
                                )}
                            </div>
                            <div className="password" >
                                <input    
                                    className={formErrors.password.length>0?"error signup-input":"norm signup-input"}
                                    placeholder="Password" 
                                    type="password" 
                                    name="password" 
                                    onKeyDown={handleKeyDown} 
                                    onChange={this.handleChange} />
                                {formErrors.password.length > 0 && (
                                    <span className="errorMessage">{formErrors.password}</span>
                                )}
                            </div>
                            <div className="createAccount">
                                <button className="btn" type="submit">Create Account</button>
                            </div>
                        </form>
                    </div>
                <div className="warningtext">Already Have an account? <Link to="/login">Login</Link></div>
            </div>
            </div>
      )
  }
}