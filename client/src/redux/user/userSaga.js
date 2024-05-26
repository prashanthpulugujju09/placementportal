import { all, call, put, takeLatest } from 'redux-saga/effects';
import userActionTypes from './userActionTypes';
import { editUserDetails, fetchCurrentUser, loginUser, registerUser } from '../../httpRequests';


function* signIn({ payload }) {
    console.log(payload);
    const response = yield loginUser(payload);
    if (response.status === 'ok') {
        yield put({ type: userActionTypes.SIGN_IN_SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: userActionTypes.FAILURE });
    }
}

function* signUp({ payload }) {
    const response = yield registerUser(payload);
    if (response.status === 'ok') {
        yield put({ type: userActionTypes.SIGN_UP_SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: userActionTypes.FAILURE });
    }
}

function* editDetails({payload}){
    const response = yield editUserDetails(payload.data,payload.token);
    if (response.status === 'ok') {
        yield put({ type: userActionTypes.EDIT_DETAILS_SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: userActionTypes.EDIT_DETAILS_FAILURE });
    }
}

function* fetchUser({payload}){
    const response = yield fetchCurrentUser(payload.token);
    if (response.status === 'ok') {
        yield put({ type: userActionTypes.EDIT_DETAILS_SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: userActionTypes.EDIT_DETAILS_FAILURE });
    }
}

export function* signInWithEmail() {
    yield takeLatest(userActionTypes.SIGN_IN_START, signIn);
}

export function* signUpWithEmail() {
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* editDetailsStart(){
    yield takeLatest(userActionTypes.EDIT_DETAILS_START,editDetails);
}

export function* getUser(){
    yield takeLatest(userActionTypes.FETCH_USER,fetchUser)
}

export default function* userSaga() {
    yield all([
        call(signInWithEmail),
        call(signUpWithEmail),
        call(editDetailsStart),
        call(getUser)
    ]);
}