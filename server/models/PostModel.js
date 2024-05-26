const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    createdBy:String,
    heading:String,
    description:String
    
},{
    timestamps:true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;