import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "@constants/Routes"

export const AdminRoute: FC = () => {
  const admin = false

  return !admin ? <Navigate to={ROUTES.Profile} replace /> : <Outlet />
}
