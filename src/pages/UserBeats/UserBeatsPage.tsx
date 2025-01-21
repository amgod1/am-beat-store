import { FC, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Button } from "@/components"
import { selectProfileInfo, selectProfileStatus } from "@/modules/Profile"
import { selectAllBeats } from "@/modules/Beats"
import { PlayButton } from "@/modules/Player"
import { showModal } from "@/modules/License"
import { LEASES } from "@/modules/License"
import { ROUTES } from "@/constants/Routes"

export const UserBeatsPage: FC = () => {
  const { beats: purchasedBeats } = useAppSelector(selectProfileInfo)
  const { allBeats } = useAppSelector(selectAllBeats)
  const { loading } = useAppSelector(selectProfileStatus)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const decodedBeats = purchasedBeats.map((cartItem) => {
    const beat = allBeats.find((beat) => beat.id === cartItem.beatId)!
    const lease = LEASES.find((lease) => lease.id === cartItem.leasePlanId)

    return { lease, beat }
  })

  const openBeatPage = (id: string) => (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest("button")) {
      return
    }

    navigate(`${ROUTES.Beat}/${id}`)
  }

  const updateLeseHandler = (beatId: string, leasePlanId: number) => () => {
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

  return (
    <div className="flex flex-col w-full lg:w-2/3">
      {decodedBeats.map((beatItem) => (
        <div
          key={beatItem.beat.id}
          className="flex flex-col sm:grid sm:grid-rows-1 sm:grid-cols-6 gap-2 sm:gap-4 sm:items-center border border-primary hover:bg-accent cursor-pointer p-4"
          onClick={openBeatPage(beatItem.beat.id!)}
        >
          <PlayButton beat={beatItem.beat} />
          <p className="col-span-2">{beatItem.beat.title}</p>
          <p className="sm:text-center">{beatItem.lease?.title}</p>
          <Button
            onClick={updateLeseHandler(beatItem.beat.id!, beatItem.lease!.id)}
            loading={loading}
          >
            update
          </Button>
          <Button loading={loading}>download</Button>
        </div>
      ))}
    </div>
  )
}
