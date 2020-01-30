const petModel = require('../../../models/pets');
const apiMessage = require('../../../constants/lang')

module.exports = {
    createPetProfile: async (req, res, next) => {
        try {
            console.log(req.body)
            let petObject = req.body;
            petObject.user = req.user._id;
            petObject.favouritePlace = {address: req.body.favouritePlace, lat: "to find", lng: "to find"};
            let createPet = new petModel(petObject);
            await createPet.save();
            res.status(apiMessage.CREATE_PET_PROFILE.SUCCESS.httpCode).json({
                petId:createPet._id,
                message: apiMessage.CREATE_PET_PROFILE.SUCCESS.message,
            });
        } catch (e) {
            next(e);
        }
    },
    
    updatePetProfilePhoto: async (req, res, next) => {
        try {
            var httpCode = "";
            var photoField = "";
            var message = "";

            if (req.body.isCoverPhoto) {
                photoField = "profilePhoto";
            } else {
                photoField = "profileCoverPhoto";
            }

            var updateObject = {
                [photoField] : req.body.url
            };
            
            let isUpdated = await petModel.findOneAndUpdate({user: req.user._id, _id: req.body.petId}, {$set: updateObject}).exec();

            if(isUpdated) {
                httpCode = apiMessage.SUCCESS.httpCode;
                message = apiMessage.SUCCESS.message;
            } else {
                httpCode = apiMessage.NO_RECORD_FOUND.httpCode;
                message = apiMessage.NO_RECORD_FOUND.message
            }
            res.status(httpCode).json({
                message: message
            });

        }
        catch (e) {
            next(e);
        }
    }
}