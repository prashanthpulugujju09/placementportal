import { createSlice } from '@reduxjs/toolkit';
import postActionTypes from './postActionTypes';

export const postSlice = createSlice({
    name: 'posts',
    initialState: [],
    extraReducers: {
        [postActionTypes.SUCCESS]: (state, action) => {
            return [
                ...action.payload
            ]
        },
    }
});

export const { SUCCESS } = postSlice.actions;

export default postSlice.reducer;