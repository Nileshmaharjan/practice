const JWT = require('jsonwebtoken');
const {
    JWT_ACCESS_TOKEN_LIFE,
    JWT_REFRESH_TOKEN_LIFE,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_SECRET
} = require('../config/index');

module.exports = {
    signAccessToken: (user) => {
        return JWT.sign({
            iss: 'can be name or name of our server or app',
            sub: user,
            iat: new Date().getTime(),// current time
            exp: JWT_ACCESS_TOKEN_LIFE //milliseconds
        }, JWT_ACCESS_TOKEN_SECRET);
    },

    signRefreshToken: (user) => {
        return JWT.sign({
            iss: 'can be name or name of our server or app',
            sub: user,
            iat: new Date().getTime(),// current time
            exp: JWT_REFRESH_TOKEN_LIFE //milliseconds
        }, JWT_REFRESH_TOKEN_SECRET);
    }
}