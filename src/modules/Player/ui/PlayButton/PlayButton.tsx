import { FC } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { playAudio, selectPlayerInfo } from "../../store"
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6"
import { PlayButtonInterface } from "./PlayButton.interface"

export const PlayButton: FC<PlayButtonInterface> = ({
  beat,
  classicSize = true,
}) => {
  const dispatch = useAppDispatch()
  const { isPlaying, id: playingAudioId } = useAppSelector(selectPlayerInfo)

  const playAudioHandler = () => dispatch(playAudio(beat))

  const buttonSize = classicSize ? "2rem" : "5rem"

  return (
    <button onClick={playAudioHandler} tabIndex={-1}>
      {beat.id === playingAudioId && isPlaying ? (
        <FaRegCirclePause className="hover:text-warning" size={buttonSize} />
      ) : (
        <FaRegCirclePlay className="hover:text-warning" size={buttonSize} />
      )}
    </button>
  )
}
