import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import professionReducer from "./profession";

const rootReducer = combineReducers({ qualities: qualitiesReducer, profession: professionReducer });

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
