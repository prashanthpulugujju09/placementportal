import { createSlice } from '@reduxjs/toolkit';
import jobActionTypes from './jobActionTypes';

export const jobSlice = createSlice({
    name: 'job',
    initialState: [],
    extraReducers: {
        [jobActionTypes.SUCCESS]: (state, action) => {
            return [
                ...action.payload
            ]
        },
    }
});

export const { SUCCESS } = jobSlice.actions;

export default jobSlice.reducer;