import { FC } from "react"
import { LEASES } from "@/modules/License"
import { useAppSelector } from "@/hooks"
import { selectProfileInfo, selectProfileStatus } from "@/modules/Profile"
import { Button } from "@/components"

export const CartCheckout: FC = () => {
  const { cart } = useAppSelector(selectProfileInfo)
  const { loading } = useAppSelector(selectProfileStatus)

  const totalPrice = cart.reduce(
    (price, cartItem) =>
      (price += LEASES.find((lease) => lease.id === cartItem.leasePlanId)
        ?.price!),
    0
  )

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
