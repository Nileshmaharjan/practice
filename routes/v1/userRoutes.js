const router = require('express-promise-router')();
const userController = require('../../controllers/v1/api/userController');

router.route('/addDummyPets').get(userController.addDummyPets);

module.exports = router;