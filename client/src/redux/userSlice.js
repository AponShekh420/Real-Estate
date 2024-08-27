import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

// Check for `localStorage` only on the client side
if (typeof window !== "undefined") {
  const savedUserInfo = localStorage.getItem("userInfo");
  initialState.userInfo = savedUserInfo ? JSON.parse(savedUserInfo) : null;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;

      // Ensure this runs only on the client side
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));

        const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
        localStorage.setItem("expirationTime", expirationTime);
      }
    },
    logout: (state) => {
      state.userInfo = null;

      // Ensure this runs only on the client side
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("expirationTime");
      }
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;

export default userSlice.reducer;
