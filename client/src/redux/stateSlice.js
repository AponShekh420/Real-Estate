import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  active: true,
  stateName: "",
  description: "",
  abbreviation: "",
  errors: {},
  edit: false,
  stateId: "",
}


const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    addStateFields: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    removeStateAllFields: (state) => {
      return initialState
    }
  }
});


export const {addStateFields, removeStateAllFields} = stateSlice.actions;


export default stateSlice.reducer;