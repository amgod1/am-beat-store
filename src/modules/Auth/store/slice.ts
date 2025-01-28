import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "firebase/auth"
import { InitialState } from "./InitialState.interface"

const initialState: InitialState = {
  info: {
    id: null,
    email: null,
  },
  status: {
    loading: false,
    error: null,
  },
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkUserAuth: (state, { payload: user }: PayloadAction<User | null>) => {
      if (user) {
        state.info.id = user.uid
        state.info.email = user.email
      } else {
        state.info.id = null
        state.info.email = null
      }
    },
  },
})

export const userReducer = userSlice.reducer
export const { checkUserAuth } = userSlice.actions
