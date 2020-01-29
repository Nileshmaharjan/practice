const mongoose = require('mongoose');

const petSizesSchema = new mongoose.Schema({
        title:{type:String,required:true},
        description:{type:String},
        status:{type:Boolean,default:true},

},{
    timestamps:true
});

const petSizes = mongoose.model('petSizes',petSizesSchema);
module.exports = petSizes;