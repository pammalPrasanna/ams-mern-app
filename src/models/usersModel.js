const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name.']
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please add email']
    },
    role: {
        type: Number,
    },
    joined_on: {
        type: Date
    },
    password: {
        type: String,
        // required: [true, 'Please add password']
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('User', userSchema);