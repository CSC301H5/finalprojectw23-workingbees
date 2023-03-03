import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PendingInvitesList = () => {
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await axios.get('/api/v1/getIncomingInvites', {
 
            headers: {
              'x-auth-token': "x-auth-token"
            },          
      
          data: {
            hiveID: "63e1bb9327ffe3d01689a801",
          },
        });

        setInvites(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInvites();
  }, []);

  return (
    <div>
      <h2>Pending Invites</h2>
      <ul>
        {Object.entries(invites).map(([leaderName, matchingGroupID]) => (
          <li key={matchingGroupID}>{leaderName}</li>
        ))}
      </ul>
    </div>
        );
};

export default PendingInvitesList;