import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

const selectUser = (state: RootState) => state.user
export const selectUserInfo = createSelector([selectUser], (user) => user.info)

export const selectUserAuth = createSelector(
  [selectUser],
  (user) => !!(user.info.email && user.info.id)
)
