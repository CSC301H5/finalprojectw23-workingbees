import { Component } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function redirect(Component) {
    return props => <Component navHook={useNavigate()} />;
}
class WaitingP2 extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }
    handleSubmit = e => {
        e.preventDefault();
        
        axios.post("/waitingp2",
            {

            }).then(res => {
                console.log(res);
                console.log(res.data);
            })
            
            
    }

    render() {

        return (
            <div className="waiting2">
                <h2>Waiting on Phase 1...</h2>

            </div>
        );

    }
}
export default WaitingP2
