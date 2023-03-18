import { Component } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./Style.css"
import QuestionList from "./QuestionList";
import Navbar from "./Navbar";
import hives from "../Assets/hives.png";

function redirect(Component) {
    return props => <Component navHook={useNavigate()} />;
}

class ConfigRoom extends Component {
    constructor() {
        super();
        this.state = {

        };
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.navHook("/waiting1")

        axios.post("/room-config",
            {

            }).then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <div class="grid">
                <div class="left">
                    <img src={hives} alt="" />
                </div>
                <div class="right">
                    <Navbar />
                    <div className="config">
                        <h2>Room configuration</h2>
                        <QuestionList />
                    </div>
                </div>
            </div>
        );
    }
}
export default redirect(ConfigRoom)
