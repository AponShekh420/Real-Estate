import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  blogId: "0",
  title: "",
  desc: "",
  catagoryId: [],
  img: "",
  active: false,
  loading: true, // manually true kore dite hobe
  errors: {},
  auther: "",
  edit: false,
  metaTitle: "",
  metaDesc: "",
  metaSlug: "",
  uploadedImageChanged: false,
  uploadedImage: null,
  oldImgUrl: "",
}


const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlogFieldValue: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    removeAllBlogFieldValue: (state) => {
      return initialState
    }
  }
});


export const {addBlogFieldValue, removeAllBlogFieldValue} = blogSlice.actions;


export default blogSlice.reducer;