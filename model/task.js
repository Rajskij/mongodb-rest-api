import mongoose from 'mongoose';

const task = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['ToDo', 'InProgress', 'Testing', 'Done'],
        default: 'ToDo',
        required: true
    },
    assigned_to: String,
    project_id: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
    }
});

export default mongoose.model('Task', task);
