const { isEmail, isLength } = require('validator');
const jwt = require('jwt-simple');
const { User } = require('./../models');
const { secret } = require('./../config');



function tokenForUser(user) {
    // We are going to call jwt.encode
    // takes 2 params
    //1st is the information that we want to encode
    //2nd is the sercret we are going to use to encrypt it
    // create a time stamp for the toke IAT(IssuedAtTime)
    const timeStamp = new Date().getTime();
    return jwt.encode({ sub: user._id, iat: timeStamp }, secret)
}

module.exports = {
    signup: async (req,res) => {
     const { email, password } = req.body;
     
     if(!email || !password) {
         return res.status(400).json({ error: 'You must provide an email and password' });
     }
     if(!isEmail(email)) {
         return res.status(403).json({ error: 'You must provide a valid email address' });
     }
     if(!isLength(password, { min: 6 })) {
         return res.status(403).json({ error: 'Your password must at least be 6 characters long'});
     }

     try {
        const existingUser = await User.findOne({ email });
        if(existingUser) { return res.status(401).json({ error: 'Email address already taken'})}
        const user = await new User({email, password }).save();
        return res.status(200).json({ token: tokenForUser(user) });
     } catch(e) {
        return res.status(403).json({ e });
     }

    },
};