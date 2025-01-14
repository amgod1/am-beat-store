import { FC } from "react"
import { ButtonInterface } from "./Button.interface"
import { Loader } from "../Loader"

export const Button: FC<ButtonInterface> = ({
  type = "button",
  disabled = false,
  danger = false,
  loading = false,
  fullWidth = false,
  onClick,
  children,
}) => (
  <button
    type={type}
    disabled={disabled || loading}
    onClick={onClick}
    className={`flex items-center justify-center gap-2 bg-dark border border-primary h-11 p-2 transition-all duration-200 hover:text-dark 
    ${fullWidth && "w-full"}
    ${
      disabled || loading
        ? "opacity-70 hover:text-primary hover:bg-dark"
        : danger
        ? "hover:bg-danger"
        : "hover:bg-warning"
    }
    `}
  >
    {loading ? <Loader /> : children}
  </button>
)
