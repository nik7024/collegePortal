const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        Required: true,
    },
    Lastname: {
        type: String,
        Required: true,
    },
    Username: {
        type: String,
        Required: true,
    },
    Email: {
        type: String,
        Required: true,
    },
    Address: {
        type: String,
        Required: true,
    },
    Address2: {
        type: String,
        Required: true,
    },
    Phone: {
        type: String,
        Required: true,
    },
    Country: {
        type: String,
        Required: true,
    },
    State: {
        type: String,
        Required: true,
    },
    user_id: {
        type: String,
        Required: true,
    },
    
}, { timestamps: true });

const CourseModel = mongoose.model('course', courseSchema)
module.exports = CourseModel