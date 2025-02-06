import { FC } from "react"
import { EmptyRedirect } from "@/modules/Profile"
import { CartCheckout, CartItems } from "./components"
import { useGetUserProfileQuery } from "@/modules/Profile/store/api"

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
