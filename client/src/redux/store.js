import {configureStore} from '@reduxjs/toolkit'
import communitySlice from './communitySlice'
import citySlice from './citySlice'
import stateSlice from './stateSlice'
import areaSlice from './areaSlice'
import modelSlice from './modelSlice'
import catagorySlice from './catagorySlice'
import subCatagorySlice from './subCatagorySlice'


const store = configureStore({
  reducer: {
    community: communitySlice,
    city: citySlice,
    state: stateSlice,
    area: areaSlice,
    model: modelSlice,
    catagory: catagorySlice,
    subcatagory: subCatagorySlice,
  }
})

export default store