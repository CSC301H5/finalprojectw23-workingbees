import axios from 'axios';
import { useState, useEffect } from 'react';
function NameList({auth}){
    
    axios.post('/api/v1/sendInvite', {hiveID, username: username}, {
        headers: {
           'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDAxNWNjZTExMjNkMzdhZGY4MTRlYmQiLCJpYXQiOjE2Nzc4MTA4OTQsImV4cCI6MTY4MDQwMjg5NH0.7-ToaR8-KBHJQFF-MQpMexoV4r3lVh3Fw3cCc6AgFOc',
        },
      })
      .then((res) => {
        if (res.status === 200) {
            const nameList = groupMembers.map( name =>  <div
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
              </div>)
            return ( nameList
              );

        }
      })
      .catch((err) => {
        // Handle error response
        console.log('error for /api/v1/sendInvite')
      });
    
  }
  export default NameList