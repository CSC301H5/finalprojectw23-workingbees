import mongoose from 'mongoose';

const matchingGroupModel = mongoose.Schema({
    hiveID: String,
    groupID: String, // matches mongoose document's _id
    leaderID: String, // "leader" of the group (can invite)
    memberIDs: { 
        type: Array, // of strings
        default: []
    },
    outgoingInvites: { 
        type: Array,  // of strings, containing userIDs of the users that have been invited to this group.
        default: []
    }, 
    hiveConfigResponses: {
        type: Array, // of responses (strings, numbers, and arrays)
        default: []
    },
    recommendedPending: {
        type: Array, // of objects, which store: matchingGroupID, score
        default: []
    },
    recommendedResponses: {
        type: Array, // of objects, which store: matchingGroupID, score, response
        default: []
    }
});

const MatchingGroupModel = mongoose.model('MatchingGroup', matchingGroupModel);

export default MatchingGroupModel