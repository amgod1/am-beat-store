import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../../store"

const selectBeats = (state: RootState) => state.beats

export const selectAllBeats = createSelector(
  [selectBeats],
  (beats) => beats.beats
)
export const selectBeatsInfo = createSelector(
  [selectBeats],
  (beats) => beats.info
)

export const selectBeatsStatus = createSelector(
  [selectBeats],
  (beats) => beats.status
)
