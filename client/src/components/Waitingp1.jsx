import { Component, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import hives from '../Assets/hives.png'
import "./Style.css"

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
    }
    this.handleStart = this.handleStart.bind(this)

    if (localStorage.getItem('code')) {
      this.setState({ code: JSON.parse(localStorage.getItem('code')) });
    }

    //this.setState({code: localStorage.getItem('code')});

    if (localStorage.getItem('hiveID')) {
      this.setState({ hiveID: JSON.parse(localStorage.getItem('hiveID')) });
    }
  }
  handleStart = e => {
    /*
    axios.get("/api/v1/getHiveAttendeeNames", { hiveID: this.state.hiveID }).then(res => {
      if (res.status == 200) {
        this.setState({ attendeeList: res.data.attendeeNames })
        this.setState({ numBees: res.attendees.length})
      }
    })
    */
    //get code
    axios.get("/api/v1/getCode", {}).then(res => {
      if (res.status == 200) {
        this.setState({ code: res.data.code })
        console.log(res.data.code)
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
      <div className="grid">
        <div class="left">
          <img src={hives} />
        </ div>
        <div class="right">
          <h2 className="roomCode">Code: </h2>
          <p className="roomCode" style={{ left: '1000px' }}>{this.state.code}</p>
          <form onSubmit={this.handleSubmit}>
            <label className="numsDescription" style={{ left: '762px' }}>bees in the hive</label>
            <label className="numsDescription" style={{ left: '1000px' }}>profiles completed</label>
            <p className="nums" style={{ left: '1070px' }}>{this.state.profilesCompleted}</p>
            <p className="nums" style={{ left: '820px' }}>{this.state.numBees}</p>
            <label className="attendees">Attendee list</label>
            <p className="attendeeList">{this.state.attendeeList}</p>
            <button type="button" className="button" style={{ position: 'absolute', left: '700px', top: '667px' }} onClick={this.handleStart}>Start</button>
            <button type="submit" className="button" style={{ position: 'absolute', left: '1017px', top: '667px' }}>Skip to phase 1</button>
          </form>
        </div>
      </div>
    );

  }
}
export default redirect(WaitingP1)
