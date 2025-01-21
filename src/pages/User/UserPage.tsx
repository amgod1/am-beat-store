import { FC } from "react"
import { useLocation, Outlet, Navigate } from "react-router-dom"
import { Button, Tabs } from "@/components"
import { ROUTES } from "@/constants/Routes"
import { useAppSelector } from "@/hooks"
import {
  getUserNameFromEmail,
  selectProfileInfo,
  selectProfileStatus,
} from "@/modules/Profile"

export const UserPage: FC = () => {
  const { email } = useAppSelector(selectProfileInfo)
  const { loading } = useAppSelector(selectProfileStatus)
  const { pathname } = useLocation()

  if (pathname === ROUTES.User) {
    return <Navigate to={ROUTES.UserCart} />
  }

  const tabsInfo = [
    { title: "cart", href: ROUTES.UserCart },
    { title: "beats", href: ROUTES.UserBeats },
  ]

  return (
    <section className="flex flex-col gap-2 w-full">
      <div className="bg-accent border border-primary p-8 flex gap-2 justify-between items-center w-full min-h-40">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 bg-primary text-dark rounded-full flex justify-center items-center select-none text-3xl">
            {email && email![0]}
          </div>
          {email && (
            <p className="hidden sm:block">{getUserNameFromEmail(email)}</p>
          )}
        </div>
        <Button loading={loading} danger={true}>
          delete
        </Button>
      </div>
      <Tabs tabsInfo={tabsInfo} />
      <Outlet />
    </section>
  )
}
