import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Avatr from "react-avatar-edit"
import hives from '../Assets/hives.png'
import "./Style.css"
import Navbar from "./Navbar";
import HiveComp from './LoginHiveCompient';
import ScrollPage from './scroll';
import { getCookie } from './getAuthToken';

/*  **GET /api/v1/getUserHives (PROTECTED)**

Description: gets the user’s hive list information for home page

Body parameters:

- None

Body example:

```jsx
{}
```

Response:

- A JSON object where the keys are the IDs of every Hive they are in, and the values being nested JSON objects containing hive name, host status of the logged in user, the phase of the hive, and their team size (default to 1 until teams are implemented in a later sprint.)

Response body example:

```jsx
{
"63e1bb9327ffe3d01689a801": {
	  "name": "A Hive",
		"isHost": true,
		"phase": 2,
		"teamSize": 1
	},
...
}
```

* In the event of an error, a string error of the form {”msg”: “Some information here”} is returned in the body.

Expected Response:
- 200 - Successfully returned all user hive data.
- 401 - Access denied.
- 500 - Internal server error (unknown exception) */



function LoginHomePage ()  {
  const [room, setRoom] = useState('');

  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setRoom(event.target.value);
  }



  const { state } = useLocation();
  const x_auth_token = getCookie("x-auth-token");


  const  test = getCookie("x-auth-token");
  console.log("test:", test );

  axios.get("/api/v1/getUserHives", {
    headers: {
      "x-auth-token": 1111111,
    }
  }).then(res => {
    if (res.status === 200) {
      console.log("HOOOOOOOO") 
      console.log(res.data.hiveID) 
    }
  })
  
  




//Handle Join Hive button 
const handleClick = () => {
  console.log('room', room);
  console.log('x-auth-token', x_auth_token);
  axios.get("/api/v1/getHiveInfo", {
    params: {
      code: room
    },
    headers: {
      'x-auth-token': x_auth_token
    
    }
  }).then(res => {
    console.log(res.data);
  }).catch(err => {
    console.error(err.response.data);
  });
}

//Handle create new Hive button 

const handleClick2 = () => {
  navigate("/createHive");
}




  
    return (
      <div class='grid'>
        <div class='left'>
          <img src={hives}></img>
        </div>
        <div class='right'>
          < Navbar />
          
          <div
      style={{
        height: '500px',
        overflow: 'auto',
      }}
    >  < HiveComp />   < HiveComp />< HiveComp />< HiveComp />< HiveComp />< HiveComp /> </div>
      
         
          <input
							className='SmalltextBox'
							type="text"
							name="username"
							placeholder="Room PIN"
              onChange={handleInputChange}
              value={room}

              style={{ cursor: 'pointer',   position:'absolute', width: '250px', height: '50px', left: '665px', top: '660px' }}
							 />
                <button onClick={handleClick} type="submit" className="button" style={{ cursor: 'pointer',  position:'absolute', width: '150px', height: '35px', left: '930px', top: '660px' } }>Join Hive</button>
                <button onClick={handleClick2}  type="submit" className="button" style={{ cursor: 'pointer', position:'absolute',width: '492px', height: '50px', left: '650px', top: '718px'}}>Create new Hive</button>
  
        </div>
      </div>
    );
  };
  
  export default LoginHomePage;