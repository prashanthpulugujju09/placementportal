const express = require('express');
const { registerUser, loginUser,editUserDetails,changeCC, getUser } = require('../controllers/userController');
const verifyAuth = require('../utils/authMiddleware');

const userRouter = express.Router();

userRouter.route('/').post(registerUser).get(verifyAuth,getUser);
userRouter.route('/edit').post(verifyAuth,editUserDetails);
userRouter.route('/role').post(verifyAuth,changeCC);
userRouter.post('/login', loginUser);

module.exports = userRouter;