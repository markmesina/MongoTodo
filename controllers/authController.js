const { User } = require('./../models');
const { isEmail, isLength } = require('validator');

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
    },
};