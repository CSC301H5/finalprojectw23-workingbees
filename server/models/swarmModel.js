import mongoose from 'mongoose';

const swarmModel = mongoose.Schema({
    hiveID: String,
    swarmID: String, // of strings
    memberIDs: Array, // of strings
    messages: Array // of JSON objects containing keys "sender", "message", "timestamp" as specified in docs.
});

const SwarmModel = mongoose.model('Swarm', swarmModel);

export default SwarmModel
