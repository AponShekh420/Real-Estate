import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  communityId: "0",
  title: "",
  website: "",
  phone: "",
  address: "",
  stateId: "",
  cityId: "",
  areaId: "",
  minPrice: 0,
  maxPrice: 0,
  homeTypes: [],
  communitySize: 0,
  ageRestrictions: true,
  gated: true,
  builtStart: "",
  builtEnd: "",
  imgs: [],
  bedrooms: 0,
  bathrooms: 0,
  garages: 0,
  active: true,
  status: [],
  sqft: 0,
  lat: 0,
  long: 0,
  deleteImgUrls: [],
  loading: true,
  errors: {}
}


const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    addCommunityFieldValue: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    removeAllCommunityFieldValue: (state) => {
      return initialState
    }
  }
});


export const {addCommunityFieldValue, removeAllCommunityFieldValue} = communitySlice.actions;


export default communitySlice.reducer;