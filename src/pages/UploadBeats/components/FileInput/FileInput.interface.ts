import { Dispatch, SetStateAction } from "react"

export interface FileInputInterface {
  setFile: Dispatch<SetStateAction<File | null>>
}
