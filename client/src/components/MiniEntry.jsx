import React from 'react';
import crown from "../Assets/leader.png"
const MiniEntry = ({ name, status = null, pictureUrl = null, children }) => {
  return (
    <div className="entryWrapper">
      {pictureUrl ? (
        <img
          src={pictureUrl}
          alt={name}
          style={{ width: "25px", height: "25px", borderRadius: "50%", marginRight: "10px", marginLeft: "10px" }}
        />
      ) : (
        <div style={{ width: "25px", height: "25px", borderRadius: "50%", backgroundColor: "#FFAF40", marginRight: "10px", marginLeft: "10px" }}></div>
      )}
      <p style={{ textAlign: "left", paddingRight: "40px", fontFamily: "Montserrat", marginLeft: "10px" }}>{name}</p>
      {children ? (children) : (
        <div >{status === "leader" ? (
          <img
            src={crown}
            alt={name}
            style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px", marginLeft: "150px" }}
          />) : (<p style={{ color: "#FFAF40", textAlign: "left", paddingRight: "40px", fontFamily: "Montserrat", }}>{status}</p>

        )}</div>)}
    </div>
  );
};


export default MiniEntry;
