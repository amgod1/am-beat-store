import { Tag } from "../interfaces"
import { LoadingStatus } from "../../../interfaces/LoadingStatus.interface"

export interface InitialState {
  info: Tag
  status: LoadingStatus
}
