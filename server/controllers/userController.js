const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const { INVALID_CREDENTIALS, USER_ALREADY_EXISTS, SERVER_ERR, USER_NOT_FOUND, NOT_AUTHORIZED } = require('../utils/error');
const Resume = require('../models/ResumeModel');

function checkCredentials( email, password,repassword) {
    if ( !email || !password || !repassword || (password!==repassword)) {
        return false;
    }
    return true;
}

async function userExists(credential) {
    let user = await User.findOne(credential);
    return user;
}

// Creating a new user
const registerUser = async (req, res, next) => {
    try{
        const {email,password,repassword } = req.body;
    if (!checkCredentials( email, password,repassword)) {
        next({
            status: 400,
            message: INVALID_CREDENTIALS
        });
        return;
    }
    const emailExists =await userExists({email:email});
    // console.log(emailExists);
    if (emailExists) {
        next({
            status: 400,
            message: USER_ALREADY_EXISTS
        });
        return;
    }
    let hash = bcrypt.hashSync(password,12);
    let user = await User.create({
        email,
        password:hash
    });
    // console.log(typeof user);
    if(user){
        user =user.toObject();
        delete user.password;
    }
    if (user) {
        const token = generateToken(user._id);
        user['token']=token;
        // console.log(userData);
        res.status(201).json({
            message: 'User created successfully',
            data: user
        });
    }
    }
    catch(error) {
        console.log(error);
        next({
            status: 500,
            message: SERVER_ERR
        });
        return;
    }
}

//login
async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;
        console.log(email,password);
        let user = await userExists({ email: email });
        user = await Resume.populate(user,{
            path:'resume'
        })
        if (!user) {
            next({
                status: 400,
                message: USER_NOT_FOUND
            });
            return;
        }
        const isPasswordMatched = await user.matchPassword(password);
        console.log(isPasswordMatched);
        if (isPasswordMatched) {
            const token = generateToken(user._id);
            if(user){
                user =user.toObject();
                delete user.password;
            }
            const userData = {
                ...user,
                token: token
            };
            res.status(201).json({
                message: 'Sign in successful!!!',
                data: userData
            });
            return;
        }
        next({
            status: 400,
            message: INVALID_CREDENTIALS
        });
        return;
    }
    catch (error) {
        console.log(error);
        next({
            status: 500,
            message: SERVER_ERR
        });
        return;
    }
}

async function editUserDetails(req,res,next){
    try{
        const body = req.body;
        console.log(body);
        if(!body || !body.data || body?.data?.email){
            next({
                status: 400,
                message: NOT_AUTHORIZED
            });
            return;
        }
        if(!userExists({email:body.email})){
            next({
                status: 400,
                message: USER_NOT_FOUND
            });
            return;
        }
        else{
            const {data,email}=body;
            let user = await User.findOneAndUpdate({email:email},data,{
                new:true
            }).select("-password").populate('resume');
            user = await Resume.populate(user,{
                path:'resume'
            })
            res.status(201).json({
                message: 'Successful!!!',
                data: user
            });
            return;
        }
    }
    catch(error){
        next({
            status: 500,
            message: SERVER_ERR
        });
        return;
    }
}

async function changeCC(req,res,next){
    try{
        const {email,data}= req.body;
        if(!data){
            next({
                status: 400,
                message: INVALID_CREDENTIALS
            });
            return;
        }
        const admin = await userExists({email:email});
        const user = await userExists({email:data.email});
        if(!admin||!user){
            next({
                status: 400,
                message: USER_NOT_FOUND
            });
            return;
        }
        
        if(admin.role!=='admin'){
            next({
                status: 400,
                message: NOT_AUTHORIZED
            });
            return;
        }
        else{
            const user = await User.findOneAndUpdate({email:data.email},{
                role:data.role
            },{
                new:true
            }).select("-password");
            res.status(201).json({
                message: 'Successful!!!',
            });
            return;
        }
    }
    catch(error){
        next({
            status: 500,
            message: SERVER_ERR
        });
        return;
    }
}

async function getUser(req,res,next){
    try{
        let user = await User.findOne({email:req.user.email});
        if(!user){
            next({
                status:400,
                message:'no user data'
            })
            return;
        }
        user = await Resume.populate(user,{
            path:'resume'
        })
        res.status(201).json({
            data:user
        });
    }
    catch(error){
        console.log(error);
        next({
            status:500,
            message:SERVER_ERR
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    editUserDetails,
    changeCC,
    userExists,
    getUser
};