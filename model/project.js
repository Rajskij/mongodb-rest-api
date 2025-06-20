import mongoose from "mongoose";

const project = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now
    },
    end_date: {
        type: Date,
        required: true
    }
});

export default mongoose.model('Project', project)
