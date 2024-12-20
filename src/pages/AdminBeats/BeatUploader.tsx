import { FC } from "react"
import { BeatTagsEditor, FileInput } from "./components"
import { useAppSelector } from "../../../../utils"
import { selectBeatManagerInfo } from "../../store"

export const BeatUploader: FC = () => {
  const { file } = useAppSelector(selectBeatManagerInfo)

  return file ? <BeatTagsEditor /> : <FileInput />
}
