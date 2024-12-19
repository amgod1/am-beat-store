import { FC } from "react"
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "@constants/Routes"

export const AdminPage: FC = () => {
  const { pathname } = useLocation()

  return pathname === ROUTES.Admin ? (
    <Navigate to={ROUTES.AdminBeats} />
  ) : (
    <Outlet />
  )
}
