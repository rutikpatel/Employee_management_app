// Import dependencies
const express = require('express');
const User = require("../models/user");
const userService = require('../services/userServices');
const httpResponse = require('../services/httpResponse')
// Initialize router
const userRouter = express.Router();

userRouter.post('/', async function (req, res, next) {
    try {
        const user = await userService.createUser(req.body);
        httpResponse.sendSuccess(res, "User created successfully", user);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
});

userRouter.post('/login', async function (req, res, next) {
    try {
        const user = await userService.loginUser(req.body);
        httpResponse.sendSuccess(res, "Authenticated successfully", user);
    } catch (e) {
        httpResponse.sendFailure(res, e.message);
    }
})

module.exports = userRouter;