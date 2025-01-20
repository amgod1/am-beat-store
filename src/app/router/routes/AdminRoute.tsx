import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"
import { useAppSelector } from "@/hooks"
import { selectAdminStatus } from "@/modules/Profile"

export const AdminRoute: FC = () => {
  const admin = useAppSelector(selectAdminStatus)

  return !admin ? <Navigate to={ROUTES.Cart} replace /> : <Outlet />
}
