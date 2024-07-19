import {configureStore} from '@reduxjs/toolkit'
import communitySlice from './communitySlice'
import citySlice from './citySlice'
import stateSlice from './stateSlice'
import areaSlice from './areaSlice'


const store = configureStore({
  reducer: {
    community: communitySlice,
    city: citySlice,
    state: stateSlice,
    area: areaSlice
  }
})

export default store