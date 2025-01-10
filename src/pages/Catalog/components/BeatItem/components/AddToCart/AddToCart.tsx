import { FC } from "react"
import { IoCart } from "react-icons/io5"
import { AddToCartInterface } from "./AddToCart.interface"
import { Button } from "@/components"
import { useAppDispatch } from "@/hooks"
import { showModal } from "@/modules/License"

export const AddToCart: FC<AddToCartInterface> = ({ id }) => {
  const dispatch = useAppDispatch()
  const addToCartHandler = () => {
    dispatch(showModal(id))
  }

  return (
    <div className="flex justify-end sm:justify-center p-3 sm:p-5">
      <Button onClick={addToCartHandler}>
        <IoCart size="1.5rem" />
        <p className="hidden sm:block">add</p>
      </Button>
    </div>
  )
}
