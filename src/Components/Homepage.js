import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from './NavBars/NavBar.InApp';
import downarrow from '../Images/downarrow.png';
import sidearrow from '../Images/sidearrow.png';
import reddot from '../Images/reddot.png';
import SlidingPanel from "react-sliding-side-panel";
import ethfundProjectInstance from '../migrations/ethfundProjectInstance';
import web3 from '../migrations/web3';

export default class Page extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            username: "",
            account: "",
            userID: "",
            view: false,
            notifications: 0,
            activities: null,
            showBids: false,
            activeCamp: null,
            activeBidID: null,
            notifs: null,
        };
    }

    async componentDidMount() {

        await this.setState({ username: localStorage.getItem('name') });
        await this.setState({ account: localStorage.getItem('account') });
        await this.setState({ userID: localStorage.getItem('userID') });
    
        await axios.get('http://localhost:4000/bids/getbyaddress/'+this.state.account)
            .then(response => {
                this.setState({ notifications: response.data.length});
                this.setState({ activities: response.data});
            })
            .catch(function (error){
                console.log(error);
            })

        await axios.get('http://localhost:4000/bids/getnotified/'+this.state.account)
            .then(response => {
                if(this.state.notifications === 0 && response.data.length > 0)
                    this.setState({ notifications: 1 });
                this.setState({ notifs: response.data});
            })
            .catch(function (error){
                console.log(error);
            })
    }

    handleViewBids(id) {
        axios.get('http://localhost:4000/bids/allbids/'+id)
        .then(response => {
            console.log(response.data);
            this.setState({activeCamp: response.data, activeBidID: id})
        })
        .catch(function (error){
            console.log(error);
        })
        setTimeout(()=> { this.setState({showBids: true}); },100);
    }

    handleApprove(receiver, bidvalue) {
        const details = {
            Receiver: receiver,
            OpenBidID: this.state.activeBidID,
            BidValue: bidvalue,
            SellerAddress: this.state.account
        }
        axios.post('http://localhost:4000/bids/notify', details)
        .then(res => {
            console.log(res);
            alert("The Bidder will be notified of their bid acceptance!");
            this.setState({ showBids: false, activeSale: null, activeCamp: null, activeBidID: null })
        })
        .catch(err => {
            console.log(err);
            alert("Failed!")
        })
    }

    async handlePay(bidvalue, seller, bidid, notificationID) {

        let projectname='';
        let stake='';
        let project_address= '';
        await axios.get('http://localhost:4000/bids/getbidbyid/'+bidid)
        .then(response => {
            projectname = response.data.ProjectName;
            stake = response.data.StakeValue;
            project_address = response.data.ProjectAddress;
        })
        .catch(function (error){
            console.log(error);
        })

        const projectcontract = ethfundProjectInstance(project_address);

        await projectcontract.methods.purchase(
            web3.utils.toWei(bidvalue.toString(), 'ether'),
            stake,
            seller,
        ).send({
            from: this.state.account,
            gasPrice: '300000000000',
            value: web3.utils.toWei(bidvalue.toString(), 'ether'),
        }).then((res) => {
            console.log("Success",res);
            const sellerStake = res.events.PaymentDone.returnValues.ownerStake;
            const buyerStake = res.events.PaymentDone.returnValues.buyerStake;

            axios.delete('http://localhost:4000/projects/deletestake/'+project_address)
            .then(res => {
                console.log(res.data);
            }).catch((error) => {
                console.log("ERROR",error);
            });

            const details = {
                ProjectName: projectname,
                ProjectAddress: project_address,
                UserAddress: seller,
                StakeValue: sellerStake,
            }
            axios.post('http://localhost:4000/projects/newstake', details)
            .then(res => {
                console.log(res.data);
            }).catch((error) => {
                console.log("ERROR",error);
            });

            const details2 = {
                ProjectName: projectname,
                ProjectAddress: project_address,
                UserAddress: this.state.account,
                StakeValue: buyerStake,
            }
            axios.post('http://localhost:4000/projects/newstake', details2)
            .then(res => {
                console.log(res.data);
            }).catch((error) => {
                console.log("ERROR",error);
            });

            axios.delete('http://localhost:4000/bids/deletenotif/'+notificationID)
            .then(res => {
                console.log(res.data);
            }).catch((error) => {
                console.log("ERROR",error);
            });

            axios.delete('http://localhost:4000/bids/deletebid/'+bidid)
            .then(res => {
                console.log(res.data);
            }).catch((error) => {
                console.log("ERROR",error);
            });

            alert(`You have successfully purchased ${stake}% of ${projectname}`);
            window.location.replace("http://localhost:3000/page/");
        });
    }

    activityList() {
        // console.log(this.state.activities);
        return this.state.activities.map((current, i) => {
            return (
                <tr key={i}>
                    <td style={{color: "darkblue", fontWeight: "600"}}>Check out the bids placed on your sale campaign of {current.StakeValue}% of {current.ProjectName}</td>
                    <td>
                        <button className="start-btn" style={{width: "70px", padding: "0px", margin:"5px"}} onClick={ () => { this.handleViewBids(current._id); }}>View</button>
                    </td>
                </tr>
            )
        });
    }

    notifsList() {
        // console.log(this.state.activities);
        return this.state.notifs.map((current, i) => {
            return (
                <tr key={i}>
                    <td style={{color: "darkblue", fontWeight: "600"}}>Your Bid of {current.BidValue} ETH has been approved!</td>
                    <td>
                        <button className="start-btn" style={{width: "70px", padding: "0px", margin:"5px"}} onClick={ () => { this.handlePay(current.BidValue, current.SellerAddress, current.OpenBidID, current._id); }}>Pay</button>
                    </td>
                </tr>
            )
        });
    }

    bidList() {
        console.log(this.state.activeCamp);
        if(this.state.activeCamp.length === 0)
            return <p style={{marginTop: "20px", paddingBottom: "100px"}}><b>No Bids placed yet</b></p>
        return this.state.activeCamp.map((current, i) => {
            return (
                <tr key={i}>
                    <td style={{fontSize: "15px"}}>{current.BidderAddress}</td>
                    <td style={{width: "5%"}}>{current.BidValue} ETH</td>
                    <td>
                        <button className="start-btn" style={{width: "70px", padding: "0px", margin:"5px"}} onClick={ () => { this.handleApprove(current.BidderAddress, current.BidValue); }}>Approve</button>
                    </td>
                </tr>
            )
        });
    }


    render() {
        let indicator = <span onClick={() => { this.setState({view: true}) }}><img src={sidearrow} width="25" height="25" alt="indicator" style={{marginBottom: "5px"}}/></span>;
        if(this.state.view) {
            indicator = <span onClick={() => { this.setState({view: false}) }}><img src={downarrow} width="25" height="25" alt="indicator" style={{marginBottom: "5px"}}/></span>;
        }
        const dot = this.state.notifications > 0 ? <img src={reddot} width="15" height="15" alt="reddot" style={{marginBottom: "20px"}}/> : null ;
        const table = this.state.view ? (
            <table className="table table-striped" style={{ marginTop: "30px", width: "100%", textAlign: "center", border: "1px solid lightgray", boxShadow: "0 8px 8px 0 gray" }} >
                <tbody style={{ fontSize: "17px"}}>
                    { this.activityList() }
                    { this.notifsList() }
                </tbody>
            </table>
        ) : null ;
        return (
            <div>
                <Navbar Active="Home"/>
                <div style={{paddingTop: "20px", paddingLeft:"10%"}}>
                    <p style={{fontSize: "20px"}}>Hello <b>{this.state.username}</b></p>
                    <p style={{fontSize: "20px"}}>Your Account Address is <b>{this.state.account}</b></p>
                    <div style={{paddingLeft: "10%"}}><Link className="start-b" to={"/start/"} ><button className="start-btn" style={{fontSize: "20px", width:"600px"}}>Start A Project</button></Link></div>
                </div>
                <div style={{paddingTop: "20px", paddingLeft:"10%", width: "70%"}}>
                    <div style={{backgroundColor: "lightgray", paddingLeft: "10px", paddingTop: "5px"}}>
                        <h3>{indicator} Activity{dot}</h3>
                    </div>
                    {table}
                </div>
                { this.state.activeCamp &&
                <SlidingPanel type="right" isOpen={this.state.showBids} size={50}>
                    <div className="slidepanel-container">
                        <div className="modal-content">
                            <button
                                type="button"
                                className="closex"
                                style={{padding: "0px", margin: "0px"}}
                                onClick={() => {
                                    this.setState({ showBids: false });
                                }}
                            >
                                &times;
                            </button>
                            <h1 style={{ textAlign: "center", marginBottom: "20px"}}>Bids Placed</h1>
                            <div className="container" style={{width: "90%"}}>
                                <table className="table table-striped" style={{ marginTop: "30px", width: "100%", textAlign: "center", border: "1px solid lightgray", boxShadow: "0 8px 8px 0 gray" }} >
                                    <thead style={{ fontSize: "20px"}}>
                                        <tr>
                                            <th>User Address</th>
                                            <th style={{width: "40px"}}>Bid Value</th>
                                            <th style={{width: "40px"}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ fontSize: "17px"}}>
                                        { this.bidList() }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </SlidingPanel>
                }
            </div>
        )
    }
}