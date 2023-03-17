import React from 'react';
import arrow from "../Assets/arrow.png"
const BigEntry = ({ name = null, detail, pictureUrl = null, destination = "dogoland" }) => {
  const handleClick = () => {
    console.log("going to the room: ", { destination })
  };

  return (
    <div class="flex-grid">
      <div class="big-box">
        <div class="circle"></div>
        <div class="text-box">
          <div class="name">{name}</div>
          <div class="details">{detail}</div>
        </div>
        <div class="pointer" >
          <img src={arrow} style={{ cursor: "pointer", width: "30px", height: "100px", marginLeft: "150px", }} onClick={handleClick} />
        </div>

      </div>

    </div>
  );
}

export default BigEntry;

