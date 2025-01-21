import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Button } from "@/components"
import { ROUTES } from "@/constants/Routes"
import {
  selectProfileInfo,
  selectProfileStatus,
  calculateTotalPrice,
  purchaseBeats,
} from "@/modules/Profile"

export const CartCheckout: FC = () => {
  const { cart } = useAppSelector(selectProfileInfo)
  const { loading } = useAppSelector(selectProfileStatus)
  const dispath = useAppDispatch()
  const navigate = useNavigate()

  const totalPrice = calculateTotalPrice(cart)

  const checkoutHandler = async () => {
    await dispath(purchaseBeats())
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
        loading={loading || !cart.length}
        fullWidth={true}
      >
        proceed to checkout
      </Button>
    </div>
  )
}
