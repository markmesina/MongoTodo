const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { secret } = require('./../config');

const User = require('./../models/user');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secret,
};

const jwtAuth = new JwtStrategy(jwtOptions, async(payload,done) => {
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

passport.use(jwtAuth);