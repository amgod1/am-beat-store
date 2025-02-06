import { FC, lazy, Suspense } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useAppSelector } from "@/hooks"
import { selectShowPlayer } from "@/modules/Player"
import { selectShowLicenseModal } from "@/modules/License"

const Player = lazy(() => import("@/modules/Player/ui/Player/Player"))
const LicenseModal = lazy(
  () => import("@/modules/License/ui/LicenseModal/LicenseModal")
)

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
      <main className="flex flex-grow items-center flex-col">
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
