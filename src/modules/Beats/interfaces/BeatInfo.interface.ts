import { FileLinks } from "./FileLinks.interface"

export interface BeatInfo {
  id: string | null
  title: string
  bpm: number
  tagIds: string[]
  createdAt: number
  url: string
  available: boolean
  fileLinks: FileLinks
}

export interface BeatFileInfo extends BeatInfo {
  file: File | null
}
