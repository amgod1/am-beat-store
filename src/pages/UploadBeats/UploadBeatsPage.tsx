import { FC } from "react"
import { useAppSelector } from "@/hooks/useAppSelector"
import { BeatEditor } from "@/modules/Beats/ui/BeatEditor"
import { FileInput } from "./components/FileInput"
import { selectBeatsInfo } from "@/modules/Beats/store/selectors"

const UploadBeatsPage: FC = () => {
  const { file } = useAppSelector(selectBeatsInfo)

  return file ? <BeatEditor /> : <FileInput />
}

export default UploadBeatsPage
