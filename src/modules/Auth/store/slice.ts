import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "firebase/auth"
import { InitialState } from "./InitialState.interface"
import { login, signUp } from "./thunks"
import { ShortUserInfo } from "../helpers"

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
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.status.loading = true
      state.status.error = null
    })
    builder.addCase(
      login.fulfilled,
      (state, { payload: user }: PayloadAction<ShortUserInfo | undefined>) => {
        if (user) {
          state.info.email = user.email
          state.info.id = user.id
        }

        state.status.loading = false
        state.status.error = null
      }
    )
    builder.addCase(
      login.rejected,
      (state, { payload: error }: PayloadAction<string | unknown>) => {
        state.status.loading = false
        state.status.error = typeof error === "string" ? error : "unknown error"
      }
    )
    builder.addCase(signUp.pending, (state) => {
      state.status.loading = true
      state.status.error = null
    })
    builder.addCase(
      signUp.fulfilled,
      (state, { payload: user }: PayloadAction<ShortUserInfo | undefined>) => {
        if (user) {
          state.info.email = user.email
          state.info.id = user.id
        }

        state.status.loading = false
        state.status.error = null
      }
    )
    builder.addCase(
      signUp.rejected,
      (state, { payload: error }: PayloadAction<string | unknown>) => {
        state.status.loading = false
        state.status.error = typeof error === "string" ? error : "unknown error"
      }
    )
  },
})

export const userReducer = userSlice.reducer
export const { checkUserAuth } = userSlice.actions
