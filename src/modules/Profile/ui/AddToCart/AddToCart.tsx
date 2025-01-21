import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { IoCart } from "react-icons/io5"
import { MdOutlineUpdate } from "react-icons/md"
import { AddToCart as AddToCartProps } from "./AddToCart.interface"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Button } from "@/components"
import { ROUTES } from "@/constants/Routes"
import { selectProfileInfo } from "@/modules/Profile"
import { showModal } from "@/modules/License"
import { selectUserAuth } from "@/modules/Auth"

export const AddToCart: FC<AddToCartProps> = ({
  beatId,
  adaptiveText = true,
  onlyIcon = false,
}) => {
  const auth = useAppSelector(selectUserAuth)
  const { cart, beats: purchasedBeats } = useAppSelector(selectProfileInfo)
  const navigate = useNavigate()

  const leasePlanId = cart?.find((el) => el.beatId === beatId)?.leasePlanId

  const dispatch = useAppDispatch()

  const addToCartHandler = () => {
    if (!auth) {
      navigate(ROUTES.Login)
      return
    }

    const alreadyPurchasedLeaseId = purchasedBeats.find(
      (beat) => beat.beatId === beatId
    )?.leasePlanId

    dispatch(
      showModal({
        beatId,
        leasePlanId: alreadyPurchasedLeaseId
          ? alreadyPurchasedLeaseId + 1
          : leasePlanId || 1,
      })
    )
  }

  return onlyIcon ? (
    <button
      onClick={addToCartHandler}
      className="hover:text-warning"
      tabIndex={-1}
    >
      {leasePlanId ? <MdOutlineUpdate size="2.5rem" /> : <IoCart size="2rem" />}
    </button>
  ) : (
    <Button onClick={addToCartHandler}>
      {leasePlanId ? (
        <MdOutlineUpdate size="1.5rem" />
      ) : (
        <IoCart size="1.5rem" />
      )}
      <p className={`${adaptiveText && "hidden sm:block"}`}>
        {leasePlanId ? "upd" : "add"}
      </p>
    </Button>
  )
}
