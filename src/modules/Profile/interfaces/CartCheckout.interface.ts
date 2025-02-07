import { CartItem } from "../interfaces"

export interface CartCheckout {
  purchasedBeats: CartItem[]
  cart: CartItem[]
}
