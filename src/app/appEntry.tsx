import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { AppRouter } from "./router/AppRouter"
import { StoreProvider } from "./store/StoreProvider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  </StrictMode>,
)
