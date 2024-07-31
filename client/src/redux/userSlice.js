import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  accountId: "",
  email: "",
  avatar: "",
  role: "", // can be admin, viewer and contributor
  provider: "" // can be google, facebook and apple
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