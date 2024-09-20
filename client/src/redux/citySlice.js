import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  active: true,
  cityName: "",
  desc: "",
  abbreviation: "",
  stateId: "",
  areaId: "",
  errors: {},
  cityId: "",
  oldImgUrl: "",
  uploadedImage: "",
  uploadedImageChanged: false,
}


const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    addCityFields: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    removeAllCityFields: (state) => {
      return initialState
    }
  }
});


export const {addCityFields, removeAllCityFields} = citySlice.actions;


export default citySlice.reducer;