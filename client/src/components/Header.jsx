import React, { useState } from 'react';
import leftContinue from '../Assets/leftContinue.png'
import rightContinue from '../Assets/rightContinue.png'

const ProfileHeader = ({ list = [{ "name": "Bee1", "biography": "hi", "profilePicture": null }, { "name": "Bee2", "biography": "hi", "profilePicture": null }]
  , hiveID }) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [displayName, getUserDisplayName] = useState(list[currentUserIndex].name);
  const [biography, getUserBiography] = useState(list[currentUserIndex].biography);
  const [profilePicture, getUserProfilePicture] = useState(list[currentUserIndex].profilePicture);

  const handleClickLeft = e => {
    console.log('leftclicked')
    if (currentUserIndex !== 0) {
      setCurrentUserIndex((currentUserIndex - 1));
      getUserDisplayName(list[currentUserIndex].name);
      getUserBiography(list[currentUserIndex].biography);
      getUserProfilePicture(list[currentUserIndex].profilePicture);
    }
  };

  const handleClickRight = e => {
    console.log('rightclicked')

    if (currentUserIndex !== list.length - 1) {
      setCurrentUserIndex((currentUserIndex + 1));
      getUserDisplayName(list[currentUserIndex].name);
      getUserBiography(list[currentUserIndex].biography);
      getUserProfilePicture(list[currentUserIndex].profilePicture);
    }
  };

  return (
    <div className="entryWrapper">
      {profilePicture ? (
        <img src={`data:image/jpeg;base64,${atob(profilePicture)}`}
          alt={displayName}
          style={{ width: '76px', height: '76px', borderRadius: '50%', marginRight: '10px', marginLeft: '10px', cursor: 'pointer' }}
        />
      ) : (
        <div style={{ width: '76px', height: '76px', borderRadius: '50%', backgroundColor: '#FFAF40', marginRight: '10px', marginLeft: '10px' }}></div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{ textAlign: 'left', fontSize: '26px', paddingRight: '40px', fontFamily: 'Montserrat', marginLeft: '10px', fontWeight: '500' }}>{displayName}</p>
        <p style={{ textAlign: 'left', paddingRight: '40px', fontFamily: 'Montserrat', marginLeft: '10px', }}>{biography}</p>
      </div>
      {list.length === 1 ? (
        <div style={{ font: '22px', color: '#FFAF40', fontFamily: 'Montserrat', padding: '20px', fontWeight: '700' }}>SOLO</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', rowGap: '30px' }}>
          <div style={{ font: '22px', fontFamily: 'Montserrat', color: '#FFAF40', fontWeight: '700' }}> Team </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '30px' }}>
            <div onClick={handleClickLeft}><img src={leftContinue} alt='left' style={{ width: '30px', height: '30px' }} /></div>
            <div onClick={handleClickRight}><img src={rightContinue} alt='right' style={{ width: '30px', height: '30px' }} /></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader