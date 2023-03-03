import mongoose from 'mongoose';

const attendeeModel = mongoose.Schema({
    hiveID: String,
    userID: String,
    name: String,
    biography: String,
    profilePicture: String, // base64 encoded string
    groupID: String,
    swarmID: String,
    recommendedPending: Array, // of userIDs (strings)
    recommendedResponses: Array // of userIDs (strings)
});

const AttendeeModel = mongoose.model('Attendee', attendeeModel);

export default AttendeeModel