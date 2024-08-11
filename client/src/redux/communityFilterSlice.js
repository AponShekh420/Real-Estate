import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  titleSearch: "",
  state: "",
  city: "",
  area: "",
  homeTypes: [],
  active: true,
  status: "",
  loading: true,
  errors: {},
  zip: "",
  data: [],
  totalPages: 1,
  currentPage: 1,
}


const communityFilter = createSlice({
  name: "communityFilter",
  initialState,
  reducers: {
    addCommunityFilterValue: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    removeCommunityFilterValues: (state) => {
      return initialState
    }
  }
});


export const {addCommunityFilterValue, removeCommunityFilterValues} = communityFilter.actions;


export default communityFilter.reducer;