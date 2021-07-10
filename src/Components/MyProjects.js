import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from './NavBars/NavBar.InApp';
import web3 from '../migrations/web3';

const Project = props => (
    <tr>
        <td>{props.project.ProjectTitle}</td>
        <td>{props.project.StakeValue}</td>
        <td>
            <Link to={"/list/"+props.project.ProjectTitle}>Sell</Link>
        </td>
    </tr>
)

export default class ProjectList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            projects: [],
            account: '',
        };

    }

    async loadBlockchainData() {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        this.setState({
          account: accounts[0]
        })
    }

    async componentDidMount() {

        await this.loadBlockchainData();

        axios.get('http://localhost:4000/projects/list/'+this.state.account)
            .then(response => {
                this.setState({ projects: response.data});
            })
            .catch(function (error){
                console.log(error);
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
                <h3>&nbsp;My Projects</h3>
                <table className="table table-striped" style={{ marginTop: 15, width: 600, textAlign: "center" }} >
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Your Stake</th>
                            <th>Sell</th>
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