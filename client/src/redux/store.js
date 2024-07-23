import {configureStore} from '@reduxjs/toolkit'
import communitySlice from './communitySlice'
import citySlice from './citySlice'
import stateSlice from './stateSlice'
import areaSlice from './areaSlice'
import modelSlice from './modelSlice'


const store = configureStore({
  reducer: {
    community: communitySlice,
    city: citySlice,
    state: stateSlice,
    area: areaSlice,
    model: modelSlice
  }
})

export default store