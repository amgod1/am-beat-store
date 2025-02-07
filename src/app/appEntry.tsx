import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { StoreProvider } from "./store/StoreProvider"
import { AppRouter } from "./router/AppRouter"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  </StrictMode>
)
