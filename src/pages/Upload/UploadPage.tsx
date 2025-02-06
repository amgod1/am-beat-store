import { FC } from "react"
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"
import { Tabs } from "@/components"

const UploadPage: FC = () => {
  const { pathname } = useLocation()

  const tabsInfo = [
    { title: "beats", href: ROUTES.UploadBeats },
    { title: "tags", href: ROUTES.UploadTags },
  ]

  return pathname === ROUTES.Upload ? (
    <Navigate to={ROUTES.UploadBeats} />
  ) : (
    <>
      <Tabs tabsInfo={tabsInfo} />
      <Outlet />
    </>
  )
}

export default UploadPage
