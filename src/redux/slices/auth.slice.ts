import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit';

import { authService } from '../../services';
import { IAuth, IErrorAuth, IUser } from '../../interfaces';

interface IState {
    showModal: boolean;
    me: IUser;
    errorAuth: IErrorAuth;
}

const initialState: IState = {
    showModal: false,
    me: null,
    errorAuth: null,
};

const signUp = createAsyncThunk<void, IAuth>(
    'authSlice/signUp',
    async (dataUser, { rejectWithValue }) => {
        try {
            await authService.register(dataUser);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const signIn = createAsyncThunk<IUser, IAuth>(
    'authSlice/login',
    async (user, { rejectWithValue }) => {
        try {
            return await authService.login(user);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const me = createAsyncThunk<IUser, void>(
    'authSlice/me',
    async () => {
        const { data } = await authService.me();
        return data;
    }
);

const slice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logout: state => {
            state.me = null;
        },
        setModalShow: state => {
            state.showModal = true;
        },
        setModalHide: state => {
            state.showModal = false;
            state.errorAuth = null;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                state.me = action.payload;
            })
            .addCase(me.fulfilled, (state, action) => {
                state.me = action.payload;
            })
            .addMatcher(isFulfilled, state => {
                state.errorAuth = null;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errorAuth = action.payload as IErrorAuth;
            })
});

const { actions, reducer: authReducer } = slice;
const authActions = {
    ...actions,
    signUp,
    signIn,
    me,
};

export {
    authReducer,
    authActions,
};
