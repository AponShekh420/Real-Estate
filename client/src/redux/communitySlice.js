import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  title: "",
  website: "",
  phone: "",
  address: "",
  state: "",
  city: "",
  area: "",
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
    }
  }
});


export const {addCommunityFieldValue} = communitySlice.actions;


export default communitySlice.reducer;