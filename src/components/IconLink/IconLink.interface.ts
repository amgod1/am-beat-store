import { IconType } from "react-icons"

export interface IconLinkInterface {
  Icon: IconType
  href?: string
  navigation?: string
  callback?: () => void
  size?: string
}
