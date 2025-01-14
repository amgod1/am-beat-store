import { FC, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Button } from "@/components"
import {
  removeFromCart,
  selectProfileInfo,
  selectProfileStatus,
} from "@/modules/Profile"
import { selectAllBeats } from "@/modules/Beats"
import { PlayButton } from "@/modules/Player"
import { showModal } from "@/modules/License"
import { LEASES } from "@/modules/License"
import { ROUTES } from "@/constants/Routes"

export const CartItems: FC = () => {
  const { cart } = useAppSelector(selectProfileInfo)
  const { loading } = useAppSelector(selectProfileStatus)
  const navigate = useNavigate()

  const allBeats = useAppSelector(selectAllBeats)
  const dispatch = useAppDispatch()

  const decodedCart = cart.map((cartItem) => {
    const beat = allBeats.find((beat) => beat.id === cartItem.beatId)!
    const lease = LEASES.find((lease) => lease.id === cartItem.leasePlanId)

    return { lease, beat }
  })

  const updateLeseHandler = (beatId: string, leasePlanId: number) => () => {
    dispatch(showModal({ beatId, leasePlanId }))
  }

  const removeFromCartHandler = (beatId: string) => () => {
    dispatch(removeFromCart(beatId))
  }

  const openBeatPage = (id: string) => (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest("button")) {
      return
    }

    navigate(`${ROUTES.Beat}/${id}`)
  }

  return (
    <div className="flex flex-col w-full lg:w-2/3">
      {decodedCart.map((cartItem) => (
        <div
          key={cartItem.beat.id}
          className="flex flex-col sm:grid sm:grid-rows-1 sm:grid-cols-6 gap-2 sm:gap-4 sm:items-center border border-primary hover:bg-accent cursor-pointer p-4"
          onClick={openBeatPage(cartItem.beat.id!)}
        >
          <PlayButton beat={cartItem.beat} />
          <p className="col-span-2">{cartItem.beat.title}</p>
          <p className="sm:text-center">{cartItem.lease?.price}$</p>
          <Button
            onClick={updateLeseHandler(cartItem.beat.id!, cartItem.lease!.id)}
            loading={loading}
          >
            update
          </Button>
          <Button
            onClick={removeFromCartHandler(cartItem.beat.id!)}
            loading={loading}
            danger={true}
          >
            remove
          </Button>
        </div>
      ))}
    </div>
  )
}
