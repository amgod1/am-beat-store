import { FC } from "react"
import { AddToCart, Tags } from "./components"
import { useAppSelector } from "@/hooks"
import {
  selectPlayerInfo,
  PlayButton,
  BeatItem as BeatItemInterface,
} from "@/modules/Player"

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
          <PlayButton beat={beat} />
          <p>{beat.title}</p>
        </div>
      </td>
      <td className="w-32 text-center hidden sm:table-cell">{`${beat.bpm}bpm`}</td>
      <td className="hidden md:table-cell">
        <Tags tagIds={beat.tagIds} />
      </td>
      <td>
        <AddToCart beatId={beat.id!} />
      </td>
    </tr>
  )
}
