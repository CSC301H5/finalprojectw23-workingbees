import { Component } from "react";

// assumes endDate is given where endDate is a stringified date within one day in the future
// optionally takes event: a function to be called when the timer hits 0
export default class Timer extends Component {
    constructor(props) {
        super(props);
        let endTime = Date.parse(this.props.endDate);
        this.state = { timeLeft: Math.max(Math.floor((endTime - Date.now()) / 1000), 0) };
    }

    componentDidMount() {
        this.timer = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState(function (state) {
            if (state.timeLeft === 0) {
                if (this.props.event) {
                    this.props.event();
                }
                clearInterval(this.timer);
                return state;
            } else {
                return { timeLeft: state.timeLeft - 1 }
            }
        })
    }

    timeFormat() {
        let hours = Math.floor(this.state.timeLeft / (3600));
        let divisorForMinutes = this.state.timeLeft % (3600);
        let minutes = Math.floor(divisorForMinutes / 60);
        let divisorForSeconds = divisorForMinutes % 60;
        let seconds = Math.ceil(divisorForSeconds);

        let time = "";
        time += (hours > 0) ? hours + ":" : "";
        time += (minutes < 10) ? "0" + minutes : minutes;
        time += (seconds < 10) ? ":0" + seconds : ":" + seconds;
        return time;
    }

    render() {
        return ( 
            this.timeFormat()
        )
    }
}