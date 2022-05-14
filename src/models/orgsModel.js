const mongoose = require('mongoose');


const orgsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add organization name.']
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('Orgs', orgsSchema);