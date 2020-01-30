const joi = require('joi');

module.exports = {
    validationSchemas: {
        registerSchema: joi.object().keys({
            firstName: joi.string().trim().max(200).required().label('First Name'),
            lastName: joi.string().max(200).required().label('Last Name'),
            phoneCode: joi.string().trim().required().regex(/^(\+?\d{1,3}|d{1,4})$/).label('Phone Code'),
            countryCode: joi.string().max(4).required().label('Country Code'),
            contactNumber: joi.string().required().regex(/^(\d{10})$/).label('Contact Number')
                .error(errors => {
                    return {
                        message: "Contact Number must contain ten digits"
                    }
                }),
            email: joi.string().required().email({minDomainAtoms: 2}).label('Email'),
            password: joi.string().trim().required().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
            .error(errors => {
                return {
                    message: "Password should contain at least one letter, one number, one special character and should not less than eight character."
                };
            }),
            userName: joi.string().trim().required().min(6).max(200).label('User Name'),

        }),
        loginSchema: joi.object().keys({
            userName: joi.string().trim().required(),
            password: joi.string().trim().required(),
            deviceId: joi.string().trim().required().label('Device ID'),
            deviceToken: joi.string().trim().required().label('Device Token'),
        }),
    }
}