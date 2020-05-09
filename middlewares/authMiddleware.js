const passport = require('passport');

//tell passport to look for a "jwt" strategy that we defined

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = {
    requireAuth
}

