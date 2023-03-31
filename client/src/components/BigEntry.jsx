import React from 'react';
import arrow from "../Assets/arrow.png"
import { useNavigate,useLocation } from "react-router-dom";


const BigEntry = ({ name = null, detail, pictureUrl = null, destination = null, hiveID = null, token=null, code=null}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("going to the room: ", { destination, hiveID, token, code})
    navigate(destination,{ state: { code: code, token: token, hiveID: hiveID } })
  };

  const displayName = name && name.length > 30 ? `${name.substring(0, 30)}...` : name;

  return (
    <div class="flex-grid">
      <div class="big-box">
        {pictureUrl ?(
          <img
            src={`data:image/png;base64,${pictureUrl.split(',')[1]}`}
            style={{ width: "75px", height: "75px", borderRadius: "50%", marginRight: "10px", marginLeft: "10px" }}
          />
        ) :(
          <div class="circle"></div>
        )}
        <div class="text-box">
          <div class="name" style={{ width: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {displayName}
          </div>
          <div class="details">{detail}</div>
        </div>
        <div class="pointer">
          <img
            src={arrow}
            alt=""
            style={{ cursor: "pointer", width: "30px", height: "100px", marginLeft: "150px" }}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default BigEntry;
