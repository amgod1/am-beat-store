import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store/store"

const selectBeats = (state: RootState) => state.beats

export const selectBeatsInfo = createSelector(
  [selectBeats],
  (beats) => beats.info
)

export const selectUploadProgress = createSelector(
  [selectBeats],
  (beats) => beats.progress
)
