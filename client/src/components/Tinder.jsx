import React, { useState, useEffect } from 'react';
import hives from '../Assets/hives.png';
import axios from 'axios';
import "./Style.css";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';

import { getCookie } from '../utils/getAuthToken';
import DisplayMultiselect from './DisplayMultiselect';
import DisplayDropDown from './DisplayDropdown';
import DisplayTimetable from './DisplayTimetable';
import ProfileNumberAnswer from './ProfileNumberAnswer';
import ResponseButtons from './ResponseButtons';
// Need hiveID
const Tinder = (props) => {
  const [roomCode, setRoomCode] = useState('');
  const [result, setResult] = useState([]);
  const [questions_array, setQuestions_array] = useState([]);
  const [displayComponents, setDisplayComponents] = useState([]);
  const [current_profile_index, Setcurrent_profile_index] = useState(0);
  const [matchingGroupIDArray, SetmatchingGroupIDArray] = useState([]);
  const navigate = useNavigate();
  const token = getCookie("x-auth-token");

  const ex1 = {
    recommendations: [
      {
        matchingGroupID: "1111",
        users: [
          { "name": "Bee1", "biography": "hi", "profilePicture": "..." },
          { "name": "Bee2", "biography": "bye3", "profilePicture": "..." }],
        configOptionsResponses: [["Grourp 1 Q1 ans 1", "Grourp 1 Q1 ans 2"], 10000, "Group 1 ans 3"]
      },
      {
        matchingGroupID: "23232",
        users: [
          { "name": "Bee133", "biography": "hi2e3124123414", "profilePicture": "..." },
          { "name": "Bee23333", "biography": "bye", "profilePicture": "...." }],
        configOptionsResponses: [["Grourp 2 Q1 ans 1", "Grourp 2 Q1 ans 2"], 20000, "Group 2 ans 3"]
      },
      {
        matchingGroupID: "33333",
        users: [
          { "name": "wwww", "biography": "hi23t124123414", "profilePicture": "..." },
          { "name": "1111111231", "biography": "bye", "profilePicture": "..." }],
        configOptionsResponses: [["Grourp 3 Q1 ans 1", "Grourp 3 Q2 ans 2"], 300000, "Group 3 ans 3"]
      }

    ]
  }

  async function get_result() {
    axios.get("/api/v1/getPendingMatchingGroupRecommendations",
      {
        params: {
          "hiveID": "6412583724b643fca54d0bec"
        },
        headers: {
          'x-auth-token': token
        }
      }).then(res => {
        if (res.status === 200) {

          let ex1 = res.data.recommendations
          get_options();

        }
      })
  }

  async function get_options() {
    const recommendations = ex1.recommendations;
    console.log(ex1)
    console.log(recommendations)
    let i = 0;
    let users_array = [];
    let matchingGroupID = 0;
    let configOptionsResponses = [];
    let newDisplayComponents = "";

    axios.get("/api/v1/getRoomConfigOptions",
      {
        params: {
          "hiveID": "6412583724b643fca54d0bec",
          "code": "694449"
        },
        headers: {
          'x-auth-token': token
        }
      }).then(res => {
        if (res.status === 200) {
          let a = res.data.questions
          console.log(" res.data before  updated:", res.data);
          console.log("res.data.questions used  updated:", res.data.questions);
          console.log("questions_array updated:", a);

          recommendations.forEach((recommendation) => {
            console.log("recommendataion,", recommendation)
            let i = 0;
            let title = "";
            let explanation = "";
            let question_type = "";
            newDisplayComponents = null;
            let profile = [];
            users_array = recommendation.users;
            matchingGroupIDArray.push(recommendation.matchingGroupID);

            console.log("matchingGroupID  matchingGroupID ,", matchingGroupID)
            configOptionsResponses = recommendation.configOptionsResponses;
            let number = 0;
            console.log("questions_array real value,", a)
            for (let index in a) {

              index = parseInt(index)
              title = a[index].title;
              explanation = a[index].explanation;
              question_type = a[index].type;
              i = index;

              console.log("questions_array[index]:", a[index])
              console.log("configOptions", configOptionsResponses)
              console.log("index", index)
              number = +1;

              if (question_type == "DROPDOWN") {
                console.log("configOptionsResponses[dropdownIndex]:", configOptionsResponses[i]) // loop through  configOptionsResponses = [[ "rorrrrrrrrr", "eeeeeeeeee"], 800000,"545454545"] 

                newDisplayComponents = <DisplayDropDown array={configOptionsResponses[i]} question={"Q" + (number) + ":"} title={title} />;
              }
              else if (question_type == "MULTISELECT") {
                console.log("configOptionsResponses[dropdownIndex]:", configOptionsResponses[i]) // loop through  configOptionsResponses = [[ "rorrrrrrrrr", "eeeeeeeeee"], 800000,"545454545"] 

                newDisplayComponents = <DisplayMultiselect array={configOptionsResponses[i]} question={"Q" + (index)} title={title} />;
              }
              else if (question_type == "NUMBERLINE") {
                console.log("configOptionsResponses[dropdownIndex]:", configOptionsResponses[i]) // loop through  configOptionsResponses = [[ "rorrrrrrrrr", "eeeeeeeeee"], 800000,"545454545"] 

                newDisplayComponents = <ProfileNumberAnswer array={configOptionsResponses[i]} question={"Q" + (index)} />;
              }
              else if (question_type == "TIMETABLE") {
                console.log("configOptionsResponses[dropdownIndex]:", configOptionsResponses[i]) // loop through  configOptionsResponses = [[ "rorrrrrrrrr", "eeeeeeeeee"], 800000,"545454545"] 

                newDisplayComponents = <DisplayTimetable array={configOptionsResponses[i]} question={"Q" + (index)} />;
              }

              profile.push(newDisplayComponents);
              console.log("profile", profile)

              console.log("displayComponents", newDisplayComponents);
              console.log('displayComponents.length', displayComponents.length);
              console.log(displayComponents, "dispaly Compoents");
            }

            setDisplayComponents(prevComponents => [...prevComponents, profile]);

          });
        }
      });
  }

  useEffect(() => {
    get_result();
    get_options();
  }, [])

  console.log("matchingGroupIDArray[current_profile_index]", matchingGroupIDArray[current_profile_index])

  return (
    <>
      <div className="grid">
        <div className="left">
          <img src={hives} alt="" />
        </div>
        <div className="right"  >
          <Navbar token={token} />
          <div className="config" style={{ overflow: "auto", padding: "50px", height: "300px", width: "436px", backgroundColor: "whitesmoke" }}>
            <div >{displayComponents[current_profile_index]}</div>
          </div>
          <div style={{ position: "relative", left: "8%", padding: "30px" }} >
            <ResponseButtons Setcurrent_profile_index={Setcurrent_profile_index} current_profile_index={current_profile_index}
              hiveID={"6412583724b643fca54d0bec"}
              matchingGroupIDArray={matchingGroupIDArray} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tinder;