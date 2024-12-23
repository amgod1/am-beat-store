import { FC } from "react"
import { BeatItemInterface } from "./BeatItem.interface"
import { AddToCart, Play, Tags } from "./components"

export const BeatItem: FC<BeatItemInterface> = ({ beat }) => {
  return (
    <tr className="border border-primary hover:bg-accent cursor-pointer text-xs sm:text-base">
      <td>
        <div className="flex items-center gap-5 p-3 sm:p-5">
          <Play />
          <p>{beat.title}</p>
        </div>
      </td>
      <td className="w-32 text-center hidden sm:table-cell">{`${beat.bpm}bpm`}</td>
      <td className="hidden md:table-cell">
        <Tags tagIds={beat.tagIds} />
      </td>
      <td>
        <AddToCart />
      </td>
    </tr>
  )
}
