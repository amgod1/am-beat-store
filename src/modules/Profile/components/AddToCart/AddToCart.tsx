import { FC } from "react"
import { Link } from "react-router-dom"
import { IoCart } from "react-icons/io5"
import { MdOutlineUpdate } from "react-icons/md"
import { AddToCartInterface } from "./AddToCart.interface"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Button } from "@/components"
import { ROUTES } from "@/constants/Routes"
import { selectProfileInfo } from "@/modules/Profile"
import { showModal } from "@/modules/License"
import { selectUserAuth } from "@/modules/Auth"

export const AddToCart: FC<AddToCartInterface> = ({ beatId }) => {
  const auth = useAppSelector(selectUserAuth)
  const { cart } = useAppSelector(selectProfileInfo)

  const leasePlanId = cart?.find((el) => el.beatId === beatId)?.leasePlanId

  const dispatch = useAppDispatch()

  const addToCartHandler = () => {
    dispatch(showModal({ beatId, leasePlanId: leasePlanId || 1 }))
  }

  return !auth ? (
    <Link to={ROUTES.Login}>
      <Button>
        <IoCart size="1.5rem" />
        <p className="hidden sm:block">add</p>
      </Button>
    </Link>
  ) : (
    <Button onClick={addToCartHandler}>
      {leasePlanId ? (
        <MdOutlineUpdate size="1.5rem" />
      ) : (
        <IoCart size="1.5rem" />
      )}
      <p className="hidden sm:block">{leasePlanId ? "update" : "add"}</p>
    </Button>
  )
}
