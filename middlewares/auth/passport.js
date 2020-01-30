const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const config = require('../../config');
const userModel = require('../../models/users');
const deviceModel = require('../../models/devices');
const {LOGIN} = require('../../constants/lang');
const mongoose = require('mongoose');

passport.use('jwt', new JWTStrategy({
       // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
       jwtFromRequest: ExtractJwt.fromHeader('authorization'),
       secretOrKey: config.JWT_ACCESS_TOKEN_SECRET,
       passReqToCallback: true
}, async (req, payload, done) => {
    try {
        let accessToken = req.headers.authorization || '';
        let device = await deviceModel.findOne({accessToken: accessToken}).exec();

        if(!device) {
            let error = new Error(LOGIN.USER_NOT_FOUND.message);
            error.status = LOGIN.USER_NOT_FOUND.httpCode;
            return done(error, false);
        }

        if (device.expiredAt > 0) {
            let error = new Error(LOGIN.TOKEN_EXPIRED.message);
            error.status = LOGIN.TOKEN_EXPIRED.httpCode;
            return done(error, false)
        }

        const user = await userModel.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
            let Err = new Error(LOGIN.USER_NOT_FOUND.message);
            Err.code = Err.status = LOGIN.USER_NOT_FOUND.httpCode;
            return done(Err);
            // return done(new Error('User not found.'), false);
        }

        if( ! mongoose.Types.ObjectId.isValid(user._id) ) {
            let Err = new Error(USER.NOT_FOUND.message);
            Err.status = Err.code = USER.NOT_FOUND.httpCode;
            return next(Err);
        }

        // Otherwise, return the user
        return done(null, user);
    }
    catch (e) {
        return done(e, false)
    }
}))

// LOCAL strategy to extract and verify user name and password from request
passport.use('local', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
}, async (userName, password, done) => {
    let Err;
    try {
        // Find user with given email
        const foundUser = await userModel.findOne({$or: [{email: userName}, {userName: userName}]}).exec();

        // If not , handle it
        if (!foundUser) {
            Err = new Error(LOGIN.INVALID_USERNAME.message);
            Err.code = Err.status = LOGIN.INVALID_USERNAME.httpCode;
            return done(Err);
        }

        // Check if the password is correct
        const isMatch = await foundUser.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
            Err = new Error(LOGIN.INVALID_PASSWORD.message);
            Err.code = Err.status = LOGIN.INVALID_PASSWORD.httpCode;
            return done(Err);
        }

        // let status = foundUser.status;
        // switch (status) {
        //     case 0:
        //         Err = new Error(LOGIN.EMAIL_EXIST_NOT_VERIFIED.message);
        //         Err.code = Err.status = LOGIN.EMAIL_EXIST_NOT_VERIFIED.httpCode;
        //         return done(Err);
        //     case 2:
        //         Err = new Error(LOGIN.DISABLED_BY_ADMIN.message);
        //         Err.code = Err.status = LOGIN.DISABLED_BY_ADMIN.httpCode;
        //         return done(Err);
        //     default:
        //         break;
        // }

        done(null, foundUser);
    } catch (error) {
        done(error);
    }
}));


module.exports = {
    passportJWT: async (req, res, next) => {
        await passport.authenticate('jwt', {session: false}, function (err, user, info) {
            if(info && info.name === 'Error'){
                let Err = new Error(LOGIN.TOKEN_NOT_FOUND.message);
                Err.code = Err.status = LOGIN.TOKEN_NOT_FOUND.httpCode;
                return next(Err);
                // return next( new Error(info.message) )
            }
            if (err) {
                return next(err);
            }
            if (!user) {
                let Err = new Error(LOGIN.USER_NOT_FOUND.message);
                Err.code = Err.status = LOGIN.USER_NOT_FOUND.httpCode;
                return next(Err);
            }
            req.user = user;
            next();
        })(req, res, next)
    },
    passportSignIn: async (req, res, next) => {
        await passport.authenticate('local', {session: false}, function (err, user, info) {
            console.log(info)
            if(info && info.hasOwnProperty('message')){
                //triggers if "usernameField" field is missing
                let Err = new Error(LOGIN.CREDENTIAL_NOT_FOUND.message);
                Err.code = Err.status = LOGIN.CREDENTIAL_NOT_FOUND.httpCode;
                return next(Err);
            }
            if (err) {
                return next(err);
            }
            if (!user) {// if user is not returned by passport package
                let Err = new Error(LOGIN.USER_NOT_FOUND.message);
                Err.code = Err.status = LOGIN.USER_NOT_FOUND.httpCode;
                return next(Err);
            }
            req.user = user;
            next();
        })(req, res, next)
    },
}