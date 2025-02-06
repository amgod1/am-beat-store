import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { StoreProvider } from "./providers"
import { AppRouter } from "./router"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  </StrictMode>
)
