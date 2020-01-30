const mongoose = require('mongoose');
const schema = mongoose.Schema;

const deviceSchema = new schema({
    id: {
        type: String
    },
    user: { type: 'ObjectId', ref: 'User' },
    deviceId: {
        type: String,
        required: true
    },
    deviceToken: {
        type: String,// used for push notification
    },
    accessToken: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    },
    expiredAt: {
        type: Number,
        default: 0 //for not expired and greater than 0 for expired
    }
}, { autoCreate: true, timestamps:true } );


const deviceModel = mongoose.model('devices', deviceSchema );

module.exports = deviceModel;