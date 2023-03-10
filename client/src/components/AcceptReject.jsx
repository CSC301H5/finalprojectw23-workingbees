import "./Style.css"
import axios from 'axios'
import tick from "../Assets/tick.jpg"
import cross from "../Assets/cross.jpg"

// assumes token, hiveID, matchingGroupID are given
function AcceptReject(props) {

    const handleAccept = (e) => {
        e.preventDefault();
        axios.post("/api/v1/acceptInvite",
            {
                hiveID: props.hiveID,
                matchingGroupID: props.matchingGroupID
            }, {
            headers: {
                'x-auth-token': props.token
            }
        }
        ).then(res => {
            if (res.status === 200) {
                // do nothing
            }
        })
    }

    const handleReject = (e) => {
        e.preventDefault();
        axios.post("/api/v1/rejectInvite",
            {
                hiveID: props.hiveID,
                matchingGroupID: props.matchingGroupID
            }, {
            headers: {
                'x-auth-token': props.token
            }
        }
        ).then(res => {
            if (res.status === 200) {
            }
        })
    }

    return (
        <div>
            <img className="acceptreject"
                onClick={handleAccept}
                src={tick}
            />
            <img className="acceptreject"
                onClick={handleReject}
                src={cross}
            />
        </div>
    )
}
export default AcceptReject