import { FC } from "react"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6"
import { PlayButton as PlayButtonProps } from "./PlayButton.interface"
import { selectPlayerInfo } from "../../store/selectors"
import { playAudio } from "../../store/slice"

export const PlayButton: FC<PlayButtonProps> = ({
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
