import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types/user.types";
import { RootState } from "../store/store";

interface InitialState {
  isDeleteFormOpen: boolean;
  isEditFormOpen: boolean;
  editFormDetails:User | null;
}

const initialState: InitialState = {
    editFormDetails:null,
    isDeleteFormOpen: false,
    isEditFormOpen : false,
};

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setIsDeleteFormOpen(state, action: PayloadAction<boolean>){
        state.isDeleteFormOpen = action.payload;
    },
    setIsEditFormOpen(state, action: PayloadAction<boolean>){
        state.isEditFormOpen = action.payload;
    },
    setUserDetailsForForm(state, action: PayloadAction<User | null>){
        state.editFormDetails = action.payload;
    },
  },
});

// exporting actions
export const {setUserDetailsForForm,setIsDeleteFormOpen,setIsEditFormOpen} = uiSlice.actions;

// exporting selectors
export const selectIsDeleteFormOpen = (state: RootState) => state.uiSlice.isDeleteFormOpen;
export const selectIsEditFormOpen = (state: RootState) => state.uiSlice.isEditFormOpen;
export const selectUserDetailsForForm = (state: RootState) => state.uiSlice.editFormDetails;

