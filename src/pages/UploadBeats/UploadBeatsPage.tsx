import { FC } from "react"
import { useAppSelector } from "@/hooks"
import { selectBeatsInfo, BeatEditor } from "@/modules/Beats"
import { FileInput } from "./components/FileInput"

export const UploadBeatsPage: FC = () => {
  const { file } = useAppSelector(selectBeatsInfo)

  return file ? <BeatEditor /> : <FileInput />
}
