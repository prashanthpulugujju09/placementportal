const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const { API_ENDPOINT_NOT_FOUND, SERVER_ERR } = require('./utils/error');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const app=express();
const userRouter = require('./routers/userRouter');
const jobRouter = require('./routers/jobRouter');
const postRouter = require('./routers/postRouter');
const resumeRouter = require('./routers/resumeRouter');

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true}));
app.use(morgan('combined'));
app.use(cors());

app.use('/api/user',userRouter);
app.use('/api/jobprofiles',jobRouter);
app.use('/api/posts',postRouter);
app.use('/api/resume',resumeRouter);

app.use('*', (req, res, next) => {
    const error = {
        status: 404,
        message: API_ENDPOINT_NOT_FOUND
    };
    next(error);
});

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.status || 500;
    const message = error.message || SERVER_ERR;
    const data = error.data || null;
    res.status(status).json({
        type: 'error',
        message,
        data
    });
});

async function main(){
    try{
        await connectDB();
        app.listen(process.env.PORT_NUMBER || 5000,()=>{
            console.log(`server listening...`);
        })
    }
    catch(error){
        console.log(error);
    }
}

main();