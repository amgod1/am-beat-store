import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { profileReducer } from "@/modules/Profile"
import { tagsReducer } from "@/modules/Tags"
import { beatsReducer } from "@/modules/Beats"
import { playerReducer } from "@/modules/Player"
import { licenseReducer } from "@/modules/License"

export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
})

const rootReducer = combineReducers({
  [firebaseApi.reducerPath]: firebaseApi.reducer,
  profile: profileReducer,
  tags: tagsReducer,
  beats: beatsReducer,
  player: playerReducer,
  license: licenseReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(firebaseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
