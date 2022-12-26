const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//creating Schema for signup:

const signup = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        min: 10,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

signup.pre('save', function(next) {
    if (this.pasword || this.isModified) {
        bcrypt.hash(this.password, 10, (error, hash) => {
            if (error) return next(new Error);
            this.password = hash;
            next();
        })
    }
});

signup.methods.checkpassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, result) => {
        return cb(err, result);
    })
}

const signupModel = new mongoose.model("signupModel", signup);

module.exports = signupModel;