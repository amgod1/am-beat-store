import { FC, useEffect, useRef } from "react"
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
  const currentAudio = useRef<HTMLAudioElement>(null)

  const pauseHandler = () => dispatch(pausePlaying())

  const continueHandler = () => dispatch(continuePlaying())

  const closeHandler = () => dispatch(closePlayer())

  useEffect(() => {
    if (info.isPlaying && currentAudio.current) {
      currentAudio.current.play()
    } else if (!info.isPlaying && currentAudio.current) {
      currentAudio.current.pause()
    }
  }, [info.isPlaying, info.src])

  return (
    <div className="my-8 h-8 grid grid-cols-2 sm:grid-cols-3 justify-items-stretch items-center">
      <audio src={info.src!} ref={currentAudio} />
      <h2 className="text-base sm:text-xl">{info.title}</h2>
      {info.isPlaying ? (
        <button
          onClick={pauseHandler}
          className="hover:text-warning justify-self-end sm:justify-self-center"
        >
          <FaRegCirclePause size="2rem" />
        </button>
      ) : (
        <button
          onClick={continueHandler}
          className="hover:text-warning justify-self-end sm:justify-self-center"
        >
          <FaRegCirclePlay size="2rem" />
        </button>
      )}
      <button
        onClick={closeHandler}
        className="hover:text-warning hidden sm:block justify-self-end"
      >
        <IoIosCloseCircleOutline size="2.5rem" />
      </button>
    </div>
  )
}
