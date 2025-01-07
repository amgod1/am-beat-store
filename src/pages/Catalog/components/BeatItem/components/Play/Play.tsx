import { FC } from "react"
import { FaRegCirclePlay } from "react-icons/fa6"
import { BeatItemInterface } from "../../BeatItem.interface"
import { playAudio } from "@/modules/Player"
import { useAppDispatch } from "@/hooks"

export const Play: FC<BeatItemInterface> = ({ beat }) => {
  const dispatch = useAppDispatch()

  const playAudioHandler = () => dispatch(playAudio(beat))

  return (
    <button onClick={playAudioHandler}>
      <FaRegCirclePlay className="hover:text-warning" size="2rem" />
    </button>
  )
}
