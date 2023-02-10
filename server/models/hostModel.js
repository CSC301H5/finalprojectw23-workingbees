import mongoose from 'mongoose';

const hostModel = mongoose.Schema({
    hiveID: String,
    userID: String,
    name: String,
    profilePicture: String // base64 encoded string
});

const HostModel = mongoose.model('Host', hostModel);

export default HostModel