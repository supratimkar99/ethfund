const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    ProjectName: {
        type: String,
        trim: true,
        required: true
    },
    ProjectDesc: {
        type: String,
        trim: true
    },
    Website: {
        type: String,
        trim: true
    },
    ProjectAddress: {
        type: String,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model('Project', projectSchema);