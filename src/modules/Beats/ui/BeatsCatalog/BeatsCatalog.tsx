import { FC } from "react"
import { BeatsCatalog as BeatsCatalogProps } from "./BeatsCatalog.interface"
import { Loader } from "@/components/Loader"
import { CatalogItem } from "./components"
import { useGetBeatsQuery } from "../../store/api"

export const BeatsCatalog: FC<BeatsCatalogProps> = ({ beats }) => {
  const { isLoading } = useGetBeatsQuery()

  if (isLoading) return <Loader />

  return (
    <table className="table-auto w-full text-base">
      <tbody>
        {beats
          .filter((beat) => beat.available)
          .map((beat) => (
            <CatalogItem key={beat.id} beat={beat} />
          ))}
      </tbody>
    </table>
  )
}
