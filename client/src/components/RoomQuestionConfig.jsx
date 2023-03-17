import React, { Component } from 'react';
import axios from 'axios';
import "./Style.css"
import hives from '../Assets/hives.png'
//import Title1 from '../Assets/Title1.png'
import Navbar from './Navbar';
import QuestionList from './QuestionList';
import { useNavigate, useLocation } from "react-router-dom";
export default function RoomQuestionConfig (){ 


	const navigate = useNavigate();
    const location = useLocation();

    
    const displayName = location.state.displayName;
    const hiveName = location.state.hiveName;
    const classDate= location.state.classDate;
    const classTime= location.state.classTime;
    const joinDate = location.state.joinDate;
    const profileDate = location.state.profileDate;
    const joinTime = location.state.joinTime;
    const groupSize = location.state.groupSize;
    const profileTime = location.state.joinTime;
    const token = location.state.token;
    const groupSizeMax = location.state.groupSizeMax;
    const groupSizeMin = location.state.groupSizeMin;
    

    console.log(token,"token");
    console.log(displayName, "displayName");
    console.log(hiveName, "hiveName");
    console.log(classDate,"classDate");
    console.log(classTime,"classTime");
    console.log(joinDate, "joinDate");
    console.log(profileDate, "profileDate");
    console.log(joinTime, "joinTime");
    console.log(groupSize,"groupSize");
    console.log(groupSizeMax,"groupSizeMax  in RoomQuestionConfig");
    console.log(groupSizeMin,"groupSizeMin   in RoomQuestionConfig");
  
    //guest token
    //const [token, setToken] = useState('')

   /*
	const handleSubmit = e => {
        navigate('/roomConfig', { state: {
             hiveName: hiveName, 
           
            profileDate:profileDate,
            joinTime:joinTime,
            profileTime:profileTime,
            classDate:classDate,
            classTime:classTime,
            groupSize:groupSize

            
        } })
        
        e.preventDefault();
        axios.post("/api/v1/createHive",
            {
                profilePicture: "sldkcndlkcns",
                hiveName: hiveName,
                displayName: displayName,
                configOptions: "{}"
            
            }, {
            headers: {
                'x-auth-token': token
            }
        }
        ).then(res => {
            if (res.status === 200) {
                navigate('/waiting1', { state: { code: res.data.code, token: token } })
            }
        })
    }
 */

	
	
	 {
		return (
			<div class="grid">
				<div class="left-side">
					<img src={hives}></img>
				</ div>
				<div class="right-side" style={{ height: '500px', position: 'absolute', right:"800px",
            overflow: 'auto',}}>
					
					<label class="display"> Specify some fields for attendees to match with</label>
					<QuestionList 
                    displayName={displayName}
                    hiveName = {hiveName} 
                    profileDate = {profileDate}
                    joinTime={joinTime}
                    profileTime={profileTime}
                    classDate={classDate}
                    classTime={classTime}
                    groupSize={groupSize}
                    token={token}
                    joinDate={joinDate}
                    groupSizeMax={groupSizeMax}
                    groupSizeMin={groupSizeMin}

                   
                    />
					
				</ div>
			</div>
		)
	}
}