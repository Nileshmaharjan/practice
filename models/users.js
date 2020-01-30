const  mongoose = require('mongoose');
const enumVars = require('../config/enumVariables');
const moment = require('moment');
const bcryptNodeJs = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:String,
    fullName:String,
    profilePhoto:String,
    description:String,
    homeAddress:{type:Object},
    postCode:String,
    phoneCode:{type:String,required:true},
    countryCode:{type:String,required:true},
    contactNumber:{type:String,required:true},
    codeContactNumber:{type:String,required:true,unique:true},
    registeredFrom:{type:String,required:true,enum:enumVars.registeredFrom,default:'APP'},
    hasPetProfile:{type:Boolean,required:true,default:false},
    followedBy:{type:Array},
    status:{type:Number,enum:enumVars.userStatus,default:0},
    tcUpdatedAt:{type:Number,default:moment.utc()},
    emailVerifiedAt:{type:Number,default:''},
    role:{type:String,enum:enumVars.userRole,default:'user'},
    emailVerificationId:{type:String},
    isContactNumberVerified:{type:Boolean,default:false},
    contactNumberVerifiedAt:{type:Number,default:''},
    fbId:{type:Number,default:''},
    passwordToken:{
        type:String,
        default:''
    },
    passwordTokenExpiry:{
        type:Number,
        default:0
    }

},{
timestamps:true
});

userSchema.pre("save", async function(next) {
    const salt = await bcryptNodeJs.genSaltSync(10);

    this.password = await bcryptNodeJs.hashSync(this.password, salt);

    next();
});

userSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcryptNodeJs.compareSync(newPassword, this.password)
    }
    catch(error){
        throw new Error(error.message)
    }
}

userSchema.statics.profileById = async function(userId){
    let project = 'email userName fbId firstName lastName fullName profilePhoto description homeAddress postCode countryCode ' +
        'contactNumber codeContactNumber registeredFrom hasPetProfile tcUpdatedAt followedBy isContactNumberVerified';
    //'-__v -password -passwordToken -passwordTokenExpiry'
    return await this.findById(userId, project ).exec();
};

const users = mongoose.model('users', userSchema);                                                             
module.exports = users;