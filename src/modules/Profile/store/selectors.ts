import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

const selectInfo = (state: RootState) => state.profile.info
export const selectProfileInfo = createSelector([selectInfo], (info) => info)
export const selectAdmin = createSelector([selectInfo], (info) => info.admin)

const selectStatus = (state: RootState) => state.profile.status
export const selectProfileStatus = createSelector(
  [selectStatus],
  (status) => status
)
