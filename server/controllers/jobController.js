const { default: mongoose } = require('mongoose');
const Job = require('../models/jobModel');
const User = require('../models/userModel');
const { INVALID_CREDENTIALS, SERVER_ERR, USER_NOT_FOUND, NOT_AUTHORIZED } = require('../utils/error');
const { userExists } = require('./userController');
const ImageKit = require("imagekit");
const Resume = require('../models/ResumeModel');

const imagekit = new ImageKit({
    publicKey: "public_W9b1RNogiom0i6LzqTBmdf23qg0=",
    privateKey: "private_d3pf+tm0LfyrYjMP61z7tJj1PCU=",
    urlEndpoint: "https://ik.imagekit.io/3j67hddeg"
});

async function createJob(req, res, next) {
    try {
        const { email, data } = req.body;
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
        else {
            let val = false;
            console.log(Object.keys(data).length);
            if (!data || Object.keys(data).length !== 10) {
                val = true;
            }
            for (const [key, value] of Object.entries(data)) {
                if (key === 'eligibility') {
                    val = !value || value.length === 0;
                }
                else if (key === 'salary') {
                    val = !value || isNaN(data.salary);
                }
                else {
                    val = !value;
                }
                if (val)
                    break;
            }
            if (val) {
                next({
                    status: 400,
                    message: INVALID_CREDENTIALS
                });
                return;
            }
            const response = await imagekit.upload({
                file: data.companyLogo,
                fileName: data.filename,
            });
            // console.log(response);
            if (!response) {
                next({
                    status: 500,
                    message: SERVER_ERR
                });
                return;
            }
            delete data['filename'];
            const newObj = {
                ...data,
                companyLogo: response.url
            }
            await Job.create(newObj);
            const jobs = await Job.find({});
            res.status(201).json({
                message: 'Job Profile Created Successfully',
                data: jobs
            });
        }
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

async function editJob(req, res, next) {
    try {
        const { email, _id, data } = req.body;
        if (!userExists({email:email})) {
            next({
                status: 400,
                message: USER_NOT_FOUND
            });
            return;
        }
        const user = await User.findOne({ email:email });
        if (user.role === 'student') {
            next({
                status: 400,
                message: NOT_AUTHORIZED
            });
            return;
        }
        else {
            let val = false;
            if (!data || !_id) {
                val = true;
            }
            for (const [key, value] of Object.entries(data)) {
                if (key === 'eligibility') {
                    val = !value || value.length === 0;
                }
                else if (key === 'salary') {
                    val = !value || isNaN(data.salary);
                }
                else {
                    val = !value;
                }
                if (val)
                    break;
            }
            if (val) {
                next({
                    status: 400,
                    message: INVALID_CREDENTIALS
                });
                return;
            }
            let newObj={};
            if (data.companyLogo) {
                const response = await imagekit.upload({
                    file: data.companyLogo,
                    fileName: data.filename,
                });
                // console.log(response);
                if (!response) {
                    next({
                        status: 500,
                        message: SERVER_ERR
                    });
                    return;
                }
                delete data['filename'];
                newObj = {
                    ...data,
                    companyLogo: response.url
                }
            }
            else
                newObj={
                    ...data
                }
            // console.log(newObj);
            const job = await Job.findOneAndUpdate({ _id }, newObj, {
                new: true
            });
            res.status(201).json({
                message: 'Job Profile Edited Successfully',
                data: job
            });
        }
    }
    catch (error) {
        next({
            status: 500,
            message: SERVER_ERR
        });
        return;
    }
}

async function allJobProfiles(req,res,next){
    try{
        const user = req.user;
        console.log(user);
        if (!userExists({email:user.email})) {
            next({
                status: 400,
                message: USER_NOT_FOUND
            });
            return;
        }
        const jobs = await Job.find({});
        res.status(201).json({
            message: 'Job Profile Fetched Successfully',
            data: jobs
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

async function deleteJob(req, res, next) {
    try {
        const { email, _id } = req.body;
        if (!userExists({email:email})) {
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
        else {
            let val = false;
            if (!_id) {
                next({
                    status: 400,
                    message: INVALID_CREDENTIALS
                });
                return;
            }
            await Job.deleteOne({ _id });
            const jobs = await Job.find({});
            res.status(201).json({
                    message: 'Job Profile Deleted Successfully',
                    data:jobs
            });
        }
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

async function apply(req,res,next){
    try{
        const { email,userId,jobId,resumeId } = req.body;
        if (!userExists({email:email})) {
            next({
                status: 400,
                message: USER_NOT_FOUND
            });
            return;
        }
        let user = await User.findOne({ email:email });
        console.log(user);
        let val=false;
        // console.log(resumeId);  
        let job = await Job.findOne({_id:jobId});
        let resume = await Resume.findById(resumeId);
        // console.log(resume);
        if(!resume)
        val=true;
        for(let i=0;i<user?.applications?.length;i++){
            console.log(user.applications[i].application.toString());
            if(user.applications[i].application.toString()===jobId){
                val=true;  
                break;
        }
        }
        for(let i=0;i<job?.candidates?.length;i++){
            console.log(job.candidates[i].candidateDetails.toString());
            if(job.candidates[i].candidateDetails.toString()===userId){
                val=true;
                break;
            }
        }
        if(val){
            next({
                status:400,
                message:'Already applied or incorrect data'
            })
            return;
        }
        user.applications.push({
            application:{_id: new mongoose.Types.ObjectId(jobId)},
        resume:{_id:new mongoose.Types.ObjectId(resumeId)}});
        user = await user.save();
        user = await Resume.populate(user,{
            path:'resume'
        });
        user = user.toObject();
        delete user.password;
        job.candidates.push({
            candidateDetails:{_id: new mongoose.Types.ObjectId(userId)},
        candidateResume:{_id:new mongoose.Types.ObjectId(resumeId)}});
        await job.save();
        
        res.status(201).json({
            message: 'Applied Successfully',
            data: user
        });
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


module.exports = {
    createJob,
    editJob,
    deleteJob,
    allJobProfiles,
    apply
}
