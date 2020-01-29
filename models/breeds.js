const mongoose = require('mongoose');
const enumVariables = require('../config/enumVariables');

const breedsSchema = new mongoose.Schema({
        title:{type:String,required:true},
        description:{type:String},
        status:{type:Number,enum:enumVariables.petBreedStatus,default:enumVariables.petBreedStatus[1]},
    },{
        timestamps:true
    });

const breedModel = mongoose.model('breeds',breedsSchema);
module.exports = breedModel;