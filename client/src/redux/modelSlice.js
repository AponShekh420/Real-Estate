
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  CMTName: "",
  desc: "",
  uploadedImage: "",
  newDataNotify: null,
  errors: {},
  CMTId: "",
  edit: false,
  uploadedImageChanged: false,
  oldImgUrl: "",
}


const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    addModelFields: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    removeModelAllFields: (state) => {
      return initialState
    }
  }
});


export const {addModelFields, removeModelAllFields} = modelSlice.actions;


export default modelSlice.reducer;