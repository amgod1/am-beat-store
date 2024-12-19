import { FC, PropsWithChildren } from "react"
import { store } from "@/store"
import { Provider } from "react-redux"

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)
