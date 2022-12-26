const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const loginModel = require('../models/loginModel');
const signupModel = require('../models/signupModel');
mongoose.set('strictQuery', true);

const login = express.Router();

//get request 

login.get('/getlogindetails', async(request, response) => {
    const getloginDetails = await loginModel.find({});
    try {
        response.status(200).send(getloginDetails);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

//post details:

login.post("/postlogindetails", async(request, response, next) => {
    const postLoginDetails = await loginModel({
        username: request.body.username,
        password: request.body.password
    });
    try {
        let user = await signupModel.findOne({ username: request.body.username });
        if (!user) {
            response.status(401).send("user not found");
            return
        } else {
            user.checkpassword(request.body.password, (error, result) => {
                if (error) {
                    console.log(`printing error ${error.message} `);
                    return next(error);
                }
                if (result) {
                    console.log("login successfull", result);
                    postLoginDetails.save();
                    response.status(201).send(postLoginDetails);
                } else {
                    console.log("invalid password");
                    return response.status(400).send("password is invalid");
                }
            });
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
})

//connection between mongoose and mongoDB:
const client = mongoose.connect("mongodb+srv://Aditya:SQJwLBgp8S9Vvm6w@cluster0.bzxsae9.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`mongoose login connection sucessfull !!`);
}).catch((error) => {
    console.log(`mongoose login connection error occured`);
})

module.exports = login;