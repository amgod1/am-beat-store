import { FC } from "react"

import { BeatsCatalog } from "@/modules/Beats/ui/BeatsCatalog"

import { useFilteredBeats } from "@/hooks/useFilteredBeats"

import { BeatSearch } from "./components/BeatSearch"

const CatalogPage: FC = () => {
  const { filteredBeats } = useFilteredBeats()

  return (
    <section className="flex flex-col w-full">
      <BeatSearch />
      <BeatsCatalog beats={filteredBeats} />
    </section>
  )
}

export default CatalogPage
