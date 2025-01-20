import { FC } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AdminRoute, PrivateRoute, ProtectedRoute } from "./routes"
import { Layout } from "../layout"
import { ROUTES } from "@/constants/Routes"
import { LoginPage, SignUpPage } from "@/pages/Auth"
import { CatalogPage } from "@/pages/Catalog"
import { UploadPage } from "@/pages/Upload"
import { UploadBeatsPage } from "@/pages/UploadBeats"
import { UploadTagsPage } from "@/pages/UploadTags"
import { CartPage } from "@/pages/Cart"
import { BeatPage } from "@/pages/Beat"
import { EditBeatPage } from "@/pages/EditBeat"

export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.Home} element={<Layout />}>
        <Route path={ROUTES.Catalog} element={<CatalogPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.Login} element={<LoginPage />} />
          <Route path={ROUTES.SignUp} element={<SignUpPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.Cart} element={<CartPage />} />
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
