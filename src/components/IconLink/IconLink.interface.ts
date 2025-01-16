import { IconType } from "react-icons"

export interface IconLink {
  Icon: IconType
  href?: string
  navigation?: string
  callback?: () => void
  size?: string
}
