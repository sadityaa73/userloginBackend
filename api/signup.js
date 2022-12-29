const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const signupModel = require('../models/signupModel');
mongoose.set('strictQuery', true);

const signup = express.Router();

//get  request

signup.get('/getusersignupdetails', async(request, response) => {
    const userDetails = await signupModel.find({});
    try {
        response.status(200).send(userDetails);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

//post request 

signup.post('/postusersignupdetails', async(request, response) => {
    const postUserData = await signupModel({
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        mobile: request.body.mobile,
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    });
    try {
        let data = await postUserData.save();
        response.status(201).send(data);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

// get request for find profile by id :

signup.get('/finduserprofilebyid/:username', async(request, response) => {
    let username = request.params.username;
    const userProfile = await signupModel.findOne({ username: username });
    try {
        response.status(200).send(userProfile);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

//patch request for reset password:

signup.patch('/updateuserpassword', async(request, response) => {
    let _id = request.body._id;
    console.log(_id);
    let newPassword = request.body.password;
    console.log(`printing new password${newPassword}`);
    let hashPassword = await bcrypt.hash(newPassword, 10);
    console.log(hashPassword);
    let resetPassword = await signupModel.findByIdAndUpdate(_id, { password: hashPassword });
    try {
        console.log(resetPassword)
        response.status(201).send(resetPassword);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

//connection between mongoose and mongoDB:

const client = mongoose.connect("mongodb+srv://Aditya:SQJwLBgp8S9Vvm6w@cluster0.bzxsae9.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`mongoose signup connection sucessfull !!`);
}).catch((error) => {
    console.log(`mongoose signup connection error occured${error.message}`);
})

module.exports = signup;