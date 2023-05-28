import { useEffect } from "react"
import "../styles/Style.css"
import axios from 'axios'

// This attendee list does not update in real time
/*
expects the following props
    - hiveID
    - token
    - attendeeList
    - setAttendeeList
*/

function StaticAttendeeList(props) {

  async function getAttendeeList() {
    axios.get("/api/v1/getHiveAttendeeNames",
      {
        params: {
          hiveID: props.hiveID
        },
        headers: {
          'x-auth-token': props.token
        }
      }).then(res => {
        if (res.status === 200) {
          props.setAttendeeList(res.data.attendeeNames)
        }
      })
  }
  useEffect(() => {
    getAttendeeList();
  }, [])

  return (
    <div>
    </div>
  )
}

export default StaticAttendeeList