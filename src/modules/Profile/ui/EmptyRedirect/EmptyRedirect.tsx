import { FC } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/Button"
import { ROUTES } from "@/constants/Routes"
import { EmptyRedirect as EmptyRedirectProps } from "./EmptyRedirect.interface"

export const EmptyRedirect: FC<EmptyRedirectProps> = ({ title }) => {
  const TEXT = {
    cart: "your cart is empty",
    beats: "you don't have any purchased beats",
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center border border-primary p-8">
      <h2 className="text-center">{TEXT[title]}</h2>
      <Link to={ROUTES.Catalog}>
        <Button>return to my music</Button>
      </Link>
    </div>
  )
}
