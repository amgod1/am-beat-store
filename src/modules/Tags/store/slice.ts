import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getTags } from "./thunks"
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
  },
})

export const tagsReducer = tagsSlice.reducer
