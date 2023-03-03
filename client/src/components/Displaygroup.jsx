import React, { Component, useEffect, useState } from 'react';
import "./Style.css"
import StatusIndicator from "./groupmemberentry";
import Box from './box';



export default function  Displaygroup ({ roomCode })  {
    

        const [hiveName, setHiveName] = useState('')
    
      
        return (
          <div class="grid">
            <div class="right">
          
              <Box Class='box'>
        <div className='grid'>
      
            </div>
          </Box>

                <h1>{roomCode}</h1> {/* should be hiveName instead of roomCode */}
            </div>
          </div>
        )
      }
