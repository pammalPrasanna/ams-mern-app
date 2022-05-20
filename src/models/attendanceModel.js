const mongoose = require('mongoose');


const attendanceSchema = mongoose.Schema({
    mid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Member'
    },
    check_in: {
        type: Date,
    },
    check_out: {
        type: Date,
    },
    hours_clocked: {
        type: String,
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('Attendance', attendanceSchema);