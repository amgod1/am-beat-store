import { LoadingStatus } from "@/interfaces"

export interface InitialState {
  info: ProfileInfo
  status: LoadingStatus
}

export interface ProfileInfo {
  id: string | null
  email: string | null
  admin: false
  cart: CartItem[]
}

export interface CartItem {
  beatId: string
  leasePlanId: number
}
