const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('comment', CommentSchema);