import { LoadingStatus } from "@/interfaces"

export interface InitialState {
  info: {
    show: boolean
    selectedBeatId: string | null
  }
  status: LoadingStatus
}
