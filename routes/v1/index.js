
const guestRoutes = require('./guestRoutes');

module.exports = function(app) {
    app.use('/v1/user', guestRoutes);
}