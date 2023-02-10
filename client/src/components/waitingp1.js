import { Component, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./waitingp1.css"

function redirect(Component) {
  return props => <Component navHook={useNavigate()} />;
}
/*
const [items, setItems] = useState([]);
useEffect(() => {
  const items = JSON.parse(localStorage.getItem('items'));
  if (items) {
    setItems(items);
  }
}, []);
*/

class WaitingP1 extends Component {
  constructor() {
    super();
    this.state = {
      attendeeList: [],
      numBees: "0",
      hiveID: "",
      code: "",
      profilesCompleted: "0"
    };
    /*
    var storedHiveID;
    var storedCode;
    */

    
    if(localStorage.getItem('code')){
      this.setState({code: JSON.parse(localStorage.getItem('code'))});
    }
    
    //this.setState({code: localStorage.getItem('code')});

    if(localStorage.getItem('hiveID')){
      this.setState({hiveID: JSON.parse(localStorage.getItem('hiveID'))});
    }
  }
  handleStart = e => {
    axios.get("/api/v1/getHiveAttendeeNames", { hiveID: this.state.hiveID }).then(res => {
      if (res.status == 200) {
        this.setState({ attendeeList: res.data.attendeeNames })
        this.setState({ numBees: res.attendees.length})
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.navHook("/waiting2")

    //todo: error checking
  }

  render() {

    return (
      <div className="wait">
        <h2 className="h2">Code: </h2>
        <p className="code">{this.state.code}</p>
        <form onSubmit={this.handleSubmit}>
          <label className="hiveSize">bees in the hive</label>
          <label className="numProfiles">profiles completed</label>
          <p className="profilesCompleted">{this.state.profilesCompleted}</p>
          <p className="numBees">{this.state.numBees}</p>
          <label className="attendees">Attendee list</label>
          <p className="attendeeList">{this.state.attendeeList}</p>
          <button type="button" className="start" style={{ cursor: 'pointer' }} onClick={this.handleStart}>Start</button>
          <button type="submit" className="continue" style={{ cursor: 'pointer' }}>Skip to phase 1</button>
          <p className="hivemind">HIVEMIND</p>
        </form>
      </div>
    );

  }
}
export default redirect(WaitingP1)
