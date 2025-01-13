import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CartItem, InitialState, ProfileInfo } from "./InitialState.interface"
import { addToCart, createUserProfile, getUserProfile } from "./thunks"
import { ShortUserInfo } from "@/modules/Auth"

const initialState: InitialState = {
  info: {
    id: null,
    email: null,
    admin: false,
    cart: [],
  },
  status: {
    loading: false,
    error: null,
  },
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.info.id = null
      state.info.email = null
      state.info.admin = false
      state.info.cart = []
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserProfile.pending, (state) => {
      state.status.loading = true
      state.status.error = null
    })
    builder.addCase(
      getUserProfile.fulfilled,
      (state, { payload: profile }: PayloadAction<ProfileInfo | null>) => {
        if (profile) {
          state.info.id = profile.id
          state.info.email = profile.email
          state.info.admin = profile.admin
          state.info.cart = profile.cart
        }

        state.status.loading = false
        state.status.error = null
      }
    )
    builder.addCase(
      getUserProfile.rejected,
      (state, { payload: error }: PayloadAction<string | unknown>) => {
        state.status.loading = false
        state.status.error = typeof error === "string" ? error : "unknown error"
      }
    )
    builder.addCase(createUserProfile.pending, (state) => {
      state.status.loading = true
      state.status.error = null
    })
    builder.addCase(
      createUserProfile.fulfilled,
      (state, { payload: info }: PayloadAction<ShortUserInfo>) => {
        state.info.id = info.id
        state.info.email = info.email

        state.status.loading = false
        state.status.error = null
      }
    )
    builder.addCase(
      createUserProfile.rejected,
      (state, { payload: error }: PayloadAction<string | unknown>) => {
        state.status.loading = false
        state.status.error = typeof error === "string" ? error : "unknown error"
      }
    )
    builder.addCase(addToCart.pending, (state) => {
      state.status.loading = true
      state.status.error = null
    })
    builder.addCase(
      addToCart.fulfilled,
      (state, { payload: updatedCart }: PayloadAction<CartItem[]>) => {
        state.info.cart = updatedCart
        state.status.loading = false
        state.status.error = null
      }
    )
    builder.addCase(
      addToCart.rejected,
      (state, { payload: error }: PayloadAction<string | unknown>) => {
        state.status.loading = false
        state.status.error = typeof error === "string" ? error : "unknown error"
      }
    )
  },
})

export const { clearProfile } = profileSlice.actions
export const profileReducer = profileSlice.reducer
