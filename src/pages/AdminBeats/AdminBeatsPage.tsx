import { FC } from "react"
import { useAppSelector } from "@/hooks"
import { selectBeatsInfo } from "@/modules/Beats"
import { BeatEditor, FileInput } from "./components"

export const AdminBeatsPage: FC = () => {
  const { file } = useAppSelector(selectBeatsInfo)

  return file ? <BeatEditor /> : <FileInput />
}
