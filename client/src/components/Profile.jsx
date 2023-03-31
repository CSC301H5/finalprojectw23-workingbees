import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Avatr from "react-avatar-edit"
import hives from '../Assets/hives.png'
import "./Style.css"
import Navbar from "./Navbar";
import { getCookie } from '../utils/getAuthToken';
const Profile = () => {
  const location = useLocation();
  const code = location.state.code;
  //const token = location.state.token;
  const token = getCookie("x-auth-token");
  console.log( token)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = () => {
    axios.post('/api/v1/joinHive', {
      code: parseInt(code),
      profilePicture: preview,
      displayName: name,
      biography: description
    }, {
      headers: {
        "x-auth-token": token
      }
    }).then(res => {
      if (res.status === 201) {
        const hiveID = res.data.hiveID;
        console.log("hiveID sent from Profile:", hiveID);
        navigate("/groupcreation", { state: { token, hiveID, code } });
      }
      console.log(res.data);
    }).catch(err => {
      console.error(err.response.data);
    });
  };

  const onClose = () => {
    setPreview(null);
  }

  const onCrop = view => {
    setPreview(view);
  }

  return (
    <div class='grid'>
      <div class='left'>
        <img src={hives} alt="" />
      </div>
      <div class='right'>
        < Navbar roomCode={parseInt(code)} token={location.state.token} />
        <form onSubmit={handleSubmit} >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute', top: '150px', left: '750px', }}>
            <Avatr width={300}
              height={200}
              onCrop={onCrop}
              onClose={onClose}
              src={null}
            />
          </div>
        </form>

        <label className="display" style={{ top: '385px', left: '700px', width: '300px', height: '20px' }}>Help others identify you </label>

        <input class='textBox'
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Display name"
          style={{
            textAlign: 'center',
            position: 'absolute',
            top: '407px',
            left: '695px',
            width: '426px',
            height: '50px',
            fontSize: '20px',
            padding: '10px',
            marginBottom: '10px'
          }}
        />
        <label className="display" style={{ top: '485px', left: '650px', width: '300px', height: '20px' }}>Tell others about yourself </label>
        <textarea
          rows="4"
          cols="50"
          style={{ position: 'absolute ', top: '507px', left: '650px', resize: 'none', height: '120px', width: "550px" }}
          class='multiline-textbox'
          value={description}
          onChange={e => setDescription(e.target.value)}

          placeholder="Type your message here..." />
        <button onClick={handleSubmit} type="submit" style={{ position: 'absolute ', left: '1017px', top: '669px' }}>Continue</button>

      </div>
    </div>
  );
};

export default Profile;
