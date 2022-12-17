import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formCreateUserState: false,
  formEditUserState: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleFormCreateUser: (state) => {
      state.formCreateUserState = !state.formCreateUserState;
      state.formEditUserState = false;
    },
    closeFormCreateUser: (state) => {
      state.formCreateUserState = false;
    },
    toggleFormEditUser: (state) => {
      state.formEditUserState = !state.formEditUserState;
      state.formCreateUserState = false;
    },
    closeFormEditUser: (state) => {
      state.formEditUserState = false;
    },
    selectUser: (state, action) => {
      state.user = action.payload;
    },
    // closeDrawer: (state) => {state.drawerState = false},
  },
});

export const {
  toggleFormCreateUser,
  closeFormCreateUser,
  toggleFormEditUser,
  closeFormEditUser,
  selectUser,
} = userSlice.actions;
export default userSlice.reducer;
