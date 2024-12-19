import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addTag, deleteTag, getTags, updateTag } from "./thunks"
import { InitialState } from "./InitialState.interface"
import { Tag } from "../interfaces"

const initialState: InitialState = {
  info: {},
  status: {
    loading: false,
    error: null,
  },
}

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTags.pending, (state) => {
      state.status.loading = true
      state.status.error = null
    })
    builder.addCase(
      getTags.fulfilled,
      (state, { payload: tags }: PayloadAction<Tag>) => {
        state.info = tags
        state.status.loading = false
        state.status.error = null
      }
    )
    builder.addCase(
      getTags.rejected,
      (state, { payload: error }: PayloadAction<string | unknown>) => {
        state.status.loading = false
        state.status.error = typeof error === "string" ? error : "unknown error"
      }
    )
    builder.addCase(addTag.pending, (state) => {
      state.status.loading = true
      state.status.error = null
    })
    builder.addCase(
      addTag.fulfilled,
      (state, { payload: newTag }: PayloadAction<Tag>) => {
        Object.assign(state.info, newTag)
        state.status.loading = false
        state.status.error = null
      }
    )
    builder.addCase(
      addTag.rejected,
      (state, { payload: error }: PayloadAction<string | unknown>) => {
        state.status.loading = false
        state.status.error = typeof error === "string" ? error : "unknown error"
      }
    )
    builder.addCase(updateTag.pending, (state) => {
      state.status.loading = true
      state.status.error = null
    })
    builder.addCase(
      updateTag.fulfilled,
      (state, { payload: updatedTags }: PayloadAction<Tag>) => {
        Object.assign(state.info, updatedTags)

        state.status.loading = false
        state.status.error = null
      }
    )
    builder.addCase(
      updateTag.rejected,
      (state, { payload: error }: PayloadAction<string | unknown>) => {
        state.status.loading = false
        state.status.error = typeof error === "string" ? error : "unknown error"
      }
    )
    builder.addCase(deleteTag.pending, (state) => {
      state.status.loading = true
      state.status.error = null
    })
    builder.addCase(
      deleteTag.fulfilled,
      (state, { payload: id }: PayloadAction<string>) => {
        delete state.info[id]

        state.status.loading = false
        state.status.error = null
      }
    )
    builder.addCase(
      deleteTag.rejected,
      (state, { payload: error }: PayloadAction<string | unknown>) => {
        state.status.loading = false
        state.status.error = typeof error === "string" ? error : "unknown error"
      }
    )
  },
})

export const tagsReducer = tagsSlice.reducer
