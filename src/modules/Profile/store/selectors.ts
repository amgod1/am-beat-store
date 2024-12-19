import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

const selectProfile = (state: RootState) => state.profile
export const selectProfileInfo = createSelector(
  [selectProfile],
  (profile) => profile.info
)
export const selectAdminStatus = createSelector(
  [selectProfile],
  (profile) => profile.info.admin
)

export const selectProfileStatus = createSelector(
  [selectProfile],
  (profile) => profile.status
)
