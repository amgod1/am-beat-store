import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { BeatInfo } from "@/modules/Beats/interfaces/BeatInfo.interface"

import { InitialState } from "./InitialState.interface"

const initialState: InitialState = {
  id: null,
  title: null,
  src: null,
  showPlayer: false,
  isPlaying: false,
  progress: 0,
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playAudio: (state, { payload: beat }: PayloadAction<BeatInfo>) => {
      if (state.id === beat.id && state.isPlaying) {
        state.isPlaying = false
      } else {
        state.isPlaying = true
        state.id = beat.id
        state.title = beat.title
        state.src = beat.url
        state.showPlayer = true
      }
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
      state.progress = 0
    },
    setAudioProgress: (
      state,
      { payload: newProgress }: PayloadAction<number>,
    ) => {
      state.progress = newProgress
    },
  },
})

export const {
  playAudio,
  pausePlaying,
  continuePlaying,
  closePlayer,
  setAudioProgress,
} = playerSlice.actions
export const playerReducer = playerSlice.reducer
