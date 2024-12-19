import { FC, PropsWithChildren } from "react"
import { PersistGate } from "redux-persist/integration/react"
import { persistor } from "@/store"

export const PersistProvider: FC<PropsWithChildren> = ({ children }) => (
  <PersistGate loading={null} persistor={persistor}>
    {children}
  </PersistGate>
)
