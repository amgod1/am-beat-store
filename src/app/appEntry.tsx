import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { StoreProvider, PersistProvider } from "./providers"
import { AppRouter } from "./router"
import "./index.css"
import { AuthProvider } from "@/modules/Auth"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <PersistProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </PersistProvider>
    </StoreProvider>
  </StrictMode>
)
