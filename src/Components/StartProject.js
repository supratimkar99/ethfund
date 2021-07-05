import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './NavBars/NavBar.InApp';

import web3 from '../migrations/web3';
import ethfundInstance from '../migrations/ethfundInstance';

export default class StartProject extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.onChangeProjectDesc = this.onChangeProjectDesc.bind(this);
        this.onChangeWebsite = this.onChangeWebsite.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.loadBlockchainData = this.loadBlockchainData.bind(this);

        this.state = {
            account: '',
            project_name: '',
            project_desc: '',
            website: '',
            project_address: '' 
        }
    }

    async loadBlockchainData() {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        this.setState({
          account: accounts[0]
        })
      }

    onChangeProjectName(e) {
        this.setState( {
            project_name: e.target.value
        });
    }

    onChangeProjectDesc(e) {
        this.setState({
            project_desc: e.target.value
        });
    }

    onChangeWebsite(e) {
        this.setState({
            website: e.target.value
        });
    }

    async onSubmit(e) {
        e.preventDefault();
        await this.loadBlockchainData();

        await ethfundInstance.methods.startProject(
            this.state.project_name,
        ).send({
            from: this.state.account,
        }).then((res) => {
            this.setState ({
                project_address : res.events.ProjectStarted.returnValues.contractAddress
            });
            console.log("SC - Success",res);    

        }).catch((error) => {
            console.log("ERROR",error);
        });

        /*console.log(`Form submitted:`);
        console.log(`Class Name: ${this.state.class_name}`);
        console.log(`Class Code: ${this.state.class_code}`);
        console.log(`Class Owner: ${this.state.class_owner}`);
        console.log(`Class Description: ${this.state.class_desc}`);*/

        const newProject = {
            ProjectName: this.state.project_name,
            ProjectDesc: this.state.project_desc,
            Website: this.state.website,
            ProjectAddress: this.state.project_address,
            UserAdddress: this.state.account,
        };

        axios.post('http://localhost:4000/project/create', newProject)
            .then(res => {
                console.log(res.data);
                alert("Project Created");
                window.location.replace(`http://localhost:3000/page/${this.props.match.params.id}`);
            });
        
        /*this.setState({
            class_name: '',
            class_code: '',
            class_owner: '',
            class_desc: ''
        })*/
    }
    
    render() {
        return (
            <div>
            <Navbar Redirect={this.props.match.params.id}/>
            <div className="container" style={{width: 700}}>
                <h3>&nbsp;&nbsp;&nbsp;Start A New Project</h3>
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Project Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.project_name}
                                onChange={this.onChangeProjectName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Project Description: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.project_desc}
                                onChange={this.onChangeProjectDesc}
                                />
                    </div>
                    <div className="form-group">
                        <label>Website: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.website}
                                onChange={this.onChangeWebsite}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Project" className="btn btn-primary" />
                    </div>
                </form>
            </div>
            </div>
        )
    }
}