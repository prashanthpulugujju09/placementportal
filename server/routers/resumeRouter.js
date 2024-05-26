const express = require('express');
const verifyAuth = require('../utils/authMiddleware');
const { addResume, deleteResume } = require('../controllers/resumeController');

const resumeRouter = express.Router();

resumeRouter.route('/add').post(verifyAuth,addResume);
resumeRouter.route('/remove').post(verifyAuth,deleteResume);

module.exports= resumeRouter;