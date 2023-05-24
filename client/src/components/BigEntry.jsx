import React from 'react';
import arrow from "../assets/arrow.png"
import { useNavigate } from "react-router-dom";


const BigEntry = ({ name = null, detail, pictureUrl = null, destination = null, hiveID = null, token = null, code = null, swarmID = null, img = arrow }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(destination, { state: { code: code, token: token, hiveID: hiveID, swarmID: swarmID } })
  };

  const displayName = name && name.length > 30 ? `${name.substring(0, 30)}...` : name;

  return (
    <div class="flex-grid">
      <div class="big-box">
        {pictureUrl ? (
          <img
            src={`data:image/png;base64,${pictureUrl.split(',')[1]}`}
            style={{ width: "75px", height: "75px", borderRadius: "50%", marginRight: "10px", marginLeft: "10px" }}
          />
        ) : (
          <div class="circle"></div>
        )}
        <div class="text-box">
          <div class="name" style={{ width: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {displayName}
          </div>
          <div class="details">{detail}</div>
        </div>
        {img ? (
          <div class="pointer">

            <img
              src={img}
              alt=""
              style={{ cursor: "pointer", width: "30px", height: "100px", marginLeft: "150px" }}
              onClick={handleClick}
            />
          </div>
        ) : (<div></div>
        )}
      </div>
    </div>
  );
}

export default BigEntry;
