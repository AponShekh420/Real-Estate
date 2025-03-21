import { createSlice } from "@reduxjs/toolkit";

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
  communitySize: "",
  ageRestrictions: null,
  gated: null,
  builtStart: "",
  builtEnd: "",
  imgs: [],
  active: true,
  deleteImgUrls: [],
  loading: true,
  errors: {},
  zip: "",
  county: "",
  embedVideo: "",
  amenities: [],
  builders: [],
  thumbnail: "",
  pictureDone: false,
  existingImages: [],
  newImages: [],
  deletedImages: [],
  metaTitle: "",
  metaDesc: "",
  metaSlug: "",
  map: "",
  //contact not required
  name: "",
  telephone: "",
  email: "",
  notes: "",
  //closet section
  hospital: {
    name: "",
    distance: "",
  },
  airport: {
    name: "",
    distance: "",
  },
  militaryBase: {
    name: "",
    distance: "",
  },
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    addCommunityFieldValue: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeAllCommunityFieldValue: (state) => {
      return initialState;
    },
  },
});

export const { addCommunityFieldValue, removeAllCommunityFieldValue } =
  communitySlice.actions;

export default communitySlice.reducer;
