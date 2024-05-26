const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    dob:{
        type: Date
    },
    gender:{
        type:String
    },
    college:{
        type:String
    },
    course:{
        type:String
    },
    batch:{
        type: Number
    },
    rollNumber:{
        type:Number
    },
    address:{
        type:String
    },
    cgpa:{
        type:mongoose.Schema.Types.Decimal128
    },
    mobileNumber:{
        type:Number
    },
    numberOfOffers:{
        type:Number,
        default:'0'
    },
    resume:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Resume'
    }],
    role:{
        type:String,
        default:'student'
    },
    applications:[{
        application:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Job'
        },
        resume:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Resume'
        }
    }]
},
{
    timestamps:true
});

userSchema.methods.matchPassword = async function (password) {
    console.log(password);
    console.log(this.password);
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;