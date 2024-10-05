import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

import { ICurrency, IErrorCurrency } from "../../inteerfaces";
import { currencyService } from "../../services/currency-course.service";

interface IState {
    currencies: ICurrency[];
    error: IErrorCurrency;
}

const initialState: IState = {
    currencies: [],
    error: null,
};

const getAll = createAsyncThunk<ICurrency[], void>(
    'currencySlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const { data } = await currencyService.getCurrencyRate();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        };
    }
);

const slice = createSlice({
    name: "currencySlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.currencies = action.payload;
            state.error = null;
        })
        .addMatcher(isRejectedWithValue(), (state, action) => {
            state.error = action.payload;
        })
});

const {actions, reducer: currencyReducer} = slice;
const currencyActions = {
    ...actions,
    getAll
};

export {
    currencyActions,
    currencyReducer
};
