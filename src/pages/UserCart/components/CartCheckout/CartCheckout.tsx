import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components"
import { ROUTES } from "@/constants/Routes"
import { calculateTotalPrice } from "@/modules/Profile"
import {
  useGetUserProfileQuery,
  usePurchaseBeatsMutation,
} from "@/modules/Profile/store/api"
import { useMakeBeatsUnavailableMutation } from "@/modules/Beats/store/api"

export const CartCheckout: FC = () => {
  const { data: profile, isLoading: isProfileLoading } =
    useGetUserProfileQuery()
  const [purchaseBeats, { isLoading: isPurchaseLoading }] =
    usePurchaseBeatsMutation()
  const [makeBeatsUnavailable, { isLoading: isMakeUnavaialbeLoading }] =
    useMakeBeatsUnavailableMutation()
  const navigate = useNavigate()

  const totalPrice = calculateTotalPrice(profile?.cart || [])
  const isLoading =
    isProfileLoading || isPurchaseLoading || isMakeUnavaialbeLoading

  const checkoutHandler = async () => {
    const { purchasedBeats, cart } = profile!

    await purchaseBeats({ purchasedBeats, cart })
    await makeBeatsUnavailable(cart)
    navigate(ROUTES.UserBeats)
  }

  return (
    <div className="flex flex-col gap-4 w-full lg:w-1/3 border border-primary bg-accent p-4 h-fit">
      <div className="flex flex-row justify-between text-2xl">
        <p>total:</p>
        <p>{totalPrice}$</p>
      </div>
      <Button
        onClick={checkoutHandler}
        loading={isLoading || !profile?.cart.length}
        fullWidth={true}
      >
        proceed to checkout
      </Button>
    </div>
  )
}
