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
    }
}