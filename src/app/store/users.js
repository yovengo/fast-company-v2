import { createSlice } from "@reduxjs/toolkit";
import UserService from "../services/user.service";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersReceived, usersRequestFailed } = actions;

export const loadUsersList = () => async (dispatch) => {
        dispatch(usersRequested());
        try {
            const { content } = await UserService.get();
            dispatch(usersReceived(content));
        } catch (error) {
            dispatch(usersRequestFailed(error.message));
        }
};

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};

export const getUsersList = () => (state) => state.users.entities;

export default usersReducer;
