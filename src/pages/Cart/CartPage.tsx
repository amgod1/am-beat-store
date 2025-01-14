import { useAppSelector } from "@/hooks"
import { selectProfileInfo } from "@/modules/Profile"
import { FC } from "react"
import { CartCheckout, CartItems, EmptyCart, Profile } from "./components"

export const CartPage: FC = () => {
  const { cart } = useAppSelector(selectProfileInfo)

  return (
    <section className="flex flex-col gap-4 w-full">
      <Profile />
      {!cart.length ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col lg:flex-row gap-4">
          <CartItems />
          <CartCheckout />
        </div>
      )}
    </section>
  )
}
