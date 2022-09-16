import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { freeToGameApi } from './freeToGameApi'
import { localStorageSlice } from './slices/localStorageSlice'
import { userSlice } from './slices/userSlice'

const rootReducer = combineReducers({
  [freeToGameApi.reducerPath]: freeToGameApi.reducer,
  user: userSlice.reducer,
  local: localStorageSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['local'],
}

 
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(freeToGameApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch