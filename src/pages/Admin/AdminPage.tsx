import { FC } from "react"
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"
import { Tabs } from "@/components"

export const AdminPage: FC = () => {
  const { pathname } = useLocation()

  const tabsInfo = [
    { title: "beats", href: ROUTES.AdminBeats },
    { title: "tags", href: ROUTES.AdminTags },
  ]

  return pathname === ROUTES.Admin ? (
    <Navigate to={ROUTES.AdminBeats} />
  ) : (
    <>
      <Tabs tabsInfo={tabsInfo} />
      <Outlet />
    </>
  )
}
