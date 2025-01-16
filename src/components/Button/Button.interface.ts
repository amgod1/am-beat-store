import { PropsWithChildren } from "react"

export interface Button extends PropsWithChildren {
  type?: "button" | "submit"
  loading?: boolean
  danger?: boolean
  fullWidth?: boolean
  onClick?: () => void
}
