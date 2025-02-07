import { FC } from "react"

import { useGetBeatsQuery } from "@/modules/Beats/store/api"
import { BeatsCatalog } from "@/modules/Beats/ui/BeatsCatalog"

import { BeatSearch } from "./components/BeatSearch"

const CatalogPage: FC = () => {
  const { data: allBeats } = useGetBeatsQuery()

  return (
    <section className="flex flex-col w-full">
      <BeatSearch />
      <BeatsCatalog beats={allBeats || []} />
    </section>
  )
}

export default CatalogPage
