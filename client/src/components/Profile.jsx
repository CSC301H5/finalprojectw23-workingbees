import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';
import Avatr from "react-avatar-edit"
import hives from '../Assets/hives.png'
import "./Style.css"
const Profile = () => {
  const {state} = useLocation();
  //const { roomCode } = state;    

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, description, preview });
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
  <div class='grid'>
    <div class='left'>
		</div>
    <div class='right'>
    <form onSubmit={handleSubmit} >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , position: 'absolute', top: '85px',left: '700px',}}>
       
        
      <Avatr width={400}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        src ={src}
        />
        </div>    </form>


        <label className="display" style={{top: '385px',left: '700px', width: '300px', height: '20px'}}>Help others identify you </label>

         <input class='textBox' 
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Display name"
          style={{  
           textAlign: 'center',
           position : 'absolute',
           top:'407px',
           left:'695px',
            width: '426px',
            height: '50px',
            fontSize: '20px',
            padding: '10px',
            marginBottom: '10px'
          }}
         />
         <label className="display" style={{top: '485px',left: '650px', width: '300px', height: '20px'}}>Tell others about yourself </label>
        <textarea  
          rows="4" 
          cols="50" 
          style={{ position: 'absolute ',   top:'507px',  left:'650px', resize: 'none', height:'120px',width:"550px"}}
        class='multiline-textbox'  
          
        placeholder="Type your message here..." />
        <button type="submit" style={{position: 'absolute ', left : '1017px', top: '669px'}}>Continue</button>

    </div>
</div>
  );
};

export default Profile;
