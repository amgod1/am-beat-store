import { FC } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

import { Tabs } from "@/components/Tabs"

import { ROUTES } from "@/constants/Routes"

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
