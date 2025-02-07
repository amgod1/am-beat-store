import { CartItem } from "../interfaces/CartItem.interface"

export interface CartCheckout {
  purchasedBeats: CartItem[]
  cart: CartItem[]
}
