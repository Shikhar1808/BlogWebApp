const {Schema, model} = require('mongoose');
const User = require('./blogUserModel');
const Blog = require('./blogModel');

const commentSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Comment content is required']
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: Blog,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: User
    },
},{
    timestamps: true
})


module.exports = model('Comment', commentSchema);