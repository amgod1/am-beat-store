import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { InitialState } from "./InitialState.interface"
import { BeatInfo } from "../interfaces/BeatInfo.interface"
import { getTitleAndBpm } from "../helpers/getTitleAndBpm"
import { FileLink } from "../interfaces/FileLinks.interface"

const initialState: InitialState = {
  info: {
    file: null,
    id: null,
    title: "",
    bpm: 0,
    createdAt: 0,
    tagIds: [],
    url: "",
    available: true,
    fileLinks: {
      pro: "",
      exclusive: "",
    },
  },
  progress: 0,
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
      state.info.url = ""
      state.info.available = true
      state.info.fileLinks = {
        pro: "",
        exclusive: "",
      }
    },
    addTag: (state, { payload: tagId }: PayloadAction<string>) => {
      state.info.tagIds.push(tagId)
    },
    removeTag: (state, { payload: tagId }: PayloadAction<string>) => {
      state.info.tagIds = state.info.tagIds.filter((id) => id !== tagId)
    },
    setProgress: (state, { payload: progress }: PayloadAction<number>) => {
      state.progress = progress
    },
    setEditorInfo: (state, { payload: beat }: PayloadAction<BeatInfo>) => {
      state.info.id = beat.id
      state.info.title = beat.title
      state.info.bpm = beat.bpm
      state.info.createdAt = beat.createdAt
      state.info.tagIds = beat.tagIds
      state.info.url = beat.url
      state.info.fileLinks = beat.fileLinks
    },
    setBeatFileLinks: (
      state,
      { payload: newFileLinkInfo }: PayloadAction<FileLink>
    ) => {
      Object.assign(state.info.fileLinks, newFileLinkInfo)
    },
  },
})

export const beatsReducer = beatsSlice.reducer
export const {
  uploadFileToEditor,
  removeFileFromEditor,
  addTag,
  removeTag,
  setBeatFileLinks,
  setProgress,
  setEditorInfo,
} = beatsSlice.actions
