import { FC } from "react"
import { useAppSelector } from "@/hooks"
import { selectProfileInfo, EmptyRedirect } from "@/modules/Profile"
import { CartCheckout, CartItems } from "./components"

export const UserCartPage: FC = () => {
  const { cart } = useAppSelector(selectProfileInfo)

  return !cart.length ? (
    <EmptyRedirect title="cart" />
  ) : (
    <div className="flex flex-col lg:flex-row gap-4">
      <CartItems />
      <CartCheckout />
    </div>
  )
}
