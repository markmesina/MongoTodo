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
    let salt;
    let hash;

    if (user.isModified('password')) {
        try {
            salt = await bcrypt.genSalt();
            hash = await bcrypt.hash(user.password, salt);
        } catch (e) {
            next(e);
        }
    }
    console.log(salt);
    console.log(hash);
    // this will overwrite the plain text password wiht our hash
    user.password = hash;
    console.log(user.password)
    //finally call save
    next();
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