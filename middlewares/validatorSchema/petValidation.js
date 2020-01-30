const Joi = require('joi');
const JoiObjectId = require('joi-mongodb-objectid');
const joi = Joi.extend(JoiObjectId);
const enumVariables = require('../../config/enumVariables');

module.exports = {
    validationSchemas: {
        createPetProfileSchema: joi.object().keys({
            name: joi.string().trim().required().label('Name'),
            nickName: joi.string().empty('').label('Nick Name'),
            petType:joi.string().required().label('Pet Type'),
            breed:joi.string().required().label('Breed'),
            isPurebred:joi.boolean().label('Is pureBread'),
            petSize:joi.string().label('Pet Size'),
            birthDate:joi.string().empty('').regex(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)
                .label('Birth date')
                .error(errors => {
                    return {
                        message: "Birth date should be in DD/MM/YYYY format"
                    };
                }),
            gender:joi.any().valid([enumVariables.gender]).label('Gender'),
            colour:joi.array().items().required().empty('').label('Base colour'),
            likes:joi.array().items().empty('').empty('').label('Likes'),
            disLikes:joi.array().items().empty('').label('Dislikes'),
            favouritePlace:joi.string().empty('').max(500).label('Favourite place'),
            traits:joi.string().empty('').max(200).label('Traits'),
            description:joi.string().empty('').max(500).label('Description'),
            isLost:[true,false],
            lostDetail:joi.object().when('isLost',{is:true,then:joi.required()})

        })
}
}