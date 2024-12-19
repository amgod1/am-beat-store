import { LoadingStatus } from "@/interfaces"

export interface InitialState {
  info: UserInfo
  status: LoadingStatus
}

interface UserInfo {
  id: string | null
  email: string | null
}
