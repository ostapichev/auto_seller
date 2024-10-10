import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

import { IBrand, ICar, IErrorCar, IParams, IQuery } from "../../inteerfaces";
import { carService } from "../../services";

interface IState {
    cars: ICar[];
    brands: IBrand[];
    page: number;
    limit: number;
    total: number;
    cityId: string;
    search: string;
    trigger: boolean;
    loading: boolean;
    error: IErrorCar;
}

const initialState: IState = {
    cars: [],
    brands: [],
    page: 1,
    limit: 2,
    total: 0,
    cityId: null,
    search: null,
    trigger: false,
    loading: false,
    error: null,
};

const getAll = createAsyncThunk<IQuery<ICar[]>, { params: IParams }>(
    'carSlice/getAll',
    async ({ params }, { rejectWithValue }) => {
        try {
            const { data } = await carService.getCars(params);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getBrands = createAsyncThunk<IBrand[], void>(
    'carSlice/getBrands',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await carService.getBrands();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: "carSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            const {data, cityId, page, search, total} = action.payload;
            state.cars = data;
            state.page = page;
            state.cityId = cityId;
            state.search = search;
            state.total = total;
            state.error = null;
            state.loading = false;
        })
        .addCase(getBrands.fulfilled, (state, action) => {
            state.brands = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addMatcher(isPending(), state => {
            state.error = null;
            state.loading = true;
        })
        .addMatcher(isRejectedWithValue(), (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
});

const { actions, reducer: carReducer } = slice;
const carActions = {
    ...actions,
    getAll,
    getBrands,
};

export {
    carActions,
    carReducer,
};
