import { LoadingStatus } from "@/interfaces"

export interface InitialState {
  beats: BeatInfo[]
  info: BeatFileInfo
  status: UploadLoadingStatus
}

export interface BeatInfo {
  id: string | null
  title: string
  bpm: number
  tagIds: string[]
  createdAt: number
  url: string
}

export interface BeatFileInfo extends BeatInfo {
  file: File | null
}

interface UploadLoadingStatus extends LoadingStatus {
  progress: number
}
