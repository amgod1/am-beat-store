import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"
import { useCurrentUserAuth } from "@/modules/Auth"

export const PrivateRoute: FC = () => {
  const { user } = useCurrentUserAuth()

  return !user ? <Navigate to={ROUTES.Login} replace /> : <Outlet />
}
