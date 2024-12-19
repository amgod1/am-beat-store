import { useAppDispatch } from "@/hooks"
import { getTags } from "@/modules/Tags"
import { FC, PropsWithChildren, useEffect } from "react"

export const DataRestoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    Promise.all([getTags].map((callback) => dispatch(callback())))
  }, [])

  return children
}
