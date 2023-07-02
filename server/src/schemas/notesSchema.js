const mongoose = require('mongoose');

let notesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('notes', notesSchema);