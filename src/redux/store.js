import InputSlice from "./slices/InputSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const reducers = combineReducers({
    inputSlice: InputSlice,
});          


const persistConfig = {
    key: "0.1",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
})

export default store;
export const persistor = persistStore(store)