import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import SlidingPanel from "react-sliding-side-panel";
import Navbar from './NavBars/NavBar.InApp';
import web3 from '../migrations/web3';

export default class ProjectList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            projects: [],
            account: '',
            isOpen: false,
            activeProject: null,
            stakeToSell: 1,
            MinBid: 0,
        };
        this.onChangeMinBid = this.onChangeMinBid.bind(this);
        this.onChangeStakeToSell = this.onChangeStakeToSell.bind(this);
        this.sellOperation = this.sellOperation.bind(this);
    }

    async componentDidMount() {

        this.setState({
            account: localStorage.getItem('account'),
        })

        axios.get('http://localhost:4000/projects/list/'+localStorage.getItem('account'))
            .then(response => {
                this.setState({ projects: response.data});
            })
            .catch(function (error){
                console.log(error);
            })
    }

    onChangeStakeToSell(e) {
        this.setState({ stakeToSell : e.target.value})
    }

    onChangeMinBid(e) {
        this.setState({ MinBid: e.target.value })
    }

    sellOperation(e) {
        e.preventDefault();
        const details = {
            ProjectAddress: this.state.activeProject.ProjectAddress,
            ProjectName: this.state.activeProject.ProjectTitle,
            OwnerAddress: this.state.account,
            StakeValue: this.state.stakeToSell,
            MinimumBid: this.state.MinBid,
            UpUntil: "1626093000000"
        }
        axios.post('http://localhost:4000/bids/create', details)
        .then(res => {
            console.log(res);
            alert("The Bidding Process has been initiated!");
            this.setState({ isOpen: false, activeProject: null, stakeToSell: 1, MinBid: 0 })
        })
        .catch(err => {
            console.log(err);
            alert("Failed!")
        })
    }

    projectList() {
        return this.state.projects.map((currentProject, i) => {
            return (
                <tr key={i}>
                    <td style={{color: "darkblue", fontWeight: "600"}}>{currentProject.ProjectTitle}</td>
                    <td>{`${currentProject.StakeValue} %`}</td>
                    <td>
                        <button className="start-btn" style={{width: "70px", padding: "0px", margin:"5px"}} onClick={ () => {this.setState({isOpen: true, activeProject: currentProject})}}>Sell</button>
                    </td>
                </tr>
            )
        });
    }

    render() {
        //const projectdetails = this.state.activeProject;
        //console.log(projectdetails);
        const table = (this.state.projects.length === 0) ? <h3 style={{paddingLeft: "5%", paddingTop: "20px"}}>You do not own any projects yet!</h3> : (
            <>
                <h4>&nbsp;List of your Projects</h4>
                <table className="table table-striped" style={{ marginTop: "30px", width: "60%", textAlign: "center", border: "1px solid lightgray", boxShadow: "0 8px 8px 0 gray" }} >
                    <thead style={{ fontSize: "20px"}}>
                        <tr>
                            <th>Project Name</th>
                            <th>Your Stake</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: "17px"}}>
                        { this.projectList() }
                    </tbody>
                </table>
            </>
        )
        return (
            <div>
                <Navbar Active="MyProjects"/>
                <div className="container">
                {table}
                </div>
                { this.state.activeProject &&
                <SlidingPanel type="right" isOpen={this.state.isOpen} size={50}>
                    <div className="slidepanel-container">
                        <div className="modal-content">
                            <button
                                type="button"
                                className="closex"
                                style={{padding: "0px", margin: "0px"}}
                                onClick={() => {
                                    this.setState({ isOpen: false });
                                }}
                            >
                                &times;
                            </button>
                            <h1 style={{ textAlign: "center", marginBottom: "40px"}}>Sell your Project</h1>
                            <div className="container" style={{width: "80%"}}>
                                <form onSubmit={this.sellOperation}>
                                    <div className="form-group" style={{fontSize:"20px"}}> 
                                        <label>Project Name: </label>
                                        <input  type="text"
                                            disabled
                                            className="form-control"
                                            value={this.state.activeProject.ProjectTitle || "-"}
                                        />
                                    </div>
                                    <div className="form-group" style={{fontSize:"20px"}}>
                                        <label>Stake To Sell (in %): </label>
                                        <input 
                                            style={{marginBottom:"0px"}}
                                            type="number" 
                                            max={this.state.activeProject.StakeValue}
                                            min={1}
                                            className="form-control"
                                            value={this.state.stakeToSell}
                                            onChange={this.onChangeStakeToSell}
                                        />
                                        <label style={{color:"darkgray", marginTop:"0px", fontSize: "17px", paddingTop:"0px"}}>Stake available: {`${this.state.activeProject.StakeValue}%`}</label>
                                    </div>
                                    <div className="form-group" style={{fontSize:"20px"}}>
                                        <label>Minimum Bid (in ETH): </label>
                                        <input 
                                                type="text" 
                                                className="form-control"
                                                value={this.state.MinBid}
                                                onChange={this.onChangeMinBid}
                                                />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Submit" className="btn btn-primary" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </SlidingPanel>
                }
            </div>
        )
    }
}