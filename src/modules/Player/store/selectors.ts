import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"

const selectPlayer = (state: RootState) => state.player

export const selectPlayerInfo = createSelector([selectPlayer], (player) => {
  return { ...player }
})

export const selectShowPlayer = createSelector(
  [selectPlayer],
  (player) => player.showPlayer
)
