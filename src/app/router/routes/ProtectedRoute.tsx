import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { useCurrentUserAuth } from "@/modules/Auth/hooks/useCurrentUserAuth"

import { ROUTES } from "@/constants/Routes"

export const ProtectedRoute: FC = () => {
  const { user } = useCurrentUserAuth()

  return user ? <Navigate to={ROUTES.UserCart} replace /> : <Outlet />
}
