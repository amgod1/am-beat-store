import { FC, Fragment, MouseEvent, TouchEvent, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { MdClose } from "react-icons/md"
import { Button } from "@/components"
import { LEASES } from "@/modules/License/constants"
import {
  addToCart,
  removeFromCart,
  selectProfileInfo,
  selectProfileStatus,
} from "@/modules/Profile"
import { hideModal, updateLeasePlanId, selectCartItem } from "../../store"
import { LeaseInfo, LeaseItem } from "./components"

export const LicenseModal: FC = () => {
  const { cart } = useAppSelector(selectProfileInfo)
  const { beatId, leasePlanId } = useAppSelector(selectCartItem)
  const { loading } = useAppSelector(selectProfileStatus)
  const dispatch = useAppDispatch()

  const alreadyAdded = cart.find((el) => el.beatId === beatId)
  const disableButton = alreadyAdded?.leasePlanId === leasePlanId
  const price = LEASES.find((lease) => lease.id === leasePlanId)?.price

  const hideModalHandler = () => {
    if (loading) return
    dispatch(hideModal())
  }

  const preventPropagation = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation()
  }

  const updateLeasePlan = (id: number) => () => {
    if (loading) return
    dispatch(updateLeasePlanId(id))
  }

  const addToCartHandler = async () => {
    const cartItem = {
      leasePlanId,
      beatId: beatId!,
    }

    await dispatch(addToCart(cartItem))
    hideModalHandler()
  }

  const removeFromCartHandler = async () => {
    await dispatch(removeFromCart(beatId!))
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
                onClick={updateLeasePlan(lease.id)}
              />
              {lease.id === leasePlanId && <LeaseInfo id={leasePlanId} />}
            </Fragment>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full items-center">
          <h3 className="w-full text-lg">{`total: ${price}$`}</h3>
          <Button
            // disabled={disableButton}
            onClick={addToCartHandler}
            loading={disableButton || loading}
            fullWidth={true}
          >
            {alreadyAdded ? "update" : "add"}
          </Button>
          {alreadyAdded && (
            <Button
              onClick={removeFromCartHandler}
              danger={true}
              loading={loading}
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
