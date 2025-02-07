import { FC, Fragment, MouseEvent, TouchEvent, useEffect } from "react"
import { MdClose } from "react-icons/md"

import { LEASES } from "@/modules/License/constants/Leases"
import {
  useAddToCartMutation,
  useGetUserProfileQuery,
  useRemoveFromCartMutation,
} from "@/modules/Profile/store/api"

import { Button } from "@/components/Button"

import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"

import { selectCartItem } from "../../store/selectors"
import { hideModal, updateLeasePlanId } from "../../store/slice"
import { LeaseInfo, LeaseItem } from "./components"

export const LicenseModal: FC = () => {
  const { data: profile } = useGetUserProfileQuery()
  const [addToCart, { isLoading: isAddLoading }] = useAddToCartMutation()
  const [removeFromCart, { isLoading: isRemoveLoading }] =
    useRemoveFromCartMutation()
  const { beatId, leasePlanId } = useAppSelector(selectCartItem)
  const dispatch = useAppDispatch()

  const alreadyPurchasedLeaseId = profile?.purchasedBeats.find(
    (beat) => beat.beatId === beatId,
  )?.leasePlanId

  const isLoading = isAddLoading && isRemoveLoading
  const alreadyAdded = profile?.cart.find((el) => el.beatId === beatId)
  const disableButton = alreadyAdded?.leasePlanId === leasePlanId
  const price = LEASES.find((lease) => lease.id === leasePlanId)?.price

  const hideModalHandler = () => {
    if (isLoading) return
    dispatch(hideModal())
  }

  const preventPropagation = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation()
  }

  const updateLeasePlan = (id: number) => () => {
    if (isLoading) return
    dispatch(updateLeasePlanId(id))
  }

  const addToCartHandler = async () => {
    const newCartItem = {
      leasePlanId,
      beatId: beatId!,
    }

    await addToCart({ prevCart: profile?.cart || [], newCartItem })
    hideModalHandler()
  }

  const removeFromCartHandler = async () => {
    await removeFromCart({
      prevCart: profile?.cart || [],
      deleteBeatId: beatId!,
    })
    hideModalHandler()
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })

    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <div
      onClick={hideModalHandler}
      className="w-full h-screen bg-dark bg-opacity-75 absolute left-1/2 transform -translate-x-1/2 z-10"
    >
      <section
        onClick={preventPropagation}
        className="flex flex-col gap-4 w-3/4 h-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent border-primary border p-4 sm:p-8 overflow-y-scroll"
      >
        <div className="flex justify-end">
          <button onClick={hideModalHandler} className="hover:text-warning">
            <MdClose size="2.5rem" />
          </button>
        </div>
        <div className="flex flex-col gap-4 sm:gap-8">
          {LEASES.map((lease) => (
            <Fragment key={lease.id}>
              <LeaseItem
                key={lease.id}
                lease={lease}
                selected={lease.id === leasePlanId}
                disabled={
                  !!alreadyPurchasedLeaseId &&
                  lease.id <= alreadyPurchasedLeaseId
                }
                onClick={updateLeasePlan(lease.id)}
              />
              {lease.id === leasePlanId && <LeaseInfo id={leasePlanId} />}
            </Fragment>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full items-center">
          <h3 className="w-full text-lg">{`total: ${price}$`}</h3>
          <Button
            onClick={addToCartHandler}
            loading={disableButton || isLoading}
            fullWidth={true}
          >
            {alreadyAdded ? "update" : "add"}
          </Button>
          {alreadyAdded && (
            <Button
              onClick={removeFromCartHandler}
              danger={true}
              loading={isLoading}
              fullWidth={true}
            >
              remove
            </Button>
          )}
          <Button onClick={hideModalHandler} danger={true} fullWidth={true}>
            close
          </Button>
        </div>
      </section>
    </div>
  )
}
