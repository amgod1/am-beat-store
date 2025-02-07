import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { useGetUserProfileQuery } from "@/modules/Profile/store/api"

import { ROUTES } from "@/constants/Routes"

export const AdminRoute: FC = () => {
  const { data: profile } = useGetUserProfileQuery()

  return !profile?.admin ? (
    <Navigate to={ROUTES.UserCart} replace />
  ) : (
    <Outlet />
  )
}
