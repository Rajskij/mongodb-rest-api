import mongoose from "mongoose";

const user = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    email: {
        type: String,
        // custom message
        required: [true, "Email is require"],
        // custom validator
        validate: {
            validator: () => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
            },
            message: 'Email is not a valid!'
        }
    },
    role: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: 'N/A'
    },
    // custom field
    fullName: { 
        type: String,
        get: () => {
            return `${firstName} ${lastName}`
        },
        set: (value) => {
            const parts = value.split(' ');
            this.firstName = parts[0];
            this.lastName = parts[1];
        }
    }
});

export default mongoose.model('User', user);
