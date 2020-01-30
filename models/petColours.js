const mongoose = require('mongoose');

const petColoursSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String},
    status:{type:Boolean,default:true},

},{
    timestamps:true
});

const petColors = mongoose.model('petColors',petColoursSchema);
module.exports = petColors;