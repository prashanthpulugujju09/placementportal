import { all, call, put, takeLatest } from 'redux-saga/effects';
import postActionTypes from './postActionTypes';
import { jobRequest } from '../../httpRequests';


function* removePost({ payload }) {
    const endpoint = 'posts/delete';
    const response = yield jobRequest(payload.data,payload.token,endpoint,'POST');
    if (response.status === 'ok') {
        yield put({ type: postActionTypes.SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: postActionTypes.FAILED });
    }
}

function* newPost({ payload }) {
    const endpoint = 'posts/create';
    const response = yield jobRequest(payload.data,payload.token,endpoint,'POST');
    if (response.status === 'ok') {
        yield put({ type: postActionTypes.SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: postActionTypes.FAILED });
    }
}

function* getPosts({payload}){
    const endpoint = 'posts/';
    const response = yield jobRequest({},payload.token,endpoint,'GET');
    if (response.status === 'ok') {
        yield put({ type: postActionTypes.SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: postActionTypes.FAILED });
    }
}

function* updatePost({payload}){
    const endpoint = 'posts/edit';
    const response = yield jobRequest(payload.data,payload.token,endpoint,'POST');
    if (response.status === 'ok') {
        yield put({ type: postActionTypes.SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: postActionTypes.FAILED });
    }
}

export function* deletePost() {
    yield takeLatest(postActionTypes.DELETE_POST_START, removePost);
}

export function* createPost() {
    yield takeLatest(postActionTypes.CREATE_POST_START, newPost);
}

export function* editPost(){
    yield takeLatest(postActionTypes.UPDATE_POST_START,updatePost);
}

export function* fetchPosts(){
    yield takeLatest(postActionTypes.FETCH_ALL_POSTS_START,getPosts);
}

export default function* postSaga() {
    yield all([
        call(deletePost),
        call(createPost),
        call(editPost),
        call(fetchPosts)
    ]);
}