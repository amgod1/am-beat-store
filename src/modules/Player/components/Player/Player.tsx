import { FC, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { BiSkipPreviousCircle, BiSkipNextCircle } from "react-icons/bi"
import {
  pausePlaying,
  continuePlaying,
  closePlayer,
  selectPlayerInfo,
  playAudio,
} from "../../store"
import { selectAllBeats } from "@/modules/Beats"

export const Player: FC = () => {
  const info = useAppSelector(selectPlayerInfo)
  const allBeats = useAppSelector(selectAllBeats)
  const currentAudio = useRef<HTMLAudioElement>(null)
  const dispatch = useAppDispatch()

  const currentBeatIndex = allBeats.findIndex((beat) => beat.id === info.id)

  const playHandler = () => {
    dispatch(info.isPlaying ? pausePlaying() : continuePlaying())
  }

  const prevHandler = () => {
    const prevBeatIndex =
      currentBeatIndex === 0 ? allBeats.length - 1 : currentBeatIndex - 1

    dispatch(playAudio(allBeats[prevBeatIndex]))
  }

  const nextHandler = () => {
    const nextBeatIndex =
      currentBeatIndex === allBeats.length - 1 ? 0 : currentBeatIndex + 1

    dispatch(playAudio(allBeats[nextBeatIndex]))
  }

  const closeHandler = () => dispatch(closePlayer())

  useEffect(() => {
    if (info.isPlaying && currentAudio.current) {
      currentAudio.current.play()
    } else if (!info.isPlaying && currentAudio.current) {
      currentAudio.current.pause()
    }
  }, [info.isPlaying, info.src])

  return (
    <>
      <div className="my-8 h-8 grid grid-cols-2 sm:grid-cols-3 justify-items-stretch items-center">
        <audio src={info.src!} ref={currentAudio} />
        <h2 className="text-base sm:text-xl">{info.title}</h2>
        <div className="flex gap-2 justify-end sm:justify-center">
          <button onClick={prevHandler}>
            <BiSkipPreviousCircle
              className="hover:text-warning"
              size="2.4rem"
            />
          </button>
          <button onClick={playHandler}>
            {info.isPlaying ? (
              <FaRegCirclePause className="hover:text-warning" size="2rem" />
            ) : (
              <FaRegCirclePlay className="hover:text-warning" size="2rem" />
            )}
          </button>
          <button onClick={nextHandler}>
            <BiSkipNextCircle className="hover:text-warning" size="2.4rem" />
          </button>
        </div>
        <button
          onClick={closeHandler}
          className="hover:text-warning hidden sm:block justify-self-end"
        >
          <IoIosCloseCircleOutline size="2.5rem" />
        </button>
      </div>
    </>
  )
}
