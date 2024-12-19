import { FC } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const Layout: FC = () => {
  const { pathname } = useLocation()

  if (pathname === ROUTES.Home) {
    return <Navigate to={ROUTES.Catalog} />
  }

  return (
    <>
      <Header />
      <main className="flex flex-grow items-center flex-col">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
