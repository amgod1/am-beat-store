import { FC } from "react"
import { BeatItemInterface } from "./BeatItem.interface"
import { AddToCart, Play, Tags } from "./components"
import { useAppSelector } from "@/hooks"
import { selectPlayerInfo } from "@/modules/Player"

export const BeatItem: FC<BeatItemInterface> = ({ beat }) => {
  const { id: playingAudioId } = useAppSelector(selectPlayerInfo)

  return (
    <tr
      className={`border border-primary ${
        beat.id === playingAudioId ? "bg-accent" : "hover:bg-accent"
      } cursor-pointer text-xs sm:text-base`}
    >
      <td>
        <div className="flex items-center gap-5 p-3 sm:p-5">
          <Play beat={beat} />
          <p>{beat.title}</p>
        </div>
      </td>
      <td className="w-32 text-center hidden sm:table-cell">{`${beat.bpm}bpm`}</td>
      <td className="hidden md:table-cell">
        <Tags tagIds={beat.tagIds} />
      </td>
      <td>
        <AddToCart id={beat.id!} />
      </td>
    </tr>
  )
}
