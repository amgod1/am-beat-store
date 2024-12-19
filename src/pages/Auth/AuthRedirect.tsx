import { FC } from "react"
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"

export const AuthRedirect: FC = () => {
  const { pathname } = useLocation()

  return pathname === ROUTES.Auth ? <Navigate to={ROUTES.Login} /> : <Outlet />
}
