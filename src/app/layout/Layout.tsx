import { FC } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useAppSelector } from "@/hooks"
import { Player, selectPlayerStatus } from "@/modules/Player"
import { selectShowLicenseModal, LicenseModal } from "@/modules/License"

export const Layout: FC = () => {
  const { pathname } = useLocation()
  const showPlayer = useAppSelector(selectPlayerStatus)
  const showModal = useAppSelector(selectShowLicenseModal)

  if (pathname === ROUTES.Home) {
    return <Navigate to={ROUTES.Catalog} />
  }

  return (
    <>
      <Header />
      <main className="flex flex-grow items-center flex-col">
        <Outlet />
      </main>
      {showModal && <LicenseModal />}
      {showPlayer ? <Player /> : <Footer />}
    </>
  )
}
