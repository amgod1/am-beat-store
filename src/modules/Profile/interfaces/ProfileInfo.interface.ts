import { CartItem } from "./CartItem.interface"

export interface ProfileInfo {
  admin: boolean
  id: string
  email: string
  cart: CartItem[]
  purchasedBeats: CartItem[]
}
