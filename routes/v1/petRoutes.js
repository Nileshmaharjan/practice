const router = require('express-promise-router')();
const {validationSchemas} = require('../../middlewares/validatorSchema/petValidation')
const {validateBody, requireJsonContent} = require('../../middlewares/route/validator')
const {passportJWT} = require('../../middlewares/auth/passport')
const petController = require('../../controllers/v1/api/petController');

// router.route('/createProfile').post(passportJWT, requireJsonContent, validationSchemas.createPetProfileSchema, petController.createPetProfile);

router.route('/createProfile').post(passportJWT, requireJsonContent, validateBody(validationSchemas.createPetProfileSchema),petController.createPetProfile);
router.route('/updatePetPhoto').patch(passportJWT, requireJsonContent, validateBody(validationSchemas.updatePetProfile), petController.updatePetProfilePhoto);


module.exports = router;