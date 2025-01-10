import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InitialState } from "./initialState.interface"

const initialState: InitialState = {
  info: {
    show: false,
    selectedBeatId: null,
  },
  status: {
    loading: false,
    error: null,
  },
}

const licenseSlice = createSlice({
  name: "license",
  initialState,
  reducers: {
    showModal: (state, { payload: id }: PayloadAction<string>) => {
      state.info.show = true
      state.info.selectedBeatId = id
    },
    hideModal: (state) => {
      state.info.show = false
      state.info.selectedBeatId = null
    },
  },
})

export const { showModal, hideModal } = licenseSlice.actions
export const licenseReducer = licenseSlice.reducer
