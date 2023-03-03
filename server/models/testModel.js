import mongoose from 'mongoose';

const testModel = mongoose.Schema({
    timestamp: {
        type: Date,
        default: new Date()
    }
});

const TestModel = mongoose.model('TestModel', testModel);

export default TestModel