import {call,all} from 'redux-saga/effects';
import userSaga from './user/userSaga';
import jobSaga from './job/jobSaga';
import postSaga from './post/postSaga';

export default function* rootSaga() {
    yield all([
        call(userSaga),
        call(jobSaga),
        call(postSaga)
        // call(chatSaga),
        // call(messageSaga),
        // call(selectedChatSaga),
        // call(groupOperationsSaga)
    ])
};