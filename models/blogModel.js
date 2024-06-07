const {Schema, model} = require('mongoose');

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    body: {
        type: String,
        required: [true, 'Body is required'],
    },
    coverImageURL: {
        type: String,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    },
    {
        timestamps: true,
    })

module.exports = model('Blog', blogSchema);