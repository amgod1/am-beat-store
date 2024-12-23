import { FC } from "react"
import { Button } from "@/components"
import { IoCart } from "react-icons/io5"

export const AddToCart: FC = () => {
  return (
    <div className="flex justify-end sm:justify-center p-3 sm:p-5">
      <Button>
        <IoCart size="1.5rem" />
        <p className="hidden sm:block">add</p>
      </Button>
    </div>
  )
}
