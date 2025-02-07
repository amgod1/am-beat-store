import { LEASES } from "@/modules/License/constants/Leases"
import { CartItem } from "../interfaces/CartItem.interface"

export const calculateTotalPrice = (cart: CartItem[]): number =>
  cart.reduce(
    (price, cartItem) =>
      (price += LEASES.find((lease) => lease.id === cartItem.leasePlanId)
        ?.price!),
    0
  )
