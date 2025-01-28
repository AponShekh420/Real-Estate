import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titleSearch: "",
  state: "",
  city: "",
  area: "",
  homeTypes: [],
  active: true,
  loading: true,
  errors: {},
  zip: "",
  data: [],
  totalPages: 1,
  currentPage: 1,
  amenities: [],
  ageRestrictions: "Any",
  gated: "Any",
  price: [0, 1000000000],
  sorting: "Default",
  //added by shipon
  isNewContraction: "No",
  closestHospital: "Any",
  closestAirport: "Any",
  closestMilitaryBase: "Any",
  builder: "",
};

const communityFilter = createSlice({
  name: "communityFilter",
  initialState,
  reducers: {
    addCommunityFilterValue: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeCommunityFilterValues: (state) => {
      return initialState;
    },
  },
});

export const { addCommunityFilterValue, removeCommunityFilterValues } =
  communityFilter.actions;

export default communityFilter.reducer;
