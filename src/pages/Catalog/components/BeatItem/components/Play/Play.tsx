import { FC } from "react"
import { FaRegCirclePlay } from "react-icons/fa6"
import { PlayInterface } from "./Play.interface"

export const Play: FC<PlayInterface> = ({ url }) => (
  <button onClick={() => console.log(url)}>
    <FaRegCirclePlay className="hover:text-warning" size="2rem" />
  </button>
)
