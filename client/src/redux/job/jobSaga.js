import { all, call, put, takeLatest } from 'redux-saga/effects';
import jobActionTypes from './jobActionTypes';
import { jobRequest } from '../../httpRequests';


function* deleteJobProfile({ payload }) {
    const endpoint = 'jobprofiles/delete';
    const response = yield jobRequest(payload.data,payload.token,endpoint,'POST');
    if (response.status === 'ok') {
        yield put({ type: jobActionTypes.SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: jobActionTypes.FAILED });
    }
}

function* createJobProfile({ payload }) {
    const endpoint = 'jobprofiles/create';
    const response = yield jobRequest(payload.data,payload.token,endpoint,'POST');
    if (response.status === 'ok') {
        yield put({ type: jobActionTypes.SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: jobActionTypes.FAILED });
    }
}

function* getJobs({payload}){
    const endpoint = 'jobprofiles/';
    const response = yield jobRequest({},payload.token,endpoint,'GET');
    if (response.status === 'ok') {
        yield put({ type: jobActionTypes.SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: jobActionTypes.FAILED });
    }
}

function* updateJob({payload}){
    const endpoint = 'jobprofiles/edit';
    const response = yield jobRequest(payload.data,payload.token,endpoint,'POST');
    if (response.status === 'ok') {
        yield put({ type: jobActionTypes.SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: jobActionTypes.FAILED });
    }
}

export function* deleteJob() {
    yield takeLatest(jobActionTypes.DELETE_JOB_START, deleteJobProfile);
}

export function* createJob() {
    yield takeLatest(jobActionTypes.CREATE_JOB_START, createJobProfile);
}

export function* editJob(){
    yield takeLatest(jobActionTypes.UPDATE_JOB_START,updateJob);
}

export function* fetchJobProfiles(){
    yield takeLatest(jobActionTypes.FETCH_ALL_JOBS_START,getJobs);
}

export default function* jobSaga() {
    yield all([
        call(deleteJob),
        call(createJob),
        call(editJob),
        call(fetchJobProfiles)
    ]);
}