import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { BeatInfo, InitialState } from "./InitialState.interface"
import { getTitleAndBpm } from "../helpers"
import { getBeats, uploadInfo, uploadFile } from "./thunks"

const initialState: InitialState = {
  beats: [],
  info: {
    file: null,
    id: null,
    title: "",
    bpm: 0,
    createdAt: 0,
    tagIds: [],
    tags: [],
  },
  status: {
    progress: 0,
    loading: false,
    error: null,
  },
}

const beatsSlice = createSlice({
  name: "beats",
  initialState,
  reducers: {
    uploadFileToEditor: (state, { payload: mp3 }: PayloadAction<File>) => {
      state.info.file = mp3
      ;[state.info.title, state.info.bpm] = getTitleAndBpm(mp3.name)
    },
    removeFileFromEditor: (state) => {
      state.info.file = null
      state.info.id = null
      state.info.title = ""
      state.info.bpm = 0
      state.info.tagIds = []
      state.info.tags = []
    },
    addTag: (state, { payload: tagId }: PayloadAction<string>) => {
      state.info.tagIds.push(tagId)
    },
    removeTag: (state, { payload: tagId }: PayloadAction<string>) => {
      state.info.tagIds = state.info.tagIds.filter((id) => id !== tagId)
    },
    setProgress: (state, { payload: progress }: PayloadAction<number>) => {
      state.status.progress = progress
    },
    // decryptTagsIds: (state, { payload: tags }: PayloadAction<TagsData>) => {
    //   const allBeats = state.beats
    //   const map: Record<string, string> = {}

    //   for (const tagGroup in tags) {
    //     for (const tag of tags[tagGroup]) {
    //       map[tag.id] = tag.tag
    //     }
    //   }

    //   for (const beat of allBeats) {
    //     beat.decryptedTags = {}

    //     for (const tagName in beat.tags) {
    //       beat.decryptedTags[tagName] = beat.tags[tagName].reduce(
    //         (acc, tagId) => {
    //           acc[tagId] = map[tagId]
    //           return acc
    //         },
    //         {} as Record<string, string>
    //       )
    //     }
    //   }
    // },
  },
  extraReducers(builder) {
    builder.addCase(getBeats.pending, (state) => {
      state.status.loading = true
      state.status.error = null
    })
    builder.addCase(
      getBeats.fulfilled,
      (state, { payload: beats }: PayloadAction<BeatInfo[]>) => {
        state.beats = beats
        state.status.loading = false
        state.status.error = null
      }
    )
    builder.addCase(
      getBeats.rejected,
      (state, { payload: error }: PayloadAction<string | unknown>) => {
        state.status.loading = false
        state.status.error = typeof error === "string" ? error : "unknown error"
      }
    )
    builder.addCase(uploadFile.pending, (state) => {
      state.status.progress = 1
      state.status.loading = true
      state.status.error = null
    })
    builder.addCase(uploadFile.fulfilled, (state) => {
      state.status.progress = 100
      state.status.error = null
    })
    builder.addCase(
      uploadFile.rejected,
      (state, { payload: error }: PayloadAction<string | unknown>) => {
        state.status.progress = 0
        state.status.loading = false
        state.status.error = typeof error === "string" ? error : "unknown error"
      }
    )
    builder.addCase(uploadInfo.pending, (state) => {
      state.status.loading = true
      state.status.error = null
    })
    builder.addCase(
      uploadInfo.fulfilled,
      (state, { payload: uploadedBeatInfo }: PayloadAction<BeatInfo>) => {
        state.beats.push(uploadedBeatInfo)

        state.info.file = null
        state.info.id = null
        state.info.title = ""
        state.info.bpm = 0
        state.info.createdAt = 0
        state.info.tagIds = []
        state.info.tags = []

        state.status.progress = 0
        state.status.loading = false
        state.status.error = null
      }
    )
    builder.addCase(
      uploadInfo.rejected,
      (state, { payload: error }: PayloadAction<string | unknown>) => {
        state.status.progress = 0
        state.status.loading = false
        state.status.error = typeof error === "string" ? error : "unknown error"
      }
    )
  },
})

export const beatsReducer = beatsSlice.reducer
export const {
  uploadFileToEditor,
  removeFileFromEditor,
  addTag,
  removeTag,
  setProgress,
  // decryptTagsIds,
} = beatsSlice.actions
