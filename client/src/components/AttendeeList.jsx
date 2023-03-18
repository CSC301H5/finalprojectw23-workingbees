import { useState } from "react"
import "./Style.css"
import MiniEntry from "./MiniEntry";
import VerticalGrid from "./Grid";

function AttendeeList(props) {
  // Don't define props.attendeeList here, use the prop that is passed to the component instead

  props.socket.addEventListener('message', (event) => {
    let data = JSON.parse(event.data);
    if (data.event === "USER_JOIN") {
      props.setAttendeeList((prevList) =>
        [...prevList, (data.username)])
    }
  });

  return (
    <div
      className="entryBox"
      style={{
        position: "absolute",
        left: "-60px",
        top: "50px",
        width: "570px",
        height: "200px",
        display: "inline-block",
        overflowY: "scroll",

      }}
    >
      {props.attendeeList.map((name) => (
        <MiniEntry key={name} name={name} style={{}} />
      ))}
    </div>
  );
}


export default AttendeeList;