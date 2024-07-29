import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  user: {},
}


const userSlice = createSlice({
  name: "state",
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