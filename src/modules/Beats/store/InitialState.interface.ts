import { LoadingStatus } from "@/interfaces"

export interface InitialState {
  beats: BeatInfo[]
  info: BeatInfo
  status: UploadLoadingStatus
}

export interface BeatInfo {
  file: File | null
  id: string | null
  title: string
  bpm: number
  tagIds: string[]
  createdAt: number
}

interface UploadLoadingStatus extends LoadingStatus {
  progress: number
}
