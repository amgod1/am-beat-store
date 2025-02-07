import { FC, useEffect } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"

import { useCurrentUserAuth } from "@/modules/Auth/hooks/useCurrentUserAuth"
import { useGetBeatsQuery } from "@/modules/Beats/store/api"
import { PlayButton } from "@/modules/Player/ui/PlayButton"
import { useGetUserProfileQuery } from "@/modules/Profile/store/api"
import { AddToCart } from "@/modules/Profile/ui/AddToCart"
import { TagsList } from "@/modules/Tags/ui/TagsList/TagsList"

import { Button } from "@/components/Button"
import { Loader } from "@/components/Loader"

import { ROUTES } from "@/constants/Routes"

import { RelatedBeats } from "./components/RelatedBeats"

const BeatPage: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useCurrentUserAuth()
  const { data: profile } = useGetUserProfileQuery()
  const { data: allBeats, isLoading } = useGetBeatsQuery()

  const beat = (allBeats || []).find((beat) => beat.id === id)

  const navigateToEditPage = () => {
    navigate(`${ROUTES.Beat}/${beat?.id}/edit`)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [id])

  if (!beat) {
    return <Navigate to={ROUTES.Catalog} />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <section className="flex flex-col gap-8 w-full">
      <div className="bg-accent border border-primary p-8 flex flex-col lg:flex-row justify-between gap-8 items-center w-full min-h-40">
        <div className="flex flex-col gap-8 w-full lg:w-auto">
          <PlayButton beat={beat} classicSize={false} />
          <div className="flex flex-col gap-2">
            <h2 className="text:xl sm:text-2xl">{beat.title}</h2>
            <p className="text-base">{beat.bpm}bpm</p>
            {beat.available && <AddToCart beatId={id!} adaptiveText={false} />}
            {user && profile?.admin && (
              <Button onClick={navigateToEditPage}>edit</Button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2 w-full lg:w-3/5 text-sm sm:text-base">
          <TagsList tagIds={beat.tagIds} />
        </div>
      </div>
      <RelatedBeats />
    </section>
  )
}

export default BeatPage
