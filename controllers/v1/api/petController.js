const petModel = require('../../../models/pets');
const apiMessage = require('../../../constants/lang');
const storyModel = require('../../../models/stories');
const postModel = require('../../../models/posts');
const postCommentModel = require('../../../models/postComment');

const mongoose = require('mongoose');

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
    }, 
    remove: async (req, res, next) => {

        try {
            if (!mongoose.Types.ObjectId.isValid(req.query.petId)) {
                let Err = new Error(apiMessage.PET_REMOVE.NOT_SELECTED.message);
                Err.status = Err.code = apiMessage.PET_REMOVE.NOT_SELECTED.httpCode;
                return next(Err);
            }

            if( !pet || (req.user._id.toString() !== pet.user.toString()) ){
                let Err = new Error(PET_REMOVE.NOT_FOUND.message);
                Err.status = Err.code = PET_REMOVE.NOT_FOUND.httpCode;
                return next(Err);
            }
            await storyModel.deleteMany({pet: pet_id}).exec();
            await postModel.deleteMany({pet: pet_id}).exec();

            await postModel.find({pet: pet._id}, (err, posts) => {
                if (err) {
                    return false;
                }
                
                posts.map((post) => {
                    postCommentModel.deleteMany({post: post._id}).exec();
                    postCommentModel.remove()
                })
            }).exec();
            await pet.remove();

            res.status(apiMessage.PET_REMOVE.SUCCESS.httpCode).json({
                message: apiMessage.PET_REMOVE.SUCCESS.message,
                error: {},
                data: {}
            })

        }
        catch (e) {
            next(e);
        }
    }
}