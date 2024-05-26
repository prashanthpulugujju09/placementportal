import axios from 'axios';

const BASE_URI = 'http://localhost:5000/api/';
const INVALID_DATA = {
    status: 'error',
    message: 'missing or invalid data'
};

function areRegisterInputsValid({ email, password, repassword }) {
    if (!email || !password || !repassword ) {
        return false;
    }
    return true;
}

function areLoginInputsValid({ email, password }) {
    if (!email || !password) {
        return false;
    }
    return true;
}

function isPasswordValid(password, repassword) {
    return password === repassword;
}

async function serverRequest(url, method, data, headers) {
    try {
        const response = await axios({
            url,
            method,
            data,
            headers
        });
        const responseData = {
            status: 'ok',
            data: response.data.data,
            message: response.data.message
        }
        return responseData;
    }
    catch (error) {
        console.log(error);
        if (error.response.data) {
            const { message } = error.response.data;
            const responseData = {
                status: 'error',
                message: message
            }
            return responseData;
        }
        return {
            status: 'error',
            message: 'connection error'
        };
    }
}

export const registerUser = async (inputData) => {
    const { password, repassword } = inputData;
    const inputsValidity = areRegisterInputsValid(inputData);
    const passwordMatch = isPasswordValid(password, repassword);
    if (!inputsValidity || !passwordMatch) {
        return INVALID_DATA;
    }
    const url = BASE_URI + 'user';
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json'
    }
    const response = await serverRequest(url, method, inputData, headers);
    return response;
}

export const loginUser = async (inputData) => {
    const inputsValidity = areLoginInputsValid(inputData);
    if (!inputsValidity) {
        return INVALID_DATA;
    }
    const method = 'POST';
    const url = BASE_URI + 'user/login';
    const headers = {
        'Content-Type': 'application/json'
    };
    const response = await serverRequest(url, method, inputData, headers);
    return response;
}

export const editUserDetails = async(inputData,token)=>{
    console.log(inputData);
    console.log(token);
    const method = 'POST';
    const url = BASE_URI+'user/edit';
    const headers = {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
    };
    const response = await serverRequest(url, method, inputData, headers);
    return response;
}

export const changeCC = async(inputData,token)=>{
    const method = 'POST';
    const url = BASE_URI+'user/role';
    const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
    };
    const response = await serverRequest(url, method, inputData, headers);
    return response;
}

export const fetchCurrentUser = async(token)=>{
    const method = 'GET';
    const url = BASE_URI+'user';
    const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
    };
    const response = await serverRequest(url, method, {}, headers);
    return response;
}

export const getAllJobs = async (inputData,token)=>{
    const method = 'GET';
    const url = BASE_URI+'posts/';
    const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
    };
    const response = await serverRequest(url, method, inputData, headers);
    return response;
}

export const jobRequest = async(inputData,token,endpoint,method)=>{
    const url = BASE_URI+endpoint;
    const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
    };
    const response = await serverRequest(url, method, inputData, headers);
    return response;
}


export const uploadResume = async(inputData,token,endpoint)=>{
    const url = BASE_URI+endpoint;
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
    };
    const response = await serverRequest(url, method, inputData, headers);
    return response;
}