import mongoose from 'mongoose';

const matchingGroupModel = mongoose.Schema({
    hiveID: String,
    groupID: String, // matches mongoose document's _id
    memberIDs: { 
        type: Array, //of strings
        default: []
    },
    leaderID: String, // "leader" of the group (can invite)
    outgoingInvites: { 
        type: Array,  // of Strings, containing userIDs of the users that have been invited to this group.
        default: []
    }, 
    hiveConfigResponses: { // JSON string of responses.
        type: String,
        default: ""
    }
});

const MatchingGroupModel = mongoose.model('MatchingGroup', matchingGroupModel);

export default MatchingGroupModel