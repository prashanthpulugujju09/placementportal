import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { persistStore, persistReducer } from 'redux-persist';
import {combineReducers,configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage/session';
import userReducer from './user/userSlice';
import userActionTypes from './user/userActionTypes';
import jobReducer from './job/jobSlice';
import postReducer from './post/postSlice';

const sagaMiddleware = createSagaMiddleware();

const combinedReducers = combineReducers({
    user: userReducer,
    job: jobReducer,
    posts:postReducer
});

const rootReducer = (state, action) => {
    if (action.type === userActionTypes.SIGN_OUT) {
        state = undefined;
        storage.removeItem('persist:root');
    }
    return combinedReducers(state, action);
}

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    middleware: [sagaMiddleware,logger],
    reducer: persistedReducer
});


sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };