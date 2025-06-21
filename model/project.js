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
        required: true,
        // index within schema
        index: true
    }
});

// create index via function
project.index({ name: 1 });

export default mongoose.model('Project', project)
