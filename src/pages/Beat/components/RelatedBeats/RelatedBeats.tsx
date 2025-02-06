import { FC } from "react"
import { useParams } from "react-router-dom"
import { BeatsCatalog } from "@/modules/Beats"
import { useGetBeatsQuery } from "@/modules/Beats/store/api"
import { Loader } from "@/components"

export const RelatedBeats: FC = () => {
  const { id } = useParams()
  const { data: allBeats, isLoading } = useGetBeatsQuery()

  const relatedBeats = (allBeats || []).filter((beat) => beat.id !== id)

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl">related beats:</h3>
      <BeatsCatalog beats={relatedBeats} />
    </div>
  )
}
