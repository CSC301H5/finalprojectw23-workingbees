import React, { useState } from 'react';
import hives from '../Assets/hives.png'
import axios from 'axios';
import "./Style.css";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import DisplayTimetable from './DisplayTimetable';
import ResponseButtons from './ResponseButtons';
import DropdownQuestion from './DropdownQuestion';
import ClientCalendar from "./ClientCalendar"
import ClientDropdown from "./ClientDropdown"
import ClientMultiselect from "./ClientMultiselect"
import ClientSlider from "./ClientSlider"
import DisplayMultiselect from './DisplayMultiselect';
import DisplayDropDown from './DisplayDropdown';

const TinderProfile = () => {
  const [roomCode, setRoomCode] = useState('');
  const [token, setToken] = useState('')
  const navigate = useNavigate();

 
  return (
    <>
    <div overflow='auto' >
        < Navbar/>
        < DisplayMultiselect array={["option1", "option3","ere"]}/>
        < DisplayDropDown array={["D"]}/>
    
       </div>
    </>
  );

};

export default TinderProfile;
