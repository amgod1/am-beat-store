import { FC } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ROUTES } from "@constants/Routes"
import { AdminRoute, PrivateRoute, ProtectedRoute } from "./routes"
import { Layout } from "../layout"

export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.Home} element={<Layout />}>
        <Route path={ROUTES.Catalog} element={<div>Catalog</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.Auth} element={<div>Auth </div>}>
            <Route path={ROUTES.Login} element={<div>Login </div>} />
            <Route path={ROUTES.SignUp} element={<div>SignUp </div>} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.Profile} element={<div>ProfilePage </div>} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path={ROUTES.Admin} element={<div>AdminPage </div>}>
            <Route
              path={ROUTES.AdminBeats}
              element={<div>BeatUploaderPage </div>}
            />
            <Route
              path={ROUTES.AdminTags}
              element={<div>TagsEditorPage </div>}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
