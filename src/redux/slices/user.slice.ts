import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IUser } from '../../interfaces';
import { userService } from '../../services';

interface IState {
    users: IUser[];
    user: IUser;
}

const initialState: IState = {
    users: [],
    user: null,
};

const addAvatar = createAsyncThunk<void, string>(
    'userSLice/addAvatar',
    async (avatar, { rejectWithValue }) => {
        try {
            await userService.addAvatar(avatar);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'userSLice',
    initialState,
    reducers: {},
    extraReducers: builder => {}
});

const { actions, reducer: userReducer } = slice;
const userActions = {
    ...actions,
    addAvatar,
};

export {
    userActions,
    userReducer,
};
