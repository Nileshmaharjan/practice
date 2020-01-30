const mongoose = require('mongoose');
const enumVariables = require('../config/enumVariables');

const storiesSchema = new mongoose.Schema({
            postedBy:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
            content:{type:String,required:true},
            avp:{type:String,enum:enumVariables.audioVideoPhoto}

},{
    timestamps :true
});

const stories = mongoose.model('stories',storiesSchema);
module.exports = stories;