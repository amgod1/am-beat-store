import { FC } from "react"
import { BeatsCatalog } from "@/modules/Beats"
import { BeatSearch } from "./components"
import { useGetBeatsQuery } from "@/modules/Beats/store/api"

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
