import { FC } from "react"
import { useParams } from "react-router-dom"

import { useGetBeatsQuery } from "@/modules/Beats/store/api"
import { BeatsCatalog } from "@/modules/Beats/ui/BeatsCatalog"

import { Loader } from "@/components/Loader"

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
