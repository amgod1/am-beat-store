import { HTMLProps } from "react"

import { FileLinks } from "@/modules/Beats/interfaces/FileLinks.interface"

export interface InputLink extends HTMLProps<HTMLInputElement> {
  id?: string
  title: keyof FileLinks
  disabled: boolean
}
