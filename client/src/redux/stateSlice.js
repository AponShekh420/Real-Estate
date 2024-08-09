import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  active: true,
  stateName: "",
  desc: "",
  abbreviation: "",
  errors: {},
  edit: false,
  stateId: "",
  notify: "",
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