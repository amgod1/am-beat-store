import { FC, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"

import { useGetBeatsQuery } from "@/modules/Beats/store/api"
import { LEASES } from "@/modules/License/constants/Leases"
import { showModal } from "@/modules/License/store/slice"
import { PlayButton } from "@/modules/Player/ui/PlayButton"
import {
  useGetUserProfileQuery,
  useRemoveFromCartMutation,
} from "@/modules/Profile/store/api"

import { Button } from "@/components/Button"
import { Loader } from "@/components/Loader"

import { useAppDispatch } from "@/hooks/useAppDispatch"

import { ROUTES } from "@/constants/Routes"

export const CartItems: FC = () => {
  const { data: profile, isLoading: isProfileLoading } =
    useGetUserProfileQuery()
  const [removeFromCart, { isLoading: isRemoveLoading }] =
    useRemoveFromCartMutation()
  const { data: allBeats, isLoading: isBeatsLoading } = useGetBeatsQuery()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isLoading = isProfileLoading || isRemoveLoading || isBeatsLoading
  if (isLoading) {
    return <Loader />
  }

  const decodedCart = profile?.cart.map((cartItem) => {
    const beat = allBeats?.find((beat) => beat.id === cartItem.beatId)
    const lease = LEASES.find((lease) => lease.id === cartItem.leasePlanId)

    return { lease, beat }
  })

  const updateLeseHandler = (beatId: string, leasePlanId: number) => () => {
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

  const removeFromCartHandler = (beatId: string) => () => {
    removeFromCart({ prevCart: profile?.cart || [], deleteBeatId: beatId! })
  }

  const openBeatPage = (id: string) => (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest("button")) {
      return
    }

    navigate(`${ROUTES.Beat}/${id}`)
  }

  return (
    <div className="flex w-full flex-col lg:w-2/3">
      {decodedCart?.map((cartItem) => (
        <div
          key={cartItem.beat?.id}
          className="flex cursor-pointer flex-col gap-2 border border-primary p-4 hover:bg-accent sm:grid sm:grid-cols-6 sm:grid-rows-1 sm:items-center sm:gap-4"
          onClick={openBeatPage(cartItem.beat?.id!)}
        >
          {cartItem?.beat && <PlayButton beat={cartItem.beat} />}
          <p className="col-span-2">{cartItem.beat?.title}</p>
          <p className="sm:text-center">{cartItem.lease?.price}$</p>
          <Button
            onClick={updateLeseHandler(cartItem.beat?.id!, cartItem.lease!.id)}
            loading={isLoading}
          >
            update
          </Button>
          <Button
            onClick={removeFromCartHandler(cartItem?.beat?.id!)}
            loading={isLoading}
            danger={true}
          >
            remove
          </Button>
        </div>
      ))}
    </div>
  )
}
