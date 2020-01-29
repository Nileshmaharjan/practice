const mongoose = require('mongoose');
const enumVars = require('../config/enumVariables');

const lostDetail = new mongoose.Schema({
    lostDate:{type:Date,default:null},
    lostAddress:{type:String,default:null},
    hasMicroChip:{type:Boolean,default:false},
    chipBrand:{type:String,default:null,max:200},
    chipNumber:{type:String,default:null,max:200},
    hasCollar:{type:Boolean,default:false},
    collarDetail:{type:String,default:null,max:500},

});


const petSchema = new mongoose.Schema({
user:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
name:{type:String,required:true},
nickName:{type:String,default:null},
profilePhoto:{type:String,default:null},
profileCoverPhoto:{type:String,default:null},
petType:{type:mongoose.Schema.Types.ObjectId,ref:'petTypes'},
breed:{type:mongoose.Schema.Types.ObjectId,ref:'breeds'},
isPurebred:{type:Boolean,default:true},
petSize:{type:mongoose.Schema.Types.ObjectId,ref:'petSizes',required:true},
birthDate:{type:String,default:null},
gender:{type:String,enum:enumVars.gender,required:true},
colour:{type:Array,required:true},
likes:{type:Array,default:null},
dislikes:{type:Array,default:null},
favouritePlace:{type:Object,default:null},
traits:{type:String,default:null},
description:{type:String,default:null},
status:{type:Boolean,default:true},
isLost:{type:Boolean,default:false},
lostAt:{type:Number,default:null},
foundAt:{type:Number,default:null},
lostDetail:{lostDetail}

},{
timestamps:true
});

const pets = mongoose.model('pets',petSchema);
module.exports = pets;