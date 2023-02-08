import mongoose from 'mongoose';

const userModel = mongoose.Schema({
    userID: String,
    email: String,
    password: String, // hashed.
    hiveIDs: Array, // of ID's
    profiles: Array, // profiles they have saved that they can reuse
    isGuest: {
        type: Boolean,
        default: false
    }
});

const UserModel = mongoose.model('User', userModel);

export default UserModel