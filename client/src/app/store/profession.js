import { createSlice } from "@reduxjs/toolkit";
import ProfessionService from "../services/profession.service";

const professionSlice = createSlice({
    name: "profession",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionRequested: (state) => {
            state.isLoading = true;
        },
        professionReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionReducer, actions } = professionSlice;
const { professionRequested, professionReceived, professionRequestFailed } = actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().profession;
    if (isOutdated(lastFetch)) {
        dispatch(professionRequested());
        try {
            const { content } = await ProfessionService.get();
            dispatch(professionReceived(content));
        } catch (error) {
            dispatch(professionRequestFailed(error.message));
        }
    }
};

export const getProfessions = () => (state) => state.profession.entities;
export const getProfessionsLoadingStatus = () => (state) => state.profession.isLoading;
export const getProfessionById = (professionId) => (state) => {
    return state.profession.entities.find((p) => p._id === professionId);
};

export default professionReducer;
