import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  catagoryName: "",
  errors: {},
  edit: false,
  catagoryId: "",
}


const catagorySlice = createSlice({
  name: "catagory",
  initialState,
  reducers: {
    addCatagoryFields: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    removeCatagoryAllFields: (state) => {
      return initialState
    }
  }
});


export const {addCatagoryFields, removeCatagoryAllFields} = catagorySlice.actions;


export default catagorySlice.reducer;