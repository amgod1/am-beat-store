import { BsFillMusicPlayerFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import { MdAdminPanelSettings, MdLogout } from "react-icons/md"
import { TbLogin2 } from "react-icons/tb"
import { getAuth, signOut } from "firebase/auth"
import { IconLink } from "@/components/IconLink"
import { ROUTES } from "@/constants/Routes"
import { useAppSelector } from "@/hooks"
import { selectUserAuth } from "@/modules/Auth"

export const Header = () => {
  const auth = useAppSelector(selectUserAuth)

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
        {auth ? (
          <>
            <IconLink
              Icon={MdAdminPanelSettings}
              navigation={ROUTES.Admin}
              size="2rem"
            />
            <IconLink Icon={FaUser} navigation={ROUTES.Profile} />
            <IconLink Icon={MdLogout} callback={logOutHandler} size="2rem" />
          </>
        ) : (
          <IconLink Icon={TbLogin2} navigation={ROUTES.Login} size="2rem" />
        )}
      </div>
    </header>
  )
}
