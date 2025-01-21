import { Button } from "@/components"
import { ROUTES } from "@/constants/Routes"
import { FC } from "react"
import { Link } from "react-router-dom"

export const EmptyCart: FC = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center border border-primary p-8">
      <h2 className="text-2xl">your cart is empty</h2>
      <Link to={ROUTES.Catalog}>
        <Button>return to my music</Button>
      </Link>
    </div>
  )
}
