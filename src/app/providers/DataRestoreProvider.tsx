import { FC, PropsWithChildren, useEffect } from "react"
import { getBeats } from "@/modules/Beats"
import { getTags } from "@/modules/Tags"

export const DataRestoreProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    Promise.all([getTags, getBeats].map(() => console.log()))
  }, [])

  return children
}
