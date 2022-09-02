import { configureStore } from '@reduxjs/toolkit'
import { freeToGameApi } from './freeToGameApi'
import { userSlice } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    [freeToGameApi.reducerPath]: freeToGameApi.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(freeToGameApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch