import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

const selectPlayer = (state: RootState) => state.player

export const selectPlayerInfo = createSelector([selectPlayer], (player) => {
  return { ...player }
})

export const selectPlayerStatus = createSelector(
  [selectPlayer],
  (player) => player.showPlayer
)
