import { createSlice } from "@reduxjs/toolkit"
import { InitialState } from "./InitialState.interface"

const initialState: InitialState = {
  info: {
    title: null,
    src: null,
    show: false,
    isPlaying: false,
  },
  status: {
    loading: false,
    error: null,
  },
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    showPlayer: (state) => {
      state.info.show = true
    },
  },
})

export const { showPlayer } = playerSlice.actions
export const playerReducer = playerSlice.reducer
