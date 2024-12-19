import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"
import { useAppSelector } from "@/hooks"
import { selectAdmin } from "@/modules/Profile"

export const AdminRoute: FC = () => {
  const admin = useAppSelector(selectAdmin)

  return !admin ? <Navigate to={ROUTES.Profile} replace /> : <Outlet />
}
