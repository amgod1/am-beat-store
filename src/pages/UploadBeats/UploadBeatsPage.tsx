import { FC } from "react"

import { selectBeatsInfo } from "@/modules/Beats/store/selectors"
import { BeatEditor } from "@/modules/Beats/ui/BeatEditor"

import { useAppSelector } from "@/hooks/useAppSelector"

import { FileInput } from "./components/FileInput"

const UploadBeatsPage: FC = () => {
  const { file } = useAppSelector(selectBeatsInfo)

  return file ? <BeatEditor /> : <FileInput />
}

export default UploadBeatsPage
