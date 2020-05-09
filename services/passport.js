const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const { secret } = require('./../config');

const User = require('../models/User');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secret,
};

const jwtAuth = new JwtStrategy(jwtOptions, async(payload,done) => {
    //{ sub: user._id, iat: }
    try {
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false)
        }
        return done(null,user);
    } catch (e){
        return done(e,false);
    }
});
// by default localstrategy is looking ofr a username
//however, we are not using username, we are using email address
// look for email property in the request instead
const localOptions = { usernameField: 'email' };

//create a localstrategy for users trying to sign in with email and password
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    try {
    //see if user exist
        const user = await User.findOne({ email });
    // if no user found with email, we pass null as theres no error to dome
    // we pass false as 2nd params to done cuz no user was found
        if(!user) {
            return done(null, false);
        }
        //compare the password given by the user to the encrypted password in datbase
        //bcrype will the automatically hash the given password
        // hashed password in the databas
        const isMatch = await user.comparePassword(password);
        // if password given after hashed is equal to the hashed
        //will be true, otherwise it will be false
        if(!isMatch) {
            return done(null, false);
        }
        return done(null, user);

    } 
    catch (e) {
        return done(e);
    }
});

// We are letting passport know that they can now authenticate users using 'jwt' as their string
// when they call passport.authenticate('jwt')
passport.use(jwtAuth);
// Let's passport know that when it calls passport.authenticate('local')
// to use the localLogin strategy that we defined above
passport.use(localLogin);