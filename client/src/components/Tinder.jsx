import React, { useState, useEffect } from 'react';
import hives from '../Assets/hives.png';
import axios from 'axios';
import "./Style.css";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from './Navbar';
import { getCookie } from '../utils/getAuthToken';
import DisplayMultiselect from './DisplayMultiselect';
import DisplayDropDown from './DisplayDropdown';
import DisplayTimetable from './DisplayTimetable';
import ProfileNumberAnswer from './ProfileNumberAnswer';
import ResponseButtons from './ResponseButtons';
import ProfileHeader from "./Header"
import FakeProfileHeader from './FakeHeader';
// Need hiveID
const Tinder = (props) => {
  const [roomCode, setRoomCode] = useState('');
  const [result, setResult] = useState([]);
  const [questions_array, setQuestions_array] = useState([]);
  const [displayComponents, setDisplayComponents] = useState([]);
  const [current_profile_index, Setcurrent_profile_index] = useState(0);
  const [matchingGroupIDArray, SetmatchingGroupIDArray] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  var setup_index = 0;
  const token = location.state.token;
  const hiveID = location.state.hiveID;
  const code = location.state.code;
  let ex1 = null;

  async function get_result() {
    axios.get("/api/v1/getPendingMatchingGroupRecommendations",
      {
        params: {
          hiveID: hiveID
        },
        headers: {
          'x-auth-token': token
        }
      }).then(res => {
        if (res.status === 200) {
          ex1 = res.data.recommendations
          get_options();
        }
      })
  }

  async function get_options() {
    const recommendations = ex1;
    let i = 0;
    let users_array = [];
    let matchingGroupIDArray2 = [];
    let matchingGroupID = 0;
    let configOptionsResponses = [];
    let newDisplayComponents = "";
    //"code": "694449"
    axios.get("/api/v1/getRoomConfigOptions",
      {
        params: {
          hiveID: hiveID,

        },
        headers: {
          'x-auth-token': token
        }
      }).then(res => {
        if (res.status === 200) {
          let a = res.data.questions

          recommendations.forEach((recommendation) => {
            console.log("recommendataion,", recommendation)
            let i = 0;
            let title = "";
            let explanation = "";
            let question_type = "";
            newDisplayComponents = null;
            let profile = [];
            users_array = recommendation.users;
            matchingGroupIDArray2.push(recommendation.matchingGroupID);
            configOptionsResponses = recommendation.configOptionsResponses;
            let number = 0;
            profile.push(<FakeProfileHeader list={users_array} />)
            for (let index in a) {
              index = parseInt(index)
              title = a[index].title;
              explanation = a[index].explanation;
              question_type = a[index].type;
              i = index;
              number = 1;

              if (question_type == "DROPDOWN") {
                newDisplayComponents = <DisplayDropDown array={configOptionsResponses[i]} question={"Q" + (number) + ":"} title={title} />;
              }
              else if (question_type == "MULTISELECT") {
                newDisplayComponents = <DisplayMultiselect array={configOptionsResponses[i]} question={"Q" + (index)} title={title} />;
              }
              else if (question_type == "NUMBERLINE") {
                newDisplayComponents = <ProfileNumberAnswer array={configOptionsResponses[i]} question={"Q" + (index)} />;
              }
              else if (question_type == "TIMETABLE") {
                newDisplayComponents = <DisplayTimetable arr={configOptionsResponses[i]} question={"Q" + (index)} />;
              }

              profile.push(newDisplayComponents);;
            }

            if (configOptionsResponses[i] == "") {
              console.log("skip profile")
            }
            else {
              setDisplayComponents(prevComponents => [...prevComponents, profile]);
            }
          }

          );
          SetmatchingGroupIDArray(matchingGroupIDArray2);

          setup_index = 1;
        }
      });
  }

  useEffect(() => {
    get_result();
  }, [])

  useEffect(() => {
  }, [current_profile_index])

  useEffect(() => {
    if ((current_profile_index + 1 > displayComponents.length) && (displayComponents.length >= 1)) {
      navigate("/WaitingP2Attendee", {
        state: {
          token: token,
          hiveID: hiveID,
          code: code
        }
      })
    }
  }, [current_profile_index])

  return (
    <>
      <div className="grid">
        <div className="left">
          <img src={hives} alt="" />
        </div>
        <div className="right"  >
          <Navbar token={token} />
          <div className="config" style={{
            border: "1px solid #FFAF40",
            borderRadius: "8px", overflow: "auto", height: "300px", width: "436px", backgroundColor: "whitesmoke"
          }}>
            <div  >{displayComponents[current_profile_index]}</div>

          </div>
          <div style={{ position: "relative", left: "8%", padding: "30px" }} >
            <ResponseButtons Setcurrent_profile_index={Setcurrent_profile_index} current_profile_index={current_profile_index}
              hiveID={hiveID}
              matchingGroupIDArray={matchingGroupIDArray}
              token={token} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tinder;