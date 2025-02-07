import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"
import { useCurrentUserAuth } from "@/modules/Auth/hooks/useCurrentUserAuth"

export const ProtectedRoute: FC = () => {
  const { user } = useCurrentUserAuth()

  return user ? <Navigate to={ROUTES.UserCart} replace /> : <Outlet />
}
