
const guestRoutes = require('./guestRoutes');
const petRoutes = require('./petRoutes');
const userRoutes = require('./userRoutes');

module.exports = function(app) {
    app.use('/v1/user', guestRoutes);
    app.use('/v1/pets', petRoutes);
    app.use('/v1/user', userRoutes)
}