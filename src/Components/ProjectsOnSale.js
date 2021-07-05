import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from './NavBars/NavBar.InApp';

const Project = props => (
    <tr>
        <td style={{color: "blue", textDecoration: "underline"}}>{props.project.ProjectName}</td>
        <td style={{color: "blue", textDecoration: "underline"}}>{props.project.Owner}</td>
        <td>{props.project.Stake}</td>
        <td>{props.project.MinBid}</td>
        <td>
            <Link to={"/list/"+props.project.ProjectTitle}><button className="start-btn" style={{width: "70px", padding: "0px", margin:"5px"}}>Bid</button></Link>
        </td>
    </tr>
)

export default class Onsale extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            projects: [],
            account: '',
        };

    }

    async componentDidMount() {

        this.setState({
            projects: [
                {
                    ProjectName: "Solar energy on a budget",
                    Owner: "rahulsingh13",
                    Stake: "30%",
                    MinBid: "0.2 eth"
                },
                {
                    ProjectName: "Water Recycling in cities",
                    Owner: "rohan_gowda1",
                    Stake: "40%",
                    MinBid: "0.4 eth"
                },
                {
                    ProjectName :"Smart Agreements",
                    Owner :"JohnDoe22",
                    Stake :"40%",
                    MinBid :"2.2 eth"
                },
                {
                    ProjectName: "Coin Exchange Pratform",
                    Owner: "daniels_jack98",
                    Stake: "15%",
                    MinBid: "0.3 eth"
                },
                {
                    ProjectName:"Modular home systems",
                    Owner:"jaspreet1978pal",
                    Stake:"20%",
                    MinBid:"1 eth"
                },
                {
                    ProjectName:"Smart air purifiers",
                    Owner:"nikhil4612",
                    Stake:"15%",
                    MinBid:"0.4 eth"
                }
            ]
        })
        
    }

    projectList() {
        return this.state.projects.map(function(currentProject, i){
            return <Project project={currentProject} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <Navbar Redirect={this.props.match.params.id}/>
                <div className="container">
                <h3>&nbsp;Projects On Sale</h3>
                <table className="table table-striped" style={{ marginTop: 15, width: 900, textAlign: "center" }} >
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Owner</th>
                            <th>Stake</th>
                            <th>Minimum Bid</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.projectList() }
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}