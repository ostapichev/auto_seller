import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer, carReducer, cityReducer, currencyReducer, userReducer } from './slices';

const rootReducer = combineReducers({
    authReducer,
    carReducer,
    cityReducer,
    currencyReducer,
    userReducer,
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

export type {
    RootState,
    AppStore,
    AppDispatch,
};

export {
    setupStore
};
