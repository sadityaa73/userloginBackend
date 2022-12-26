const mongoose = require('mongoose');

//creating Schema for login:
const login = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const loginModel = new mongoose.model("loginModel", login);

module.exports = loginModel;