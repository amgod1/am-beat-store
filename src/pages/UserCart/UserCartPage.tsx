import { FC } from "react"

import { useGetUserProfileQuery } from "@/modules/Profile/store/api"
import { EmptyRedirect } from "@/modules/Profile/ui/EmptyRedirect"

import { CartCheckout } from "./components/CartCheckout"
import { CartItems } from "./components/CartItems"

const UserCartPage: FC = () => {
  const { data: profile } = useGetUserProfileQuery()

  return !profile?.cart.length ? (
    <EmptyRedirect title="cart" />
  ) : (
    <div className="flex flex-col lg:flex-row gap-4">
      <CartItems />
      <CartCheckout />
    </div>
  )
}

export default UserCartPage
