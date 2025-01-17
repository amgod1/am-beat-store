import { BsFillMusicPlayerFill } from "react-icons/bs"
import { MdAdminPanelSettings, MdLogout } from "react-icons/md"
import { TbLogin2 } from "react-icons/tb"
import { IoCart } from "react-icons/io5"
import { getAuth, signOut } from "firebase/auth"
import { IconLink } from "@/components/IconLink"
import { ROUTES } from "@/constants/Routes"
import { useAppSelector } from "@/hooks"
import { selectUserAuth } from "@/modules/Auth"
import { selectAdminStatus } from "@/modules/Profile"

export const Header = () => {
  const auth = useAppSelector(selectUserAuth)
  const admin = useAppSelector(selectAdminStatus)

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
            {admin && (
              <IconLink
                Icon={MdAdminPanelSettings}
                navigation={ROUTES.Admin}
                size="2rem"
              />
            )}
            <IconLink Icon={IoCart} navigation={ROUTES.Cart} size="2rem" />
            <IconLink Icon={MdLogout} callback={logOutHandler} size="2rem" />
          </>
        ) : (
          <IconLink Icon={TbLogin2} navigation={ROUTES.Login} size="2rem" />
        )}
      </div>
    </header>
  )
}
