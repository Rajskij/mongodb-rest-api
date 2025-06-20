import mongoose from "mongoose";

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: 'N/A'
    }
});

export default mongoose.model('User', user);
