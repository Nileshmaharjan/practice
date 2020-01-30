const mongoose = require('mongoose');
const enumVariables = require('../config/enumVariables');

const postCommentsSchema = new mongoose.Schema({
            post:{type:mongoose.Schema.Types.ObjectId,ref:'posts',required:true},
            commentedBy:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
            content:{type:String,required:true},
            isApproved:{type:Boolean,default:true},

},{
    timestamps :true
});

const postComment = mongoose.model('postComments',postCommentsSchema);
module.exports = postComment;