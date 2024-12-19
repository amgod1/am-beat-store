import { FC } from "react"
import { AUTH_TITLES } from "@/constants/AuthTitles"
import { AuthHeadingInterface } from "./AuthHeading.interface"

export const AuthHeading: FC<AuthHeadingInterface> = ({ isLogin }) => (
  <h3 className="text-2xl">
    {isLogin ? AUTH_TITLES.Login : AUTH_TITLES.SignUp}
  </h3>
)
