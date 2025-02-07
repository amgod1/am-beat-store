import { FileLinks } from "@/modules/Beats/interfaces/FileLinks.interface"
import { HTMLProps } from "react"

export interface InputLink extends HTMLProps<HTMLInputElement> {
  id?: string
  title: keyof FileLinks
  disabled: boolean
}
