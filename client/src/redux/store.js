import {configureStore} from '@reduxjs/toolkit'
import communitySlice from './communitySlice'


const store = configureStore({
  reducer: {
    community: communitySlice,
  }
})

export default store