import { FC } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { FaRegCirclePlay } from "react-icons/fa6"
import { FaRegCirclePause } from "react-icons/fa6"
import { IoIosCloseCircleOutline } from "react-icons/io"
import {
  pausePlaying,
  continuePlaying,
  closePlayer,
  selectPlayerInfo,
} from "../../store"

export const Player: FC = () => {
  const info = useAppSelector(selectPlayerInfo)
  const dispatch = useAppDispatch()

  const pauseHandler = () => dispatch(pausePlaying())
  const continueHandler = () => dispatch(continuePlaying())
  const closeHandler = () => dispatch(closePlayer())

  return (
    <div className="my-8 h-8 grid grid-cols-3 justify-items-center items-center">
      <h2>{info.title}</h2>
      {info.isPlaying ? (
        <button onClick={pauseHandler} className="hover:text-warning">
          <FaRegCirclePause size="2rem" />
        </button>
      ) : (
        <button onClick={continueHandler} className="hover:text-warning">
          <FaRegCirclePlay size="2rem" />
        </button>
      )}
      <button onClick={closeHandler} className="hover:text-warning">
        <IoIosCloseCircleOutline size="2.5rem" />
      </button>
      {/* </div> */}
    </div>
  )
}
