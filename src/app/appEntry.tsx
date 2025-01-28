import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { StoreProvider, DataRestoreProvider } from "./providers"
import { AuthProvider } from "@/modules/Auth"
import { AppRouter } from "./router"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <AuthProvider>
        <DataRestoreProvider>
          <AppRouter />
        </DataRestoreProvider>
      </AuthProvider>
    </StoreProvider>
  </StrictMode>
)
