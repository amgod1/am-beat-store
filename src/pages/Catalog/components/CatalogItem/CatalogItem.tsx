import { FC, MouseEvent } from "react"
import { Tags } from "./components"
import { useAppSelector } from "@/hooks"
import { CatalogItemInterface } from "./CatalogItem.interface"
import { selectPlayerInfo, PlayButton } from "@/modules/Player"
import { AddToCart } from "@/modules/Profile"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"

export const CatalogItem: FC<CatalogItemInterface> = ({ beat }) => {
  const navigate = useNavigate()
  const { id: playingAudioId } = useAppSelector(selectPlayerInfo)

  const openBeatPage = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest("button")) {
      return
    }

    navigate(`${ROUTES.Beat}/${beat.id}`)
  }

  return (
    <tr
      className={`border border-primary ${
        beat.id === playingAudioId ? "bg-accent" : "hover:bg-accent"
      } cursor-pointer text-xs sm:text-base`}
      onClick={openBeatPage}
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
        <div className="flex justify-end sm:justify-center p-3 sm:p-5">
          <AddToCart beatId={beat.id!} />
        </div>
      </td>
    </tr>
  )
}
