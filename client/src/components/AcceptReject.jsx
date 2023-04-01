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
                // update pending list
                removeInvite(props.invites.indexOf(props.leaderName))
                // update members list
                addMember(props.leaderName)
            }
        })
    }

    const removeInvite = (index) => {
        const temp = [...props.invites]
        temp.splice(index, 1)
        props.setInvites(temp)
    }

    const addMember = (user) => {
        const temp = [...props.members, user]
        props.setMembers(temp)
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
        <div style={{ paddingLeft: "130px" }}>
            <img className="acceptreject"
                onClick={handleAccept}
                src={tick}
                alt="Accept invitation button"
            />
            <img className="acceptreject"
                onClick={handleReject}
                src={cross}
                alt="Reject invitation button"
            />
        </div>
    )
}
export default AcceptReject