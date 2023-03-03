import React from 'react'
import StatusIndicator from "./groupmemberentry";

function Box({ children, ...props }) {
  return <div {...props}>{children}</div>
}

export default function box() {
  return (
    <Box Class='box'>
        <StatusIndicator name="Jane Smith" status="teamleader" /> 
              <StatusIndicator name="John Doe" status="Accepted" />      
    </Box>
  )
}