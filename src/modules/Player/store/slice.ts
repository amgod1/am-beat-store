import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { InitialState } from "./InitialState.interface"
import { BeatInfo } from "@/modules/Beats"

const initialState: InitialState = {
  id: null,
  title: null,
  src: null,
  showPlayer: false,
  isPlaying: false,
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playAudio: (state, { payload: beat }: PayloadAction<BeatInfo>) => {
      state.id = beat.id
      state.title = beat.title
      state.src = beat.url
      state.showPlayer = true
      state.isPlaying = true
    },
    pausePlaying: (state) => {
      state.isPlaying = false
    },
    continuePlaying: (state) => {
      state.isPlaying = true
    },
    closePlayer: (state) => {
      state.id = null
      state.title = null
      state.src = null
      state.showPlayer = false
      state.isPlaying = false
    },
  },
})

export const { playAudio, pausePlaying, continuePlaying, closePlayer } =
  playerSlice.actions
export const playerReducer = playerSlice.reducer
