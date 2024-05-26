const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
    name:String,
    url:String
});

const Resume = mongoose.model('Resume',resumeSchema);

module.exports= Resume;