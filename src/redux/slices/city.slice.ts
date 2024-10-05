import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

import { cityService } from "../../services";
import { ICity, IErrorCity } from "../../inteerfaces";

interface IState {
    cities: ICity[];
    trigger: boolean;
    error: IErrorCity;
}

const initialState: IState = {
    cities: [],
    trigger: false,
    error: null,
};

const getAll = createAsyncThunk<ICity[], void>(
    'citySlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await cityService.getCities();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        };
    }
);

const addCity = createAsyncThunk<void, {city: ICity}>(
    'citySlice/addCity',
    async ({ city }, {rejectWithValue}) => {
        try {
            await cityService.addCity(city);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        };
    }
);

const slice = createSlice({
    name: "citySlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.cities = action.payload;
            state.error = null;
        })
        .addCase(addCity.fulfilled, (state, action) => {
            state.trigger = !state.trigger;
        })
        .addMatcher(isRejectedWithValue(), (state, action) => {
            state.error = action.payload;
        })
});

const { actions, reducer: cityReducer } = slice;
const cityActions = {
    ...actions,
    getAll,
    addCity
};

export {
    cityActions,
    cityReducer,
};
