import { Component, useEffect, useState } from "react";
import axios from 'axios';
import "./roomcreation.css";
import { useNavigate, useNavigation } from "react-router-dom";


function redirect(Component) {
    return props => <Component navHook={useNavigate()} />;
}

class CreateRoom extends Component {
    constructor() {
        super();
        this.state = {
            hiveName: '',
            displayName: '',
            joinDate: '',
            joinTime: '',
            profileDate: '',
            profileTime: '',
            classDate: '',
            classTime: '',
            code: '',
            hiveID: ''
        }
    }

    handleHiveName = (e) => { this.setState({ hiveName: e.target.value }) }
    handleDisplayName = (e) => { this.setState({ displayName: e.target.value }) }
    handleJoinDate = (e) => { this.setState({ joinDate: e.target.value }) }
    handleJoinTime = (e) => { this.setState({ joinTime: e.target.value }) }
    handleProfileDate = (e) => { this.setState({ profileDate: e.target.value }) }
    handleProfileTime = (e) => { this.setState({ profileTime: e.target.value }) }
    handleClassDate = (e) => { this.setState({ classDate: e.target.value }) }
    handleClassTime = (e) => { this.setState({ classTime: e.target.value }) }

    handleSubmit = e => {
        //pass to waiting page
        this.setState({code: this.state.code})
        e.preventDefault();
        this.props.navHook("/waiting1")
        //todo: error handling
        axios.post("/api/v1/createHive",
            {
                profilePicture: "sldkcndlkcns",
                hiveName: this.state.hiveName,
                displayName: this.state.displayName,
                configOptions: "{}"
                /*
                UNCOMMENT FOR FUTURE SPRINTS (ROOM CONFIG)
                joinDate: this.state.joinDate,
                joinTime: this.state.joinTime,
                profileDate: this.state.profileDate,
                profileTime: this.state.profileTime,
                classDate: this.state.classDate,
                classTime: this.state.classTime
                */
            }).then(res => {
                //console.log(res);
                //console.log(res.data);
                if (res.status == 200){
                    //get code and hiveID back -> store in local storage
                    this.setState({code: res.data.code})
                    console.log(res.data.code)
                    console.log(res.data.hiveID)
                    //for testing purposes
                    //localStorage.setItem('code', 'hello')
                    localStorage.setItem('code', JSON.stringify(this.state.code))
                    this.setState({hiveID: res.data.hiveID})
                    localStorage.setItem('hiveID', JSON.stringify(this.state.hiveID))
                }
            })
    }

    render() {

        return (
            <div className="create">
                <h2 className="h2">Let's get some basic info down for your new hive.</h2>
                <form onSubmit={this.handleSubmit}>
                    <label className="hiveName">Hive name</label>
                    <input className="hiveNameField"
                        type="text"
                        required
                        //onChange={(e) => this.setState({hiveName: e.target.value})}
                        onChange={this.handleHiveName}
                    />
                    <label className="displayName">Your display name</label>
                    <input
                        className="displayNameField"
                        type="text"
                        required
                        onChange={this.handleDisplayName}
                    />
                    <label className="joinDeadline">Join/pregroup deadline (Optional)</label>
                    <input
                        className="joinDate"
                        type="date"
                        onChange={this.handleJoinDate}
                    />
                    <input
                        className="joinTime"
                        type="time"
                        onChange={this.handleJoinTime}
                    />

                    <label className="profileDeadline">Profile completion deadline (Optional)</label>
                    <input
                        className="profileDate"
                        type="date"
                        onChange={this.handleProfileDate}
                    />
                    <input
                        className="profileTime"
                        type="time"
                        onChange={this.handleProfileTime}
                    />

                    <label className="classDeadline">Classification deadline (Optional)</label>
                    <input
                        type="date"
                        className="classDate"
                        onChange={this.handleClassDate}
                    />
                    <input
                        type="time"
                        className="classTime"
                        onChange={this.handleClassTime}
                    />
                    <button type="submit" className="continue" style={{cursor:'pointer'}}>Continue</button>
                </form>
            </div>
        );

    }
}
export default redirect(CreateRoom)