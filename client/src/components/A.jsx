import React from 'react';

const CircleWithName = ({ name, pictureUrl=null }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center',  backgroundColor:'#F6F6F6' }}>
      {pictureUrl ? (
        <img src={pictureUrl} alt={name} style={{width: '50px', height: '50px', borderRadius: '50%', marginRight: '20px'}} />
      ) : (
        <div style={{width: '20px', height: '20px', display: 'flex', borderRadius: '50%', backgroundColor: '#FFAF40', marginRight: '20px'}}></div>
      )}
      <p style={{display: 'inline-block', textAlign: 'center', paddingRight: '100px', fontFamily: 'Montserrat'}}>{name}</p>
      <p style={{display: 'inline-block', textAlign: 'center', fontFamily: 'Montserrat'}}>{name}</p>

    </div>
  );
}

export default CircleWithName;
