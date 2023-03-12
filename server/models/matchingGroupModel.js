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
        type: Array,  // of Strings, containing userIDs of the users that have been invited to this group.
        default: []
    }, 
    hiveConfigResponses: {
        type: Array, // of responses (strings, numbers, and arrays)
        default: []
    },
    recommendedPending: {
        type: Array, // of matchingGroupIDs (strings)
        default: []
    },
    recommendedResponses: {
        type: Array, // of matchingGroupIDs (strings)
        default: []
    }
});

const MatchingGroupModel = mongoose.model('MatchingGroup', matchingGroupModel);

export default MatchingGroupModel