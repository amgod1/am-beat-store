import { FC } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "@/hooks"
import { selectAllBeats } from "@/modules/Beats"
import { PlayButton } from "@/modules/Player"
import { AddToCart } from "@/modules/Profile"
import { TagsList } from "@/modules/Tags"
import { RelatedBeats } from "./components"

export const BeatPage: FC = () => {
  const { id } = useParams()
  const beat = useAppSelector(selectAllBeats).find((beat) => beat.id === id)!

  return (
    <section className="flex flex-col gap-8">
      <div className="bg-accent border border-primary p-8 flex flex-col lg:flex-row justify-between gap-8 items-center w-full min-h-40">
        <div className="flex flex-col gap-8 w-full lg:w-auto">
          <PlayButton beat={beat} classicSize={false} />
          <div className="flex flex-col gap-2">
            <h2 className="text:xl sm:text-2xl">{beat.title}</h2>
            <p className="text-base">{beat.bpm}bpm</p>
            <AddToCart beatId={id!} hide={false} />
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
