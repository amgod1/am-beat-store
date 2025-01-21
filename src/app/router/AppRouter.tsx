import { FC } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AdminRoute, PrivateRoute, ProtectedRoute } from "./routes"
import { Layout } from "../layout"
import { ROUTES } from "@/constants/Routes"
import { LoginPage, SignUpPage } from "@/pages/Auth"
import { CatalogPage } from "@/pages/Catalog"
import { UploadPage } from "@/pages/Upload"
import { UploadBeatsPage } from "@/pages/UploadBeats"
import { UploadTagsPage } from "@/pages/UploadTags"
import { BeatPage } from "@/pages/Beat"
import { EditBeatPage } from "@/pages/EditBeat"
import { UserPage } from "@/pages/User"
import { UserCartPage } from "@/pages/UserCart"
import { UserBeatsPage } from "@/pages/UserBeats"

export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.Home} element={<Layout />}>
        <Route
          path={ROUTES.Invalid}
          element={<Navigate to={ROUTES.Catalog} />}
        />
        <Route path={ROUTES.Catalog} element={<CatalogPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.Login} element={<LoginPage />} />
          <Route path={ROUTES.SignUp} element={<SignUpPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.User} element={<UserPage />}>
            <Route path={ROUTES.UserCart} element={<UserCartPage />} />
            <Route path={ROUTES.UserBeats} element={<UserBeatsPage />} />
          </Route>
          <Route path={ROUTES.DynamicBeat} element={<BeatPage />} />
          <Route path={ROUTES.DynamicBeatEdit} element={<EditBeatPage />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path={ROUTES.Upload} element={<UploadPage />}>
            <Route path={ROUTES.UploadBeats} element={<UploadBeatsPage />} />
            <Route path={ROUTES.UploadTags} element={<UploadTagsPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
