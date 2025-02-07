import { FC } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

import { getUserNameFromEmail } from "@/modules/Profile/helpers/getUserNameFromEmail"
import { useGetUserProfileQuery } from "@/modules/Profile/store/api"

import { Loader } from "@/components/Loader"
import { Tabs } from "@/components/Tabs"

import { ROUTES } from "@/constants/Routes"

const UserPage: FC = () => {
  const { data: profile, isLoading } = useGetUserProfileQuery()
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
        {isLoading || !profile ? (
          <Loader />
        ) : (
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-primary text-dark rounded-full flex justify-center items-center select-none text-3xl">
              {profile?.email && profile.email[0]}
            </div>
            {profile?.email && (
              <p className="hidden sm:block">
                {getUserNameFromEmail(profile.email)}
              </p>
            )}
          </div>
        )}
      </div>
      <Tabs tabsInfo={tabsInfo} />
      <Outlet />
    </section>
  )
}

export default UserPage
