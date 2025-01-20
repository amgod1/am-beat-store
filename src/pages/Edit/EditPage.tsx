import { FC } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "@/hooks"
import { ROUTES } from "@/constants/Routes"
import { selectAdminStatus } from "@/modules/Profile"
import { Tabs } from "@/components"

export const EditPage: FC = () => {
  const isAdmin = useAppSelector(selectAdminStatus)
  const { pathname } = useLocation()

  if (!isAdmin) {
    return <Navigate to={ROUTES.Catalog} />
  }

  const tabsInfo = [
    { title: "links", href: ROUTES.DynamicBeatEditLinks },
    { title: "tags", href: ROUTES.DynamicBeatEditTags },
  ]

  return pathname === ROUTES.DynamicBeatEdit ? (
    <Navigate to={ROUTES.DynamicBeatEditLinks} />
  ) : (
    <>
      <Tabs tabsInfo={tabsInfo} />
      <Outlet />
    </>
  )
}
