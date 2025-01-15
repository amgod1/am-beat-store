import { FC } from "react"
import { useAppSelector } from "@/hooks"
import { selectAllBeats } from "@/modules/Beats"
import { BeatsCatalog } from "@/modules/Beats"
import { BeatSearch } from "./components"

export const CatalogPage: FC = () => {
  const { filteredBeats, allBeats } = useAppSelector(selectAllBeats)

  return (
    <section className="flex flex-col w-full">
      <BeatSearch />
      <BeatsCatalog beats={filteredBeats.length ? filteredBeats : allBeats} />
    </section>
  )
}
