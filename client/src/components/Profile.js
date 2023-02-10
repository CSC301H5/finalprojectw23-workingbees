import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import Avatr from "react-avatar-edit"
const Profile = () => {
  const {state} = useLocation();
  const { roomCode } = state;    

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  console.log('roomcode',roomCode)
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ state, name, description, preview });
    try {
      const response =  axios.post('/api/v1/joinHive', {
        name,
        description,
        preview,
       
      });
      console.log(response.status);
    } catch (error) {
      console.error(error);
      return error.response.status;
    }
  };

    const[src, setSrc] = useState(null);
    const[preview, setPreview] = useState(null);

    const onClose =()=>{
      setPreview(null);
    }
    const onCrop = view =>{
      setPreview(view);
    }
    useEffect( () => {
      console.log(preview)
    })


  
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       
      <div>
        
      <Avatr width={400}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        src ={src}
        />
        
      </div>
         <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter name"
          style={{  
            width: '500px',
            height: '50px',
            fontSize: '20px',
            padding: '10px',
            marginBottom: '10px'
          }}
         />
         <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Enter description"
          style={{  
            width: '500px',
            height: '50px',
            fontSize: '20px',
            padding: '10px',
            marginBottom: '10px'
          }}
        />
        <button type="submit">Submit</button>
        <button onClick={() => navigate("/")}>Cancel</button>
      </div>

    </form>
    
  );
};

export default Profile;