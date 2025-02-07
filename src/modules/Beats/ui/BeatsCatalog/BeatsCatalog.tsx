import { FC } from "react"

import { Loader } from "@/components/Loader"

import { useGetBeatsQuery } from "../../store/api"
import { BeatsCatalog as BeatsCatalogProps } from "./BeatsCatalog.interface"
import { CatalogItem } from "./components"

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
