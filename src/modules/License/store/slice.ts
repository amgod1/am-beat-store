import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { CartItem } from "@/modules/Profile/interfaces"

import { InitialState } from "./initialState.interface"

const initialState: InitialState = {
  show: false,
  selectedBeatId: null,
  selectedLeasePlanId: 1,
}

const licenseSlice = createSlice({
  name: "license",
  initialState,
  reducers: {
    showModal: (state, { payload: info }: PayloadAction<CartItem>) => {
      state.show = true
      state.selectedBeatId = info.beatId
      state.selectedLeasePlanId = info.leasePlanId
    },
    hideModal: (state) => {
      state.show = false
      state.selectedBeatId = null
      state.selectedLeasePlanId = 1
    },
    updateLeasePlanId: (state, { payload: id }: PayloadAction<number>) => {
      state.selectedLeasePlanId = id
    },
  },
})

export const { showModal, hideModal, updateLeasePlanId } = licenseSlice.actions
export const licenseReducer = licenseSlice.reducer
