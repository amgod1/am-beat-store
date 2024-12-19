import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "@constants/Routes"

export const ProtectedRoute: FC = () => {
  const auth = false

  return auth ? <Navigate to={ROUTES.Profile} replace /> : <Outlet />
}
