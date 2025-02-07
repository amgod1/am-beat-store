import { FC, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { Button } from "@/components/Button"
import { Loader } from "@/components/Loader"
import { EmptyRedirect } from "@/modules/Profile/ui/EmptyRedirect"
import { PlayButton } from "@/modules/Player/ui/PlayButton"
import { showModal } from "@/modules/License/store/slice"
import { LEASES } from "@/modules/License/constants/Leases"
import { ROUTES } from "@/constants/Routes"
import { DownloadButton } from "./components/DownloadButton"
import { useGetUserProfileQuery } from "@/modules/Profile/store/api"
import { useGetBeatsQuery } from "@/modules/Beats/store/api"

const UserBeatsPage: FC = () => {
  const { data: profile, isLoading: isProfileLoading } =
    useGetUserProfileQuery()
  const { data: allBeats, isLoading: isBeatsLoading } = useGetBeatsQuery()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if (isProfileLoading || isBeatsLoading) {
    return <Loader />
  }

  const decodedBeats = profile?.purchasedBeats.map((cartItem) => {
    const beat = allBeats?.find((beat) => beat.id === cartItem.beatId)!
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
    const alreadyPurchasedLeaseId = profile?.purchasedBeats.find(
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

  return !decodedBeats?.length ? (
    <EmptyRedirect title="beats" />
  ) : (
    <div className="flex flex-col w-full">
      {decodedBeats.map((beatItem) => (
        <div
          key={beatItem.beat.id}
          className="flex flex-col sm:grid sm:grid-rows-1 sm:grid-cols-6 gap-2 sm:gap-4 sm:items-center border border-primary hover:bg-accent cursor-pointer p-4"
          onClick={openBeatPage(beatItem.beat.id!)}
        >
          <PlayButton beat={beatItem.beat} />
          <p className="col-span-2">{beatItem.beat.title}</p>
          <p className="sm:text-center">{beatItem.lease?.title}</p>
          {beatItem.beat.available ? (
            <Button
              onClick={updateLeseHandler(beatItem.beat.id!, beatItem.lease!.id)}
              loading={isProfileLoading || isBeatsLoading}
            >
              update
            </Button>
          ) : (
            <span></span>
          )}
          <DownloadButton beat={beatItem.beat} leaseId={beatItem.lease!.id} />
        </div>
      ))}
    </div>
  )
}

export default UserBeatsPage
