import { FC } from "react"
import { ButtonInterface } from "./Button.interface"

export const Button: FC<ButtonInterface> = ({
  type = "button",
  danger = false,
  loading = false,
  fullWidth = false,
  onClick,
  children,
}) => (
  <button
    type={type}
    disabled={loading}
    onClick={onClick}
    className={`flex items-center justify-center gap-2 bg-dark border border-primary h-11 p-2 transition-all duration-200 hover:text-dark 
    ${fullWidth && "w-full"}
    ${
      loading
        ? "opacity-50 hover:text-primary hover:bg-dark"
        : danger
        ? "hover:bg-danger"
        : "hover:bg-warning"
    }
    `}
    tabIndex={-1}
  >
    {children}
  </button>
)
