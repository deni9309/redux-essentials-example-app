import { createSlice } from "@reduxjs/toolkit";
import { seedUsersData } from "../../utils/seedData";

const usersSlice = createSlice({
    name: 'users',
    initialState: seedUsersData,
    reducers: {}
});

export default usersSlice.reducer

export const selectUserById = (state, userId) =>
    state.users.find(u => u.id === userId);