const mongoose = require('mongoose');


const memberSchema = mongoose.Schema({
    mid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    org_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Orgs'
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model('Member', memberSchema);