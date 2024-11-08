import { createSlice } from '@reduxjs/toolkit';
import userActionTypes from './userActionTypes';

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    extraReducers: {
        [userActionTypes.SIGN_IN_SUCCESS]: (state, action) => {
            return {
                ...action.payload
            }
        },
        [userActionTypes.FAILURE]: (state, action) => {
            return null;
        },
        [userActionTypes.SIGN_UP_SUCCESS]: (state, action) => {
            return {
                ...action.payload
            }
        },
        [userActionTypes.SIGN_OUT]: (state, action) => {
            return null;
        },
        [userActionTypes.EDIT_DETAILS_SUCCESS]:(state,action)=>{
            return {
                token:state.token,
                ...action.payload
            }
        }
    }
});

export const { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, FAILURE, SIGN_OUT } = userSlice.actions;

export default userSlice.reducer;