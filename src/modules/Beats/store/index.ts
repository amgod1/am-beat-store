export type { BeatInfo } from "./InitialState.interface"
export { getBeats, uploadFile } from "./thunks"
export {
  beatsReducer,
  uploadFileToEditor,
  removeFileFromEditor,
  addTag,
  removeTag,
  // decryptTagsIds,
} from "./slice"
export { selectAllBeats, selectBeatsInfo, selectBeatsStatus } from "./selectors"
