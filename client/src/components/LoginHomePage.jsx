import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Avatr from "react-avatar-edit"
import hives from '../Assets/hives.png'
import "./Style.css"
import Navbar from "./Navbar";
import HiveComp from './LoginHiveCompient';
import ScrollPage from './scroll';


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

  const navigate = useNavigate();
  axios.post("/api/v1/joinHive",
  {
    "code": 846453,
    "profilePicture": "SGVsbG8gd29ybGQsIHRoaXMgaXMgbm90IGEgcmVhbCBtZXNzYWdl...",
    "displayName": "Drone4",
    "biography": "Eternally loyal to the hive."
      /*
      UNCOMMENT FOR FUTURE SPRINTS (ROOM CONFIG)
      joinDate: this.state.joinDate,
      joinTime: this.state.joinTime,
      profileDate: this.state.profileDate,
      profileTime: this.state.profileTime,
      classDate: this.state.classDate,
      classTime: this.state.classTime
      */
  }    , {
    headers: {
      "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2ZkMWRlNDYxNGJmZDMyYmJjZjY5NTQiLCJpYXQiOjE2Nzc2MTY4NjUsImV4cCI6MTY3Nzg3NjA2NX0.Gf-7aDiVWoTqQsZnVFsQVoZr4bqoVBGF83weN57CGrk"
    }
  }         ).then(res => {
    if (res.status == 200) {
       
      console.log(res.data)
    }
})


//Handle Join Hive button 
const handleClick = () => {
  axios.post("/api/v1/joinHive", {
    "code": 846453,
    "profilePicture": "SGVsbG8gd29ybGQsIHRoaXMgaXMgbm90IGEgcmVhbCBtZXNzYWdl...",
    "displayName": "Drone4",
    "biography": "Eternally loyal to the hive."
  } , {
    headers: {
      "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2ZkMWRlNDYxNGJmZDMyYmJjZjY5NTQiLCJpYXQiOjE2Nzc2MTY4NjUsImV4cCI6MTY3Nzg3NjA2NX0.Gf-7aDiVWoTqQsZnVFsQVoZr4bqoVBGF83weN57CGrk"
    }
  }  ).then(res => {
    if (res.status === 200) {
     
    }
    else{
      console.log("GG" )

    }
  });
}
//Handle create new Hive button 
const handleClick2 = () => {
  axios.post("/api/v1/createHive", {
    "profilePicture": "SGVsbG8gd29ybGQsIHRoaXMgaXMgbm90IGEgcmVhbCBtZXNzYWdl...",
    "displayName": "HostBee1",
    "hiveName": "CSC301's Hive",
    "configOptions": {}
  } , {
    headers: {
      "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2ZkMWRlNDYxNGJmZDMyYmJjZjY5NTQiLCJpYXQiOjE2Nzc2MTY4NjUsImV4cCI6MTY3Nzg3NjA2NX0.Gf-7aDiVWoTqQsZnVFsQVoZr4bqoVBGF83weN57CGrk"
    }
  }  ).then(res => {
    if (res.status === 200) {
      
      console.log(res.date) 
      //console.log(res.date) 
      //console.log(res.date.code) 
      //console.log(res.date.hiveID) 
      

      
    }
  });
}

  axios.get("/api/v1/getHiveInfo",
  {} , {
    headers: {
      "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2ZkMWRlNDYxNGJmZDMyYmJjZjY5NTQiLCJpYXQiOjE2Nzc2MTY4NjUsImV4cCI6MTY3Nzg3NjA2NX0.Gf-7aDiVWoTqQsZnVFsQVoZr4bqoVBGF83weN57CGrk"
    }
  }   ).then(res => {
    if (res.status === 200) {
       
        console.log(res.date.hiveID) 
    }

  }
  )



  
    return (
      <div class='grid'>
        <div class='left'>
          <img src={hives}></img>
        </div>
        <div class='right'>
          < Navbar />
          G
          <div
      style={{
        height: '300px',
        overflow: 'auto',
      }}
    >    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed
    nisi nec purus congue elementum vel id lorem. Vestibulum ac metus velit.
    Donec fringilla mauris sit amet mauris suscipit, at volutpat dolor
    ullamcorper. Fusce convallis nisi quis neque semper, vel malesuada
    ipsum facilisis. Suspendisse potenti. Aliquam eleifend, mi sed sagittis
    lacinia, odio lectus dapibus justo, vel malesuada ex risus vel arcu.
    Proin luctus augue et ipsum efficitur bibendum. Curabitur euismod augue
    ut dui laoreet vehicula. Donec ut justo eget nulla rutrum tristique ut
    eu lectus.
  </p> <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed
        nisi nec purus congue elementum vel id lorem. Vestibulum ac metus velit.
        Donec fringilla mauris sit amet mauris suscipit, at volutpat dolor
        ullamcorper. Fusce convallis nisi quis neque semper, vel malesuada
        ipsum facilisis. Suspendisse potenti. Aliquam eleifend, mi sed sagittis
        lacinia, odio lectus dapibus justo, vel malesuada ex risus vel arcu.
        Proin luctus augue et ipsum efficitur bibendum. Curabitur euismod augue
        ut dui laoreet vehicula. Donec ut justo eget nulla rutrum tristique ut
        eu lectus.
      </p><p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed
        nisi nec purus congue elementum vel id lorem. Vestibulum ac metus velit.
        Donec fringilla mauris sit amet mauris suscipit, at volutpat dolor
        ullamcorper. Fusce convallis nisi quis neque semper, vel malesuada
        ipsum facilisis. Suspendisse potenti. Aliquam eleifend, mi sed sagittis
        lacinia, odio lectus dapibus justo, vel malesuada ex risus vel arcu.
        Proin luctus augue et ipsum efficitur bibendum. Curabitur euismod augue
        ut dui laoreet vehicula. Donec ut justo eget nulla rutrum tristique ut
        eu lectus.
      </p></div>
      
          < HiveComp />
          <input
							className='SmalltextBox'
							type="text"
							name="username"
							placeholder="Room PIN"
              style={{ cursor: 'pointer',   position:'absolute', width: '250px', height: '50px', left: '765px', top: '760px' }}
							 />
                <button onClick={handleClick} type="submit" className="button" style={{ cursor: 'pointer',  position:'absolute', width: '150px', height: '35px', left: '1050px', top: '770px' } }>Join Hive</button>
                <button onClick={handleClick2}  type="submit" className="button" style={{ cursor: 'pointer', position:'absolute',width: '492px', height: '50px', left: '755px', top: '818px'}}>Create new Hive</button>
  
        </div>
      </div>
    );
  };
  
  export default LoginHomePage;