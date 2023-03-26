const PostReply = require('../models/PostReply');

async function updatePostComment(commentId, update) {
    return await PostReply.findByIdAndUpdate(commentId, update, { new: true });
}

module.exports = {
    updatePostComment
}