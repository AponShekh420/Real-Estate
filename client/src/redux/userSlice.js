import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  loading: true
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false
    },
    logout: (state) => {
      state.userInfo = null;
      state.loading = false
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;

export default userSlice.reducer;
