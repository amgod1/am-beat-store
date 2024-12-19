import { FC } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ROUTES } from "@constants/Routes"
import { AdminRoute, PrivateRoute, ProtectedRoute } from "./routes"
import { Layout } from "../layout"
import { AuthPage, LoginPage, SignUpPage } from "@/pages/Auth"
import { CatalogPage } from "@/pages/Catalog"
import { ProfilePage } from "@/pages/Profile"
import { AdminPage } from "@/pages/Admin"
import { AdminBeatsPage } from "@/pages/AdminBeats"
import { AdminTagsPage } from "@/pages/AdminTags"

export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.Home} element={<Layout />}>
        <Route path={ROUTES.Catalog} element={<CatalogPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.Auth} element={<AuthPage />}>
            <Route path={ROUTES.Login} element={<LoginPage />} />
            <Route path={ROUTES.SignUp} element={<SignUpPage />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.Profile} element={<ProfilePage />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path={ROUTES.Admin} element={<AdminPage />}>
            <Route path={ROUTES.AdminBeats} element={<AdminBeatsPage />} />
            <Route path={ROUTES.AdminTags} element={<AdminTagsPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
