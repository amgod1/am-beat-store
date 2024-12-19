import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../../store"

const selectTags = (state: RootState) => state.tags
export const selectTagsInfo = createSelector([selectTags], (tags) => tags.info)

export const selectTagsStatus = createSelector(
  [selectTags],
  (tags) => tags.status
)
