const express = require('express');
const verifyAuth = require('../utils/authMiddleware');
const { getAllPosts, createPost, editPost, deletePost } = require('../controllers/postController');

const postRouter = express.Router();
postRouter.route('/').get(verifyAuth,getAllPosts);
postRouter.route('/create').post(verifyAuth,createPost);
postRouter.route('/edit').post(verifyAuth,editPost);
postRouter.route('/delete').post(verifyAuth,deletePost);

module.exports=postRouter;