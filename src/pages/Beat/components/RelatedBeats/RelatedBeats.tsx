import { FC } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "@/hooks"
import { BeatsCatalog, selectAllBeats } from "@/modules/Beats"

export const RelatedBeats: FC = () => {
  const { id } = useParams()
  const beats = useAppSelector(selectAllBeats)

  const relatedBeats = beats.filter((beat) => beat.id !== id)

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl">related beats:</h3>
      <BeatsCatalog beats={relatedBeats} />
    </div>
  )
}
