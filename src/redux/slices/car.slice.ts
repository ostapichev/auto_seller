import { AxiosError } from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import { IBrand, ICar, IErrorCar, IParams, IQuery } from "../../inteerfaces";
import { carService } from "../../services";

interface IState {
    cars: ICar[];
    brands: IBrand[];
    params: IParams;
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
    params: {},
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
            console.log(params);
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
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setLimitDec: (state) => {
            state.limit = state.limit - 2;
        },
        setLimitInc: (state) => {
            state.limit = state.limit + 2;
        },
        setCity: (state, action) => {
            state.cityId = action.payload;
            state.page = 1;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
            state.page = 1;
        },
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            const {data, cityId, page, search, total} = action.payload;
            state.cars = data;
            state.page = page;
            state.cityId = cityId;
            state.search = search;
            state.total = total;
        })
        .addCase(getBrands.fulfilled, (state, action) => {
            state.brands = action.payload;
        })
        .addMatcher(isPending(), state => {
            state.error = null;
            state.loading = true;
        })
        .addMatcher(isFulfilled(), state => {
            state.loading = false;
            state.error = null;
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
