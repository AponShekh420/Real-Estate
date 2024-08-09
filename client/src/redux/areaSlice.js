import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  active: true,
  areaName: "",
  desc: "",
  abbreviation: "",
  stateId: "",
  cityId: "",
  errors: {},
  areaId: "",
}


const areaSlice = createSlice({
  name: "area",
  initialState,
  reducers: {
    addAreaFields: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    removeAllAreaFields: (state) => {
      return initialState
    }
  }
});


export const {addAreaFields, removeAllAreaFields} = areaSlice.actions;


export default areaSlice.reducer;