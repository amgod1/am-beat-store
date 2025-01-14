import { FC } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { playAudio, selectPlayerInfo } from "../../store"
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6"
import { BeatItem } from "../../interfaces"

export const PlayButton: FC<BeatItem> = ({ beat }) => {
  const dispatch = useAppDispatch()
  const { isPlaying, id: playingAudioId } = useAppSelector(selectPlayerInfo)

  const playAudioHandler = () => dispatch(playAudio(beat))

  return (
    <button onClick={playAudioHandler}>
      {beat.id === playingAudioId && isPlaying ? (
        <FaRegCirclePause className="hover:text-warning" size="2rem" />
      ) : (
        <FaRegCirclePlay className="hover:text-warning" size="2rem" />
      )}
    </button>
  )
}
