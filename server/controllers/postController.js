const Post = require("../models/PostModel");
const User = require("../models/userModel");
const { INVALID_CREDENTIALS, USER_NOT_FOUND, NOT_AUTHORIZED, SERVER_ERR } = require("../utils/error");
const { userExists } = require("./userController");


async function allPosts(){
    try{
        const posts = await Post.find({});
        return posts;
    }
    catch(error){
        console.log(error);
        next({
            status:500,
            message:SERVER_ERR
        })
        return;
    }
}

async function createPost(req,res,next){
    try{
        const { email, data } = req.body;
        if (!userExists({ email: email })) {
            next({
                status: 400,
                message: USER_NOT_FOUND
            });
            return;
        }
        if(!data || !data.heading || !data.description || !data.createdBy){
            next({
                status: 400,
                message: INVALID_CREDENTIALS
            });
            return;
        }
        const user = await User.findOne({ email });
        if (user.role === 'student') {
            next({
                status: 400,
                message: NOT_AUTHORIZED
            });
            return;
        }
        else{
            await Post.create(data);
            const posts = await allPosts();
            res.status(201).json({
                message: 'Post Created Successfully',
                data: posts
            });
        }
    }
    catch(error){
        console.log(error);
        next({
            status: 500,
            message: SERVER_ERR
        });
        return;
    }
}

async function editPost(req,res,next){
    try{
        console.log('editing');
        const { email, data,_id } = req.body;
        if (!userExists({ email: email })) {
            next({
                status: 400,
                message: USER_NOT_FOUND
            });
            return;
        }
        if(!data){
            next({
                status: 400,
                message: INVALID_CREDENTIALS
            });
            return;
        }
        const user = await User.findOne({ email });
        if (user.role === 'student') {
            next({
                status: 400,
                message: NOT_AUTHORIZED
            });
            return;
        }
        else{
            await Post.findOneAndUpdate({_id},data);
            const posts = await allPosts();
            res.status(201).json({
                message: 'Post Updated Successfully',
                data: posts
            });
        }
    }
    catch(error){
        console.log(error);
        next({
            status: 500,
            message: SERVER_ERR
        });
        return;
    }
}

async function deletePost(req,res,next){
    try{
        const { email,_id } = req.body;
        if (!userExists({ email: email })) {
            next({
                status: 400,
                message: USER_NOT_FOUND
            });
            return;
        }
        const user = await User.findOne({ email });
        if (user.role === 'student') {
            next({
                status: 400,
                message: NOT_AUTHORIZED
            });
            return;
        }
        else{
            await Post.findOneAndDelete({_id});
            const posts = await allPosts();
            res.status(201).json({
                message: 'Post Deleted Successfully',
                data: posts
            });
        }
    }
    catch(error){
        console.log(error);
        next({
            status: 500,
            message: SERVER_ERR
        });
        return;
    }
}

async function getAllPosts(req,res,next){
    try{
        const posts = await allPosts();
        res.status(201).json({
            message: 'Post Fetched Successfully',
            data: posts
        });
    }
    catch(error){
        console.log(error);
        next({
            status: 500,
            message: SERVER_ERR
        });
        return;
    }
}

module.exports ={
    editPost,
    createPost,
    deletePost,
    getAllPosts
}

