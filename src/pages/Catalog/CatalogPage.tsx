import { FC } from "react"
import { useAppSelector } from "@/hooks"
import { selectAllBeats, selectBeatsStatus } from "@/modules/Beats"
import { Loader } from "@/components"
import { CatalogItem } from "./components"

export const CatalogPage: FC = () => {
  const beats = useAppSelector(selectAllBeats)
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
