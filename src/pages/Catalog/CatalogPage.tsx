import { FC } from "react"
import { useAppSelector } from "@/hooks"
import { selectAllBeats } from "@/modules/Beats"
import { BeatsCatalog } from "@/modules/Beats"

export const CatalogPage: FC = () => {
  const beats = useAppSelector(selectAllBeats)

  return <BeatsCatalog beats={beats} />
}
