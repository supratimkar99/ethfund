import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import SlidingPanel from "react-sliding-side-panel";
import Navbar from './NavBars/NavBar.InApp';

export default class Onsale extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            activeBids: [],
            account: '',
            isOpen: false,
            activeSale: null,
            bidValue: 0,
            highestBid: 0,
        };
        this.bidOperation = this.bidOperation.bind(this);
        this.onChangeBidValue = this.onChangeBidValue.bind(this);
        this.bidPrereq = this.bidPrereq.bind(this);
    }

    async componentDidMount() {

        this.setState({ account: localStorage.getItem('account') });
      
        axios.get('http://localhost:4000/bids/activebids')
            .then(response => {
                this.setState({ activeBids: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    bidPrereq(_id) {
        let max = 0;
        axios.get(`http://localhost:4000/bids/allbids/${_id}`)
            .then(response => {
                for( let res of response.data ) {
                    if(res.BidValue > max) {
                        max = res.BidValue;
                    }
                    if(res.BidderAddress === this.state.account) {
                        alert(`You have already placed a bid of ${res.BidValue} ETH. Although you can place a better bid!`);
                    }
                }
            })
            .catch(function (error){
                console.log(error);
            })
            setTimeout(()=> { this.setState({isOpen: true, highestBid: max}); },100);
    }

    bidOperation(e) {
        e.preventDefault();
        const details = {
            BidID: this.state.activeSale._id,
            BidderAddress: this.state.account,
            BidValue: this.state.bidValue
        }
        axios.post('http://localhost:4000/bids/bid', details)
        .then(res => {
            console.log(res);
            alert("Your Bid has been Successfully Placed!");
            this.setState({ isOpen: false, activeSale: null, bidValue: 0 })
        })
        .catch(err => {
            console.log(err);
            alert("Failed!")
        })
    }

    onChangeBidValue(e) {
        this.setState({ bidValue: e.target.value })
    }

    projectList() {
        return this.state.activeBids.map((currentProject, i) => {
            return (
                <tr key={i}>
                    <td style={{color: "darkblue"}}>{currentProject.ProjectName}</td>
                    <td>{currentProject.StakeValue}</td>
                    <td>{currentProject.MinimumBid} ETH</td>
                    <td>
                        <button className="start-btn" style={{width: "70px", padding: "0px", margin:"5px"}}
                        onClick={ () => {
                            this.setState({activeSale: currentProject, bidValue: currentProject.MinimumBid})
                            if(currentProject.OwnerAddress === this.state.account) {
                                alert("You cannot bid on bidding campaign started by you!");
                            }
                            else {
                                this.bidPrereq(currentProject._id);
                            }
                        }}
                        >Bid</button>
                    </td>
                </tr>
            )
        });
    }

    render() {
        return (
            <div>
                <Navbar Active="OnSale"/>
                <div className="container">
                <h4>&nbsp;Projects On Sale</h4>
                <table className="table table-striped" style={{ marginTop: "30px", width: "70%", textAlign: "center", border: "1px solid lightgray", boxShadow: "0 8px 8px 0 gray" }} >
                    <thead style={{ fontSize: "20px"}}>
                        <tr>
                            <th>Project Name</th>
                            <th>Stake</th>
                            <th>Minimum Bid</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: "17px"}}>
                        { this.projectList() }
                    </tbody>
                </table>
                </div>
                { this.state.activeSale &&
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
                            <h1 style={{ textAlign: "center", marginBottom: "40px"}}>Place a Bid</h1>
                            <div className="container" style={{width: "80%"}}>
                                <form onSubmit={this.bidOperation}>
                                    <div className="form-group" style={{fontSize:"20px"}}> 
                                        <label>Project Name: </label>
                                        <input  type="text"
                                            disabled
                                            className="form-control"
                                            value={this.state.activeSale.ProjectName}
                                        />
                                    </div>
                                    <div className="form-group" style={{fontSize:"20px"}}>
                                        <label>Stake Up for Bid (in %): </label>
                                        <input 
                                            style={{marginBottom:"0px"}}
                                            type="number" 
                                            disabled
                                            className="form-control"
                                            value={this.state.activeSale.StakeValue}
                                        />
                                    </div>
                                    <div className="form-group" style={{fontSize:"20px"}}>
                                        <label>Bid Amount (in ETH): </label>
                                        <input 
                                            type="number" 
                                            className="form-control"
                                            min={this.state.activeSale.MinimumBid}
                                            step="any"
                                            placeholder={this.state.activeSale.MinimumBid}
                                            value={this.state.BidValue}
                                            onChange={this.onChangeBidValue}
                                        />
                                        <label style={{color:"darkgray", marginTop:"0px", fontSize: "17px", paddingTop:"0px"}}>Highest Bid Made: {`${this.state.highestBid} ETH`}</label>
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