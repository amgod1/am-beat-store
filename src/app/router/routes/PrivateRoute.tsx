import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"
import { useAppSelector } from "@/hooks"
import { selectUserAuth } from "@/modules/Auth"

export const PrivateRoute: FC = () => {
  const auth = useAppSelector(selectUserAuth)

  return !auth ? <Navigate to={ROUTES.Login} replace /> : <Outlet />
}
