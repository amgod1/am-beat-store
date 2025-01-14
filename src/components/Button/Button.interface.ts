import { PropsWithChildren } from "react"

export interface ButtonInterface extends PropsWithChildren {
  type?: "button" | "submit"
  loading?: boolean
  danger?: boolean
  fullWidth?: boolean
  onClick?: () => void
}
