const mongoose = require('mongoose');
const enumVariables = require('../config/enumVariables');

const petTypesSchema = new mongoose.Schema({
            title:{type:String,required:true},
            description:{type:String},
            breeds:{type:Array},
            status:{type:Number,enum:enumVariables.petTypeStatus,default:enumVariables.petTypeStatus[1]},
     },{
    timestamps:true
});

const petTypeModel = mongoose.model('petTypes', petTypesSchema);
module.exports = petTypeModel;