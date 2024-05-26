const express = require('express');
const verifyAuth = require('../utils/authMiddleware');
const { createJob, editJob, deleteJob, allJobProfiles, apply } = require('../controllers/jobController');

const jobRouter = express.Router();

jobRouter.route('/').get(verifyAuth,allJobProfiles);
jobRouter.route('/create').post(verifyAuth,createJob);
jobRouter.route('/edit').post(verifyAuth,editJob);
jobRouter.route('/delete').post(verifyAuth,deleteJob);
jobRouter.route('/apply').post(verifyAuth,apply);

module.exports = jobRouter;