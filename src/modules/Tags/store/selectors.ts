import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../../store"

const selectTags = (state: RootState) => state.tags

export const selectTagsInfo = createSelector([selectTags], (tags) => {
  return {
    allTagsObject: tags.info,
    allTagsArray: Object.entries(tags.info).map(([id, value]) => ({
      id,
      value,
    })),
  }
})

export const selectTagsStatus = createSelector(
  [selectTags],
  (tags) => tags.status
)
