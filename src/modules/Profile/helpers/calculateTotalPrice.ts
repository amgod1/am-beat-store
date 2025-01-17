import { LEASES } from "@/modules/License"
import { CartItem } from "../store"

export const calculateTotalPrice = (cart: CartItem[]): number =>
  cart.reduce(
    (price, cartItem) =>
      (price += LEASES.find((lease) => lease.id === cartItem.leasePlanId)
        ?.price!),
    0
  )
