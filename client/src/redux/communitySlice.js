import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  communityId: "0",
  title: "",
  description: "",
  website: "",
  phone: "",
  address: "",
  stateId: null,
  cityId: null,
  areaId: null,
  minPrice: 0,
  maxPrice: 0,
  homeTypes: [],
  communitySize: "0",
  ageRestrictions: true,
  gated: true,
  builtStart: "",
  builtEnd: "",
  imgs: [],
  active: true,
  deleteImgUrls: [],
  loading: true,
  errors: {},
  zip: "",
  amenities: [],
  thumbnail: "",
  existingImages: [],
  newImages: [],
  deletedImages: [],
  metaTitle: "",
  metaDesc: "",
  metaSlug: "",
  map: "",
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