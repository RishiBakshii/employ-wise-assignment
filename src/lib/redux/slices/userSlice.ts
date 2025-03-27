import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types/user.types";
import { RootState } from "../store/store";

interface InitialState {
    users:User[];
    filteredUsers:User[];
}

const initialState: InitialState = {
    users:[],
    filteredUsers:[]
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUsers(state, action:PayloadAction<User[]>) {
      state.users = action.payload;
    },
    removeUserById(state, action:PayloadAction<{id:number}>) {
        state.users = state.users.filter(user=>user.id!==action.payload.id);
    },
    updateUserById(state, action:PayloadAction<User>) {
        state.users = state.users.map(user=>user.id===action.payload.id?action.payload:user);
    },
    setFilteredUsers(state, action:PayloadAction<User[]>) {
      state.filteredUsers = action.payload;
    },

  },
});

// exporting actions
export const {setUsers,removeUserById,updateUserById,setFilteredUsers} = userSlice.actions;

// exporting selectors
export const selectUsers = (state: RootState) => state.userSlice.users
export const selectFilteredUsers = (state: RootState) => state.userSlice.filteredUsers

