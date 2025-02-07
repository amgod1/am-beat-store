import { FC, Suspense, lazy } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

import { selectShowLicenseModal } from "@/modules/License/store/selectors"
import { LicenseModal } from "@/modules/License/ui/LicenseModal/LicenseModal"
import { selectShowPlayer } from "@/modules/Player/store/selectors"

import { useAppSelector } from "@/hooks/useAppSelector"

import { ROUTES } from "@/constants/Routes"

import { Footer } from "./Footer"
import { Header } from "./Header"

const Player = lazy(() => import("@/modules/Player/ui/Player/Player"))

export const Layout: FC = () => {
  const { pathname } = useLocation()
  const showPlayer = useAppSelector(selectShowPlayer)
  const showModal = useAppSelector(selectShowLicenseModal)

  if (pathname === ROUTES.Home) {
    return <Navigate to={ROUTES.Catalog} />
  }

  return (
    <>
      <Header />
      <main className="flex flex-grow flex-col items-center">
        <Outlet />
      </main>
      {showModal && (
        <Suspense fallback={null}>
          <LicenseModal />
        </Suspense>
      )}
      {showPlayer ? (
        <Suspense fallback={null}>
          <Player />
        </Suspense>
      ) : (
        <Footer />
      )}
    </>
  )
}
