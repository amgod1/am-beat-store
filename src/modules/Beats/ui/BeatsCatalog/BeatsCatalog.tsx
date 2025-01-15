import { FC } from "react"
import { useAppSelector } from "@/hooks"
import { selectBeatsStatus } from "@/modules/Beats"
import { Loader } from "@/components"
import { CatalogItem } from "./components"
import { BeatsCatalogInterface } from "./BeatsCatalog.interface"

export const BeatsCatalog: FC<BeatsCatalogInterface> = ({ beats }) => {
  const { loading } = useAppSelector(selectBeatsStatus)

  return loading ? (
    <Loader />
  ) : (
    <table className="table-auto w-full text-base">
      <tbody>
        {beats.map((beat) => (
          <CatalogItem key={beat.id} beat={beat} />
        ))}
      </tbody>
    </table>
  )
}
