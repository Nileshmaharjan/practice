const userModel = require('../../../models/users');
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const apiMessage = require('../../../constants/lang')
const emailModule = require('../../../modules/mailerModule')

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
            

            emailModule.triggerEmail(emailObj)
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