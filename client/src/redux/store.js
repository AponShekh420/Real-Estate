import {configureStore} from '@reduxjs/toolkit'
import communitySlice from './communitySlice'
import citySlice from './citySlice'
import stateSlice from './stateSlice'
import areaSlice from './areaSlice'
import modelSlice from './modelSlice'
import catagorySlice from './catagorySlice'
import userSlice from './userSlice'
import blogSlice from './blogSlice'
import communityFilterSlice from './communityFilterSlice'
import blogFilterSlice from './blogFilterSlice'
import resultFilterSlice from './resultFilterSlice'


const store = configureStore({
  reducer: {
    community: communitySlice,
    city: citySlice,
    state: stateSlice,
    area: areaSlice,
    model: modelSlice,
    catagory: catagorySlice,
    user: userSlice,
    blog: blogSlice,
    communityFilter: communityFilterSlice,
    blogFilter: blogFilterSlice,
    resultsFilter: resultFilterSlice
  }
})

export default store