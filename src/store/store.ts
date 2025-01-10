import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { userReducer } from "@/modules/Auth"
import { profileReducer } from "@/modules/Profile"
import { tagsReducer } from "@/modules/Tags"
import { beatsReducer } from "@/modules/Beats"
import { playerReducer } from "@/modules/Player"
import { licenseReducer } from "@/modules/License"

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  tags: tagsReducer,
  beats: beatsReducer,
  player: playerReducer,
  license: licenseReducer,
})

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
