import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CMTName: "",
  desc: "",
  uploadedImage: null,
  newDataNotify: null,
  errors: {},
  CMTId: "",
  edit: false,
  deletedImages: [],
  newImages: [],
  img: "",
  squareFit: "",
  bedrooms: "",
  bathrooms: "",
  garage: "",
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    addModelFields: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeModelAllFields: (state) => {
      return initialState;
    },
  },
});

export const { addModelFields, removeModelAllFields } = modelSlice.actions;

export default modelSlice.reducer;
