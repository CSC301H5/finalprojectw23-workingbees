import mongoose from 'mongoose';

const attendeeModel = mongoose.Schema({
    hiveID: String,
    userID: String,
    name: String,
    biography: String,
    profilePicture: String, // base64 encoded string
    groupID: String,
    swarmID: String,
    pendingInvites: Array, // of strings of matchingGroupsIDs that have sent invites to this attendee. 
});

const AttendeeModel = mongoose.model('Attendee', attendeeModel);

export default AttendeeModel