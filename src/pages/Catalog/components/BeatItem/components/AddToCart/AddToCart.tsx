import { FC } from "react"
import { IoCart } from "react-icons/io5"
import { AddToCartInterface } from "./AddToCart.interface"
import { Button } from "@/components"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { showModal } from "@/modules/License"
import { selectProfileInfo } from "@/modules/Profile"

export const AddToCart: FC<AddToCartInterface> = ({ beatId }) => {
  const { cart } = useAppSelector(selectProfileInfo)
  const leasePlanId = cart?.find((el) => el.beatId === beatId)?.leasePlanId

  const dispatch = useAppDispatch()
  const addToCartHandler = () => {
    dispatch(showModal({ beatId, leasePlanId: leasePlanId || 1 }))
  }

  return (
    <div className="flex justify-end sm:justify-center p-3 sm:p-5">
      <Button onClick={addToCartHandler}>
        <IoCart size="1.5rem" />
        <p className="hidden sm:block">{leasePlanId ? "update" : "add"}</p>
      </Button>
    </div>
  )
}
