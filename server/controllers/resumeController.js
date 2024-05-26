const Resume = require("../models/ResumeModel");
const User = require("../models/userModel");
const { USER_NOT_FOUND, SERVER_ERR } = require("../utils/error");
const { userExists } = require("./userController");

async function addResume(req, res, next) {
    try {
        const { email, data } = req.body;
        if (!userExists({ email: email })) {
            next({
                status: 400,
                message: USER_NOT_FOUND
            });
            return;
        }
        let user = await User.findOne({ email:email });
        const resume = await Resume.create(data);
        user.resume.push(resume);
        user = await user.save();
        user = await User.populate(user,'resume');
        user = user.toObject();
        delete user.password;
        res.status(201).json({
            message: 'Resume Added Successfully',
            data: user
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

async function deleteResume(req, res, next) {
    try {
        const { email, resumeId } = req.body;
        if (!userExists({ email: email })) {
            next({
                status: 400,
                message: USER_NOT_FOUND
            });
            return;
        }
        let user = await User.findOne({ email:email });
        const resume = await Resume.findByIdAndDelete(resumeId);
        let newResume = [];
        for(let r of user.resume){
            if((r._id).toString()!==resumeId){
                newResume.push(r);
            }  
        }
        user.resume=newResume;
        user = await user.save();
        user = await User.populate(user,'resume');
        user = user.toObject();
        delete user.password;
        res.status(201).json({
            message: 'Resume Deleted Successfully',
            data: user
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


module.exports={
    addResume,
    deleteResume
}