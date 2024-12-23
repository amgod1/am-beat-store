import { LoadingStatus } from "@/interfaces"

export interface InitialState {
  info: PlayerInfo
  status: LoadingStatus
}

interface PlayerInfo {
  title: string | null
  src: string | null
  show: boolean
  isPlaying: boolean
}
