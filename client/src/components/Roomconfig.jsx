import { Component } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./Style.css"
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
            <div className="config">
                <h2>Room configuration</h2>
                <form onSubmit={this.handleSubmit}>

                    <button type="submit" className="continue" style={{cursor:'pointer'}}>Publish</button>                    

                </form>
            </div>
        );

    }
}
export default redirect(ConfigRoom)
