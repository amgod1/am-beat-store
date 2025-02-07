import { FC } from "react"
import { IoCart } from "react-icons/io5"
import { MdOutlineUpdate } from "react-icons/md"
import { useNavigate } from "react-router-dom"

import { useCurrentUserAuth } from "@/modules/Auth/hooks/useCurrentUserAuth"
import { showModal } from "@/modules/License/store/slice"

import { Button } from "@/components/Button"

import { useAppDispatch } from "@/hooks/useAppDispatch"

import { ROUTES } from "@/constants/Routes"

import { useGetUserProfileQuery } from "../../store/api"
import { AddToCart as AddToCartProps } from "./AddToCart.interface"

export const AddToCart: FC<AddToCartProps> = ({
  beatId,
  adaptiveText = true,
  onlyIcon = false,
}) => {
  const { user } = useCurrentUserAuth()
  const { data: profile } = useGetUserProfileQuery()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const leasePlanId = profile?.cart?.find(
    (el) => el.beatId === beatId,
  )?.leasePlanId

  const addToCartHandler = () => {
    if (!user) {
      navigate(ROUTES.Login)
      return
    }

    const alreadyPurchasedLeaseId = profile?.purchasedBeats.find(
      (beat) => beat.beatId === beatId,
    )?.leasePlanId

    dispatch(
      showModal({
        beatId,
        leasePlanId: alreadyPurchasedLeaseId
          ? alreadyPurchasedLeaseId + 1
          : leasePlanId || 1,
      }),
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
