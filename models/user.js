const { Schema, model }= require('mongoose');
const { isEmail, isLength } = require('validator');
const bcrypt = require('bcryptjs');
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        validate: [isEmail, "Please enter a valid email address."],
        required: [true, "Must provide an email address"],
    },
    password:{
        type: String,
        required:[true, "Must provide a password"],
        validate:[(value) => isLength(value,{ min:6 }), "Your password must be at least 6 characters long" ],
    },
    dateCreated:{
        type: Date,
        default: Date.now()
    },
    todos: [ {type: Schema.Types.ObjectId, ref: 'Todo'} ]

}); 


UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      try {
        let salt = await bcrypt.genSalt();
        let hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        // Finally call save
        next();
      } catch (e) {
        next(e);
      }
    }
    next();
  //  overwrite the plain text password with our hash
  });

//candidatePassword is the password user provides upon sign up
UserSchema.methods.comparePassword = async function(candidatePassword) {
    const user = this;

    try {
        const isMatch = await bcrypt.compare(candidatePassword, user.password);
        return Promise.resolve(isMatch);

    } catch (e) {
        return Promise.reject(e);
    }

};

module.exports = model('User', UserSchema);