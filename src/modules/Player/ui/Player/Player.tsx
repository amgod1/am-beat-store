import { ChangeEvent, FC, useEffect, useRef } from "react"
import { BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi"
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6"
import { IoIosCloseCircleOutline } from "react-icons/io"

import { useGetBeatsQuery } from "@/modules/Beats/store/api"
import { AddToCart } from "@/modules/Profile/ui/AddToCart"

import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"

import { selectPlayerInfo } from "../../store/selectors"
import {
  closePlayer,
  continuePlaying,
  pausePlaying,
  playAudio,
  setAudioProgress,
} from "../../store/slice"

const Player: FC = () => {
  const info = useAppSelector(selectPlayerInfo)
  const { data: allBeats } = useGetBeatsQuery()
  const currentAudio = useRef<HTMLAudioElement>(null)
  const dispatch = useAppDispatch()

  const currentBeatIndex =
    allBeats?.findIndex((beat) => beat.id === info.id) || 0

  const handleAudioUpdate = () => {
    if (!currentAudio.current?.duration) {
      dispatch(setAudioProgress(0))
      return
    }

    const progress = parseInt(
      String(
        (currentAudio.current!.currentTime / currentAudio.current!.duration) *
          100,
      ),
    )

    dispatch(setAudioProgress(progress))
  }

  const handleAudioProgress = (event: ChangeEvent<HTMLInputElement>) => {
    const progressValue = Number(event.target.value)
    dispatch(setAudioProgress(progressValue))

    currentAudio.current!.currentTime =
      (progressValue * currentAudio.current!.duration) / 100
  }

  const playHandler = () => {
    dispatch(info.isPlaying ? pausePlaying() : continuePlaying())
  }

  const prevHandler = () => {
    if (!allBeats?.length) return

    const prevBeatIndex =
      currentBeatIndex === 0 ? allBeats.length - 1 : currentBeatIndex - 1

    dispatch(playAudio(allBeats[prevBeatIndex]))
  }

  const nextHandler = () => {
    if (!allBeats?.length) return

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
    <div className="w-full sticky bottom-0 left-0 bg-dark border-t-2 border-primary">
      <input
        type="range"
        value={info.progress}
        onChange={handleAudioProgress}
        className="w-full cursor-pointer h-1 mt-4 accent-primary"
      />
      <div className="my-8 h-8 grid grid-cols-2 sm:grid-cols-3 justify-items-stretch items-center">
        <audio
          src={info.src!}
          ref={currentAudio}
          onTimeUpdate={handleAudioUpdate}
          onEnded={nextHandler}
        />
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
        <div className="hidden sm:flex flex-row justify-end gap-2">
          <AddToCart beatId={info.id!} onlyIcon={true} />
          <button onClick={closeHandler} className="hover:text-warning">
            <IoIosCloseCircleOutline size="2.5rem" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Player
