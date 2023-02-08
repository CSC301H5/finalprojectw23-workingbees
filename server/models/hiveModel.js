import mongoose from 'mongoose';

const hiveModel = mongoose.Schema({
    hiveID: String,
    name: String,
    code: String,
    hostID: String,
    attendeeIDs: Array, // of strings
    groupIDs: Array, // of strings
    swarmIDs: Array, // of strings
    phase: Number,
    configOptions: String // stringify json object.
});

const HiveModel = mongoose.model('Hive', hiveModel);

export default HiveModel