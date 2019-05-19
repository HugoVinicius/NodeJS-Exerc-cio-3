const mongoose = require('mongoose')
const db = require('./Connection');

const commentSchema = new mongoose.Schema({
    author: {
        type: String
    },
    comment: {
        type: String
    },
    id_produto:{
        type: String
    }
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
