import { useAppSelector } from "@/hooks"
import { selectAllBeats } from "@/modules/Beats"
import { FC } from "react"
import { BeatItem } from "./components"

export const CatalogPage: FC = () => {
  const beats = useAppSelector(selectAllBeats)

  return (
    <table className="table-auto w-full text-base">
      <tbody>
        {beats.length &&
          beats.map((beat) => <BeatItem key={beat.id} beat={beat} />)}
      </tbody>
    </table>
  )
}
