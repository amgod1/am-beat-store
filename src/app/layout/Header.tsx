import { getAuth, signOut } from "firebase/auth"
import { BsFillMusicPlayerFill } from "react-icons/bs"
import { IoCart } from "react-icons/io5"
import { MdAdminPanelSettings, MdLogout } from "react-icons/md"
import { TbLogin2 } from "react-icons/tb"

import { useCurrentUserAuth } from "@/modules/Auth/hooks/useCurrentUserAuth"
import { useGetUserProfileQuery } from "@/modules/Profile/store/api"

import { IconLink } from "@/components/IconLink"

import { ROUTES } from "@/constants/Routes"

export const Header = () => {
  const { user } = useCurrentUserAuth()
  const { data: profile } = useGetUserProfileQuery()

  const logOutHandler = () => {
    const auth = getAuth()
    signOut(auth)
  }

  return (
    <header className="my-8 flex h-8 justify-between">
      <div className="flex items-center gap-4">
        <IconLink Icon={BsFillMusicPlayerFill} navigation={ROUTES.Catalog} />
        <h1 className="text-2xl hidden sm:block">am beat store</h1>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {profile?.admin && (
              <IconLink
                Icon={MdAdminPanelSettings}
                navigation={ROUTES.Upload}
                size="2rem"
              />
            )}
            <IconLink Icon={IoCart} navigation={ROUTES.UserCart} size="2rem" />
            <IconLink Icon={MdLogout} callback={logOutHandler} size="2rem" />
          </>
        ) : (
          <IconLink Icon={TbLogin2} navigation={ROUTES.Login} size="2rem" />
        )}
      </div>
    </header>
  )
}
