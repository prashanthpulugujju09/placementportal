const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    companyLogo:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    eligibility:{
        type:[String],
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    candidates:[{
        candidateDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        candidateResume:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Resume'
        }
    }],
},{
    timestamps:true
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;