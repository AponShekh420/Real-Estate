import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  titleSearch: "",
  catagory: "",
  subcatagory: "",
  active: true,
  loading: true,
  errors: {},
  data: [],
  totalPages: 1,
  currentPage: 1,
}


const blogFilter = createSlice({
  name: "blogFilter",
  initialState,
  reducers: {
    addBlogFilterValue: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    removeBlogFilterValues: (state) => {
      return initialState
    }
  }
});


export const {addBlogFilterValue, removeBlogFilterValues} = blogFilter.actions;


export default blogFilter.reducer;