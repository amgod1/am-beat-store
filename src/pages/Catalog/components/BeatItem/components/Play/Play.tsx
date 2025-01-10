import { FC } from "react"
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6"
import { BeatItemInterface } from "../../BeatItem.interface"
import { playAudio } from "@/modules/Player"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { selectPlayerInfo } from "@/modules/Player/store"

export const Play: FC<BeatItemInterface> = ({ beat }) => {
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
