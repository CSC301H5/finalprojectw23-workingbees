import { useState, useEffect } from "react"
import "./Style.css"
import axios from 'axios'

// This attendee list does not update in real time
/*
expects the following props
    - hiveID
    - token
*/

function StaticAttendeeList(props) {
    const [attendeeList, setAttendeeList] = useState([])

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
            if (res.status == 200) {
              setAttendeeList(res.data.attendeeNames)
            }
          })
      }
      useEffect(() => {
        getAttendeeList();
      }, [])

      return (
        <h1>{attendeeList}</h1>
      )


} export default StaticAttendeeList