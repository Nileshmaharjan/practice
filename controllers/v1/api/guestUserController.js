const userModel = require('../../../models/users');
const deviceModel = require('../../../models/devices')
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const apiMessage = require('../../../constants/lang')
const emailModule = require('../../../modules/mailerModule');
const {signAccessToken, signRefreshToken} = require('../../../modules/jwtToken');
const {JWT_ACCESS_TOKEN_LIFE} = require('../../../config/index')

module.exports = {
    register: async (req, res, next) => {
        try {
            var {email, userName, password, firstName, lastName, phoneCode, countryCode, contactNumber} = req.body;
            let verificationUniqueId = uuidv1();
            let signUpSuccessMessage = '';
            let sendVerificationEmail = true;
            let createUserObj = {
                firstName: firstName,
                lastName: lastName,
                fullName: `${firstName} ${lastName}`,
                email: email,
                userName: userName,
                password: password, 
                phoneCode: phoneCode,
                countryCode: countryCode,
                contactNumber: contactNumber,
                codeContactNumber: phoneCode + contactNumber,
                emailVerificationId: verificationUniqueId,
                emailVerifiedAt: ''
            }

            const createUser = new userModel(createUserObj);
            await createUser.save();

            if(sendVerificationEmail) {
                let emailObj = {
                    emailTo: email,
                    subject: 'Email Verification',
                    templateName: 'verificationTemplate',
                    emailObjVariables: {
                        userName: firstName

                    }
                }
            

            // emailModule.triggerEmail(emailObj)
            signUpSuccessMessage = apiMessage.REGISTER.REGISTER_SUCCESS.message;
            res.status(apiMessage.REGISTER.REGISTER_SUCCESS.httpCode).json({
                message: signUpSuccessMessage
            })
        }

        } 
        catch (e) {
            console.log(e)
            next(e)
        }
    },

    signIn: async(req, res, next) => {
        const {deviceId, deviceToken} = req.body;
        const user = req.user;
        console.log()
        try {
            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);

            const oldDevice = await deviceModel.findOne({deviceId});
            if (oldDevice) {
                await oldDevice.updateOne({
                    user: user._id,
                    accessToken,
                    refreshToken,
                    expiredAt: 0
                }, {new: false}).exec()
            } else {
                const newDevice = new deviceModel({
                    user: user._id,
                    deviceId,
                    deviceToken,
                    accessToken,
                    refreshToken
                });
                await newDevice.save();
            }

            let profile = await userModel.profileById(user._id);
            profile = profile.toObject();
            res.set('accessToken',accessToken);
            res.set('refreshToken',refreshToken);
            res.set('expiresIn',JWT_ACCESS_TOKEN_LIFE);
            res.status(apiMessage.SUCCESS.httpCode).json({
                message: apiMessage.SUCCESS.message,
                data: {
                    ...profile,
                    tokenData:{
                        accessToken,
                        refreshToken,
                        expiresIn: JWT_ACCESS_TOKEN_LIFE
                    }
                }
            });
        }
        catch(e) {
            next(e)
        }
    },
    
    test: async(req, res, next) => {
        try {
            res.status(200).json({
                message: 'Success'
            })
        }
        catch(e) {
            next(e)
        }
    }
} 