import axios from 'axios';
import { useState, useEffect } from 'react';

function StatusIndicator({ name }) {


  const [groupMembers, setGroupMembers] = useState([]);
  const [leaderName, setLeaderName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Make GET request to API endpoint
    axios.get('/api/v1/getMatchingGroup', {
      params: {
        hiveID: '63e1bb9327ffe3d01689a801'
      }
    })
      .then(response => {
        // Extract group members and leader from response
        const { leaderName, members } = response.data;
        setLeaderName(leaderName);
        setGroupMembers(members);
      })
      .catch(error => {
        // Handle error
        setError(error.response.data.msg);
      });
  }, []);

  if (error) {
    // Render error message if there was an error
    return <div>{error}</div>;
  }

  // Render status indicator for each group member
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#F6F6F6',
        borderRadius: '8px',
        width: '450px',
        margin: '10px',
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: '#FFAF40',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '10px',
        }}
      >
        <span style={{ fontWeight: 'bold' }}></span>
      </div>
      <div style={{ fontWeight: 'bold' }}>
        {name}
        {leaderName === name ? (
          <img
            src="../Assets/leader.png"
            alt="teamleader"
            style={{ marginLeft: '200px' }}
          />
        ) : (
          <span
            style={{
              fontWeight: 'bold',
              color: '#FFAF40',
              marginLeft: '200px',
            }}
          >
            {groupMembers.includes(name) ? 'Group Member' : 'Not a Member'}
            
          </span>
        )}
      </div>
    </div>
  );
}

export default StatusIndicator;