import { FC, Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import LoginPage from "@/pages/Auth/LoginPage"
import SignUpPage from "@/pages/Auth/SignUpPage"
import BeatPage from "@/pages/Beat"
import CatalogPage from "@/pages/Catalog"
import UserPage from "@/pages/User"
import UserBeatsPage from "@/pages/UserBeats"
import UserCartPage from "@/pages/UserCart"

import { Loader } from "@/components/Loader"

import { ROUTES } from "@/constants/Routes"

import { Layout } from "../layout/Layout"
import { AdminRoute, PrivateRoute, ProtectedRoute } from "./routes"

const EditBeatPage = lazy(() => import("@/pages/EditBeat"))
const UploadPage = lazy(() => import("@/pages/Upload"))
const UploadBeatsPage = lazy(() => import("@/pages/UploadBeats"))
const UploadTagsPage = lazy(() => import("@/pages/UploadTags"))

export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.Home} element={<Layout />}>
        <Route
          path={ROUTES.Invalid}
          element={<Navigate to={ROUTES.Catalog} />}
        />
        <Route path={ROUTES.Catalog} element={<CatalogPage />} />
        <Route path={ROUTES.DynamicBeat} element={<BeatPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.Login} element={<LoginPage />} />
          <Route path={ROUTES.SignUp} element={<SignUpPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.User} element={<UserPage />}>
            <Route path={ROUTES.UserCart} element={<UserCartPage />} />
            <Route path={ROUTES.UserBeats} element={<UserBeatsPage />} />
          </Route>
          <Route
            path={ROUTES.DynamicBeatEdit}
            element={
              <Suspense fallback={<Loader />}>
                <EditBeatPage />
              </Suspense>
            }
          />
        </Route>
        <Route element={<AdminRoute />}>
          <Route
            path={ROUTES.Upload}
            element={
              <Suspense fallback={<Loader />}>
                <UploadPage />
              </Suspense>
            }
          >
            <Route
              path={ROUTES.UploadBeats}
              element={
                <Suspense fallback={<Loader />}>
                  <UploadBeatsPage />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.UploadTags}
              element={
                <Suspense fallback={<Loader />}>
                  <UploadTagsPage />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
