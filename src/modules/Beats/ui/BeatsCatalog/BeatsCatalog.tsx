import { FC } from "react"
import { BeatsCatalog as BeatsCatalogProps } from "./BeatsCatalog.interface"
import { useAppSelector } from "@/hooks"
import { Loader } from "@/components"
import { selectBeatsStatus } from "@/modules/Beats"
import { CatalogItem } from "./components"

export const BeatsCatalog: FC<BeatsCatalogProps> = ({ beats }) => {
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
