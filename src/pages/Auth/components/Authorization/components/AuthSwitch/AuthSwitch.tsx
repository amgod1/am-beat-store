import { FC } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "@/constants/Routes"
import { AuthSwitchInterface } from "./AuthSwitch.interface"

export const AuthSwitch: FC<AuthSwitchInterface> = ({ isLogin }) => {
  const text = isLogin ? "don't have an account?" : "already have an account?"

  return (
    <Link to={isLogin ? ROUTES.SignUp : ROUTES.Login}>
      <p className="underline hover:text-warning">{text}</p>
    </Link>
  )
}
