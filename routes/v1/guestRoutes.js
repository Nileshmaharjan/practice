const router = require('express-promise-router')();
const UsersController = require('../../controllers/v1/api/guestUserController')
const {validationSchemas} = require('../../middlewares/validatorSchema/userValidation')
const {validateBody, requireJsonContent} = require('../../middlewares/route/validator')

router.route('/register').post(requireJsonContent, validateBody(validationSchemas.registerSchema),UsersController.register)
router.route('/test').get(UsersController.test)

module.exports = router;