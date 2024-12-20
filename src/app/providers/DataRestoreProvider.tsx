import { useAppDispatch } from "@/hooks"
import { getBeats } from "@/modules/Beats"
import { getTags } from "@/modules/Tags"
import { FC, PropsWithChildren, useEffect } from "react"

export const DataRestoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    Promise.all([getTags, getBeats].map((callback) => dispatch(callback())))
  }, [])

  return children
}
