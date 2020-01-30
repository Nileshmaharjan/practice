const mongoose = require('mongoose');
const enumVariables = require('../config/enumVariables');
const postCommentModel = require('./postComments');

const postsSchema = new mongoose.Schema({
            postedBy:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
            pet:{type:mongoose.Schema.Types.ObjectId,ref:'pets',required:true},
            checked_in:{type:Array},
            content:{type:String,required:true},
            photos:{type:Array},
            total_likes:{type:Number,default:0},
            likedBy:{type:Array},
            visibility:{type:String,enum:enumVariables.postVisibility,required:true},
            status:{type:Boolean,enum:enumVariables.postStatus},
},{
    timestamps :true
});

postsSchema.post('remove', function(doc) {
    console.log('%s has been removed', doc._id);
    postCommentModel.deleteMany({ post : doc._id }).exec();
});

const postModel = mongoose.model('posts',postsSchema);
module.exports = postModel;