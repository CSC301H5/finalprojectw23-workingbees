import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Style.css";
import axios from 'axios';
import { getCookie } from './getAuthToken';
export default function HiveComp({nameList, phaseList}) {

  const [hiveName, setHiveName] = useState('')
  const [isHost, setisHost] = useState('')
  const [phase, setPhase] = useState('')
  const [teamSize, setTeamsize] = useState('')
    const x_auth_token = getCookie("x-auth-token");

  async function  getHiveName2(){
   
 
    axios.get("/api/v1/getUserHives ", {
      params: { },
      headers: {
        "x-auth-token": x_auth_token
      }
    }).then(res => {
      if (res.status ==200){
          
        setHiveName(res.data.name);
        setisHost(res.data.isHost);
        setPhase(res.data.phase);
        setTeamsize(res.data.teamSize);
        console.log("data : ",res.data);

       
        //console.log("data : ",res.data);
        //console.log("isHost : ",res.data.isHost);
        //console.log("phase : ",res.data.phase);
        //console.log("teamSize : ",res.data.teamSize);
      }
      console.log(res.data);
    });
    

  }
  useEffect(() => {
    getHiveName2();
  }, [] )
  getHiveName2();


  return (
    <div>
          <div/>
          <div >  <h1 style={{ position : 'relative', width: '190px',left: '100px',top:'75px' }} > hiveName</h1></div>
          
           <div
      style={{
        width: '75px',
        height: '75px',
        borderRadius: '50%',
        backgroundColor: 'orange',
      }}
    ></div>
          <div style={{ position : 'relative', width: '190px',left: '100px',top:'0px',fontSize:'26px' }} > phase 1</div>
    </div>
  )
}