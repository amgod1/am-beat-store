import { FC } from "react"
import { useAppSelector } from "@/hooks"
import { Button } from "@/components"
import {
  selectProfileInfo,
  selectProfileStatus,
  calculateTotalPrice,
} from "@/modules/Profile"

export const CartCheckout: FC = () => {
  const { cart } = useAppSelector(selectProfileInfo)
  const { loading } = useAppSelector(selectProfileStatus)

  const totalPrice = calculateTotalPrice(cart)

  return (
    <div className="flex flex-col gap-4 w-full lg:w-1/3 border border-primary bg-accent p-4 h-fit">
      <div className="flex flex-row justify-between text-2xl">
        <p>total:</p>
        <p>{totalPrice}$</p>
      </div>
      <Button loading={loading || !cart.length} fullWidth={true}>
        proceed to checout
      </Button>
    </div>
  )
}
