import React, { Component } from 'react';
import axios from 'axios';

export default class TestComponent extends Component {
    constructor() {
        super();
        this.state = {
            data: "Loading."
        };
    }

    handleDataButtonClick = () => {
        axios.get("/test").then(res => {
            this.setState({
                data: JSON.stringify(res.data)
            })
        })
    }

    handleCreateButtonClick = () => {
        axios.post("/test")
    }


    render() {
        return (
            <div>
                <button onClick={this.handleDataButtonClick}>Get data!</button>
                <button onClick={this.handleCreateButtonClick}>Create new timestamp in db</button>
                <h1>Data is: {this.state.data}</h1>
            </div>
        )
    }

}