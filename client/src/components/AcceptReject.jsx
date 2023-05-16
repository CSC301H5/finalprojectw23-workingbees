import "../styles/Style.css"
import axios from 'axios'
import tick from "../assets/tick.jpg"
import cross from "../assets/cross.jpg"

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
                removeInvite(props.invites.indexOf(props.leaderName));
                // update members list
                updateMembers();
            }
        })
    }

    const removeInvite = (index) => {
        const temp = [...props.invites];
        temp.splice(index, 1);
        props.setInvites(temp);
    }

    const updateMembers = () => {
        axios.get("/api/v1/getMatchingGroup", {
            params: {
                hiveID: props.hiveID
            },
            headers: {
                "x-auth-token": props.token
            }
        }).then(res => {
            if (res.status === 200) {
                // Set leader
                if (res.data.leaderName === res.data.userName) {
                    props.setLeader(`You (${res.data.leaderName})`);
                } else {
                    props.setLeader(res.data.leaderName);
                }

                // Set members
                const currentMembers = [];
                for (let i = 0; i < res.data.members.length; i++) {
                    if (res.data.members[i] === res.data.userName) {
                        currentMembers.push(`You (${res.data.userName})`);
                    } else {
                        currentMembers.push(res.data.members[i]);
                    }
                }
                props.setMembers(currentMembers);
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