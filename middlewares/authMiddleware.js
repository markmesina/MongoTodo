const passport = require('passport');

//tell passport to look for a "jwt" strategy that we defined

const requireAuth = passport.authenticate('jwt', { session: false });

//tell passport to look for a 'local' strategy that we defined
const requireSignIn = passport.authenticate('local', { session: false });
module.exports = {
    requireAuth,
    requireSignIn
}

