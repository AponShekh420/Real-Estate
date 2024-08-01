import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  id: "4534534534",
  firstName: "Apon",
  lastName: "Shekh",
  accountId: "238904239084",
  email: "aponshekh420@gmail.com",
  avatar: "placeholder.jpg",
  role: "admin", // can be admin, viewer and contributor
  provider: "local" // can be google, facebook and apple
}


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserField: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    removeUserField: (state) => {
      return initialState
    }
  }
});


export const {addUserField, removeUserField} = userSlice.actions;


export default userSlice.reducer;