import { configureStore } from '@reduxjs/toolkit'
import { freeToGameApi } from './freeToGameApi'

export const store = configureStore({
  reducer: {
    [freeToGameApi.reducerPath]: freeToGameApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(freeToGameApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch