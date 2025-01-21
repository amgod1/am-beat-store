import { FC, useEffect } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "@/hooks"
import { Button } from "@/components"
import { AddToCart, selectAdminStatus } from "@/modules/Profile"
import { selectAllBeats } from "@/modules/Beats"
import { PlayButton } from "@/modules/Player"
import { TagsList } from "@/modules/Tags"
import { ROUTES } from "@/constants/Routes"
import { RelatedBeats } from "./components"

export const BeatPage: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isAdmin = useAppSelector(selectAdminStatus)

  const beat = useAppSelector(selectAllBeats).allBeats.find(
    (beat) => beat.id === id
  )

  if (!beat) {
    return <Navigate to={ROUTES.Catalog} />
  }

  const navigateToEditPage = () => {
    navigate(`${ROUTES.Beat}/${beat.id}/edit`)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [id])

  return (
    <section className="flex flex-col gap-8 w-full">
      <div className="bg-accent border border-primary p-8 flex flex-col lg:flex-row justify-between gap-8 items-center w-full min-h-40">
        <div className="flex flex-col gap-8 w-full lg:w-auto">
          <PlayButton beat={beat} classicSize={false} />
          <div className="flex flex-col gap-2">
            <h2 className="text:xl sm:text-2xl">{beat.title}</h2>
            <p className="text-base">{beat.bpm}bpm</p>
            {beat.available && <AddToCart beatId={id!} adaptiveText={false} />}
            {isAdmin && <Button onClick={navigateToEditPage}>edit</Button>}
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
