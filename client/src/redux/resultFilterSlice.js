import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titleSearch: "",
  // state: "",
  // city: "",
  // area: "",
  // blog: "",
  // communities: "",
  currentFilterType: [],
  loading: false,
  errors: {},
  data: [],
  totalPages: 1,
  currentPage: 1,
  lotalNumberOfData: 0,
};

const resultsFilter = createSlice({
  name: "resultsFilter",
  initialState,
  reducers: {
    addResultsFilterValue: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeResultsFilterValues: (state) => {
      return initialState;
    },
  },
});

export const { addResultsFilterValue, removeResultsFilterValues } =
resultsFilter.actions;

export default resultsFilter.reducer;
