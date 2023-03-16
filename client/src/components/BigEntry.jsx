import React from 'react';

const BigEntry = ({ name, pictureUrl=null }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', borderColor: '#FFAF40', borderBottom: "solid #FFAF40", backgroundColor:'#F6F6F6' }}>
      {pictureUrl ? (
        <img src={pictureUrl} alt={name} style={{width: '50px', height: '50px', borderRadius: '50%', marginRight: '20px'}} />
      ) : (
        <div style={{width: '50px', height: '50px', display: 'flex', borderRadius: '50%', backgroundColor: '#FFAF40', marginRight: '20px'}}></div>
      )}
      <p style={{display: 'inline-block', textAlign: 'center', paddingRight: '40px', fontFamily: 'Montserrat'}}>{name}</p>
      <p style={{display: 'inline-block', textAlign: 'center', paddingRight: '20px', fontFamily: 'Montserrat'}}>{name}</p>

    </div>
  );
}

export default BigEntry;

