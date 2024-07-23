import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  subCatagoryName: "",
  catagoryId: "",
  edit: false,
  errors: {},
  subCatagoryId: "",
}


const subCatagorySlice = createSlice({
  name: "subCatagory",
  initialState,
  reducers: {
    addSubCatagoryFields: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    removeAllSubCatagoryFields: (state) => {
      return initialState
    }
  }
});


export const {addSubCatagoryFields, removeAllSubCatagoryFields} = subCatagorySlice.actions;


export default subCatagorySlice.reducer;