import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  users: [] as Array<{ name: string }>,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    },
    resetUser: (state) => {
      state.users = [];
    },
  },
});

// actions
export const { setUser, clearUser } = usersSlice.actions;

// Selectors
const selectUsersState = (state: RootState) => state.users;

export const selectUsers = createSelector(
  selectUsersState,
  (usersState) => usersState.users,
);

export default usersSlice;
