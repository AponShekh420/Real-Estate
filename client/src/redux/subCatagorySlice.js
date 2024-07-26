import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  subcatagoryName: "",
  catagoryId: "",
  edit: false,
  errors: {},
  subcatagoryId: "",
}


const subCatagorySlice = createSlice({
  name: "subcatagory",
  initialState,
  reducers: {
    addSubcatagoryFields: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    removeAllSubcatagoryFields: (state) => {
      return initialState
    }
  }
});


export const {addSubcatagoryFields, removeAllSubcatagoryFields} = subCatagorySlice.actions;


export default subCatagorySlice.reducer;