import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

import { beatsReducer } from "@/modules/Beats/store/slice"
import { licenseReducer } from "@/modules/License/store/slice"
import { playerReducer } from "@/modules/Player/store/slice"

export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
})

const rootReducer = combineReducers({
  [firebaseApi.reducerPath]: firebaseApi.reducer,
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
